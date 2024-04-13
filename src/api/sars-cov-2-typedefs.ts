export const sarsCov2Typedefs = `
  type SarsCov2Estimate {
    sourceType: String
    riskOfBias: String
    populationGroup: String
    sex: String
    ageGroup: String
    country: String!
    state: String
    city: String
    id: String!
    latitude: Float!
    longitude: Float!
    samplingStartDate: String
    samplingEndDate: String
  }

  type SarsCov2FilterOptions {
    ageGroup: [String!]!
    country: [String!]!
    sourceType: [String!]!
    riskOfBias: [String!]!
  }

  type Query {
    sarsCov2Estimates: [SarsCov2Estimate!]!
    sarsCov2FilterOptions: SarsCov2FilterOptions!
  }
`