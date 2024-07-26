import { MongoClient } from "mongodb";
import { QueryResolvers } from "../graphql-types/__generated__/graphql-types";
import { generateLegacyMersResolvers } from "./legacy-mers-resolvers";
import { generateMersCamelPopulationDataResolvers } from "./mers-camel-population-data-resolvers";
import { generateMersEventResolvers } from "./mers-event-resolvers";
import { generateMersEstimateResolvers } from "./mers-estimate-resolvers";
import { generateSharedMersResolvers } from "./shared-mers-resolvers";

interface GenerateMersResolversInput {
  mongoClient: MongoClient;
}

interface GenerateMersResolversOutput {
  mersResolvers: { Query: QueryResolvers }
}

export const generateMersResolvers = (input: GenerateMersResolversInput): GenerateMersResolversOutput => {
  const { sharedMersResolvers } = generateSharedMersResolvers(input);
  const { legacyMersResolvers } = generateLegacyMersResolvers(input);
  const { mersCamelPopulationDataResolvers } = generateMersCamelPopulationDataResolvers(input);
  const { mersEventResolvers } = generateMersEventResolvers(input);
  const { mersEstimateResolvers } = generateMersEstimateResolvers(input);

  return {
    mersResolvers: {
      Query: {
        ...sharedMersResolvers.Query,
        ...legacyMersResolvers.Query,
        ...mersCamelPopulationDataResolvers.Query,
        ...mersEventResolvers.Query,
        ...mersEstimateResolvers.Query,
      }
    }
  }
}