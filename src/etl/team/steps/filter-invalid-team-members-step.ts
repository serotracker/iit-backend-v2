import {
  TeamMemberFieldsAfterMarkingAlumniStep,
  TeamSortOrderEntryFieldsAfterMarkingAlumniStep
} from "./mark-alumni-step.js";

export type TeamMemberFieldsAfterFilteringInvalidTeamMembersStep = Omit<TeamMemberFieldsAfterMarkingAlumniStep, 'firstName'|'lastName'> & {
  firstName: NonNullable<TeamMemberFieldsAfterMarkingAlumniStep['firstName']>,
  lastName: NonNullable<TeamMemberFieldsAfterMarkingAlumniStep['lastName']>,
};
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

  const allTeamMembers = input.allTeamMembers
    .filter((teamMember) => teamMember.teams.length > 0)
    .filter((teamMember): teamMember is Omit<typeof teamMember, 'firstName'|'lastName'> & {
      firstName: NonNullable<typeof teamMember['firstName']>;
      lastName: NonNullable<typeof teamMember['lastName']>;
    } => !!teamMember.firstName && !!teamMember.lastName);

  return { allTeamMembers, teamSortOrder: input.teamSortOrder };
};
