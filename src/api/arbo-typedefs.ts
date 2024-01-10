export const arboTypedefs = `
  type ArbovirusEstimate {
    ageGroup: String
    ageMaximum: Int
    ageMinimum: Int
    antibodies: [String!]!
    antigen: String
    assay: String
    assayOther: String
    city: String
    state: String
    countryDeprecated: String! @deprecated(reason: "use country instead.")
    country: String!
    createdAt: String!
    estimateId: String
    id: String!
    inclusionCriteria: String
    latitude: Float!
    longitude: Float!
    pathogen: String!
    producer: String
    producerOther: String
    sameFrameTargetGroup: String
    sampleEndDate: String
    sampleFrame: String
    sampleNumerator: Int
    sampleSize: Int!
    sampleStartDate: String
    seroprevalence: Float
    serotype: [String!]!
    sex: String
    sourceSheetId: String
    sourceSheetName: String
    url: String
    whoRegionDeprecated: String @deprecated(reason: "use whoRegion instead.")
    whoRegion: String
  }

  type ArbovirusFilterOptions {
    ageGroup: [String!]!
    antibody: [String!]!
    assay: [String!]!
    countryDeprecated: [String!]! @deprecated(reason: "use country instead.")
    country: [String!]!
    pathogen: [String!]!
    producer: [String!]!
    sampleFrame: [String!]!
    serotype: [String!]!
    sex: [String!]!
    whoRegionDeprecated: [String!]! @deprecated(reason: "use whoRegion instead.")
    whoRegion: [String!]!
  }

  type Query {
    arbovirusEstimates: [ArbovirusEstimate!]!
    arbovirusFilterOptions: ArbovirusFilterOptions
  }
`