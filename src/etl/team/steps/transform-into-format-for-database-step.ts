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
  console.log(
    `Running step: transformIntoFormatForDatabaseStep. Remaining team members: ${input.allTeamMembers.length}`
  );

  const createdAtForAllRecords = new Date();
  const updatedAtForAllRecords = createdAtForAllRecords;

  const allTeamMembers = input.allTeamMembers.map((teamMember) => ({
    _id: new ObjectId(),
    firstName: teamMember.firstName,
    lastName: teamMember.lastName,
    email: !!teamMember.email ? teamMember.email : undefined,
    twitterUrl: teamMember.twitterUrl ? teamMember.twitterUrl : undefined,
    linkedinUrl: teamMember.linkedinUrl ? teamMember.linkedinUrl : undefined,
    teams: teamMember.teams.map((team) => ({ label: team })),
    affiliations: teamMember.affiliations.map((affiliation) => ({
      label: affiliation,
    })),
    createdAt: createdAtForAllRecords,
    updatedAt: updatedAtForAllRecords,
  }));

  return { allTeamMembers };
};
