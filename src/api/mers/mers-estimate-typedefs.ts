export const mersEstimateTypedefs = `
  enum MersAnimalType {
    DOMESTIC
    WILD
  }

  enum MersAnimalSpecies {
    CAMEL
    BAT
    GOAT
    SHEEP
    CATTLE
  }

  type MersEstimateFilterOptions {
    sourceType: [String!]!
    ageGroup: [String!]!
    assay: [String!]!
    specimenType: [String!]!
    sex: [String!]!
    isotypes: [String!]!
    samplingMethod: [String!]!
    geographicScope: [String!]!
    animalDetectionSettings: [String!]!
    animalPurpose: [String!]!
    animalImportedOrLocal: [String!]!
    sampleFrame: [String!]!
    testProducer: [String!]!
    testValidation: [String!]!
  }

  enum MersEstimateType {
    HUMAN_SEROPREVALENCE
    ANIMAL_SEROPREVALENCE
    HUMAN_VIRAL
    ANIMAL_VIRAL
  }

  interface PrimaryMersEstimateInformationInterface {
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

  type PrimaryHumanMersViralEstimateInformation implements PrimaryMersEstimateInformationInterface {
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

  type PrimaryAnimalMersViralEstimateInformation implements PrimaryMersEstimateInformationInterface {
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
    animalAgeGroup: [String!]!
  }

  type PrimaryHumanMersEstimateInformation implements PrimaryMersEstimateInformationInterface {
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

  type PrimaryAnimalMersEstimateInformation implements PrimaryMersEstimateInformationInterface {
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
    animalAgeGroup: [String!]!
  }

  union PrimaryMersEstimateInformation = PrimaryAnimalMersEstimateInformation | PrimaryHumanMersEstimateInformation | PrimaryAnimalMersViralEstimateInformation |  PrimaryHumanMersViralEstimateInformation

  interface MersSubEstimateInformationInterface {
    sampleDenominator: Int
    sampleNumerator: Int
  }

  type MersViralSubEstimateInformation implements MersSubEstimateInformationInterface {
    ####### START INTERFACE FIELDS #######
    sampleDenominator: Int
    sampleNumerator: Int
    ####### END INTERFACE FIELDS #######

    positivePrevalence: Float!
    positivePrevalence95CILower: Float
    positivePrevalence95CIUpper: Float
  }

  type MersSeroprevalenceSubEstimateInformation implements MersSubEstimateInformationInterface {
    ####### START INTERFACE FIELDS #######
    sampleDenominator: Int
    sampleNumerator: Int
    ####### END INTERFACE FIELDS #######

    seroprevalence: Float!
    seroprevalence95CILower: Float
    seroprevalence95CIUpper: Float
  }

  union MersSubEstimateInformation = MersViralSubEstimateInformation | MersSeroprevalenceSubEstimateInformation

  interface MersSubEstimateInterface {
    id: String!
    estimateId: String!
    estimateInfo: MersSubEstimateInformation!
  }

  type MersGeographicalAreaSubEstimate implements MersSubEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    estimateId: String!
    estimateInfo: MersSubEstimateInformation!
    ####### END INTERFACE FIELDS #######

    city: String
    state: String
    country: String!
    countryAlphaTwoCode: String!
    countryAlphaThreeCode: String!
    latitude: Float!
    longitude: Float!
    whoRegion: WHORegion
    unRegion: UNRegion
    geographicScope: String
  }

  type HumanMersAgeGroupSubEstimate implements MersSubEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    estimateId: String!
    estimateInfo: MersSubEstimateInformation!
    ####### END INTERFACE FIELDS #######

    ageGroup: [String!]!
  }

  type AnimalMersAgeGroupSubEstimate implements MersSubEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    estimateId: String!
    estimateInfo: MersSubEstimateInformation!
    ####### END INTERFACE FIELDS #######

    animalAgeGroup: [String!]!
  }

  union MersAgeGroupSubEstimate = HumanMersAgeGroupSubEstimate | AnimalMersAgeGroupSubEstimate

  type MersTestUsedSubEstimate implements MersSubEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    estimateId: String!
    estimateInfo: MersSubEstimateInformation!
    ####### END INTERFACE FIELDS #######

    assay: [String!]!
  }

  type MersAnimalSpeciesSubEstimate implements MersSubEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    estimateId: String!
    estimateInfo: MersSubEstimateInformation!
    ####### END INTERFACE FIELDS #######

    animalSpecies: MersAnimalSpecies!
  }

  type MersSexSubEstimate implements MersSubEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    estimateId: String!
    estimateInfo: MersSubEstimateInformation!
    ####### END INTERFACE FIELDS #######

    sex: String!
  }

  type MersPrimaryEstimate {
    id: String!
    estimateId: String!
    primaryEstimateInfo: PrimaryMersEstimateInformation!
    geographicalAreaSubestimates: [MersGeographicalAreaSubEstimate!]!
    ageGroupSubestimates: [MersAgeGroupSubEstimate!]!
    testUsedSubestimates: [MersTestUsedSubEstimate!]!
    animalSpeciesSubestimates: [MersAnimalSpeciesSubEstimate!]!
    sexSubestimates: [MersSexSubEstimate!]!
  }

  type Query {
    mersPrimaryEstimates: [MersPrimaryEstimate!]!
    mersEstimatesFilterOptions: MersEstimateFilterOptions!
  }
`