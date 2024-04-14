import { TeamMemberFieldsAfterConsolidatingIntoArrayFieldsStep, TeamSortOrderEntryFieldsAfterConsolidatingIntoArrayFieldsStep } from "./consolidate-into-array-fields-step.js";

export type TeamMemberFieldsAfterMarkingAlumniStep = TeamMemberFieldsAfterConsolidatingIntoArrayFieldsStep;
export type TeamSortOrderEntryFieldsAfterMarkingAlumniStep = TeamSortOrderEntryFieldsAfterConsolidatingIntoArrayFieldsStep;

interface MarkAlumniStepInput {
  allTeamMembers: TeamMemberFieldsAfterConsolidatingIntoArrayFieldsStep[];
  teamSortOrder: TeamSortOrderEntryFieldsAfterConsolidatingIntoArrayFieldsStep[];
}

interface MarkAlumniStepOutput {
  allTeamMembers: TeamMemberFieldsAfterMarkingAlumniStep[];
  teamSortOrder: TeamSortOrderEntryFieldsAfterMarkingAlumniStep[];
}

export const markAlumniStep = (
  input: MarkAlumniStepInput
): MarkAlumniStepOutput => {
  console.log(
    `Running step: markAlumniStep. Remaining team members: ${input.allTeamMembers.length}`
  );

  const allTeamMembers = input.allTeamMembers.map((teamMember) => {
    if(teamMember.active) {
      return teamMember;
    }

    return {
      ...teamMember,
      teams: ["SeroTracker Alumni"]
    }
  });

  return {
    allTeamMembers,
    teamSortOrder: input.teamSortOrder
  };
};
