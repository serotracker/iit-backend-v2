import { MongoClient } from "mongodb";
import { QueryResolvers } from "../graphql-types/__generated__/graphql-types";

interface GenerateMersEstimateResolversInput {
  mongoClient: MongoClient;
}

interface GenerateMersEstimateResolversOutput {
  mersEstimateResolvers: { Query: QueryResolvers }
}

export const generateMersEstimateResolvers = (input: GenerateMersEstimateResolversInput): GenerateMersEstimateResolversOutput => {
  return {
    mersEstimateResolvers: {
      Query: {
        mersPrimaryEstimates: () => []
      }
    }
  }
}