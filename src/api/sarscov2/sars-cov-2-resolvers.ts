import { MongoClient } from "mongodb";
import { SarsCov2Estimate, QueryResolvers, CountryIdentifiers, MonthlySarsCov2CountryInformationEntry } from "../graphql-types/__generated__/graphql-types";
import { SarsCov2CountryDataDocument, SarsCov2EstimateDocument } from "../../storage/types";
import { mapGbdSubRegionForApi, mapGbdSuperRegionForApi, mapMonthForApi, mapUnRegionForApi, mapWhoRegionForApi } from "../shared/shared-mappers.js";
import { runCountryIdentifierAggregation } from "../aggregations/country-identifier-aggregation.js";

interface GenerateSarsCov2ResolversInput {
  mongoClient: MongoClient;
}

interface GenerateSarsCov2ResolversOutput {
  sarsCov2Resolvers: { Query: QueryResolvers }
}

const filterUndefinedValuesFromArray = <T>(array: (T | undefined)[]): T[] => array.filter((element): element is T => !!element);

const transformSarsCov2CountryDataDocumentForApi = (document: SarsCov2CountryDataDocument): MonthlySarsCov2CountryInformationEntry => ({
  population: document.population,
  peopleVaccinatedPerHundred: document.peopleVaccinatedPerHundred,
  peopleFullyVaccinatedPerHundred: document.peopleFullyVaccinatedPerHundred,
  positiveCasesPerMillionPeople: document.positiveCasesPerMillionPeople,
  alphaTwoCode: document.alphaTwoCode,
  alphaThreeCode: document.alphaThreeCode,
  unRegion: document.unRegion ? mapUnRegionForApi(document.unRegion) : undefined,
  whoRegion: document.whoRegion ? mapWhoRegionForApi(document.whoRegion) : undefined,
  gbdSubRegion: document.gbdSubRegion ? mapGbdSubRegionForApi(document.gbdSubRegion) : undefined,
  gbdSuperRegion: document.gbdSuperRegion ? mapGbdSuperRegionForApi(document.gbdSuperRegion) : undefined,
  month: mapMonthForApi(document.month),
  year: document.year,
})

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
    publicationDate: document.publicationDate?.toISOString(),
    countryPeopleVaccinatedPerHundred: document.countryPeopleVaccinatedPerHundred,
    countryPeopleFullyVaccinatedPerHundred: document.countryPeopleFullyVaccinatedPerHundred,
    countryPositiveCasesPerMillionPeople: document.countryPositiveCasesPerMillionPeople,
    sex: document.sex,
    sourceType: document.sourceType,
    antibodies: document.antibodies,
    isotypes: document.isotypes,
    isWHOUnityAligned: document.isWHOUnityAligned,
    testType: document.testType,
    denominatorValue: document.denominatorValue,
    estimateName: document.estimateName,
    url: document.url,
    numeratorValue: document.numeratorValue,
    seroprevalence: document.seroprevalence
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

  const partitionedSarsCov2Estimates: QueryResolvers['partitionedSarsCov2Estimates'] = async (_, variables) => {
    const { partitionKey } = variables.input;

    const databaseEstimates = await mongoClient.db(databaseName)
      .collection<SarsCov2EstimateDocument>('sarsCov2Estimates')
      .find({ partitionKey })
      .toArray();

    return {
      partitionKey,
      sarsCov2Estimates: databaseEstimates.map((estimate) => transformSarsCov2EstimateDocumentForApi(estimate))
    }
  }

  const allSarsCov2EstimatePartitionKeys = async () => {
    const [
      partitionKeys
    ] = await Promise.all([
      mongoClient
        .db(databaseName)
        .collection<SarsCov2EstimateDocument>('sarsCov2Estimates')
        .distinct('partitionKey')
    ])

    return partitionKeys;
  }

  const sarsCov2FilterOptions = async () => {
    const estimateCollection = mongoClient.db(databaseName).collection<SarsCov2EstimateDocument>('sarsCov2Estimates');

    const [
      ageGroup,
      country,
      scope,
      sex,
      populationGroup,
      sourceType,
      riskOfBias,
      unRegion,
      whoRegion,
      antibodies,
      isotypes,
      testType,
      countryIdentifiers
    ] = await Promise.all([
      estimateCollection.distinct('ageGroup').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('country').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('scope').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('sex').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('populationGroup').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('sourceType').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('riskOfBias').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('unRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('whoRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('antibodies').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('isotypes').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('testType').then((elements) => filterUndefinedValuesFromArray(elements)),
      runCountryIdentifierAggregation({ collection: estimateCollection })
    ])

    return {
      ageGroup,
      country,
      scope,
      sex,
      populationGroup,
      sourceType,
      riskOfBias,
      unRegion: unRegion.map((region) => mapUnRegionForApi(region)),
      whoRegion: whoRegion.map((region) => mapWhoRegionForApi(region)),
      antibodies,
      isotypes,
      testType,
      countryIdentifiers
    }
  }

  const monthlySarsCov2CountryInformation = async () => {
    const monthlySarsCov2CountryInformationDocuments = await mongoClient
      .db(databaseName)
      .collection<SarsCov2CountryDataDocument>('sarsCov2CountryData')
      .find({})
      .toArray();

    return monthlySarsCov2CountryInformationDocuments.map((document) => transformSarsCov2CountryDataDocumentForApi(document));
  }

  const partitionedMonthlySarsCov2CountryInformation: QueryResolvers['partitionedMonthlySarsCov2CountryInformation'] = async (_, variables) => {
    const { partitionKey } = variables.input;

    const monthlySarsCov2CountryInformationDocuments = await mongoClient
      .db(databaseName)
      .collection<SarsCov2CountryDataDocument>('sarsCov2CountryData')
      .find({ partitionKey })
      .toArray();

    return {
      partitionKey,
      monthlySarsCov2CountryInformation: monthlySarsCov2CountryInformationDocuments.map((document) => transformSarsCov2CountryDataDocumentForApi(document))
    }
  }
  
  const allMonthlySarsCov2CountryInformationPartitionKeys = async () => {
    const [
      partitionKeys
    ] = await Promise.all([
      mongoClient
        .db(databaseName)
        .collection<SarsCov2CountryDataDocument>('sarsCov2CountryData')
        .distinct('partitionKey')
    ])

    return partitionKeys;
  }
  
  return {
    sarsCov2Resolvers: {
      Query: {
        sarsCov2Estimates,
        sarsCov2FilterOptions,
        partitionedSarsCov2Estimates,
        allSarsCov2EstimatePartitionKeys,
        monthlySarsCov2CountryInformation,
        partitionedMonthlySarsCov2CountryInformation,
        allMonthlySarsCov2CountryInformationPartitionKeys
      }
    }
  }
}