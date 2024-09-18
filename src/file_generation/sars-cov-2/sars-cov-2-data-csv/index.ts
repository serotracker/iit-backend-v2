import Airtable, { FieldSet } from "airtable";
import { etlStep, getEnvironmentVariableOrThrow } from "../../../etl/helpers.js";
import { pipe } from "fp-ts/lib/function.js";
import { validateEstimatesFromAirtableStep } from "./steps/validate-estimates-from-airtable-step.js";
import { cleanEstimatesFromAirtableStep } from "./steps/clean-estimates-from-airtable-step.js";
import { writeEstimatesToCsvStep } from "./steps/write-estimates-to-csv-step.js";
import { filterEstimatesWhichDontMeetDataStructureRequirements } from "./steps/filter-estimates-which-dont-meet-data-structure-requirements.js";
import { cleanBadValuesFromEstimatesStep } from "./steps/clean-bad-values-from-estimates-step.js";

const generateSarsCov2DataCsv = async () => {
  console.log("Generating SarsCov2 Data CSV");

  const airtableApiKey = getEnvironmentVariableOrThrow({
    key: "AIRTABLE_API_KEY",
  });
  const airtableSC2BaseId = getEnvironmentVariableOrThrow({
    key: "AIRTABLE_SARSCOV2_BASE_ID",
  });

  const airtable = new Airtable({ apiKey: airtableApiKey });
  const base = new Airtable.Base(airtable, airtableSC2BaseId);
  const estimateSheet = base.table("Rapid Review: Estimates");

  const allEstimatesUnformatted: (FieldSet & { id: string })[] =
    await estimateSheet
      .select()
      .all()
      .then((estimateSheet) =>
        estimateSheet.map((record) => ({ ...record.fields, id: record.id }))
      );

  pipe(
    {
      allEstimates: allEstimatesUnformatted,
    },
    etlStep(validateEstimatesFromAirtableStep),
    etlStep(cleanEstimatesFromAirtableStep),
    etlStep(cleanBadValuesFromEstimatesStep),
    etlStep(filterEstimatesWhichDontMeetDataStructureRequirements),
    etlStep(writeEstimatesToCsvStep)
  );

  console.log("Exiting");
  process.exit(1);
}

await generateSarsCov2DataCsv().catch((error) => console.error(error));