import { pipe } from "fp-ts/lib/function.js";
import csvtojson from "csvtojson";
import { etlStep, getEnvironmentVariableOrThrow, getMongoClient, writeDataToMongoEtlStep } from "../helpers.js";
import { CsvTeamMemberFields } from "./types.js";
import { cleanFieldNamesAndRemoveUnusedFieldsStep } from "./steps/clean-field-names-and-remove-unused-fields-step.js";
import { consolidateIntoArrayFields } from "./steps/consolidate-into-array-fields-step.js";
import { markAlumniStep } from "./steps/mark-alumni-step.js";
import { filterInvalidTeamMembers } from "./steps/filter-invalid-team-members-step.js";
import { transformIntoFormatForDatabaseStep } from "./steps/transform-into-format-for-database-step.js";

const runEtlMain = async () => {
  console.log("Running team member ETL");
  const mongoUri = getEnvironmentVariableOrThrow({ key: "MONGODB_URI" });
  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  const mongoClient = await getMongoClient({ mongoUri });

  const allTeamMembersUnformatted: CsvTeamMemberFields[] = await csvtojson().fromFile("./src/etl/team/team-members.csv");
  
  const { allTeamMembers } = await (
    pipe(
      {
        allTeamMembers: allTeamMembersUnformatted,
      },
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
