import { CsvTeamMemberFieldsAfterCleaningFieldNamesStep } from "./clean-field-names-and-remove-unused-fields-step.js";

export type CsvTeamMemberFieldsAfterConsolidatingIntoArrayFieldsStep = Omit<
  CsvTeamMemberFieldsAfterCleaningFieldNamesStep,
  | "teamIdOne"
  | "teamIdTwo"
  | "teamIdThree"
  | "affiliationOne"
  | "affiliationTwo"
  | "affiliationThree"
> & {
  teams: string[];
  affiliations: string[];
};

interface ConsolidateIntoArrayFieldsStepInput {
  allTeamMembers: CsvTeamMemberFieldsAfterCleaningFieldNamesStep[];
}

interface ConsolidateIntoArrayFieldsStepOutput {
  allTeamMembers: CsvTeamMemberFieldsAfterConsolidatingIntoArrayFieldsStep[];
}

export const consolidateIntoArrayFields = (
  input: ConsolidateIntoArrayFieldsStepInput
): ConsolidateIntoArrayFieldsStepOutput => {
  const allTeamMembers = input.allTeamMembers.map((fullTeamMember) => {
    const {
      teamIdOne,
      teamIdTwo,
      teamIdThree,
      affiliationOne,
      affiliationTwo,
      affiliationThree,
      ...teamMember
    } = fullTeamMember;

    return {
      ...teamMember,
      teams: [teamIdOne, teamIdTwo, teamIdThree].filter(<T>(team: T | undefined): team is T => !!team),
      affiliations: [affiliationOne, affiliationTwo, affiliationThree].filter(<T>(affiliation: T | undefined): affiliation is T => !!affiliation)
    };
  });

  return { allTeamMembers };
};
