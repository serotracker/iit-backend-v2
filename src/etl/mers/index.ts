import { pipe } from "fp-ts/lib/function.js";
import { asyncEtlStep, etlStep, getEnvironmentVariableOrThrow, getMongoClient } from "../helpers.js";
import { ObjectId } from "mongodb";
import { FieldSet } from "airtable";
import { validateFieldSetFromAirtableStep } from "./steps/validate-field-set-from-airtable-step.js";
import { transformIntoFormatForDatabaseStep } from "./steps/transform-into-format-for-database-step.js";
import { writeEstimateDataToMongoDbStep } from "./steps/write-estimate-data-to-mongodb-step.js";
import { addCountryAndRegionInformationStep } from "./steps/add-country-and-region-information-step.js";
import { latLngGenerationStep } from "./steps/lat-lng-generation-step.js";
import { jitterPinLatLngStep } from "./steps/jitter-pin-lat-lng-step.js";

const runEtlMain = async () => {
  console.log("Running MERS ETL");
  //const airtableApiKey = getEnvironmentVariableOrThrow({
  //  key: "AIRTABLE_API_KEY",
  //});
  //const airtableMERSBaseId = getEnvironmentVariableOrThrow({
  //  key: "AIRTABLE_MERS_BASE_ID",
  //});

  const mongoUri = getEnvironmentVariableOrThrow({ key: "MONGODB_URI" });

  const mongoClient = await getMongoClient({ mongoUri });

  //const airtable = new Airtable({ apiKey: airtableApiKey });
  //const base = new Airtable.Base(airtable, airtableSC2BaseId);
  //const estimateSheet = base.table("...");

  //const allEstimatesUnformatted: (FieldSet & { id: string })[] =
  //  await estimateSheet
  //    .select()
  //    .all()
  //    .then((estimateSheet) =>
  //      estimateSheet.map((record) => ({ ...record.fields, id: record.id }))
  //    );

  const allEstimatesUnformatted: (FieldSet & { id: string })[] = Array(5).fill(0).map(() => ({ id: new ObjectId().toString() }))

  await pipe(
    {
      allEstimates: allEstimatesUnformatted,
      mongoClient
    },
    etlStep(validateFieldSetFromAirtableStep),
    etlStep(addCountryAndRegionInformationStep),
    asyncEtlStep(latLngGenerationStep),
    etlStep(jitterPinLatLngStep),
    etlStep(transformIntoFormatForDatabaseStep),
    asyncEtlStep(writeEstimateDataToMongoDbStep) 
  );

  console.log("Exiting");
  process.exit(1);
};

await runEtlMain().catch((error) => console.error(error));
