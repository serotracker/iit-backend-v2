import { MongoClient } from "mongodb";
import { QueryResolvers } from "../graphql-types/__generated__/graphql-types";

interface GenerateMersEventResolversInput {
  mongoClient: MongoClient;
}

interface GenerateMersEventResolversOutput {
  mersEventResolvers: { Query: QueryResolvers }
}

export const generateMersEventResolvers = (input: GenerateMersEventResolversInput): GenerateMersEventResolversOutput => {
  return {
    mersEventResolvers: {
      Query: {}
    }
  }
}