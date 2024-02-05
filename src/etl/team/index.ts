import { pipe } from "fp-ts/lib/function.js";
import { etlStep, getEnvironmentVariableOrThrow, getMongoClient, writeDataToMongoEtlStep } from "../helpers.js";
import { cleanFieldNamesAndRemoveUnusedFieldsStep } from "./steps/clean-field-names-and-remove-unused-fields-step.js";
import { consolidateIntoArrayFields } from "./steps/consolidate-into-array-fields-step.js";
import { markAlumniStep } from "./steps/mark-alumni-step.js";
import { filterInvalidTeamMembers } from "./steps/filter-invalid-team-members-step.js";
import { transformIntoFormatForDatabaseStep } from "./steps/transform-into-format-for-database-step.js";
import Airtable from "airtable";
import { validateFieldSetFromAirtableStep } from "./steps/validate-field-set-from-airtable-step.js";

const runEtlMain = async () => {
  console.log("Running team member ETL");
  const airtableApiKey = getEnvironmentVariableOrThrow({ key: "AIRTABLE_API_KEY" });
  const airtableEmployeeBaseId = getEnvironmentVariableOrThrow({ key: "AIRTABLE_EMPLOYEE_BASE_ID" });
  const mongoUri = getEnvironmentVariableOrThrow({ key: "MONGODB_URI" });
  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  const mongoClient = await getMongoClient({ mongoUri });

  const airtable = new Airtable({ apiKey: airtableApiKey });
  const base = new Airtable.Base(airtable, airtableEmployeeBaseId);

  const publicContributorInformationSheet = base.table(
    "Public Contributor Information"
  );
  const teamSortOrderSheet = base.table(
    "Team Sort Order"
  );

  const allTeamMembersUnformatted = await publicContributorInformationSheet
    .select()
    .all()
    .then((teamMembers) => teamMembers.map((teamMember) => teamMember.fields));
  const teamSortOrderUnformatted = await teamSortOrderSheet
    .select()
    .all()
    .then((teamSortOrder) => teamSortOrder.map((teamSortOrderEntry) => teamSortOrderEntry.fields));

  const { allTeamMembers } = await (
    pipe(
      {
        allTeamMembers: allTeamMembersUnformatted,
        teamSortOrder: teamSortOrderUnformatted
      },
      etlStep(validateFieldSetFromAirtableStep),
      etlStep(cleanFieldNamesAndRemoveUnusedFieldsStep),
      etlStep(consolidateIntoArrayFields),
      etlStep(markAlumniStep),
      etlStep(filterInvalidTeamMembers),
      etlStep(transformIntoFormatForDatabaseStep),
    )
  );

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: "teamMembers",
    data: allTeamMembers,
    mongoClient
  })

  console.log("Exiting")
  process.exit(1)
};

await runEtlMain().catch((error) => console.error(error));
