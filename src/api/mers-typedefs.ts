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

  type MersFilterOptions {
    countryIdentifiers: [CountryIdentifiers!]!
    whoRegion: [WHORegion!]!
  }

  type Query {
    mersEstimates: [MersEstimate!]!
    mersFilterOptions: MersFilterOptions!
  }
`