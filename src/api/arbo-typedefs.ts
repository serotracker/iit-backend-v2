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
    sex: String
    sourceSheetId: String
    sourceSheetName: String
    url: String
    whoRegion: String
  }

  type ArbovirusFilterOptions {
    ageGroup: [String!]!
    antibody: [String!]!
    assay: [String!]!
    country: [String!]!
    pathogen: [String!]!
    sampleFrame: [String!]!
    sex: [String!]!
    whoRegion: [String!]!
  }

  type Query {
    arbovirusEstimates: [ArbovirusEstimate!]!
    arbovirusFilterOptions: ArbovirusFilterOptions
  }
`