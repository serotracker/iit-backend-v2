export const mersEstimateTypedefs = `
  enum MersEstimateType {
    HUMAN_SEROPREVALENCE
    ANIMAL_SEROPREVALENCE
    HUMAN_VIRAL
    ANIMAL_VIRAL
  }

  type MersSubEstimate {
    id: String!
  }

  type MersPrimaryEstimate {
    id: String!
    type: MersEstimateType!
    geographicalAreaSubestimates: [MersSubEstimate!]!
    ageSubestimates: [MersSubEstimate!]!
    sexSubestimates: [MersSubEstimate!]!
  }

  type Query {
    mersPrimaryEstimates: [MersPrimaryEstimate!]!
  }
`