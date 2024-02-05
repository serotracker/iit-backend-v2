import { ObjectId } from "mongodb";
import { TeamMemberDocument } from "../../../storage/types.js";
import {
  TeamMemberFieldsAfterFilteringInvalidTeamMembersStep,
  TeamSortOrderEntryFieldsAfterFilteringInvalidTeamMembersStep
} from "./filter-invalid-team-members-step.js";

type TeamSortOrderEntryFieldsAfterFormattingForDatabaseStep = TeamSortOrderEntryFieldsAfterFilteringInvalidTeamMembersStep;

interface TransformIntoFormatForDatabaseStepInput {
  allTeamMembers: TeamMemberFieldsAfterFilteringInvalidTeamMembersStep[];
  teamSortOrder: TeamSortOrderEntryFieldsAfterFilteringInvalidTeamMembersStep[];
}

interface TransformIntoFormatForDatabaseStepOutput {
  allTeamMembers: TeamMemberDocument[];
  teamSortOrder: TeamSortOrderEntryFieldsAfterFormattingForDatabaseStep[];
}

export const transformIntoFormatForDatabaseStep = (
  input: TransformIntoFormatForDatabaseStepInput
): TransformIntoFormatForDatabaseStepOutput => {
  console.log(
    `Running step: transformIntoFormatForDatabaseStep. Remaining team members: ${input.allTeamMembers.length}`
  );

  const createdAtForAllRecords = new Date();
  const updatedAtForAllRecords = createdAtForAllRecords;
  const largestTeamSortOrder = Math.max(...input.teamSortOrder.map((teamSortOrderEntry) => teamSortOrderEntry.sortOrder));

  const allTeamMembers = input.allTeamMembers.map((teamMember) => ({
    _id: new ObjectId(),
    firstName: teamMember.firstName,
    lastName: teamMember.lastName,
    email: !!teamMember.email ? teamMember.email : undefined,
    twitterUrl: teamMember.twitterUrl ? teamMember.twitterUrl : undefined,
    linkedinUrl: teamMember.linkedinUrl ? teamMember.linkedinUrl : undefined,
    teams: teamMember.teams.map((team) => {
      const teamSortOrderEntry = input.teamSortOrder.find((teamSortOrderEntry) => teamSortOrderEntry.team === team);

      return {
        label: team,
        sortOrder: teamSortOrderEntry ? teamSortOrderEntry.sortOrder : largestTeamSortOrder + 1
      }
    }),
    affiliations: teamMember.affiliations.map((affiliation) => ({
      label: affiliation,
    })),
    createdAt: createdAtForAllRecords,
    updatedAt: updatedAtForAllRecords,
  }));

  return { allTeamMembers, teamSortOrder: input.teamSortOrder };
};
