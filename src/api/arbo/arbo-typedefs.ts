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
    pathogen: Arbovirus!
    pediatricAgeGroup: String
    producer: String
    producerOther: String
    sameFrameTargetGroup: String
    sampleEndDate: String
    sampleFrame: String
    sampleNumerator: Int
    sampleSize: Int!
    sampleStartDate: String
    seroprevalence: Float!
    seroprevalenceStudy95CILower: Float
    seroprevalenceStudy95CIUpper: Float
    seroprevalenceCalculated95CILower: Float
    seroprevalenceCalculated95CIUpper: Float
    serotype: [String!]!
    sex: String
    sourceSheetId: String
    sourceSheetName: String
    unRegion: UNRegion
    url: String
    whoRegion: String
  }

  enum Arbovirus {
    ZIKV
    DENV
    CHIKV
    YFV
    WNV
    MAYV
    OROV
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

  type ArbovirusEnvironmentalSuitabilityDataSubEntry {
    minimumValue: Float!
    maximumValue: Float!
    valueRange: Float!
    meanValue: Float!
    medianValue: Float!
    ninetyPercentOfValuesAreBelowThisValue: Float!
  }

  type ArbovirusEnvironmentalSuitabilityDataEntry {
    id: String!
    countryAlphaThreeCode: String!    
    countryAlphaTwoCode: String!
    countryName: String!
    zikaData: ArbovirusEnvironmentalSuitabilityDataSubEntry!
    dengue2015Data: ArbovirusEnvironmentalSuitabilityDataSubEntry!
    dengue2050Data: ArbovirusEnvironmentalSuitabilityDataSubEntry!
  }

  type Query {
    arbovirusEstimates: [ArbovirusEstimate!]!
    arbovirusEnviromentalSuitabilityData: [ArbovirusEnvironmentalSuitabilityDataEntry!]!
    arbovirusFilterOptions: ArbovirusFilterOptions!
    arbovirusDataStatistics: ArbovirusDataStatistics!
  }
`