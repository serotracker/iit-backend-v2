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
    DONKEY
    WATER_BUFFALO
    BABOON
  }

  enum Clade {
    A
    B
    C1
    C2
    C
  }

  enum GenomeSequenced {
    FULL_LENGTH
    PARTIAL_S_GENE
    PARTIAL_N_GENE
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
    exposureToCamels: [String!]!
    antigen: [String!]!
    testProducer: [String!]!
    testValidation: [String!]!
    clade: [Clade!]!
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
    district: String
    country: String!
    countryAlphaTwoCode: String!
    countryAlphaThreeCode: String!
    latitude: Float!
    longitude: Float!
    whoRegion: WHORegion
    unRegion: UNRegion
    firstAuthorFullName: String!
    sourcePublicationYear: Int!
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
    specimenType: [String!]!
    sex: String
    socioeconomicStatus: String
    exposureToCamels: String
    isotypes: [String!]!
    antigen: [String!]!
    samplingStartDate: String
    samplingEndDate: String
    samplingMidDate: String
    samplingMethod: String
    geographicScope: String
    testProducer: [String!]!
    testProducerOther: String
    testValidatedOn: String
    positiveCutoff: String
    symptomPrevalenceOfPositives: Float
    symptomDefinition: String
    testValidation: [String!]!
    sequencingDone: Boolean!
    clade: [Clade!]!
    accessionNumbers: String
    genomeSequenced: [GenomeSequenced!]!
  }

  type PrimaryHumanMersViralEstimateInformation implements PrimaryMersEstimateInformationInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    type: MersEstimateType!
    estimateId: String!
    city: String
    state: String
    district: String
    country: String!
    countryAlphaTwoCode: String!
    countryAlphaThreeCode: String!
    latitude: Float!
    longitude: Float!
    whoRegion: WHORegion
    unRegion: UNRegion
    firstAuthorFullName: String!
    sourcePublicationYear: Int!
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
    specimenType: [String!]!
    sex: String
    socioeconomicStatus: String
    exposureToCamels: String
    isotypes: [String!]!
    antigen: [String!]!
    samplingStartDate: String
    samplingEndDate: String
    samplingMidDate: String
    samplingMethod: String
    geographicScope: String
    testProducer: [String!]!
    testProducerOther: String
    testValidatedOn: String
    positiveCutoff: String
    symptomPrevalenceOfPositives: Float
    symptomDefinition: String
    testValidation: [String!]!
    sequencingDone: Boolean!
    clade: [Clade!]!
    accessionNumbers: String
    genomeSequenced: [GenomeSequenced!]!
    ####### END INTERFACE FIELDS #######

    positivePrevalence: Float!
    positivePrevalence95CILower: Float
    positivePrevalence95CIUpper: Float
    positivePrevalenceCalculated95CILower: Float!
    positivePrevalenceCalculated95CIUpper: Float!
    ageGroup: [String!]!
    sampleFrame: String
    humanCountriesOfTravel: [CountryIdentifiers!]!
  }

  type PrimaryAnimalMersViralEstimateInformation implements PrimaryMersEstimateInformationInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    type: MersEstimateType!
    estimateId: String!
    city: String
    state: String
    district: String
    country: String!
    countryAlphaTwoCode: String!
    countryAlphaThreeCode: String!
    latitude: Float!
    longitude: Float!
    whoRegion: WHORegion
    unRegion: UNRegion
    firstAuthorFullName: String!
    sourcePublicationYear: Int!
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
    specimenType: [String!]!
    sex: String
    socioeconomicStatus: String
    exposureToCamels: String
    isotypes: [String!]!
    antigen: [String!]!
    samplingStartDate: String
    samplingEndDate: String
    samplingMidDate: String
    samplingMethod: String
    geographicScope: String
    testProducer: [String!]!
    testProducerOther: String
    testValidatedOn: String
    positiveCutoff: String
    symptomPrevalenceOfPositives: Float
    symptomDefinition: String
    testValidation: [String!]!
    sequencingDone: Boolean!
    clade: [Clade!]!
    accessionNumbers: String
    genomeSequenced: [GenomeSequenced!]!
    ####### END INTERFACE FIELDS #######

    positivePrevalence: Float!
    positivePrevalence95CILower: Float
    positivePrevalence95CIUpper: Float
    positivePrevalenceCalculated95CILower: Float!
    positivePrevalenceCalculated95CIUpper: Float!
    animalType: [MersAnimalType!]!
    animalSpecies: MersAnimalSpecies!
    animalDetectionSettings: [String!]!
    animalPurpose: String
    animalImportedOrLocal: String
    animalAgeGroup: [String!]!
    animalCountriesOfImport: [CountryIdentifiers!]!
  }

  type PrimaryHumanMersSeroprevalenceEstimateInformation implements PrimaryMersEstimateInformationInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    type: MersEstimateType!
    estimateId: String!
    city: String
    state: String
    district: String
    country: String!
    countryAlphaTwoCode: String!
    countryAlphaThreeCode: String!
    latitude: Float!
    longitude: Float!
    whoRegion: WHORegion
    unRegion: UNRegion
    firstAuthorFullName: String!
    sourcePublicationYear: Int!
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
    specimenType: [String!]!
    sex: String
    socioeconomicStatus: String
    exposureToCamels: String
    isotypes: [String!]!
    antigen: [String!]!
    samplingStartDate: String
    samplingEndDate: String
    samplingMidDate: String
    samplingMethod: String
    geographicScope: String
    testProducer: [String!]!
    testProducerOther: String
    testValidatedOn: String
    positiveCutoff: String
    symptomPrevalenceOfPositives: Float
    symptomDefinition: String
    testValidation: [String!]!
    sequencingDone: Boolean!
    clade: [Clade!]!
    accessionNumbers: String
    genomeSequenced: [GenomeSequenced!]!
    ####### END INTERFACE FIELDS #######

    seroprevalence: Float!
    seroprevalence95CILower: Float
    seroprevalence95CIUpper: Float
    seroprevalenceCalculated95CILower: Float!
    seroprevalenceCalculated95CIUpper: Float!
    ageGroup: [String!]!
    sampleFrame: String
    humanCountriesOfTravel: [CountryIdentifiers!]!
  }

  type PrimaryAnimalMersSeroprevalenceEstimateInformation implements PrimaryMersEstimateInformationInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    type: MersEstimateType!
    estimateId: String!
    city: String
    state: String
    district: String
    country: String!
    countryAlphaTwoCode: String!
    countryAlphaThreeCode: String!
    latitude: Float!
    longitude: Float!
    whoRegion: WHORegion
    unRegion: UNRegion
    firstAuthorFullName: String!
    sourcePublicationYear: Int!
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
    specimenType: [String!]!
    sex: String
    socioeconomicStatus: String
    exposureToCamels: String
    isotypes: [String!]!
    antigen: [String!]!
    samplingStartDate: String
    samplingEndDate: String
    samplingMidDate: String
    samplingMethod: String
    geographicScope: String
    testProducer: [String!]!
    testProducerOther: String
    testValidatedOn: String
    positiveCutoff: String
    symptomPrevalenceOfPositives: Float
    symptomDefinition: String
    testValidation: [String!]!
    sequencingDone: Boolean!
    clade: [Clade!]!
    accessionNumbers: String
    genomeSequenced: [GenomeSequenced!]!
    ####### END INTERFACE FIELDS #######

    seroprevalence: Float!
    seroprevalence95CILower: Float
    seroprevalence95CIUpper: Float
    seroprevalenceCalculated95CILower: Float!
    seroprevalenceCalculated95CIUpper: Float!
    animalType: [MersAnimalType!]!
    animalSpecies: MersAnimalSpecies!
    animalDetectionSettings: [String!]!
    animalPurpose: String
    animalImportedOrLocal: String
    animalAgeGroup: [String!]!
    animalCountriesOfImport: [CountryIdentifiers!]!
  }

  union PrimaryMersEstimateInformation = PrimaryAnimalMersSeroprevalenceEstimateInformation | PrimaryHumanMersSeroprevalenceEstimateInformation | PrimaryAnimalMersViralEstimateInformation |  PrimaryHumanMersViralEstimateInformation

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
    positivePrevalenceCalculated95CILower: Float!
    positivePrevalenceCalculated95CIUpper: Float!
  }

  type MersSeroprevalenceSubEstimateInformation implements MersSubEstimateInformationInterface {
    ####### START INTERFACE FIELDS #######
    sampleDenominator: Int
    sampleNumerator: Int
    ####### END INTERFACE FIELDS #######

    seroprevalence: Float!
    seroprevalence95CILower: Float
    seroprevalence95CIUpper: Float
    seroprevalenceCalculated95CILower: Float!
    seroprevalenceCalculated95CIUpper: Float!
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
    district: String
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
    ageGroupLabel: String!
  }

  type AnimalMersAgeGroupSubEstimate implements MersSubEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    estimateId: String!
    estimateInfo: MersSubEstimateInformation!
    ####### END INTERFACE FIELDS #######

    animalAgeGroup: [String!]!
    animalAgeGroupLabel: String!
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

  type MersTimeFrameSubEstimate implements MersSubEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    estimateId: String!
    estimateInfo: MersSubEstimateInformation!
    ####### END INTERFACE FIELDS #######

    samplingStartDate: String!
    samplingEndDate: String!
  }

  type MersSampleTypeSubEstimate implements MersSubEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    estimateId: String!
    estimateInfo: MersSubEstimateInformation!
    ####### END INTERFACE FIELDS #######

    specimenType: [String!]!
  }

  type MersOccupationSubEstimate implements MersSubEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    estimateId: String!
    estimateInfo: MersSubEstimateInformation!
    ####### END INTERFACE FIELDS #######

    occupation: String!
    sampleFrame: String
    exposureToCamels: String
  }

  type MersHumanCountriesOfTravelSubEstimate implements MersSubEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    estimateId: String!
    estimateInfo: MersSubEstimateInformation!
    ####### END INTERFACE FIELDS #######

    humanCountriesOfTravel: [CountryIdentifiers!]!
  }

  type MersAnimalSourceLocationSubEstimate implements MersSubEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    estimateId: String!
    estimateInfo: MersSubEstimateInformation!
    ####### END INTERFACE FIELDS #######

    animalImportedOrLocal: String!
    animalCountryOfImport: String! @deprecated(reason: "use animalCountriesOfImport instead")
    animalCountryOfImportAlphaTwoCode: String! @deprecated(reason: "use animalCountriesOfImport instead")
    animalCountryOfImportAlphaThreeCode: String! @deprecated(reason: "use animalCountriesOfImport instead")
    animalCountriesOfImport: [CountryIdentifiers!]!
  }

  type MersAnimalSamplingContextSubEstimate implements MersSubEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    estimateId: String!
    estimateInfo: MersSubEstimateInformation!
    ####### END INTERFACE FIELDS #######

    animalDetectionSettings: [String!]!
  }

  type MersCamelExposureLevelSubEstimate implements MersSubEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    estimateId: String!
    estimateInfo: MersSubEstimateInformation!
    ####### END INTERFACE FIELDS #######

    details: String!
    sampleFrame: String!
    exposureToCamels: String!
  }

  type MersNomadismSubEstimate implements MersSubEstimateInterface {
    ####### START INTERFACE FIELDS #######
    id: String!
    estimateId: String!
    estimateInfo: MersSubEstimateInformation!
    ####### END INTERFACE FIELDS #######

    details: String!
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
    timeFrameSubestimates: [MersTimeFrameSubEstimate!]!
    sampleTypeSubestimates: [MersSampleTypeSubEstimate!]!
    occupationSubestimates: [MersOccupationSubEstimate!]!
    animalSourceLocationSubestimates: [MersAnimalSourceLocationSubEstimate!]!
    animalSamplingContextSubestimates: [MersAnimalSamplingContextSubEstimate!]!
    camelExposureLevelSubestimates: [MersCamelExposureLevelSubEstimate!]!
    nomadismSubestimates: [MersNomadismSubEstimate!]!
    humanCountriesOfTravelSubestimates: [MersHumanCountriesOfTravelSubEstimate!]!
  }

  type Query {
    mersPrimaryEstimates: [MersPrimaryEstimate!]!
    mersEstimatesFilterOptions: MersEstimateFilterOptions!
  }
`