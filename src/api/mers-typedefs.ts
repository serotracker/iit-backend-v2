export const mersTypedefs = `
  type MersEstimate {
    id: String!
    seroprevalence: Float!
    estimateId: String!
    city: String
    state: String
    country: String!
    countryAlphaTwoCode: String!
    countryAlphaThreeCode: String!
    latitude: Float!
    longitude: Float!
    whoRegion: WHORegion
    unRegion: UNRegion
    firstAuthorFullName: String!
    sourceUrl: String!
    sourceType: String!
    sourceTitle: String!
    insitutution: String
  }

  enum MersEstimateType {
    HUMAN_SEROPREVALENCE
    ANIMAL_SEROPREVALENCE
    HUMAN_VIRAL
    ANIMAL_VIRAL
  }

  interface MersEstimateInterface {
    id: String!
    type: MersEstimateType!
    estimateId: String!
    city: String
    state: String
    country: String!
    countryAlphaTwoCode: String!
    countryAlphaThreeCode: String!
    latitude: Float!
    longitude: Float!
    whoRegion: WHORegion
    unRegion: UNRegion
    firstAuthorFullName: String!
    sourceUrl: String!
    sourceType: String!
    sourceTitle: String!
    insitutution: String
    studyInclusionCriteria: String
    studyExclusionCriteria: String
    sensitivity: Float
    sensitivity95CILower: Float
    sensitivity95CIUpper: Float
    sensitivityDenominator: Int
    specificity: Float
    specificity95CILower: Float
    specificity95CIUpper: Float
    specificityDenominator: Int
    sampleDenominator: Int
    sampleNumerator: Int
    assay: [String!]!
    specimenType: String
    sex: String
    isotypes: [String!]!
    samplingStartDate: String
    samplingEndDate: String
    samplingMidDate: String
  }

  type HumanMersViralEstimate implements MersEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    type: MersEstimateType!
    estimateId: String!
    city: String
    state: String
    country: String!
    countryAlphaTwoCode: String!
    countryAlphaThreeCode: String!
    latitude: Float!
    longitude: Float!
    whoRegion: WHORegion
    unRegion: UNRegion
    firstAuthorFullName: String!
    sourceUrl: String!
    sourceType: String!
    sourceTitle: String!
    insitutution: String
    studyInclusionCriteria: String
    studyExclusionCriteria: String
    sensitivity: Float
    sensitivity95CILower: Float
    sensitivity95CIUpper: Float
    sensitivityDenominator: Int
    specificity: Float
    specificity95CILower: Float
    specificity95CIUpper: Float
    specificityDenominator: Int
    sampleDenominator: Int
    sampleNumerator: Int
    assay: [String!]!
    specimenType: String
    sex: String
    isotypes: [String!]!
    samplingStartDate: String
    samplingEndDate: String
    samplingMidDate: String
    ####### END INTERFACE FIELDS #######

    positivePrevalence: Float!
    positivePrevalence95CILower: Float
    positivePrevalence95CIUpper: Float
    ageGroup: [String!]!
  }

  type AnimalMersViralEstimate implements MersEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    type: MersEstimateType!
    estimateId: String!
    city: String
    state: String
    country: String!
    countryAlphaTwoCode: String!
    countryAlphaThreeCode: String!
    latitude: Float!
    longitude: Float!
    whoRegion: WHORegion
    unRegion: UNRegion
    firstAuthorFullName: String!
    sourceUrl: String!
    sourceType: String!
    sourceTitle: String!
    insitutution: String
    studyInclusionCriteria: String
    studyExclusionCriteria: String
    sensitivity: Float
    sensitivity95CILower: Float
    sensitivity95CIUpper: Float
    sensitivityDenominator: Int
    specificity: Float
    specificity95CILower: Float
    specificity95CIUpper: Float
    specificityDenominator: Int
    sampleDenominator: Int
    sampleNumerator: Int
    assay: [String!]!
    specimenType: String
    sex: String
    isotypes: [String!]!
    samplingStartDate: String
    samplingEndDate: String
    samplingMidDate: String
    ####### END INTERFACE FIELDS #######

    positivePrevalence: Float!
    positivePrevalence95CILower: Float
    positivePrevalence95CIUpper: Float
    animalType: [MersAnimalType!]!
    animalSpecies: MersAnimalSpecies!
  }

  type HumanMersEstimate implements MersEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    type: MersEstimateType!
    estimateId: String!
    city: String
    state: String
    country: String!
    countryAlphaTwoCode: String!
    countryAlphaThreeCode: String!
    latitude: Float!
    longitude: Float!
    whoRegion: WHORegion
    unRegion: UNRegion
    firstAuthorFullName: String!
    sourceUrl: String!
    sourceType: String!
    sourceTitle: String!
    insitutution: String
    studyInclusionCriteria: String
    studyExclusionCriteria: String
    sensitivity: Float
    sensitivity95CILower: Float
    sensitivity95CIUpper: Float
    sensitivityDenominator: Int
    specificity: Float
    specificity95CILower: Float
    specificity95CIUpper: Float
    specificityDenominator: Int
    sampleDenominator: Int
    sampleNumerator: Int
    assay: [String!]!
    specimenType: String
    sex: String
    isotypes: [String!]!
    samplingStartDate: String
    samplingEndDate: String
    samplingMidDate: String
    ####### END INTERFACE FIELDS #######

    seroprevalence: Float!
    seroprevalence95CILower: Float
    seroprevalence95CIUpper: Float
    ageGroup: [String!]!
  }

  type AnimalMersEstimate implements MersEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    type: MersEstimateType!
    estimateId: String!
    city: String
    state: String
    country: String!
    countryAlphaTwoCode: String!
    countryAlphaThreeCode: String!
    latitude: Float!
    longitude: Float!
    whoRegion: WHORegion
    unRegion: UNRegion
    firstAuthorFullName: String!
    sourceUrl: String!
    sourceType: String!
    sourceTitle: String!
    insitutution: String
    studyInclusionCriteria: String
    studyExclusionCriteria: String
    sensitivity: Float
    sensitivity95CILower: Float
    sensitivity95CIUpper: Float
    sensitivityDenominator: Int
    specificity: Float
    specificity95CILower: Float
    specificity95CIUpper: Float
    specificityDenominator: Int
    sampleDenominator: Int
    sampleNumerator: Int
    assay: [String!]!
    specimenType: String
    sex: String
    isotypes: [String!]!
    samplingStartDate: String
    samplingEndDate: String
    samplingMidDate: String
    ####### END INTERFACE FIELDS #######

    seroprevalence: Float!
    seroprevalence95CILower: Float
    seroprevalence95CIUpper: Float
    animalType: [MersAnimalType!]!
    animalSpecies: MersAnimalSpecies!
  }

  union MersEstimate_V2 = HumanMersEstimate | AnimalMersEstimate | HumanMersViralEstimate |  AnimalMersViralEstimate

  enum MersDiagnosisStatus {
    CONFIRMED
    DENIED
  }

  enum MersDiagnosisSource {
    WORLD_ORGANISATION_FOR_ANIMAL_HEALTH
    WORLD_HEALTH_ORGANIZATION
    NATIONAL_AUTHORITIES
    PUBLICATIONS
    MEDIA
    FAO_FIELD_OFFICER
  }

  enum MersAnimalType {
    DOMESTIC
    WILD
  }

  enum MersAnimalSpecies {
    CAMEL
    BAT
  }

  enum MersEventAnimalType {
    DOMESTIC
    WILD
  }

  enum MersEventAnimalSpecies {
    CAMEL
    BAT
  }

  enum MersEventType {
    HUMAN
    ANIMAL
  }

  interface MersEventInterface {
    id: String!
    type: MersEventType!
    diagnosisStatus: MersDiagnosisStatus!
    diagnosisSource: MersDiagnosisSource!
    country: CountryIdentifiers!
    state: String!
    city: String!
    latitude: Float!
    longitude: Float!
    whoRegion: WHORegion
    unRegion: UNRegion
    observationDate: String
    reportDate: String!
  }

  type AnimalMersEvent implements MersEventInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    type: MersEventType!
    diagnosisStatus: MersDiagnosisStatus!
    diagnosisSource: MersDiagnosisSource!
    country: CountryIdentifiers!
    state: String!
    city: String!
    latitude: Float!
    longitude: Float!
    whoRegion: WHORegion
    unRegion: UNRegion
    observationDate: String
    reportDate: String!
    ####### END INTERFACE FIELDS #######

    animalType: MersEventAnimalType!
    animalSpecies: MersEventAnimalSpecies!
  }

  type HumanMersEvent implements MersEventInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    type: MersEventType!
    diagnosisStatus: MersDiagnosisStatus!
    diagnosisSource: MersDiagnosisSource!
    country: CountryIdentifiers!
    state: String!
    city: String!
    latitude: Float!
    longitude: Float!
    whoRegion: WHORegion
    unRegion: UNRegion
    observationDate: String
    reportDate: String!
    ####### END INTERFACE FIELDS #######

    humansAffected: Int!
    humanDeaths: Int!
  }

  union MersEvent = AnimalMersEvent | HumanMersEvent

  input PartitionedFaoMersEventsInput {
    partitionKey: Int!
  }

  type PartitionedFeoMersEventsOutput {
    partitionKey: Int!
    mersEvents: [MersEvent!]!
  }

  type MersEstimateFilterOptions {
    sourceType: [String!]!
  }

  type MersFilterOptions {
    countryIdentifiers: [CountryIdentifiers!]!
    whoRegion: [WHORegion!]!
    unRegion: [UNRegion!]!
  }

  type YearlyFaoCamelPopulationDataEntry {
    id: String!
    countryAlphaThreeCode: String!
    country: CountryIdentifiers!
    year: Int!
    camelCount: Int!
    camelCountPerCapita: Float
    whoRegion: WHORegion
    unRegion: UNRegion
    note: String!
  }

  input PartitionedYearlyFaoCamelPopulationDataInput {
    partitionKey: Int!
  }
  
  type PartitionedYearlyFaoCamelPopulationDataOutput {
    partitionKey: Int!
    yearlyFaoCamelPopulationData: [YearlyFaoCamelPopulationDataEntry!]!
  }

  type FaoMersEventFilterOptions {
    diagnosisSource: [MersDiagnosisSource!]!
    animalType: [MersEventAnimalType!]!
    animalSpecies: [MersEventAnimalSpecies!]!
  }

  type Query {
    mersEstimates: [MersEstimate!]!
    mersEstimates_V2: [MersEstimate_V2!]!
    mersFilterOptions: MersFilterOptions!
    mersEstimatesFilterOptions: MersEstimateFilterOptions!
    allFaoMersEventPartitionKeys: [Int!]!
    partitionedFaoMersEvents(input: PartitionedFaoMersEventsInput!): PartitionedFeoMersEventsOutput!
    faoMersEventFilterOptions: FaoMersEventFilterOptions!
    yearlyFaoCamelPopulationDataPartitionKeys: [Int!]!
    partitionedYearlyFaoCamelPopulationData(input: PartitionedYearlyFaoCamelPopulationDataInput!): PartitionedYearlyFaoCamelPopulationDataOutput!
  }
`