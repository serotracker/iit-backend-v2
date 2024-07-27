import { MongoClient } from "mongodb";
import { QueryResolvers, YearlyFaoCamelPopulationDataEntry } from "../graphql-types/__generated__/graphql-types";
import { FaoYearlyCamelPopulationDataDocument } from "../../storage/types.js";
import { mapUnRegionForApi, mapWhoRegionForApi } from "../shared/shared-mappers.js";

interface GenerateMersCamelPopulationDataResolversInput {
  mongoClient: MongoClient;
}

interface GenerateMersCamelPopulationDataResolversOutput {
  mersCamelPopulationDataResolvers: { Query: QueryResolvers }
}

const transformFaoYearlyCamelPopulationDataDocumentForApi = (document: FaoYearlyCamelPopulationDataDocument): YearlyFaoCamelPopulationDataEntry => ({
  id: document._id.toHexString(),
  countryAlphaThreeCode: document.countryAlphaThreeCode,
  country: {
    alphaThreeCode: document.countryAlphaThreeCode,
    alphaTwoCode: document.countryAlphaTwoCode,
    name: document.countryName
  },
  whoRegion: document.whoRegion ? mapWhoRegionForApi(document.whoRegion) : undefined,
  unRegion: document.unRegion ? mapUnRegionForApi(document.unRegion) : undefined,
  year: document.year,
  camelCount: document.camelCount,
  camelCountPerCapita: document.camelCountPerCapita,
  note: document.note
})


export const generateMersCamelPopulationDataResolvers = (input: GenerateMersCamelPopulationDataResolversInput): GenerateMersCamelPopulationDataResolversOutput => {
  const { mongoClient } = input;

  const databaseName = process.env.DATABASE_NAME;

  if(!databaseName) {
    throw new Error("Unable to find value for DATABASE_NAME. Please make sure you have run generate-env-files.sh and have specified one in the appropriate environment file.")
  }

  const yearlyFaoCamelPopulationDataPartitionKeys = async () => {
    const [
      partitionKeys
    ] = await Promise.all([
      mongoClient
        .db(databaseName)
        .collection<FaoYearlyCamelPopulationDataDocument>('mersFaoYearlyCamelPopulationData')
        .distinct('partitionKey')
    ])

    return partitionKeys;
  }

  const partitionedYearlyFaoCamelPopulationData: QueryResolvers['partitionedYearlyFaoCamelPopulationData'] = async (_, variables) => {
    const { partitionKey } = variables.input;

    const yearlyFaoCamelPopulationData = await mongoClient.db(databaseName)
      .collection<FaoYearlyCamelPopulationDataDocument>('mersFaoYearlyCamelPopulationData')
      .find({ partitionKey })
      .toArray();

    return {
      partitionKey,
      yearlyFaoCamelPopulationData: yearlyFaoCamelPopulationData.map((document) => transformFaoYearlyCamelPopulationDataDocumentForApi(document))
    }
  }
  
  return {
    mersCamelPopulationDataResolvers: {
      Query: {
        yearlyFaoCamelPopulationDataPartitionKeys,
        partitionedYearlyFaoCamelPopulationData,
      }
    }
  }
}