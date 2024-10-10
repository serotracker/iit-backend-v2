export const mersWhoCaseDataTypedefs = `
  input MersWhoCaseDataInput {
    partitionKey: Int!
  }
  
  type MersWhoCaseDataOutput {
    partitionKey: Int!
    mersWhoCaseData: [MersWhoCaseDataEntry!]!
  }

  type MersWhoCaseDataEntry {
    id: String!
    country: CountryIdentifiers!
    positiveCasesReported: Int!
    whoRegion: WHORegion
    unRegion: UNRegion
  }

  type Query {
    mersWhoCaseDataPartitionKeys: [Int!]!
    mersWhoCaseData(input: MersWhoCaseDataInput!): MersWhoCaseDataOutput!
  }
`