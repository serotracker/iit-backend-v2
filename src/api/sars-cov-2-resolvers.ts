import { MongoClient } from "mongodb";
import { SarsCov2Estimate, QueryResolvers } from "./graphql-types/__generated__/graphql-types";
import { ArbovirusEstimateDocument, SarsCov2EstimateDocument } from "../storage/types";

interface GenerateSarsCov2ResolversInput {
  mongoClient: MongoClient;
}

interface GenerateSarsCov2ResolversOutput {
  sarsCov2Resolvers: { Query: QueryResolvers }
}

const filterUndefinedValuesFromArray = <T>(array: (T | undefined)[]): T[] => array.filter((element): element is T => !!element);

const transformSarsCov2EstimateDocumentForApi = (document: SarsCov2EstimateDocument): SarsCov2Estimate => {
  return {
    id: document._id.toHexString(),
    ageGroup: document.ageGroup,
    latitude: document.latitude,
    longitude: document.longitude,
    country: document.country,
    state: document.state,
    city: document.city,
    populationGroup: document.populationGroup,
    riskOfBias: document.riskOfBias,
    samplingEndDate: document.samplingEndDate?.toISOString(),
    samplingStartDate: document.samplingStartDate?.toISOString(),
    sex: document.sex,
    sourceType: document.sourceType
  }
}

export const generateSarsCov2Resolvers = (input: GenerateSarsCov2ResolversInput): GenerateSarsCov2ResolversOutput => {
  const { mongoClient } = input;

  const databaseName = process.env.DATABASE_NAME;

  if(!databaseName) {
    throw new Error("Unable to find value for DATABASE_NAME. Please make sure you have run generate-env-files.sh and have specified one in the appropriate environment file.")
  }

  const sarsCov2Estimates = async () => {
    const databaseEstimates = await mongoClient.db(databaseName).collection<SarsCov2EstimateDocument>('sarsCov2Estimates').find({}).toArray();

    return databaseEstimates.map((estimate) => transformSarsCov2EstimateDocumentForApi(estimate));
  }

  const sarsCov2FilterOptions = async () => {
    const [
      ageGroup,
      country,
      sourceType,
      riskOfBias,
    ] = await Promise.all([
      mongoClient.db(databaseName).collection<SarsCov2EstimateDocument>('sarsCov2Estimates').distinct('ageGroup').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<SarsCov2EstimateDocument>('sarsCov2Estimates').distinct('country').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<SarsCov2EstimateDocument>('sarsCov2Estimates').distinct('sourceType').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<SarsCov2EstimateDocument>('sarsCov2Estimates').distinct('riskOfBias').then((elements) => filterUndefinedValuesFromArray(elements)),
    ])

    return {
      ageGroup,
      country,
      sourceType,
      riskOfBias,
    }
  }
  
  return {
    sarsCov2Resolvers: {
      Query: {
        sarsCov2Estimates,
        sarsCov2FilterOptions,
      }
    }
  }
}