import { MongoClient } from "mongodb";
import { SarsCov2Estimate, QueryResolvers } from "./graphql-types/__generated__/graphql-types";
import { SarsCov2EstimateDocument } from "../storage/types";
import { mapGbdSubRegionForApi, mapGbdSuperRegionForApi, mapUnRegionForApi, mapWhoRegionForApi } from "./shared-mappers.js";

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
    countryAlphaTwoCode: document.countryAlphaTwoCode,
    countryAlphaThreeCode: document.countryAlphaThreeCode,
    unRegion: document.unRegion ? mapUnRegionForApi(document.unRegion) : undefined,
    whoRegion: document.whoRegion ? mapWhoRegionForApi(document.whoRegion) : undefined,
    gbdSubRegion: document.gbdSubRegion ? mapGbdSubRegionForApi(document.gbdSubRegion) : undefined,
    gbdSuperRegion: document.gbdSuperRegion ? mapGbdSuperRegionForApi(document.gbdSuperRegion) : undefined,
    state: document.state,
    scope: document.scope,
    studyName: document.studyName,
    city: document.city,
    populationGroup: document.populationGroup,
    riskOfBias: document.riskOfBias,
    samplingEndDate: document.samplingEndDate?.toISOString(),
    samplingStartDate: document.samplingStartDate?.toISOString(),
    samplingMidDate: document.samplingMidDate?.toISOString(),
    countryPeopleVaccinatedPerHundred: document.countryPeopleVaccinatedPerHundred,
    countryPeopleFullyVaccinatedPerHundred: document.countryPeopleFullyVaccinatedPerHundred,
    countryPositiveCasesPerMillionPeople: document.countryPositiveCasesPerMillionPeople,
    sex: document.sex,
    sourceType: document.sourceType,
    antibodies: document.antibodies,
    isotypes: document.isotypes,
    isWHOUnityAligned: document.isWHOUnityAligned,
    testType: document.testType
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
      scope,
      sourceType,
      riskOfBias,
      unRegion,
      whoRegion,
      antibodies,
      isotypes,
      testType
    ] = await Promise.all([
      mongoClient.db(databaseName).collection<SarsCov2EstimateDocument>('sarsCov2Estimates').distinct('ageGroup').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<SarsCov2EstimateDocument>('sarsCov2Estimates').distinct('country').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<SarsCov2EstimateDocument>('sarsCov2Estimates').distinct('scope').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<SarsCov2EstimateDocument>('sarsCov2Estimates').distinct('sourceType').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<SarsCov2EstimateDocument>('sarsCov2Estimates').distinct('riskOfBias').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<SarsCov2EstimateDocument>('sarsCov2Estimates').distinct('unRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<SarsCov2EstimateDocument>('sarsCov2Estimates').distinct('whoRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<SarsCov2EstimateDocument>('sarsCov2Estimates').distinct('antibodies').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<SarsCov2EstimateDocument>('sarsCov2Estimates').distinct('isotypes').then((elements) => filterUndefinedValuesFromArray(elements)),
      mongoClient.db(databaseName).collection<SarsCov2EstimateDocument>('sarsCov2Estimates').distinct('testType').then((elements) => filterUndefinedValuesFromArray(elements)),
    ])

    return {
      ageGroup,
      country,
      scope,
      sourceType,
      riskOfBias,
      unRegion: unRegion.map((region) => mapUnRegionForApi(region)),
      whoRegion: whoRegion.map((region) => mapWhoRegionForApi(region)),
      antibodies,
      isotypes,
      testType,
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