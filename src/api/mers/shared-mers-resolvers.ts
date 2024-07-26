import { MongoClient } from "mongodb";
import { QueryResolvers } from "../graphql-types/__generated__/graphql-types";

interface GenerateSharedMersResolversInput {
  mongoClient: MongoClient;
}

interface GenerateSharedMersResolversOutput {
  sharedMersResolvers: { Query: QueryResolvers }
}

export const generateSharedMersResolvers = (input: GenerateSharedMersResolversInput): GenerateSharedMersResolversOutput => {
  return {
    sharedMersResolvers: {
      Query: {}
    }
  }
}