import { CsvTeamMemberFieldsAfterMarkingAlumniStep } from "./mark-alumni-step.js";

export type CsvTeamMemberFieldsAfterFilteringInvalidTeamMembersStep =
  CsvTeamMemberFieldsAfterMarkingAlumniStep;

interface FilterInvalidTeamMembersStepInput {
  allTeamMembers: CsvTeamMemberFieldsAfterMarkingAlumniStep[];
}

interface FilterInvalidTeamMembersStepOutput {
  allTeamMembers: CsvTeamMemberFieldsAfterFilteringInvalidTeamMembersStep[];
}

export const filterInvalidTeamMembers = (
  input: FilterInvalidTeamMembersStepInput
): FilterInvalidTeamMembersStepOutput => {
  console.log(
    `Running step: filterInvalidTeamMembers. Remaining team members: ${input.allTeamMembers.length}`
  );

  const allTeamMembers = input.allTeamMembers.filter(
    (teamMember) =>
      teamMember.teams.length > 0 && !teamMember.teams.includes("NOT_SPECIFIED")
  );

  return { allTeamMembers };
};
