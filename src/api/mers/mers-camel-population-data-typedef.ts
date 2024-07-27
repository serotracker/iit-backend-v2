export const mersCamelPopulationDataTypedefs = `
  input PartitionedYearlyFaoCamelPopulationDataInput {
    partitionKey: Int!
  }
  
  type PartitionedYearlyFaoCamelPopulationDataOutput {
    partitionKey: Int!
    yearlyFaoCamelPopulationData: [YearlyFaoCamelPopulationDataEntry!]!
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

  type Query {
    yearlyFaoCamelPopulationDataPartitionKeys: [Int!]!
    partitionedYearlyFaoCamelPopulationData(input: PartitionedYearlyFaoCamelPopulationDataInput!): PartitionedYearlyFaoCamelPopulationDataOutput!
  }
`