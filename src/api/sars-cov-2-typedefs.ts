export const sarsCov2Typedefs = `
  type SarsCov2Estimate {
    sourceType: String!
    riskOfBias: String!
    populationGroup: String!
    sex: String!
    age: String!
    id: String!
    latitude: Float!
    longitude: Float!
    sampleStartDate: Date!
    sampleEndDate: Date!
  }

  type SarsCov2FilterOptions {
    ageGroup: [String!]!
    antibody: [String!]!
    assay: [String!]!
    country: [String!]!
    unRegion: [String!]!
    pathogen: [String!]!
    pediatricAgeGroup: [String!]!
    producer: [String!]!
    sampleFrame: [String!]!
    serotype: [String!]!
    sex: [String!]!
    whoRegion: [String!]!
  }

  type Query {
    sarsCov2Estimates: [SarsCov2Estimate!]!
    sarsCov2FilterOptions: SarsCov2FilterOptions
  }
`