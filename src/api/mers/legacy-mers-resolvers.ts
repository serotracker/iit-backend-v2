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
import { filterUndefinedValuesFromArray } from "../../lib/lib.js";
import { mapMersAnimalSpeciesForApi, mapMersAnimalTypeForApi } from "./mers-estimate-resolvers.js";

interface GenerateLegacyMersResolversInput {
  mongoClient: MongoClient;
}

interface GenerateLegacyMersResolversOutput {
  legacyMersResolvers: { Query: QueryResolvers }
}


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
    specimenType: document.specimenType.at(0),
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
      sampleFrame: document.sampleFrames.at(0)
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
      sampleFrame: document.sampleFrames.at(0)
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
  
  return {
    legacyMersResolvers: {
      Query: {
        mersEstimates,
        mersEstimates_V2,
        mersFilterOptions,
      }
    }
  }
}