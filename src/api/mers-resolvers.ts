import { MongoClient } from "mongodb";
import { CountryIdentifiers, MersEstimate, QueryResolvers } from "./graphql-types/__generated__/graphql-types";
import { MersEstimateDocument } from '../storage/types.js';
import { mapWhoRegionForApi } from "./shared-mappers.js";

interface GenerateMersResolversInput {
  mongoClient: MongoClient;
}

interface GenerateMersResolversOutput {
  mersResolvers: { Query: QueryResolvers }
}

const filterUndefinedValuesFromArray = <T>(array: (T | undefined)[]): T[] => array.filter((element): element is T => !!element);

const transformMersEstimateDocumentForApi = (document: MersEstimateDocument): MersEstimate => {
  return {
    id: document._id.toHexString(),
    country: document.country,
    countryAlphaTwoCode: document.countryAlphaTwoCode,
    countryAlphaThreeCode: document.countryAlphaThreeCode,
    latitude: document.latitude,
    longitude: document.longitude,
    whoRegion: document.whoRegion ? mapWhoRegionForApi(document.whoRegion) : undefined
  }
}

export const generateMersResolvers = (input: GenerateMersResolversInput): GenerateMersResolversOutput => {
  const { mongoClient } = input;

  const databaseName = process.env.DATABASE_NAME;

  if(!databaseName) {
    throw new Error("Unable to find value for DATABASE_NAME. Please make sure you have run generate-env-files.sh and have specified one in the appropriate environment file.")
  }

  const mersEstimates = async () => {
    const databaseEstimates = await mongoClient.db(databaseName).collection<MersEstimateDocument>('mersEstimates').find({}).toArray();

    return databaseEstimates.map((estimate) => transformMersEstimateDocumentForApi(estimate));
  }

  const mersFilterOptions = async () => {
    const [
      countryIdentifiers,
      whoRegion
    ] = await Promise.all([
      mongoClient.db(databaseName).collection<MersEstimateDocument>('mersEstimates').aggregate([
        {
          $group: {
            _id: {
              alphaTwoCode: "$countryAlphaTwoCode"
            },
            name: {
              $first: "$country"
            },
            alphaThreeCode: {
              $first: "$countryAlphaThreeCode"
            }
          }
        },
        {
          $project: {
            "_id": 0,
            "alphaTwoCode": "$_id.alphaTwoCode",
            "name": 1,
            "alphaThreeCode": 1
          }
        },
        {
          $sort: {
            name: 1,
            alphaTwoCode: 1,
            alphaThreeCode: 1,
          }
        }
      ]).toArray(),
      mongoClient.db(databaseName).collection<MersEstimateDocument>('mersEstimates').distinct('whoRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
    ])

    return {
      countryIdentifiers: countryIdentifiers as CountryIdentifiers[],
      whoRegion: whoRegion.map((element) => mapWhoRegionForApi(element))
    }
  }

  return {
    mersResolvers: {
      Query: {
        mersEstimates,
        mersFilterOptions
      }
    }
  }
}