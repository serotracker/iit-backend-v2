import Airtable, { FieldSet } from "airtable";
import { pipe } from "fp-ts/lib/function.js";
import {
  asyncEtlStep,
  etlStep,
  getEnvironmentVariableOrThrow,
  getMongoClient,
  writeDataToMongoEtlStep,
} from "../helpers.js";
import { validateFieldSetFromAirtableStep } from "./steps/validate-field-set-from-airtable-step.js";
import { cleanFieldNamesAndRemoveUnusedFieldsStep } from "./steps/clean-field-names-and-remove-unused-fields-step.js";
import { parseDatesStep } from "./steps/parse-dates-step.js";
import { latLngGenerationStep } from "./steps/lat-lng-generation-step.js";
import { removeRecordsThatAreFlaggedNotToSave } from "./steps/remove-records-that-are-flagged-to-not-save-step.js";
import { jitterPinLatLngStep } from "./steps/jitter-pin-lat-lng-step.js";
import { transformIntoFormatForDatabaseStep } from "./steps/transform-into-format-for-database-step.js";
import { filterStudiesThatDoNotMeetDataStructureRequirement } from "./steps/filter-studies-that-do-not-meet-data-structure-requirements.js";
import { transformNotReportedValuesToUndefinedStep } from "./steps/transform-not-reported-values-to-undefined-step.js";
import { addCountryAndRegionInformationStep } from "./steps/add-country-and-region-information-step.js";
import { fetchVaccinationDataStep } from "./steps/fetch-vaccination-data-step.js";
import { fetchPositiveCaseDataStep } from "./steps/fetch-positive-case-data-step.js";
import { addVaccinationDataToEstimateStep } from "./steps/add-vaccination-data-to-estimate-step.js";
import { addPositiveCaseDataToEstimateStep } from "./steps/add-positive-case-data-to-estimate-step.js";
import { combineEstimatesAndStudies } from "./steps/combine-estimates-and-studies-step.js";
import { calculateSeroprevalenceStep } from "./steps/calculate-seroprevalence-step.js";
import { fetchCountryPopulationDataStep } from "./steps/fetch-country-population-data-step.js";
import { writeCountryDataToMongoDbStep } from "./steps/write-country-data-to-mongodb-step.js";
import { writeEstimateDataToMongoDbStep } from "./steps/write-estimate-data-to-mongodb-step.js";
import { addCountryPopulationDataToEstimateStep } from "./steps/add-country-population-data-to-estimate-step.js";

const runEtlMain = async () => {
  console.log("Running SarsCoV-2 ETL");
  const airtableApiKey = getEnvironmentVariableOrThrow({
    key: "AIRTABLE_API_KEY",
  });
  const airtableSC2BaseId = getEnvironmentVariableOrThrow({
    key: "AIRTABLE_SARSCOV2_BASE_ID",
  });
  const mongoUri = getEnvironmentVariableOrThrow({ key: "MONGODB_URI" });
  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  const mongoClient = await getMongoClient({ mongoUri });

  const airtable = new Airtable({ apiKey: airtableApiKey });
  const base = new Airtable.Base(airtable, airtableSC2BaseId);
  const estimateSheet = base.table("Rapid Review: Estimates");
  const studySheet = base.table("Rapid Review: Study");

  const allEstimatesUnformatted: (FieldSet & { id: string })[] =
    await estimateSheet
      .select()
      .all()
      .then((estimateSheet) =>
        estimateSheet.map((record) => ({ ...record.fields, id: record.id }))
      );
    
  const allStudiesUnformatted: (FieldSet & { id: string })[] =
    await studySheet
      .select()
      .all()
      .then((studySheet) =>
        studySheet.map((record) => ({ ...record.fields, id: record.id }))
      );

  //The pipe needs to be divided in half because there is a maximum of 19 functions per pipe sadly.
  const outputFromFirstPipeHalf = await pipe(
    {
      allEstimates: allEstimatesUnformatted,
      allStudies: allStudiesUnformatted,
      vaccinationData: undefined,
      positiveCaseData: undefined,
      countryPopulationData: undefined,
      mongoClient
    },
    asyncEtlStep(fetchVaccinationDataStep),
    asyncEtlStep(fetchPositiveCaseDataStep),
    etlStep(fetchCountryPopulationDataStep),
    etlStep(validateFieldSetFromAirtableStep),
    etlStep(cleanFieldNamesAndRemoveUnusedFieldsStep),
    etlStep(removeRecordsThatAreFlaggedNotToSave),
    etlStep(combineEstimatesAndStudies),
    etlStep(filterStudiesThatDoNotMeetDataStructureRequirement),
    etlStep(transformNotReportedValuesToUndefinedStep),
    etlStep(parseDatesStep),
  );

  await pipe(
    outputFromFirstPipeHalf,
    etlStep(calculateSeroprevalenceStep),
    etlStep(addCountryAndRegionInformationStep),
    asyncEtlStep(latLngGenerationStep),
    etlStep(jitterPinLatLngStep),
    etlStep(addVaccinationDataToEstimateStep),
    etlStep(addPositiveCaseDataToEstimateStep),
    etlStep(addCountryPopulationDataToEstimateStep),
    etlStep(transformIntoFormatForDatabaseStep),
    asyncEtlStep(writeCountryDataToMongoDbStep),
    asyncEtlStep(writeEstimateDataToMongoDbStep),
  )

  console.log("Exiting");
  process.exit(1);
};

await runEtlMain().catch((error) => console.error(error));
