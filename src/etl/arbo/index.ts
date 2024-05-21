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

const runEtlMain = async () => {
  console.log("Running arbo ETL");
  const airtableApiKey = getEnvironmentVariableOrThrow({ key: "AIRTABLE_API_KEY" });
  const airtableArboBaseId = getEnvironmentVariableOrThrow({ key: "AIRTABLE_ARBO_BASE_ID" });
  const mongoUri = getEnvironmentVariableOrThrow({ key: "MONGODB_URI" });
  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

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

  const { allEstimates } = await (
    pipe(
      {
        allEstimates: allEstimatesUnformatted,
        allSources: allSourcesUnformatted,
        allCountries: allCountries,
        mongoClient
      },
      etlStep(validateFieldSetFromAirtableStep),
      etlStep(cleanFieldNamesAndRemoveUnusedFieldsStep),
      etlStep(cleanSingleElementArrayFieldsStep),
      etlStep(transformNotReportedValuesToUndefinedStep),
      etlStep(assertMandatoryFieldsArePresentStep),
      etlStep(parseDatesStep),
      etlStep(removeEstimatesWithLowSampleSizeStep),
      etlStep(removeRecordsThatAreFlaggedToNotSaveStep),
      etlStep(addCountryAndRegionInformationStep),
      etlStep(mergeEstimatesAndSourcesStep),
      asyncEtlStep(latLngGenerationStep),
      etlStep(jitterPinLatLngStep),
      etlStep(transformIntoFormatForDatabaseStep)
    )
  );

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: "arbovirusEstimates",
    data: allEstimates,
    mongoClient
  })

  console.log("Exiting")
  process.exit(1)
};

await runEtlMain().catch((error) => console.error(error));
