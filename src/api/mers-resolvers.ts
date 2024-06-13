import { MongoClient } from "mongodb";
import uniqBy from "lodash/uniqBy.js";
import { CountryIdentifiers, MersEstimate, QueryResolvers } from "./graphql-types/__generated__/graphql-types";
import { FaoMersEventDocument, MersEstimateDocument } from '../storage/types.js';
import { mapWhoRegionForApi } from "./shared-mappers.js";
import { runCountryIdentifierAggregation } from "./aggregations/country-identifier-aggregation";

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
    const estimateCollection = mongoClient.db(databaseName).collection<MersEstimateDocument>('mersEstimates');
    const faoMersEventsCollection = mongoClient.db(databaseName).collection<FaoMersEventDocument>('mersFaoEventData');

    const [
      countryIdentifiersFromEstimates,
      countryIdentifiersFromFaoMersEvents,
      whoRegion
    ] = await Promise.all([
      runCountryIdentifierAggregation({ collection: estimateCollection }),
      runCountryIdentifierAggregation({ collection: faoMersEventsCollection }),
      mongoClient.db(databaseName).collection<MersEstimateDocument>('mersEstimates').distinct('whoRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
    ])

    // Lodash's uniqBy function keeps the first occurrence of the key so if there is a different country name
    // between the estimates and the fao mers events, the country name in the estimates will be used.
    const countryIdentifiers = uniqBy(
      [...countryIdentifiersFromEstimates, ...countryIdentifiersFromFaoMersEvents],
      (countryIdentifiers: CountryIdentifiers) => countryIdentifiers.alphaTwoCode
    )

    return {
      countryIdentifiers,
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