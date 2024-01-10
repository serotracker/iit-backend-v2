import { MongoClient } from "mongodb";
import { ArbovirusEstimate, QueryResolvers } from "./graphql-types/__generated__/graphql-types";
import { ArbovirusEstimateDocument } from "../storage/types";

interface GenerateArboResolversInput {
  mongoClient: MongoClient;
}

interface GenerateArboResolversOutput {
  arboResolvers: { Query: QueryResolvers }
}

const filterUndefinedValuesFromArray = <T>(array: (T | undefined)[]): T[] => array.filter((element): element is T => !!element);

const transformArbovirusEstimateDocumentForApi = (document: ArbovirusEstimateDocument): ArbovirusEstimate => {
  return {
    ageGroup: document.ageGroup,
    ageMaximum: document.ageMaximum,
    ageMinimum: document.ageMaximum,
    antibodies: document.antibodies ?? [],
    antigen: document.antigen,
    assay: document.assay,
    assayOther: document.assayOther,
    city: document.city,
    state: document.state,
    countryDeprecated: document.country,
    country: document.country,
    createdAt: document.createdAt.toISOString(),
    estimateId: document.estimateId,
    id: document._id.toHexString(),
    inclusionCriteria: document.inclusionCriteria,
    latitude: document.latitude,
    longitude: document.longitude,
    pathogen: document.pathogen,
    producer: document.producer,
    producerOther: document.producerOther,
    sameFrameTargetGroup: document.sameFrameTargetGroup,
    sampleEndDate: document.sampleEndDate?.toISOString(),
    sampleFrame: document.sampleFrame,
    sampleNumerator: document.sampleNumerator,
    sampleSize: document.sampleSize,
    sampleStartDate: document.sampleStartDate?.toISOString(),
    seroprevalence: document.seroprevalence,
    serotype: document.serotype,
    sex: document.sex,
    sourceSheetId: document.sourceSheetId,
    sourceSheetName: document.sourceSheetName,
    url: document.url,
    whoRegionDeprecated: document.whoRegion,
    whoRegion: document.whoRegion
  }
}

export const generateArboResolvers = (input: GenerateArboResolversInput): GenerateArboResolversOutput => {
  const { mongoClient } = input;

  const databaseName = process.env.DATABASE_NAME;

  if(!databaseName) {
    throw new Error("Unable to find value for DATABASE_NAME. Please make sure you have run generate-env-files.sh and have specified one in the appropriate environment file.")
  }

  const arbovirusEstimates = async () => {
    const databaseEstimates = await mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').find({}).toArray();

    return databaseEstimates.map((estimate) => transformArbovirusEstimateDocumentForApi(estimate));
  }

  const arbovirusFilterOptions = async () => {
    const [
      ageGroup,
      antibody,
      assay,
      country,
      countryDeprecated,
      pathogen,
      producer,
      sampleFrame,
      serotype,
      sex,
      whoRegion,
      whoRegionDeprecated
    ] = await Promise.all([
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('ageGroup').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('antibodies').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('assay').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('country').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('country').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('pathogen').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('producer').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('sampleFrame').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('serotype').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('sex').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('whoRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('whoRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
    ])

    return {
      ageGroup,
      antibody,
      assay,
      country,
      countryDeprecated,
      pathogen,
      producer,
      sampleFrame,
      serotype,
      sex,
      whoRegion,
      whoRegionDeprecated
    }
  }

  return {
    arboResolvers: {
      Query: {
        arbovirusEstimates,
        arbovirusFilterOptions
      }
    }
  }
}