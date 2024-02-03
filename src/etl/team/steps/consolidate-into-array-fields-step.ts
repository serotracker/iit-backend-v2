import {
  TeamMemberFieldsAfterCleaningFieldNamesStep,
  TeamSortOrderEntryFieldsAfterCleaningFieldNamesStep
} from "./clean-field-names-and-remove-unused-fields-step.js";

export type TeamMemberFieldsAfterConsolidatingIntoArrayFieldsStep = Omit<
  TeamMemberFieldsAfterCleaningFieldNamesStep,
  | "affiliationOne"
  | "affiliationTwo"
  | "affiliationThree"
> & {
  affiliations: string[];
};

export type TeamSortOrderEntryFieldsAfterConsolidatingIntoArrayFieldsStep = TeamSortOrderEntryFieldsAfterCleaningFieldNamesStep;

interface ConsolidateIntoArrayFieldsStepInput {
  allTeamMembers: TeamMemberFieldsAfterCleaningFieldNamesStep[];
  teamSortOrder: TeamSortOrderEntryFieldsAfterCleaningFieldNamesStep[];
}

interface ConsolidateIntoArrayFieldsStepOutput {
  allTeamMembers: TeamMemberFieldsAfterConsolidatingIntoArrayFieldsStep[];
  teamSortOrder: TeamSortOrderEntryFieldsAfterConsolidatingIntoArrayFieldsStep[];
}

export const consolidateIntoArrayFields = (
  input: ConsolidateIntoArrayFieldsStepInput
): ConsolidateIntoArrayFieldsStepOutput => {
  console.log(
    `Running step: consolidateIntoArrayFields. Remaining team members: ${input.allTeamMembers.length}`
  );

  const allTeamMembers = input.allTeamMembers.map((fullTeamMember) => {
    const {
      affiliationOne,
      affiliationTwo,
      affiliationThree,
      ...teamMember
    } = fullTeamMember;

    return {
      ...teamMember,
      affiliations: [affiliationOne, affiliationTwo, affiliationThree].filter(<T>(affiliation: T | undefined): affiliation is T => !!affiliation)
    };
  });

  return {
    allTeamMembers,
    teamSortOrder: input.teamSortOrder
  };
};
