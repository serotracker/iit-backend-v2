import { QueryResolvers } from "./graphql-types/__generated__/graphql-types";

export const arboResolvers: { Query: QueryResolvers } = {
  Query: {
    arbovirusEstimates: () => [],
    arbovirusFilterOptions: () => {
      return {
        ageGroup: [],
        antibody: [],
        assay: [],
        country: [],
        pathogen: [],
        sampleFrame: [],
        sex: [],
        whoRegion: [],
      };
    },
  },
};
