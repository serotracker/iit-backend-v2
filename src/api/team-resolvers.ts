import { MongoClient } from "mongodb";
import { QueryResolvers } from "./graphql-types/__generated__/graphql-types";
import { TeamMemberDocument } from "../storage/types";

interface GenerateTeamResolversInput {
  mongoClient: MongoClient;
}

interface GenerateTeamResolversOutput {
  teamResolvers: { Query: QueryResolvers }
}

export const generateTeamResolvers = (input: GenerateTeamResolversInput): GenerateTeamResolversOutput => {
  const { mongoClient } = input;

  const databaseName = process.env.DATABASE_NAME;

  if(!databaseName) {
    throw new Error("Unable to find value for DATABASE_NAME. Please make sure you have run generate-env-files.sh and have specified one in the appropriate environment file.")
  }

  const groupedTeamMembers = async () => {
    const groupedTeamMemberData = await mongoClient.db(databaseName).collection<TeamMemberDocument>('teamMembers').aggregate([
      {
        $unwind: "$teams"
      },
      {
        $group: {
          _id: "$teams",
          teamMembers: {
            "$addToSet": {
              firstName: "$firstName",
              lastName: "$lastName",
              email: "$email",
              twitterUrl: "$twitterUrl",
              linkedinUrl: "$linkedinUrl",
              affiliations: "$affiliations"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          label: "$_id.label",
          teamMembers: 1
        }
      }
    ]).toArray() as Array<{label: string, teamMembers: Pick<TeamMemberDocument, 'firstName'|'lastName'|'email'|'twitterUrl'|'linkedinUrl'|'affiliations'>[]}>;

    return groupedTeamMemberData;
  }

  return {
    teamResolvers: {
      Query: {
        groupedTeamMembers
      }
    }
  };
}