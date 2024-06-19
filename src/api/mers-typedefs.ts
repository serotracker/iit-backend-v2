export const mersTypedefs = `
  type MersEstimate {
    id: String!
    country: String!
    countryAlphaTwoCode: String!
    countryAlphaThreeCode: String!
    latitude: Float!
    longitude: Float!
    whoRegion: WHORegion
  }

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

  type MersFilterOptions {
    countryIdentifiers: [CountryIdentifiers!]!
    whoRegion: [WHORegion!]!
  }
    
  input PartitionedYearlyFaoCamelPopulationDataInput {
    partitionKey: Int!
  }

  type YearlyFaoCamelPopulationDataEntry {
    id: String!
    countryAlphaThreeCode: String!
    country: CountryIdentifiers!
    year: Int!
    camelCount: Int!
    camelCountPerCapita: Float
    note: String!
  }
  
  type PartitionedYearlyFaoCamelPopulationDataOutput {
    partitionKey: Int!
    yearlyFaoCamelPopulationData: [YearlyFaoCamelPopulationDataEntry!]!
  }

  type Query {
    mersEstimates: [MersEstimate!]!
    allFaoMersEventPartitionKeys: [Int!]!
    partitionedFaoMersEvents(input: PartitionedFaoMersEventsInput!): PartitionedFeoMersEventsOutput!
    yearlyFaoCamelPopulationDataPartitionKeys: [Int!]!
    partitionedYearlyFaoCamelPopulationData(input: PartitionedYearlyFaoCamelPopulationDataInput!): PartitionedYearlyFaoCamelPopulationDataOutput!
    mersFilterOptions: MersFilterOptions!
  }
`