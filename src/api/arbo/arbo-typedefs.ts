export const arboTypedefs = `
  type ArbovirusEstimate {
    estimateType: ArbovirusEstimateType!
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
    studyPopulation: ArbovirusStudyPopulation!
    studySpecies: String!
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

  enum ArbovirusEstimateType {
    SEROPREVALENCE
    VIRAL_PREVALENCE
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

  enum ArbovirusStudyPopulation {
    HUMAN
    INSECT
    NON_HUMAN_ANIMAL
  }

  enum ArbovirusGroupingVariable {
    TIMEFRAME
    AGE
    GENDER
    GEOGRAPHY
    TEST_TYPE
    OVERALL
    DENV_SEROTYPE
    SPECIES
    RACE
    EDUCATION
  }

  type ArbovirusFilterOptions {
    ageGroup: [String!]!
    antibody: [String!]!
    estimateType: [ArbovirusEstimateType!]!
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
    studyPopulation: [ArbovirusStudyPopulation!]!
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

  type ArbovirusSubEstimate {
    estimateType: ArbovirusEstimateType!
    groupingVariable: ArbovirusGroupingVariable
    ageGroup: [String!]!
    ageMaximum: Int
    ageMinimum: Int
    antibodies: [String!]!
    antigen: String
    assay: [String!]!
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
    studyPopulation: ArbovirusStudyPopulation!
    studySpecies: String!
    seroprevalenceStudy95CILower: Float
    seroprevalenceStudy95CIUpper: Float
    seroprevalenceCalculated95CILower: Float
    seroprevalenceCalculated95CIUpper: Float
    serotype: [String!]!
    sex: [String!]!
    sourceSheetId: String
    sourceSheetName: String
    unRegion: UNRegion
    url: String
    whoRegion: String
  }

  type GroupedArbovirusEstimate {
    id: String!
    shownEstimates: [ArbovirusSubEstimate!]!
    hiddenEstimates: [ArbovirusSubEstimate!]!
  }

  input PartitionedGroupedArbovirusEstimatesInput {
    partitionKey: Int!
  }

  type PartitionedGroupedArbovirusEstimatesOutput {
    partitionKey: Int!
    arboEstimates: [GroupedArbovirusEstimate!]!
  }

  type Query {
    arbovirusEstimates: [ArbovirusEstimate!]!
    groupedArbovirusEstimates: [GroupedArbovirusEstimate!]!
    partitionedGroupedArbovirusEstimates(input: PartitionedGroupedArbovirusEstimatesInput!): PartitionedGroupedArbovirusEstimatesOutput!
    allGroupedArbovirusEstimatePartitionKeys: [Int!]!
    arbovirusEnviromentalSuitabilityData: [ArbovirusEnvironmentalSuitabilityDataEntry!]!
    arbovirusFilterOptions: ArbovirusFilterOptions!
    groupedArbovirusEstimateFilterOptions: ArbovirusFilterOptions!
    arbovirusDataStatistics: ArbovirusDataStatistics!
  }
`