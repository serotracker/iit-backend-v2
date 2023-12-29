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

const runEtlMain = async () => {
  console.log("Running ETL");
  const airtableApiKey = process.env.AIRTABLE_API_KEY;
  const airtableArboBaseId = process.env.AIRTABLE_ARBO_BASE_ID;
  const mongoUrl = process.env.MONGODB_URI;
  const databaseName = process.env.DATABASE_NAME;

  if (!airtableApiKey || airtableApiKey === "PLEASE_SPECIFY") {
    console.log(
      "Unable to find value for AIRTABLE_API_KEY. Please make sure you have specified one in your .env file."
    );
    console.log("Exiting early, database was not modified.");
    process.exit(1);
  }

  if (!mongoUrl || mongoUrl === "PLEASE_SPECIFY") {
    console.log(
      "Unable to find value for MONGODB_URI. Please make sure you have specified one in your .env file."
    );
    console.log("Exiting early, database was not modified.");
    process.exit(1);
  }

  if (!databaseName || databaseName === "PLEASE_SPECIFY") {
    console.log(
      "Unable to find value for DATABASE_NAME. Please make sure you have specified one in your .env file."
    );
    console.log("Exiting early, database was not modified.");
    process.exit(1);
  }

  if (!airtableArboBaseId || airtableArboBaseId === "PLEASE_SPECIFY") {
    console.log(
      "Unable to find value for AIRTABLE_ARBO_BASE_ID. Please make sure you have specified one in your .env file."
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

  const { allEstimates, allSources: _ } = transformIntoFormatForDatabaseStep(
    jitterPinLatLngStep(
      await latLngGenerationStep(
        mergeEstimatesAndSourcesStep(
          removeRecordsThatAreFlaggedToNotSaveStep(
            removeEstimatesWithLowSampleSizeStep(
              parseDatesStep(
                assertMandatoryFieldsArePresentStep(
                  transformNotReportedValuesToUndefinedStep(
                    cleanSingleElementArrayFieldsStep(
                      cleanFieldNamesAndRemoveUnusedFieldsStep({
                        allEstimates: allEstimatesUnformatted,
                        allSources: allSourcesUnformatted,
                      })
                    )
                  )
                )
              )
            )
          )
        )
      )
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
