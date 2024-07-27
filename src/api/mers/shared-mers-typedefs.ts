export const sharedMersTypedefs = `
  type MersFilterOptions {
    countryIdentifiers: [CountryIdentifiers!]!
    whoRegion: [WHORegion!]!
    unRegion: [UNRegion!]!
  }

  type Query {
    mersFilterOptions: MersFilterOptions!
  }
`