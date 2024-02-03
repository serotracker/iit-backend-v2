import {
  TeamMemberFieldsAfterMarkingAlumniStep,
  TeamSortOrderEntryFieldsAfterMarkingAlumniStep
} from "./mark-alumni-step.js";

export type TeamMemberFieldsAfterFilteringInvalidTeamMembersStep =
  TeamMemberFieldsAfterMarkingAlumniStep;
export type TeamSortOrderEntryFieldsAfterFilteringInvalidTeamMembersStep =
  TeamSortOrderEntryFieldsAfterMarkingAlumniStep;

interface FilterInvalidTeamMembersStepInput {
  allTeamMembers: TeamMemberFieldsAfterMarkingAlumniStep[];
  teamSortOrder: TeamSortOrderEntryFieldsAfterMarkingAlumniStep[];
}

interface FilterInvalidTeamMembersStepOutput {
  allTeamMembers: TeamMemberFieldsAfterFilteringInvalidTeamMembersStep[];
  teamSortOrder: TeamSortOrderEntryFieldsAfterFilteringInvalidTeamMembersStep[];
}

export const filterInvalidTeamMembers = (
  input: FilterInvalidTeamMembersStepInput
): FilterInvalidTeamMembersStepOutput => {
  console.log(
    `Running step: filterInvalidTeamMembers. Remaining team members: ${input.allTeamMembers.length}`
  );

  const allTeamMembers = input.allTeamMembers.filter((teamMember) => teamMember.teams.length > 0);

  return { allTeamMembers, teamSortOrder: input.teamSortOrder };
};
