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
    countryAlphaTwoCode: String!
    countryAlphaThreeCode: String!
    createdAt: String!
    estimateId: String
    id: String!
    inclusionCriteria: String
    latitude: Float!
    longitude: Float!
    pathogen: String!
    pediatricAgeGroup: String
    producer: String
    producerOther: String
    sameFrameTargetGroup: String
    sampleEndDate: String
    sampleFrame: String
    sampleNumerator: Int
    sampleSize: Int!
    sampleStartDate: String
    seroprevalence: Float
    seroprevalenceStudy95CILower: Float
    seroprevalenceStudy95CIUpper: Float
    seroprevalenceCalculated95CILower: Float
    seroprevalenceCalculated95CIUpper: Float
    serotype: [String!]!
    sex: String
    sourceSheetId: String
    sourceSheetName: String
    unRegion: String
    url: String
    whoRegion: String
  }

  type ArbovirusFilterOptions {
    ageGroup: [String!]!
    antibody: [String!]!
    assay: [String!]!
    country: [String!]!
    countryIdentifiers: [CountryIdentifiers!]!
    unRegion: [String!]!
    pathogen: [String!]!
    pediatricAgeGroup: [String!]!
    producer: [String!]!
    sampleFrame: [String!]!
    serotype: [String!]!
    sex: [String!]!
    whoRegion: [String!]!
  }

  type ArbovirusDataStatistics {
    patricipantCount: Int!
    sourceCount: Int!
    estimateCount: Int!
    countryCount: Int!
  }

  type Query {
    arbovirusEstimates: [ArbovirusEstimate!]!
    arbovirusFilterOptions: ArbovirusFilterOptions
    arbovirusDataStatistics: ArbovirusDataStatistics!
  }
`