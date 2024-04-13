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

const runEtlMain = async () => {
  console.log("Running SarsCoV-2 ETL");
  const airtableApiKey = getEnvironmentVariableOrThrow({
    key: "AIRTABLE_API_KEY",
  });
  const airtableArboBaseId = getEnvironmentVariableOrThrow({
    key: "AIRTABLE_SARSCOV2_BASE_ID",
  });
  const mongoUri = getEnvironmentVariableOrThrow({ key: "MONGODB_URI" });
  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  const mongoClient = await getMongoClient({ mongoUri });

  const airtable = new Airtable({ apiKey: airtableApiKey });
  const base = new Airtable.Base(airtable, airtableArboBaseId);
  const estimateSheet = base.table("Rapid Review: Estimates");

  const allEstimatesUnformatted: (FieldSet & { id: string })[] =
    await estimateSheet
      .select()
      .all()
      .then((estimateSheet) =>
        estimateSheet.map((record) => ({ ...record.fields, id: record.id }))
      );

  const { allEstimates } = await pipe(
    {
      allEstimates: allEstimatesUnformatted,
    },
    etlStep(validateFieldSetFromAirtableStep),
    etlStep(cleanFieldNamesAndRemoveUnusedFieldsStep),
    etlStep(removeRecordsThatAreFlaggedNotToSave),
    etlStep(filterStudiesThatDoNotMeetDataStructureRequirement),
    etlStep(transformNotReportedValuesToUndefinedStep),
    etlStep(parseDatesStep),
    asyncEtlStep(latLngGenerationStep),
    etlStep(jitterPinLatLngStep),
    etlStep(transformIntoFormatForDatabaseStep),
  );

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: "sarsCov2Estimates",
    data: allEstimates,
    mongoClient,
  });

  console.log("Exiting");
  process.exit(1);
};

await runEtlMain().catch((error) => console.error(error));
