import Airtable, { FieldSet } from "airtable";
import { pipe } from "fp-ts/lib/function.js";
import { AirtableEstimateFields, AirtableSourceFields } from "./types.js";
import { cleanFieldNamesAndRemoveUnusedFieldsStep } from "./steps/clean-field-names-and-remove-unused-fields-step.js";
import { cleanSingleElementArrayFieldsStep } from "./steps/clean-single-element-array-fields-step.js";
import { parseDatesStep } from "./steps/parse-dates-step.js";
import { removeEstimatesWithLowSampleSizeStep } from "./steps/remove-estimates-with-low-sample-size-step.js";
import { mergeEstimatesAndSourcesStep } from "./steps/merge-estimates-and-sources-step.js";
import { latLngGenerationStep } from "./steps/lat-lng-generation-step.js";
import { removeRecordsThatAreFlaggedToNotSaveStep } from "./steps/remove-records-that-are-flagged-to-not-save-step.js";
import { jitterPinLatLngStep } from "./steps/jitter-pin-lat-lng-step.js";
import { transformIntoFormatForDatabaseStep } from "./steps/transform-into-format-for-database-step.js";
import { assertMandatoryFieldsArePresentStep } from "./steps/assert-mandatory-fields-are-present-step.js";
import { transformNotReportedValuesToUndefinedStep } from "./steps/transform-not-reported-values-to-undefined-step.js";
import { addCountryAndRegionInformationStep } from "./steps/add-country-and-region-information-step.js";
import { asyncEtlStep, etlStep, getEnvironmentVariableOrThrow, getMongoClient, writeDataToMongoEtlStep } from "../helpers.js";
import { validateFieldSetFromAirtableStep } from "./steps/validate-field-set-from-airtable-step.js";
import { fetchEnvironmentalSuitabilityStatsByCountryStep } from "./steps/fetch-environmental-suitability-stats-by-country-step.js";
import { writeEstimatesToMongoDbStep } from "./steps/write-estimates-to-mongodb-step.js";
import { writeEnvironmentalSuitabilityStatsByCountryToMongoDbStep } from "./steps/write-enviromental-suitability-stats-by-country-to-mongodb-step.js";
import { assignEstimateTypesStep } from "./steps/assign-estimate-types-step.js";
import { groupEstimatesUnderPrimaryEstimateStep } from "./steps/group-estimates-under-primary-estimate-step.js";
import { writeGroupedEstimatesToMongoDbStep } from "./steps/write-grouped-estimates-to-mongodb-step.js";
import { assignPartitionKeysToGroupedEstimatesStep } from "./steps/assign-partition-keys-to-grouped-estimates-step.js";
import { unravelGroupedEstimatesStep } from "./steps/unravel-grouped-estimates-step.js";
import { assignPartitionKeysToUnravelledGroupedEstimatesStep } from "./steps/assign-partition-keys-to-unravelled-grouped-estimates-step.js";
import { writeUnravelledGroupedEstimatesToMongoDbStepOutput } from "./steps/write-unravelled-grouped-estimates-to-mongodb-step.js";

const runEtlMain = async () => {
  console.log("Running arbo ETL");
  const airtableApiKey = getEnvironmentVariableOrThrow({ key: "AIRTABLE_API_KEY" });
  const airtableArboBaseId = getEnvironmentVariableOrThrow({ key: "AIRTABLE_ARBO_BASE_ID" });
  const mongoUri = getEnvironmentVariableOrThrow({ key: "MONGODB_URI" });

  const mongoClient = await getMongoClient({ mongoUri });

  const airtable = new Airtable({ apiKey: airtableApiKey });
  const base = new Airtable.Base(airtable, airtableArboBaseId);
  const estimateSheet = base.table<Omit<AirtableEstimateFields, "id">>(
    "Study/Estimate Sheet"
  );
  const sourceSheet =
    base.table<Omit<AirtableSourceFields, "id">>("Source Sheet");
  const countrySheet =
    base.table<Omit<FieldSet, "id">>("Selectable Countries & Territories");

  const allEstimatesUnformatted = await estimateSheet
    .select()
    .all()
    .then((estimateSheet) =>
      estimateSheet.map(
        (record) =>
          ({ ...record.fields, id: record["id"] }) as AirtableEstimateFields
      )
    );
  const allSourcesUnformatted = await sourceSheet
    .select()
    .all()
    .then((sourceSheet) =>
      sourceSheet.map(
        (record) =>
          ({ ...record.fields, id: record["id"] }) as AirtableSourceFields
      )
    );
  
  const allCountries: Array<FieldSet & {id: string}> = await countrySheet
    .select()
    .all()
    .then((sourceSheet) =>
      sourceSheet.map(
        (record) =>
          ({ ...record.fields, id: record["id"] })
      )
    );

  const resultOfFirstHalfOfPipe = await
    pipe(
      {
        allEstimates: allEstimatesUnformatted,
        allSources: allSourcesUnformatted,
        allCountries: allCountries,
        environmentalSuitabilityStatsByCountry: [],
        groupedEstimates: [],
        unravelledGroupedEstimates: [],
        mongoClient
      },
      etlStep(validateFieldSetFromAirtableStep),
      etlStep(fetchEnvironmentalSuitabilityStatsByCountryStep),
      etlStep(cleanFieldNamesAndRemoveUnusedFieldsStep),
      etlStep(cleanSingleElementArrayFieldsStep),
      etlStep(transformNotReportedValuesToUndefinedStep),
      etlStep(assertMandatoryFieldsArePresentStep),
      etlStep(assignEstimateTypesStep),
      etlStep(parseDatesStep),
      etlStep(removeEstimatesWithLowSampleSizeStep),
      etlStep(removeRecordsThatAreFlaggedToNotSaveStep),
      etlStep(addCountryAndRegionInformationStep),
    );

  await pipe(
    resultOfFirstHalfOfPipe,
    etlStep(mergeEstimatesAndSourcesStep),
    asyncEtlStep(latLngGenerationStep),
    etlStep(jitterPinLatLngStep),
    etlStep(groupEstimatesUnderPrimaryEstimateStep),
    etlStep(assignPartitionKeysToGroupedEstimatesStep),
    etlStep(unravelGroupedEstimatesStep),
    etlStep(assignPartitionKeysToUnravelledGroupedEstimatesStep),
    etlStep(transformIntoFormatForDatabaseStep),
    //asyncEtlStep(writeEstimatesToMongoDbStep),
    asyncEtlStep(writeEnvironmentalSuitabilityStatsByCountryToMongoDbStep),
    asyncEtlStep(writeGroupedEstimatesToMongoDbStep),
    asyncEtlStep(writeUnravelledGroupedEstimatesToMongoDbStepOutput)
  );

  console.log("Exiting")
  process.exit(1)
};

await runEtlMain().catch((error) => console.error(error));
