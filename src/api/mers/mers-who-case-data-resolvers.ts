import { MongoClient } from "mongodb";
import {
  QueryResolvers,
} from "../graphql-types/__generated__/graphql-types.js";
import {
  MersMacroSampleFrameDocument,
  MersWhoCaseDataEntryDocument,
} from "../../storage/types.js";
import { mapUnRegionForApi, mapWhoRegionForApi } from "../shared/shared-mappers.js";

interface GenerateMersWhoCaseDataResolversInput {
  mongoClient: MongoClient;
}

interface GenerateMersWhoCaseDataResolversOutput {
  mersWhoCaseDataResolvers: { Query: QueryResolvers }
}

export const generateMersWhoCaseDataResolvers = (
  input: GenerateMersWhoCaseDataResolversInput
): GenerateMersWhoCaseDataResolversOutput => {
  const { mongoClient } = input;

  const databaseName = process.env.DATABASE_NAME;

  if(!databaseName) {
    throw new Error("Unable to find value for DATABASE_NAME. Please make sure you have run generate-env-files.sh and have specified one in the appropriate environment file.")
  }

  const mersWhoCaseDataPartitionKeys = async () => {
    const [
      partitionKeys
    ] = await Promise.all([
      mongoClient
        .db(databaseName)
        .collection<MersWhoCaseDataEntryDocument>('mersWhoCaseData')
        .distinct('partitionKey')
    ])

    return partitionKeys;
  }

  const mersWhoCaseData: QueryResolvers['mersWhoCaseData'] = async (_, variables) => {
    const { partitionKey } = variables.input;

    const mersWhoCaseData = await mongoClient.db(databaseName)
      .collection<MersWhoCaseDataEntryDocument>('mersWhoCaseData')
      .find({ partitionKey })
      .toArray();

    return {
      partitionKey,
      mersWhoCaseData: mersWhoCaseData.map((document) => ({
        id: document._id.toHexString(),
        country: {
          name: document.countryName,
          alphaTwoCode: document.countryAlphaTwoCode,
          alphaThreeCode: document.countryAlphaThreeCode,
        },
        positiveCasesReported: document.positiveCasesReported,
        whoRegion: document.whoRegion ? mapWhoRegionForApi(document.whoRegion) : undefined,
        unRegion: document.unRegion ? mapUnRegionForApi(document.unRegion) : undefined,
      }))
    }
  }

  return {
    mersWhoCaseDataResolvers: {
      Query: {
        mersWhoCaseDataPartitionKeys,
        mersWhoCaseData
      }
    }
  }
}