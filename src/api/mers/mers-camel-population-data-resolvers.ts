import { MongoClient } from "mongodb";
import { QueryResolvers } from "../graphql-types/__generated__/graphql-types";

interface GenerateMersCamelPopulationDataResolversInput {
  mongoClient: MongoClient;
}

interface GenerateMersCamelPopulationDataResolversOutput {
  mersCamelPopulationDataResolvers: { Query: QueryResolvers }
}

export const generateMersCamelPopulationDataResolvers = (input: GenerateMersCamelPopulationDataResolversInput): GenerateMersCamelPopulationDataResolversOutput => {
  return {
    mersCamelPopulationDataResolvers: {
      Query: {}
    }
  }
}