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
    country: Country!
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
    unRegion: UNRegion!
    url: String
    whoRegionDeprecated: String @deprecated(reason: "use whoRegion instead.")
    whoRegion: WHORegion
  }

  type ArbovirusFilterOptions {
    ageGroup: [String!]!
    antibody: [String!]!
    assay: [String!]!
    countryDeprecated: [String!]! @deprecated(reason: "use country instead.")
    country: [Country!]!
    pathogen: [String!]!
    producer: [String!]!
    sampleFrame: [String!]!
    serotype: [String!]!
    sex: [String!]!
    unRegion: [UNRegion!]!
    whoRegionDeprecated: [String!]! @deprecated(reason: "use whoRegion instead.")
    whoRegion: [WHORegion!]!
  }

  type UNRegion {
    name: String!
    countries: [Country!]!
    whoRegions: [WHORegion!]!
  }

  type WHORegion {
    name: String!
    countries: [Country!]!
    unRegions: [UNRegion!]!
  }

  type Country {
    alphaTwoCode: String!
    name: String!
    unRegions: [UNRegion!]!
    whoRegions: [WHORegion!]!
  }

  type Query {
    arbovirusEstimates: [ArbovirusEstimate!]!
    arbovirusFilterOptions: ArbovirusFilterOptions
  }
`