import Airtable from "airtable";
import { MongoClient } from "mongodb";
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
import { pipe } from "fp-ts/lib/function.js";

const asyncEtlStep = <TFunctionInput, TFunctionOutput>(stepFunction: (input: TFunctionInput) => Promise<TFunctionOutput>) => {
  const returnFunction: (inputPromise: Promise<TFunctionInput> | TFunctionInput) => Promise<TFunctionOutput> = async (inputPromise) => {
    const input = await Promise.resolve(inputPromise);
    return stepFunction(input);
  }

  return returnFunction;
}

const etlStep = <TFunctionInput, TFunctionOutput>(stepFunction: (input: TFunctionInput) => TFunctionOutput) => {
  const returnFunction: (inputPromise: Promise<TFunctionInput> | TFunctionInput) => Promise<TFunctionOutput> = async (inputPromise) => {
    const input = await Promise.resolve(inputPromise);
    return stepFunction(input);
  }

  return returnFunction;
}

const runEtlMain = async () => {
  console.log("Running ETL");
  const airtableApiKey = process.env.AIRTABLE_API_KEY;
  const airtableArboBaseId = process.env.AIRTABLE_ARBO_BASE_ID;
  const mongoUrl = process.env.MONGODB_URI;
  const databaseName = process.env.DATABASE_NAME;

  if (!airtableApiKey || airtableApiKey === "PLEASE_SPECIFY") {
    console.log(
      "Unable to find value for AIRTABLE_API_KEY. Please make sure you have run generate-env-files.sh and have specified a value for AIRTABLE_API_KEY in the appropriate environment file."
    );
    console.log("Exiting early, database was not modified.");
    process.exit(1);
  }

  if (!mongoUrl || mongoUrl === "PLEASE_SPECIFY") {
    console.log(
      "Unable to find value for MONGODB_URI. Please make sure you have run generate-env-files.sh and have specified a value for MONGODB_URI in the appropriate environment file."
    );
    console.log("Exiting early, database was not modified.");
    process.exit(1);
  }

  if (!databaseName || databaseName === "PLEASE_SPECIFY") {
    console.log(
      "Unable to find value for DATABASE_NAME. Please make sure you have run generate-env-files.sh and have specified a value for DATABASE_NAME in the appropriate environment file."
    );
    console.log("Exiting early, database was not modified.");
    process.exit(1);
  }

  if (!airtableArboBaseId || airtableArboBaseId === "PLEASE_SPECIFY") {
    console.log(
      "Unable to find value for AIRTABLE_ARBO_BASE_ID. Please make sure you have run generate-env-files.sh and have specified a value for AIRTABLE_ARBO_BASE_ID in the appropriate environment file."
    );
    console.log("Exiting early, database was not modified.");
    process.exit(1);
  }

  const mongoClient = new MongoClient(mongoUrl);

  await mongoClient.connect();

  const airtable = new Airtable({ apiKey: airtableApiKey });
  const base = new Airtable.Base(airtable, airtableArboBaseId);
  const estimateSheet = base.table<Omit<AirtableEstimateFields, "id">>(
    "Study/Estimate Sheet"
  );
  const sourceSheet =
    base.table<Omit<AirtableSourceFields, "id">>("Source Sheet");

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

  const { allEstimates, allSources: _ } = await (
    pipe(
      {
        allEstimates: allEstimatesUnformatted,
        allSources: allSourcesUnformatted,
      },
      etlStep(cleanFieldNamesAndRemoveUnusedFieldsStep),
      etlStep(cleanSingleElementArrayFieldsStep),
      etlStep(transformNotReportedValuesToUndefinedStep),
      etlStep(assertMandatoryFieldsArePresentStep),
      etlStep(parseDatesStep),
      etlStep(removeEstimatesWithLowSampleSizeStep),
      etlStep(removeRecordsThatAreFlaggedToNotSaveStep),
      etlStep(mergeEstimatesAndSourcesStep),
      asyncEtlStep(latLngGenerationStep),
      etlStep(jitterPinLatLngStep),
      etlStep(transformIntoFormatForDatabaseStep)
    )
  );

  if (allEstimates.length === 0) {
    console.log("Unable to find any estimates to insert.");
    console.log("Exiting early, database was not modified.");
    process.exit(1);
  }

  const { insertedCount } = await mongoClient
    .db(databaseName)
    .collection("arbovirusEstimates")
    .insertMany(allEstimates);

  console.log(`Inserted ${insertedCount} records into the database.`);

  if(insertedCount === 0) {
    console.log("Not deleting data because no records were inserted. Please investigate.")
    console.log("Exiting early.");
    process.exit(1);
  }

  const { deletedCount } = await mongoClient
    .db(databaseName)
    .collection("arbovirusEstimates")
    .deleteMany({ createdAt: { $ne: allEstimates[0].createdAt } });

  console.log(`Cleared ${deletedCount} records from the database.`);

  console.log("Exiting")
  process.exit(1)
};

await runEtlMain().catch((error) => console.error(error));
