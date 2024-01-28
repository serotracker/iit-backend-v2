import { ObjectId } from "mongodb";
import { TeamMemberDocument } from "../../../storage/types.js";
import { CsvTeamMemberFieldsAfterFilteringInvalidTeamMembersStep } from "./filter-invalid-team-members-step.js";

interface TransformIntoFormatForDatabaseStepInput {
  allTeamMembers: CsvTeamMemberFieldsAfterFilteringInvalidTeamMembersStep[];
}

interface TransformIntoFormatForDatabaseStepOutput {
  allTeamMembers: TeamMemberDocument[];
}

export const transformIntoFormatForDatabaseStep = (
  input: TransformIntoFormatForDatabaseStepInput
): TransformIntoFormatForDatabaseStepOutput => {
  const createdAtForAllRecords = new Date();
  const updatedAtForAllRecords = createdAtForAllRecords;

  const allTeamMembers = input.allTeamMembers.map((teamMember) => ({
    _id: new ObjectId(),
    firstName: teamMember.firstName,
    lastName: teamMember.lastName,
    email: teamMember.email,
    twitterUrl: teamMember.twitterUrl,
    linkedinUrl: teamMember.linkedinUrl,
    teams: teamMember.teams.map((team) => ({ label: team })),
    affiliations: teamMember.affiliations.map((affiliation) => ({
      label: affiliation,
    })),
    createdAt: createdAtForAllRecords,
    updatedAt: updatedAtForAllRecords,
  }));

  return { allTeamMembers };
};
