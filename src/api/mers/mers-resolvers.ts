import { MongoClient } from "mongodb";
import { QueryResolvers } from "../graphql-types/__generated__/graphql-types";
import { generateLegacyMersResolvers } from "./legacy-mers-resolvers.js";
import { generateMersCamelPopulationDataResolvers } from "./mers-camel-population-data-resolvers.js";
import { generateMersEventResolvers } from "./mers-event-resolvers.js";
import { generateMersEstimateResolvers } from "./mers-estimate-resolvers.js";
import { generateSharedMersResolvers } from "./shared-mers-resolvers.js";
import { generateMersMacroSampleFramesResolvers } from "./mers-macro-sample-frames-resolvers.js";
import { generateMersWhoCaseDataResolvers } from "./mers-who-case-data-resolvers.js";

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
  const { mersMacroSampleFramesResolvers } = generateMersMacroSampleFramesResolvers(input);
  const { mersWhoCaseDataResolvers } = generateMersWhoCaseDataResolvers(input);

  return {
    mersResolvers: {
      Query: {
        ...sharedMersResolvers.Query,
        ...legacyMersResolvers.Query,
        ...mersCamelPopulationDataResolvers.Query,
        ...mersEventResolvers.Query,
        ...mersEstimateResolvers.Query,
        ...mersMacroSampleFramesResolvers.Query,
        ...mersWhoCaseDataResolvers.Query
      }
    }
  }
}