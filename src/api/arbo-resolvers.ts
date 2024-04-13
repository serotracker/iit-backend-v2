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
    country: document.country,
    countryAlphaTwoCode: document.countryAlphaTwoCode,
    createdAt: document.createdAt.toISOString(),
    estimateId: document.estimateId,
    id: document._id.toHexString(),
    inclusionCriteria: document.inclusionCriteria,
    latitude: document.latitude,
    longitude: document.longitude,
    pathogen: document.pathogen,
    pediatricAgeGroup: document.pediatricAgeGroup,
    producer: document.producer,
    producerOther: document.producerOther,
    sameFrameTargetGroup: document.sameFrameTargetGroup,
    sampleEndDate: document.sampleEndDate?.toISOString(),
    sampleFrame: document.sampleFrame,
    sampleNumerator: document.sampleNumerator,
    sampleSize: document.sampleSize,
    sampleStartDate: document.sampleStartDate?.toISOString(),
    seroprevalence: document.seroprevalence,
    seroprevalenceStudy95CILower: document.seroprevalenceStudy95CILower,
    seroprevalenceStudy95CIUpper: document.seroprevalenceStudy95CIUpper,
    seroprevalenceCalculated95CILower: document.seroprevalenceCalculated95CILower,
    seroprevalenceCalculated95CIUpper: document.seroprevalenceCalculated95CIUpper,
    serotype: document.serotype,
    sex: document.sex,
    sourceSheetId: document.sourceSheetId,
    sourceSheetName: document.sourceSheetName,
    unRegion: document.unRegion,
    url: document.url,
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
      pathogen,
      pediatricAgeGroup,
      producer,
      sampleFrame,
      serotype,
      sex,
      unRegion,
      whoRegion
    ] = await Promise.all([
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('ageGroup').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('antibodies').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('assay').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('country').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('pathogen').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('pediatricAgeGroup').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('producer').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('sampleFrame').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('serotype').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('sex').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('unRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('whoRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
    ])

    return {
      ageGroup,
      antibody,
      assay,
      country,
      pathogen,
      pediatricAgeGroup,
      producer,
      sampleFrame,
      serotype,
      sex,
      unRegion,
      whoRegion,
    }
  }

  const arbovirusDataStatistics = async () => {

    const [
      patricipantCountResult,
      sourceCount,
      estimateCount,
      countryCount
    ] = await Promise.all([
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').aggregate([
        {
          $group: {
            _id: null, // Group all documents together
            totalSampleSize: { $sum: "$sampleSize" } // Sum the sampleSize field values
          }
        }
      ]).toArray(),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('sourceSheetId').then((elements) => elements.length),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').countDocuments(),
      mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates').distinct('country').then((elements) => elements.length)
    ]);

    const patricipantCount = patricipantCountResult.length > 0 ? patricipantCountResult[0].totalSampleSize : 0;  
    // The result is an array with a single object, e.g., [{ uniqueSourceIdsCount: <count> }]
   
    return {
      patricipantCount,
      sourceCount,
      estimateCount,
      countryCount
    }
  }

  
  return {
    arboResolvers: {
      Query: {
        arbovirusEstimates,
        arbovirusFilterOptions,
        arbovirusDataStatistics
      }
    }
  }
}