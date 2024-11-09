export const mersEventTypedefs = `
  enum MersEventAnimalType {
    DOMESTIC
    WILD
  }

  enum MersEventAnimalSpecies {
    CAMEL
    BAT
    GOAT
    SHEEP
    CATTLE
    DONKEY
    WATER_BUFFALO
    BABOON
  }

  enum MersEventType {
    HUMAN
    ANIMAL
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
    animalSpeciesV2: MersAnimalSpeciesV2!
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

  type FaoMersEventFilterOptions {
    diagnosisSource: [MersDiagnosisSource!]!
    animalType: [MersEventAnimalType!]!
    animalSpecies: [MersEventAnimalSpecies!]!
    animalSpeciesV2: [MersAnimalSpeciesV2!]!
  }

  type Query {
    allFaoMersEventPartitionKeys: [Int!]!
    partitionedFaoMersEvents(input: PartitionedFaoMersEventsInput!): PartitionedFeoMersEventsOutput!
    faoMersEventFilterOptions: FaoMersEventFilterOptions!
  }
`