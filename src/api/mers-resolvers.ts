import { MongoClient } from "mongodb";
import uniqBy from "lodash/uniqBy.js";
import uniq from "lodash/uniq.js";
import {
  CountryIdentifiers,
  MersEstimate,
  MersEvent,
  MersEventType as MersEventTypeForApi,
  MersEventAnimalType as MersEventAnimalTypeForApi,
  MersEventAnimalSpecies as MersEventAnimalSpeciesForApi,
  MersDiagnosisStatus as MersDiagnosisStatusForApi,
  MersDiagnosisSource as MersDiagnosisSourceForApi,
  MersEventInterface,
  QueryResolvers,
  YearlyFaoCamelPopulationDataEntry
} from "./graphql-types/__generated__/graphql-types.js";
import {
  FaoMersEventDocument,
  FaoMersEventDocumentBase,
  MersDiagnosisStatus,
  MersDiagnosisSource,
  MersEstimateDocument,
  MersEventAnimalSpecies,
  MersEventAnimalType,
  MersEventType,
  FaoYearlyCamelPopulationDataDocument
} from '../storage/types.js';
import { mapWhoRegionForApi } from "./shared-mappers.js";
import { runCountryIdentifierAggregation } from "./aggregations/country-identifier-aggregation.js";
import assertNever from "assert-never";

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

const faoMersEventAnimalSpeciesMap = {
  [MersEventAnimalSpecies.BAT]: MersEventAnimalSpeciesForApi.Bat,
  [MersEventAnimalSpecies.CAMEL]: MersEventAnimalSpeciesForApi.Camel,
}

const transformFaoMersEventAnimalSpeciesForApi = (animalSpecies: MersEventAnimalSpecies): MersEventAnimalSpeciesForApi => 
  faoMersEventAnimalSpeciesMap[animalSpecies];

const faoMersEventAnimalTypeMap = {
  [MersEventAnimalType.DOMESTIC]: MersEventAnimalTypeForApi.Domestic,
  [MersEventAnimalType.WILD]: MersEventAnimalTypeForApi.Wild
}

const transformFaoMersEventAnimalTypeForApi = (animalType: MersEventAnimalType): MersEventAnimalTypeForApi => 
  faoMersEventAnimalTypeMap[animalType];

const faoMersEventDiagnosisStatusMap = {
  [MersDiagnosisStatus.CONFIRMED]: MersDiagnosisStatusForApi.Confirmed,
  [MersDiagnosisStatus.DENIED]: MersDiagnosisStatusForApi.Denied,
}

const transformFaoMersEventDiagnosisStatusForApi = (diagnosisStatus: MersDiagnosisStatus): MersDiagnosisStatusForApi => 
  faoMersEventDiagnosisStatusMap[diagnosisStatus];

const faoMersEventDiagnosisSourceMap = {
  [MersDiagnosisSource.MEDIA]: MersDiagnosisSourceForApi.Media,
  [MersDiagnosisSource.PUBLICATIONS]: MersDiagnosisSourceForApi.Publications,
  [MersDiagnosisSource.FAO_FIELD_OFFICER]: MersDiagnosisSourceForApi.FaoFieldOfficer,
  [MersDiagnosisSource.NATIONAL_AUTHORITIES]: MersDiagnosisSourceForApi.NationalAuthorities,
  [MersDiagnosisSource.WORLD_ORGANISATION_FOR_ANIMAL_HEALTH]: MersDiagnosisSourceForApi.WorldOrganisationForAnimalHealth,
  [MersDiagnosisSource.WORLD_HEALTH_ORGANIZATION]: MersDiagnosisSourceForApi.WorldHealthOrganization,
}

const transformFaoMersEventDiagnosisSourceForApi = (diagnosisSource: MersDiagnosisSource): MersDiagnosisSourceForApi => 
  faoMersEventDiagnosisSourceMap[diagnosisSource];

const transformFaoMersEventDocumentBaseForApi = (document: FaoMersEventDocumentBase): Omit<MersEventInterface, 'type'> => ({
  id: document._id.toHexString(),
  country: {
    name: document.country,
    alphaTwoCode: document.countryAlphaTwoCode,
    alphaThreeCode: document.countryAlphaThreeCode
  },
  state: document.state,
  city: document.city,
  latitude: document.latitude,
  longitude: document.longitude,
  diagnosisStatus: transformFaoMersEventDiagnosisStatusForApi(document.diagnosisStatus),
  diagnosisSource: transformFaoMersEventDiagnosisSourceForApi(document.diagnosisSource),
  reportDate: document.reportDate.toISOString(),
  whoRegion: document.whoRegion ? mapWhoRegionForApi(document.whoRegion) : undefined
})

const transformFaoMersEventDocumentForApi = (document: FaoMersEventDocument): MersEvent => {
  if(document.type === MersEventType.ANIMAL) {
    return {
      ...transformFaoMersEventDocumentBaseForApi(document),
      __typename: "AnimalMersEvent",
      type: MersEventTypeForApi.Animal,
      animalSpecies: transformFaoMersEventAnimalSpeciesForApi(document.animalSpecies),
      animalType: transformFaoMersEventAnimalTypeForApi(document.animalType),
    }
  }
  if(document.type === MersEventType.HUMAN) {
    return {
      ...transformFaoMersEventDocumentBaseForApi(document),
      __typename: "HumanMersEvent",
      type: MersEventTypeForApi.Human,
      humanDeaths: document.humanDeaths,
      humansAffected: document.humansAffected,
    }
  }

  assertNever(document);
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
  year: document.year,
  camelCount: document.camelCount,
  camelCountPerCapita: document.camelCountPerCapita,
  note: document.note
})

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
      whoRegionsFromEstimates,
      whoRegionsFromFaoMersEvents
    ] = await Promise.all([
      runCountryIdentifierAggregation({ collection: estimateCollection }),
      runCountryIdentifierAggregation({ collection: faoMersEventsCollection }),
      estimateCollection.distinct('whoRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
      faoMersEventsCollection.distinct('whoRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
    ])

    // Lodash's uniqBy function keeps the first occurrence of the key so if there is a different country name
    // between the estimates and the fao mers events, the country name in the estimates will be used.
    const countryIdentifiers = uniqBy(
      [...countryIdentifiersFromEstimates, ...countryIdentifiersFromFaoMersEvents],
      (countryIdentifiers: CountryIdentifiers) => countryIdentifiers.alphaTwoCode
    )

    return {
      countryIdentifiers,
      whoRegion: uniq([
        ...whoRegionsFromEstimates,
        ...whoRegionsFromFaoMersEvents
      ]).map((whoRegion) => mapWhoRegionForApi(whoRegion))
    }
  }

  const allFaoMersEventPartitionKeys = async () => {
    const [
      partitionKeys
    ] = await Promise.all([
      mongoClient
        .db(databaseName)
        .collection<FaoMersEventDocument>('mersFaoEventData')
        .distinct('partitionKey')
    ])

    return partitionKeys;
  }
  
  const partitionedFaoMersEvents: QueryResolvers['partitionedFaoMersEvents'] = async (_, variables) => {
    const { partitionKey } = variables.input;

    const databaseEstimates = await mongoClient.db(databaseName)
      .collection<FaoMersEventDocument>('mersFaoEventData')
      .find({ partitionKey })
      .toArray();

    return {
      partitionKey,
      mersEvents: databaseEstimates.map((estimate) => transformFaoMersEventDocumentForApi(estimate))
    }
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
  
  const faoMersEventFilterOptions = async () => {
    const faoMersEventsCollection = mongoClient.db(databaseName).collection<FaoMersEventDocument>('mersFaoEventData');

    const [
      countryIdentifiersFromEstimates,
      countryIdentifiersFromFaoMersEvents,
      whoRegionsFromEstimates,
      whoRegionsFromFaoMersEvents
    ] = await Promise.all([
      runCountryIdentifierAggregation({ collection: estimateCollection }),
      runCountryIdentifierAggregation({ collection: faoMersEventsCollection }),
      estimateCollection.distinct('whoRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
      faoMersEventsCollection.distinct('whoRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
    ])

    return {

    }
  }

  return {
    mersResolvers: {
      Query: {
        mersEstimates,
        mersFilterOptions,
        allFaoMersEventPartitionKeys,
        partitionedFaoMersEvents,
        faoMersEventFilterOptions,
        yearlyFaoCamelPopulationDataPartitionKeys,
        partitionedYearlyFaoCamelPopulationData,
      }
    }
  }
}