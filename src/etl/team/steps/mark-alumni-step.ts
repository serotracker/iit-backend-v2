import { CsvTeamMemberFieldsAfterConsolidatingIntoArrayFieldsStep } from "./consolidate-into-array-fields-step.js";

export type CsvTeamMemberFieldsAfterMarkingAlumniStep = CsvTeamMemberFieldsAfterConsolidatingIntoArrayFieldsStep;

interface MarkAlumniStepInput {
  allTeamMembers: CsvTeamMemberFieldsAfterConsolidatingIntoArrayFieldsStep[];
}

interface MarkAlumniStepOutput {
  allTeamMembers: CsvTeamMemberFieldsAfterMarkingAlumniStep[];
}

export const markAlumniStep = (
  input: MarkAlumniStepInput
): MarkAlumniStepOutput => {
  const allTeamMembers = input.allTeamMembers.map((teamMember) => {
    if(teamMember.active) {
      return teamMember;
    }

    return {
      ...teamMember,
      teams: ["Alumni"]
    }
  });

  return { allTeamMembers };
};
