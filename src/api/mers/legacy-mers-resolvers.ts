import { MongoClient } from "mongodb";
import uniqBy from "lodash/uniqBy.js";
import uniq from "lodash/uniq.js";
import { pipe } from "fp-ts/lib/function.js";
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
  YearlyFaoCamelPopulationDataEntry,
  MersEstimate_V2,
  MersEstimateInterface,
  MersAnimalSpecies as MersAnimalSpeciesForApi,
  MersAnimalType as MersAnimalTypeForApi,
  MersEstimateType as MersEstimateTypeForApi
} from "../graphql-types/__generated__/graphql-types.js";
import {
  FaoMersEventDocument,
  FaoMersEventDocumentBase,
  MersDiagnosisStatus,
  MersDiagnosisSource,
  MersEstimateDocument,
  MersEventAnimalSpecies,
  MersEventAnimalType,
  MersEventType,
  FaoYearlyCamelPopulationDataDocument,
  MersEstimateType,
  MersAnimalSpecies,
  MersAnimalType
} from '../../storage/types.js';
import { mapUnRegionForApi, mapWhoRegionForApi } from "../shared/shared-mappers.js";
import { runCountryIdentifierAggregation } from "../aggregations/country-identifier-aggregation.js";
import assertNever from "assert-never";

interface GenerateLegacyMersResolversInput {
  mongoClient: MongoClient;
}

interface GenerateLegacyMersResolversOutput {
  legacyMersResolvers: { Query: QueryResolvers }
}

const filterUndefinedValuesFromArray = <T>(array: (T | undefined)[]): T[] => array.filter((element): element is T => !!element);

const mersAnimalSpeciesMapForApi = {
  [MersAnimalSpecies.BAT]: MersAnimalSpeciesForApi.Bat,
  [MersAnimalSpecies.GOAT]: MersAnimalSpeciesForApi.Goat,
  [MersAnimalSpecies.CAMEL]: MersAnimalSpeciesForApi.Camel,
  [MersAnimalSpecies.CATTLE]: MersAnimalSpeciesForApi.Cattle,
  [MersAnimalSpecies.SHEEP]: MersAnimalSpeciesForApi.Sheep
}
const mapMersAnimalSpeciesForApi = (animalSpecies: MersAnimalSpecies): MersAnimalSpeciesForApi => mersAnimalSpeciesMapForApi[animalSpecies];

const mersAnimalTypeMapForApi = {
  [MersAnimalType.WILD]: MersAnimalTypeForApi.Wild,
  [MersAnimalType.DOMESTIC]: MersAnimalTypeForApi.Domestic,
}
const mapMersAnimalTypeForApi = (animalType: MersAnimalType): MersAnimalTypeForApi => mersAnimalTypeMapForApi[animalType];

const transformMersEstimateDocumentForApi_V2 = (document: MersEstimateDocument): MersEstimate_V2 => {
  const base: Omit<MersEstimateInterface, 'type'> = {
    id: document._id.toHexString(),
    estimateId: document.estimateId,
    city: document.city,
    state: document.state,
    country: document.country,
    countryAlphaTwoCode: document.countryAlphaTwoCode,
    countryAlphaThreeCode: document.countryAlphaThreeCode,
    latitude: document.latitude,
    longitude: document.longitude,
    whoRegion: document.whoRegion ? mapWhoRegionForApi(document.whoRegion) : undefined,
    unRegion: document.unRegion ? mapUnRegionForApi(document.unRegion) : undefined,
    firstAuthorFullName: document.firstAuthorFullName,
    sourceUrl: document.sourceUrl,
    sourceType: document.sourceType,
    sourceTitle: document.sourceTitle,
    insitutution: document.insitutution,
    studyInclusionCriteria: document.studyInclusionCriteria,
    studyExclusionCriteria: document.studyExclusionCriteria,
    sensitivity: document.sensitivity,
    sensitivity95CILower: document.sensitivity95CILower,
    sensitivity95CIUpper: document.sensitivity95CIUpper,
    sensitivityDenominator: document.sensitivityDenominator,
    specificity: document.specificity,
    specificity95CILower: document.specificity95CILower,
    specificity95CIUpper: document.specificity95CIUpper,
    specificityDenominator: document.specificityDenominator,
    sampleDenominator: document.sampleDenominator,
    sampleNumerator: document.sampleNumerator,
    assay: document.assay,
    specimenType: document.specimenType,
    sex: document.sex,
    isotypes: document.isotypes,
    samplingStartDate: document.samplingStartDate ? document.samplingStartDate.toISOString() : undefined,
    samplingEndDate: document.samplingEndDate ? document.samplingEndDate.toISOString() : undefined,
    samplingMidDate: document.samplingMidDate ? document.samplingMidDate.toISOString() : undefined,
    samplingMethod: document.samplingMethod,
    geographicScope: document.geographicScope,
    testProducer: document.testProducer,
    testValidation: document.testValidation,
  }

  if(document.type === MersEstimateType.HUMAN_SEROPREVALENCE) {
    return {
      ...base,
      __typename: 'HumanMersEstimate',
      seroprevalence: document.seroprevalence,
      seroprevalence95CILower: document.seroprevalence95CILower,
      seroprevalence95CIUpper: document.seroprevalence95CIUpper,
      type: MersEstimateTypeForApi.HumanSeroprevalence,
      ageGroup: document.ageGroup,
      sampleFrame: document.sampleFrame
    }
  }

  if(document.type === MersEstimateType.ANIMAL_SEROPREVALENCE) {
    return {
      ...base,
      __typename: 'AnimalMersEstimate',
      seroprevalence: document.seroprevalence,
      seroprevalence95CILower: document.seroprevalence95CILower,
      seroprevalence95CIUpper: document.seroprevalence95CIUpper,
      type: MersEstimateTypeForApi.AnimalSeroprevalence,
      animalSpecies: mapMersAnimalSpeciesForApi(document.animalSpecies),
      animalType: document.animalType.map((animalType) => (mapMersAnimalTypeForApi(animalType))),
      animalDetectionSettings: document.animalDetectionSettings,
      animalPurpose: document.animalPurpose,
      animalImportedOrLocal: document.animalImportedOrLocal
    }
  }

  if(document.type === MersEstimateType.HUMAN_VIRAL) {
    return {
      ...base,
      __typename: 'HumanMersViralEstimate',
      positivePrevalence: document.positivePrevalence,
      positivePrevalence95CILower: document.positivePrevalence95CILower,
      positivePrevalence95CIUpper: document.positivePrevalence95CIUpper,
      type: MersEstimateTypeForApi.HumanViral,
      ageGroup: document.ageGroup,
      sampleFrame: document.sampleFrame
    }
  }

  if(document.type === MersEstimateType.ANIMAL_VIRAL) {
    return {
      ...base,
      __typename: 'AnimalMersViralEstimate',
      positivePrevalence: document.positivePrevalence,
      positivePrevalence95CILower: document.positivePrevalence95CILower,
      positivePrevalence95CIUpper: document.positivePrevalence95CIUpper,
      type: MersEstimateTypeForApi.AnimalViral,
      animalSpecies: mapMersAnimalSpeciesForApi(document.animalSpecies),
      animalType: document.animalType.map((animalType) => (mapMersAnimalTypeForApi(animalType))),
      animalDetectionSettings: document.animalDetectionSettings,
      animalPurpose: document.animalPurpose,
      animalImportedOrLocal: document.animalImportedOrLocal
    }
  }

  assertNever(document);
}

const transformMersEstimateDocumentForApi = (document: MersEstimateDocument): MersEstimate => {
  const base = {
    id: document._id.toHexString(),
    estimateId: document.estimateId,
    city: document.city,
    state: document.state,
    country: document.country,
    countryAlphaTwoCode: document.countryAlphaTwoCode,
    countryAlphaThreeCode: document.countryAlphaThreeCode,
    latitude: document.latitude,
    longitude: document.longitude,
    whoRegion: document.whoRegion ? mapWhoRegionForApi(document.whoRegion) : undefined,
    unRegion: document.unRegion ? mapUnRegionForApi(document.unRegion) : undefined,
    firstAuthorFullName: document.firstAuthorFullName,
    sourceUrl: document.sourceUrl,
    sourceType: document.sourceType,
    sourceTitle: document.sourceTitle,
    insitutution: document.insitutution,
  }

  if(document.type === MersEstimateType.HUMAN_VIRAL) {
    return {
      ...base,
      seroprevalence: document.positivePrevalence
    }
  }

  if(document.type === MersEstimateType.ANIMAL_VIRAL) {
    return {
      ...base,
      seroprevalence: document.positivePrevalence
    }
  }

  if(document.type === MersEstimateType.HUMAN_SEROPREVALENCE) {
    return {
      ...base,
      seroprevalence: document.seroprevalence
    }
  }

  if(document.type === MersEstimateType.ANIMAL_SEROPREVALENCE) {
    return {
      ...base,
      seroprevalence: document.seroprevalence
    }
  }

  assertNever(document);
}

const faoMersEventAnimalSpeciesMap = {
  [MersEventAnimalSpecies.BAT]: MersEventAnimalSpeciesForApi.Bat,
  [MersEventAnimalSpecies.CAMEL]: MersEventAnimalSpeciesForApi.Camel,
  [MersEventAnimalSpecies.GOAT]: MersEventAnimalSpeciesForApi.Goat,
  [MersEventAnimalSpecies.CATTLE]: MersEventAnimalSpeciesForApi.Cattle,
  [MersEventAnimalSpecies.SHEEP]: MersEventAnimalSpeciesForApi.Sheep,
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
  whoRegion: document.whoRegion ? mapWhoRegionForApi(document.whoRegion) : undefined,
  unRegion: document.unRegion ? mapUnRegionForApi(document.unRegion) : undefined
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
  unRegion: document.unRegion ? mapUnRegionForApi(document.unRegion) : undefined,
  year: document.year,
  camelCount: document.camelCount,
  camelCountPerCapita: document.camelCountPerCapita,
  note: document.note
})

export const generateLegacyMersResolvers = (input: GenerateLegacyMersResolversInput): GenerateLegacyMersResolversOutput => {
  const { mongoClient } = input;

  const databaseName = process.env.DATABASE_NAME;

  if(!databaseName) {
    throw new Error("Unable to find value for DATABASE_NAME. Please make sure you have run generate-env-files.sh and have specified one in the appropriate environment file.")
  }

  const mersEstimates = async () => {
    const databaseEstimates = await mongoClient.db(databaseName).collection<MersEstimateDocument>('mersEstimates').find({}).toArray();

    return databaseEstimates.map((estimate) => transformMersEstimateDocumentForApi(estimate));
  }

  const mersEstimates_V2 = async () => {
    const databaseEstimates = await mongoClient.db(databaseName).collection<MersEstimateDocument>('mersEstimates').find({}).toArray();

    return databaseEstimates.map((estimate) => transformMersEstimateDocumentForApi_V2(estimate));
  }

  const mersFilterOptions = async () => {
    const estimateCollection = mongoClient.db(databaseName).collection<MersEstimateDocument>('mersEstimates');
    const faoMersEventsCollection = mongoClient.db(databaseName).collection<FaoMersEventDocument>('mersFaoEventData');

    const [
      countryIdentifiersFromEstimates,
      countryIdentifiersFromFaoMersEvents,
      whoRegionsFromEstimates,
      whoRegionsFromFaoMersEvents,
      unRegionsFromEstimates,
      unRegionsFromFaoMersEvents
    ] = await Promise.all([
      runCountryIdentifierAggregation({ collection: estimateCollection }),
      runCountryIdentifierAggregation({ collection: faoMersEventsCollection }),
      estimateCollection.distinct('whoRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
      faoMersEventsCollection.distinct('whoRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('unRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
      faoMersEventsCollection.distinct('unRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
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
      ]).map((whoRegion) => mapWhoRegionForApi(whoRegion)),
      unRegion: uniq([
        ...unRegionsFromEstimates,
        ...unRegionsFromFaoMersEvents
      ]).map((unRegion) => mapUnRegionForApi(unRegion))
    }
  }
  
  const mersEstimatesFilterOptions = async () => {
    const estimateCollection = mongoClient.db(databaseName).collection<MersEstimateDocument>('mersEstimates');

    const [
      sourceType,
      ageGroup,
      assay,
      specimenType,
      sex,
      isotypes,
      samplingMethod,
      geographicScope,
      animalDetectionSettings,
      animalPurpose,
      animalImportedOrLocal,
      sampleFrame,
      testProducer,
      testValidation
    ] = await Promise.all([
      estimateCollection.distinct('sourceType').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('ageGroup').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('assay').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('specimenType').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('sex').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('isotypes').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('samplingMethod').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('geographicScope').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('animalDetectionSettings').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('animalPurpose').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('animalImportedOrLocal').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('sampleFrame').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('testProducer').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('testValidation').then((elements) => filterUndefinedValuesFromArray(elements)),
    ])

    return {
      sourceType,
      ageGroup,
      assay,
      specimenType,
      sex,
      isotypes,
      samplingMethod,
      geographicScope,
      animalDetectionSettings,
      animalPurpose,
      animalImportedOrLocal,
      sampleFrame,
      testProducer,
      testValidation
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
    const estimateCollection = mongoClient.db(databaseName).collection<MersEstimateDocument>('mersEstimates');

    const [
      diagnosisSource,
      animalType,
      animalSpeciesFromEvents,
      animalSpeciesFromEstimates,
    ] = await Promise.all([
      faoMersEventsCollection.distinct('diagnosisSource').then((element) => filterUndefinedValuesFromArray(element)),
      faoMersEventsCollection.distinct('animalType').then((element) => filterUndefinedValuesFromArray(element)),
      faoMersEventsCollection.distinct('animalSpecies').then((element) => filterUndefinedValuesFromArray(element)),
      estimateCollection.distinct('animalSpecies').then((element) => filterUndefinedValuesFromArray(element)),
    ])

    return {
      diagnosisSource: diagnosisSource.map((element) => transformFaoMersEventDiagnosisSourceForApi(element)),
      animalType: animalType.map((element) => transformFaoMersEventAnimalTypeForApi(element)),
      animalSpecies: pipe(
        [
          ...animalSpeciesFromEvents.map((element) => transformFaoMersEventAnimalSpeciesForApi(element)), 
          ...animalSpeciesFromEstimates.map((element) => transformFaoMersEventAnimalSpeciesForApi(element))
        ],
        uniq,
        filterUndefinedValuesFromArray
      )
    }
  }

  return {
    legacyMersResolvers: {
      Query: {
        mersEstimates,
        mersEstimates_V2,
        mersFilterOptions,
        mersEstimatesFilterOptions,
        allFaoMersEventPartitionKeys,
        partitionedFaoMersEvents,
        faoMersEventFilterOptions,
        yearlyFaoCamelPopulationDataPartitionKeys,
        partitionedYearlyFaoCamelPopulationData,
      }
    }
  }
}