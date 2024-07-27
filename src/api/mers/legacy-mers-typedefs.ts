export const legacyMersTypedefs = `
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
    samplingMethod: String
    geographicScope: String
    testProducer: [String!]!
    testValidation: [String!]!
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
    samplingMethod: String
    geographicScope: String
    testProducer: [String!]!
    testValidation: [String!]!
    ####### END INTERFACE FIELDS #######

    positivePrevalence: Float!
    positivePrevalence95CILower: Float
    positivePrevalence95CIUpper: Float
    ageGroup: [String!]!
    sampleFrame: String
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
    samplingMethod: String
    geographicScope: String
    testProducer: [String!]!
    testValidation: [String!]!
    ####### END INTERFACE FIELDS #######

    positivePrevalence: Float!
    positivePrevalence95CILower: Float
    positivePrevalence95CIUpper: Float
    animalType: [MersAnimalType!]!
    animalSpecies: MersAnimalSpecies!
    animalDetectionSettings: [String!]!
    animalPurpose: String
    animalImportedOrLocal: String
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
    samplingMethod: String
    geographicScope: String
    testProducer: [String!]!
    testValidation: [String!]!
    ####### END INTERFACE FIELDS #######

    seroprevalence: Float!
    seroprevalence95CILower: Float
    seroprevalence95CIUpper: Float
    ageGroup: [String!]!
    sampleFrame: String
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
    samplingMethod: String
    geographicScope: String
    testProducer: [String!]!
    testValidation: [String!]!
    ####### END INTERFACE FIELDS #######

    seroprevalence: Float!
    seroprevalence95CILower: Float
    seroprevalence95CIUpper: Float
    animalType: [MersAnimalType!]!
    animalSpecies: MersAnimalSpecies!
    animalDetectionSettings: [String!]!
    animalPurpose: String
    animalImportedOrLocal: String
  }

  union MersEstimate_V2 = HumanMersEstimate | AnimalMersEstimate | HumanMersViralEstimate |  AnimalMersViralEstimate

  type Query {
    mersEstimates: [MersEstimate!]!
    mersEstimates_V2: [MersEstimate_V2!]!
  }
`