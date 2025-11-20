import { TeamMemberFieldsAfterValidatingFieldSetFromAirtableStep, TeamSortOrderEntryFieldsAfterValidatingFieldSetFromAirtableStep } from "./validate-field-set-from-airtable-step.js";

export interface TeamMemberFieldsAfterCleaningFieldNamesStep {
  firstName: string | undefined;
  lastName: string | undefined;
  teams: string[];
  active: boolean;
  hidden: boolean;
  email: string | undefined;
  twitterUrl: string | undefined;
  linkedinUrl: string | undefined;
  affiliationOne: string | undefined;
  affiliationTwo: string | undefined;
  affiliationThree: string | undefined;
  arbotrackerContributorFlag: boolean;
}

export interface TeamSortOrderEntryFieldsAfterCleaningFieldNamesStep {
  sortOrder: number;
  team: string;
}

interface CleanFieldNamesAndRemoveUnusedFieldsStepInput {
  allTeamMembers: TeamMemberFieldsAfterValidatingFieldSetFromAirtableStep[];
  teamSortOrder: TeamSortOrderEntryFieldsAfterValidatingFieldSetFromAirtableStep[];
}

interface CleanFieldNamesAndRemoveUnusedFieldsStepOutput {
  allTeamMembers: TeamMemberFieldsAfterCleaningFieldNamesStep[];
  teamSortOrder: TeamSortOrderEntryFieldsAfterCleaningFieldNamesStep[];
}

export const cleanFieldNamesAndRemoveUnusedFieldsStep = (input: CleanFieldNamesAndRemoveUnusedFieldsStepInput): CleanFieldNamesAndRemoveUnusedFieldsStepOutput => {
  console.log(
    `Running step: cleanFieldNamesAndRemoveUnusedFieldsStep. Remaining team members: ${input.allTeamMembers.length}`
  );

  const allTeamMembers = input.allTeamMembers.map((teamMember) => ({
    firstName: teamMember["First Name"],
    lastName: teamMember["Last Name"],
    teams: teamMember["Team"] ?? [],
    active: teamMember["Active? (Y/N)"] ?? false,
    hidden: teamMember["Shown in about page? (Y/N)"] ?? false,
    email: teamMember["Email"],
    twitterUrl: teamMember["Twitter URL"],
    linkedinUrl: teamMember["Linkedin URL"],
    affiliationOne: teamMember["Affiliation 1"],
    affiliationTwo: teamMember["Affiliation 2"],
    affiliationThree: teamMember["Affiliation 3"],
    arbotrackerContributorFlag: teamMember["ArboTracker"] ?? false
  }))

  const teamSortOrder = input.teamSortOrder.map((teamSortOrderEntry) => ({
    sortOrder: teamSortOrderEntry["Sort Order"],
    team: teamSortOrderEntry["Team"]
  }))

  return { allTeamMembers, teamSortOrder };
}