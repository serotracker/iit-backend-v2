import { MongoClient } from "mongodb";
import { QueryResolvers, TeamMemberSymbol } from "../graphql-types/__generated__/graphql-types.js";
import { TeamMemberDocument } from "../../storage/types";

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
              affiliations: "$affiliations",
              arbotrackerContributorFlag: "$arbotrackerContributorFlag"
            }
          }
        }
      },
      {
        $sort: {
          "_id.sortOrder": 1
        }
      },
      {
        $project: {
          _id: 0,
          label: "$_id.label",
          teamMembers: {
            $sortArray: {
              input: "$teamMembers",
              sortBy: { firstName: 1, lastName: 1 }
            }
          }
        }
      }
    ]).toArray() as Array<{label: string, teamMembers: Pick<TeamMemberDocument, 'firstName'|'lastName'|'email'|'twitterUrl'|'linkedinUrl'|'affiliations'|'arbotrackerContributorFlag'>[]}>;

    return groupedTeamMemberData.map((teamMemberGroup) => ({
      ...teamMemberGroup,
      teamMembers: teamMemberGroup.teamMembers.map((teamMember) => ({
        ...teamMember,
        additionalSymbols: [
          ...(teamMember.arbotrackerContributorFlag ? [ TeamMemberSymbol.ArbotrackerSymbol ] : [])
        ]
      }))
    }));
  }

  return {
    teamResolvers: {
      Query: {
        groupedTeamMembers
      }
    }
  };
}