export const sarsCov2Typedefs = `
  type SarsCov2Estimate {
    antibodies: [String!]!
    isotypes: [String!]!
    isWHOUnityAligned: Boolean!
    testType: [String!]!
    sourceType: String
    riskOfBias: String
    populationGroup: String
    sex: String
    ageGroup: String
    country: String!
    countryAlphaTwoCode: String!
    countryAlphaThreeCode: String!
    whoRegion: WHORegion
    unRegion: UNRegion
    gbdSuperRegion: GBDSuperRegion
    gbdSubRegion: GBDSubRegion
    state: String
    city: String
    id: String!
    latitude: Float!
    longitude: Float!
    samplingStartDate: String
    samplingEndDate: String
    samplingMidDate: String
    countryPeopleVaccinatedPerHundred: Float
    countryPeopleFullyVaccinatedPerHundred: Float
    countryPositiveCasesPerMillionPeople: Float
  }

  type SarsCov2FilterOptions {
    ageGroup: [String!]!
    country: [String!]!
    sourceType: [String!]!
    riskOfBias: [String!]!
    unRegion: [UNRegion!]!
    whoRegion: [WHORegion!]!
    antibodies: [String!]!
    isotypes: [String!]!
    testType: [String!]!
  }

  type Query {
    sarsCov2Estimates: [SarsCov2Estimate!]!
    sarsCov2FilterOptions: SarsCov2FilterOptions!
  }
`