import { CsvTeamMemberFields } from "../types.js";

export interface CsvTeamMemberFieldsAfterCleaningFieldNamesStep {
  firstName: string;
  lastName: string;
  teamIdOne: string | undefined;
  teamIdTwo: string | undefined;
  teamIdThree: string | undefined;
  active: boolean;
  hidden: boolean;
  email: string | undefined;
  twitterUrl: string | undefined;
  linkedinUrl: string | undefined;
  affiliationOne: string | undefined;
  affiliationTwo: string | undefined;
  affiliationThree: string | undefined;
}

interface CleanFieldNamesAndRemoveUnusedFieldsStepInput {
  allTeamMembers: CsvTeamMemberFields[];
}

interface CleanFieldNamesAndRemoveUnusedFieldsStepOutput {
  allTeamMembers: CsvTeamMemberFieldsAfterCleaningFieldNamesStep[];
}

export const cleanFieldNamesAndRemoveUnusedFieldsStep = (input: CleanFieldNamesAndRemoveUnusedFieldsStepInput): CleanFieldNamesAndRemoveUnusedFieldsStepOutput => {
  const allTeamMembers = input.allTeamMembers.map((teamMember) => ({
    firstName: teamMember["First Name"],
    lastName: teamMember["Last Name"],
    teamIdOne: teamMember["Team ID 1"],
    teamIdTwo: teamMember["Team ID 2"],
    teamIdThree: teamMember["Team ID 3"],
    active: teamMember["Active? (Y/N)"] === "Y" ? true : false,
    hidden: teamMember["Shown in about page? (Y/N)"] === "Y" ? false : true,
    email: teamMember["Email"],
    twitterUrl: teamMember["Twitter URL"],
    linkedinUrl: teamMember["Linkedin URL"],
    affiliationOne: teamMember["Affiliation 1"],
    affiliationTwo: teamMember["Affiliation 2"],
    affiliationThree: teamMember["Affiliation 3"]
  }))

  return { allTeamMembers };
}