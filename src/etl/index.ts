import Airtable from "airtable";
import { MongoClient } from "mongodb";
import { AirtableEstimateFields, AirtableSourceFields } from "./types";
import { cleanFieldNamesAndRemoveUnusedFieldsStep } from "./steps/clean-field-names-and-remove-unused-fields-step";
import { cleanSingleElementArrayFieldsStep } from "./steps/clean-single-element-array-fields-step";
import { parseDatesStep } from "./steps/parse-dates-step";
import { removeEstimatesWithLowSampleSizeStep } from "./steps/remove-estimates-with-low-sample-size-step";
import { mergeEstimatesAndSourcesStep } from "./steps/merge-estimates-and-sources-step";
import { latLngGenerationStep } from "./steps/lat-lng-generation-step";
import { removeRecordsThatAreFlaggedToNotSaveStep } from "./steps/remove-records-that-are-flagged-to-not-save-step";
import { jitterPinLatLngStep } from "./steps/jitter-pin-lat-lng-step";
import { transformIntoFormatForDatabaseStep } from "./steps/transform-into-format-for-database-step";

const runEtlMain = async () => {
  console.log("Running ETL");
  const airtableApiKey = process.env.AIRTABLE_API_KEY;
  const airtableArboBaseId = process.env.AIRTABLE_ARBO_BASE_ID;
  const mongoUrl = process.env.MONGO_URL;

  if (!airtableApiKey) {
    console.log(
      "Unable to find value for AIRTABLE_API_KEY. Please make sure you have specified one in your .env file."
    );
    console.log("Exiting early, database was not modified.");
    return;
  }

  if (!mongoUrl) {
    console.log(
      "Unable to find value for MONGO_URL. Please make sure you have specified one in your .env file."
    );
    console.log("Exiting early, database was not modified.");
    return;
  }

  if (!airtableArboBaseId) {
    console.log(
      "Unable to find value for AIRTABLE_ARBO_BASE_ID. Please make sure you have specified one in your .env file."
    );
    console.log("Exiting early, database was not modified.");
    return;
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

  const { allEstimates, allSources } = transformIntoFormatForDatabaseStep(
    jitterPinLatLngStep(
      await latLngGenerationStep(
        mergeEstimatesAndSourcesStep(
          removeRecordsThatAreFlaggedToNotSaveStep(
            removeEstimatesWithLowSampleSizeStep(
              parseDatesStep(
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
  );

  if (allEstimates.length > 0) {
    console.log("Unable to find any estimates to insert.");
    console.log("Exiting early, database was not modified.");
    return;
  }

  await mongoClient
    .db("serotracker")
    .collection("arbovirusEstimates")
    .insertMany(allEstimates);

  console.log("Inserted data into database.");

  await mongoClient
    .db("serotracker")
    .collection("arbovirusEstimates")
    .deleteMany({ createdAt: { $ne: allEstimates[0].createdAt } });

  console.log("Cleared old data from database.");
};

runEtlMain().catch((error) => console.error(error));
