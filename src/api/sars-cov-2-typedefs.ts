export const sarsCov2Typedefs = `
  type SarsCov2Estimate {
    antibodies: [String!]!
    isotypes: [String!]!
    isWHOUnityAligned: Boolean!
    testType: [String!]!
    sourceType: String
    riskOfBias: String
    studyName: String!
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
    scope: String
    city: String
    id: String!
    latitude: Float!
    longitude: Float!
    samplingStartDate: String
    samplingEndDate: String
    samplingMidDate: String
    publicationDate: String
    denominatorValue: Int
    numeratorValue: Int
    seroprevalence: Float
    estimateName: String
    url: String
    countryPeopleVaccinatedPerHundred: Float
    countryPeopleFullyVaccinatedPerHundred: Float
    countryPositiveCasesPerMillionPeople: Float
  }

  type SarsCov2FilterOptions {
    ageGroup: [String!]!
    country: [String!]!
    countryIdentifiers: [CountryIdentifiers!]!
    scope: [String!]!
    sourceType: [String!]!
    riskOfBias: [String!]!
    unRegion: [UNRegion!]!
    whoRegion: [WHORegion!]!
    antibodies: [String!]!
    isotypes: [String!]!
    testType: [String!]!
  }
  
  type MonthlySarsCov2CountryInformationEntry {
    population: Int
    peopleVaccinatedPerHundred: Float
    peopleFullyVaccinatedPerHundred: Float
    positiveCasesPerMillionPeople: Float
    alphaTwoCode: String!
    alphaThreeCode: String!
    whoRegion: WHORegion
    unRegion: UNRegion
    gbdSuperRegion: GBDSuperRegion
    gbdSubRegion: GBDSubRegion
    month: Month!
    year: Int!
  }

  type Query {
    sarsCov2Estimates: [SarsCov2Estimate!]!
    sarsCov2FilterOptions: SarsCov2FilterOptions!
    monthlySarsCov2CountryInformation: [MonthlySarsCov2CountryInformationEntry!]!
  }
`