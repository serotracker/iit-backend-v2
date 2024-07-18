import { pipe } from "fp-ts/lib/function.js";
import { asyncEtlStep, etlStep, getEnvironmentVariableOrThrow, getMongoClient } from "../helpers.js";
import { ObjectId } from "mongodb";
import Airtable, { FieldSet } from "airtable";
import { validateFieldSetFromAirtableStep } from "./steps/validate-field-set-from-airtable-step.js";
import { transformIntoFormatForDatabaseStep } from "./steps/transform-into-format-for-database-step.js";
import { writeEstimateDataToMongoDbStep } from "./steps/write-estimate-data-to-mongodb-step.js";
import { addCountryAndRegionInformationStep } from "./steps/add-country-and-region-information-step.js";
import { latLngGenerationStep } from "./steps/lat-lng-generation-step.js";
import { jitterPinLatLngStep } from "./steps/jitter-pin-lat-lng-step.js";
import { fetchFaoMersEventsStep } from "./steps/fetch-fao-mers-events-step.js";
import { validateFaoMersEventsStep } from "./steps/validate-fao-mers-events-step.js";
import { cleanFaoMersEventFieldsStep } from "./steps/clean-fao-mers-event-fields-step.js";
import { parseDatesStep } from "./steps/parse-dates-step.js";
import { writeFaoMersEventDataToMongoDbStep } from "./steps/write-fao-mers-event-data-to-mongodb-step.js";
import { assignPartitionsStep } from "./steps/assign-partitions-step.js";
import { fetchCamelPopulationByCountryDataStep } from "./steps/fetch-camel-population-by-country-data-step.js";
import { validateCamelPopulationByCountryDataStep } from "./steps/validate-camel-population-by-country-data-step.js";
import { cleanCamelPopulationByCountryDataStep } from "./steps/clean-camel-population-by-country-data-step.js";
import { writeFaoYearlyCamelPopulationDataToMongoDbStep } from "./steps/write-fao-yearly-camel-population-data-to-mongodb-step.js";
import { fetchCountryPopulationDataStep } from "./steps/fetch-country-population-data-step.js";
import { generateCamelDataPerCapitaStep } from "./steps/generate-camel-data-per-capita-step.js";
import { addDatabaseIndexesStep } from "./steps/add-database-indexes-step.js";
import { combineEstimatesWithSourcesStep } from "./steps/combine-estimates-with-sources-step.js";
import { cleanSourcesStep } from "./steps/clean-sources-step.js";
import { cleanEstimatesStep } from "./steps/clean-estimates-step.js";
import { cleanStudiesStep } from "./steps/clean-studies-step.js";

const runEtlMain = async () => {
  console.log("Running MERS ETL");
  const airtableApiKey = getEnvironmentVariableOrThrow({
    key: "AIRTABLE_API_KEY",
  });
  const airtableMERSBaseId = getEnvironmentVariableOrThrow({
    key: "AIRTABLE_MERS_BASE_ID",
  });

  const mongoUri = getEnvironmentVariableOrThrow({ key: "MONGODB_URI" });

  const mongoClient = await getMongoClient({ mongoUri });

  const airtable = new Airtable({ apiKey: airtableApiKey });
  const base = new Airtable.Base(airtable, airtableMERSBaseId);
  //const estimateSheet = base.table("...");
  const sourceSheet = base.table("Source");

  const allSourcesUnformatted: (FieldSet & { id: string })[] =
    await sourceSheet
      .select()
      .all()
      .then((estimateSheet) =>
        estimateSheet.map((record) => ({ ...record.fields, id: record.id }))
      );

  const allEstimatesUnformatted: (FieldSet & { id: string })[] = Array(5).fill(0).map(() => ({ id: new ObjectId().toString() }))

  const allStudiesUnformatted = [{
    id: new ObjectId().toString(),
    'Inclusion Criteria': 'Inclusion Criteria',
    'Exclusion Criteria': 'Exclusion Criteria',
  }]

  //The pipe needs to be divided in half because there is a maximum of 19 functions per pipe sadly.
  const outputFromFirstPipeHalf = await pipe(
    {
      allEstimates: allEstimatesUnformatted,
      allSources: allSourcesUnformatted,
      allStudies: allStudiesUnformatted,
      allFaoMersEvents: [],
      yearlyCamelPopulationByCountryData: [],
      countryPopulationData: [],
      mongoClient
    },
    etlStep(validateFieldSetFromAirtableStep),
    etlStep(cleanSourcesStep),
    etlStep(cleanStudiesStep),
    etlStep(cleanEstimatesStep),
    etlStep(fetchFaoMersEventsStep),
    etlStep(validateFaoMersEventsStep),
    etlStep(cleanFaoMersEventFieldsStep),
    etlStep(fetchCamelPopulationByCountryDataStep),
    etlStep(validateCamelPopulationByCountryDataStep),
    etlStep(cleanCamelPopulationByCountryDataStep),
    etlStep(fetchCountryPopulationDataStep),
    etlStep(generateCamelDataPerCapitaStep),
    etlStep(parseDatesStep),
    etlStep(combineEstimatesWithSourcesStep),
    etlStep(addCountryAndRegionInformationStep),
  );

  await pipe(
    outputFromFirstPipeHalf,
    asyncEtlStep(latLngGenerationStep),
    etlStep(jitterPinLatLngStep),
    etlStep(assignPartitionsStep),
    etlStep(transformIntoFormatForDatabaseStep),
    asyncEtlStep(writeEstimateDataToMongoDbStep),
    asyncEtlStep(writeFaoMersEventDataToMongoDbStep),
    asyncEtlStep(writeFaoYearlyCamelPopulationDataToMongoDbStep),
    asyncEtlStep(addDatabaseIndexesStep)
  );

  console.log("Exiting");
  process.exit(1);
};

await runEtlMain().catch((error) => console.error(error));
