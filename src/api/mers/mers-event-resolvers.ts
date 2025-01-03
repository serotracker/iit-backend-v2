import { MongoClient } from "mongodb";
import assertNever from "assert-never";
import {
  FaoMersEventDocument,
  FaoMersEventDocumentBase,
  MersDiagnosisSource,
  MersDiagnosisStatus,
  MersEventAnimalSpecies,
  MersEventAnimalType,
  MersEventType
} from "../../storage/types.js";
import { filterUndefinedValuesFromArray } from "../../lib/lib.js";
import {
  MersEventType as MersEventTypeForApi,
  MersEventAnimalType as MersEventAnimalTypeForApi,
  MersEventAnimalSpecies as MersEventAnimalSpeciesForApi,
  MersDiagnosisStatus as MersDiagnosisStatusForApi,
  MersDiagnosisSource as MersDiagnosisSourceForApi,
  MersAnimalSpecies as MersAnimalSpeciesForApi,
  QueryResolvers,
  MersEventInterface,
  MersEvent
} from "../graphql-types/__generated__/graphql-types.js";
import { mapUnRegionForApi, mapWhoRegionForApi } from "../shared/shared-mappers.js";

interface GenerateMersEventResolversInput {
  mongoClient: MongoClient;
}

interface GenerateMersEventResolversOutput {
  mersEventResolvers: { Query: QueryResolvers }
}

export const mersAnimalSpeciesMapForApi = {
  [MersEventAnimalSpecies.BAT]: MersAnimalSpeciesForApi.Bat,
  [MersEventAnimalSpecies.GOAT]: MersAnimalSpeciesForApi.Goat,
  [MersEventAnimalSpecies.DROMEDARY_CAMEL]: MersAnimalSpeciesForApi.DromedaryCamel,
  [MersEventAnimalSpecies.BACTRIAN_CAMEL]: MersAnimalSpeciesForApi.BactrianCamel,
  [MersEventAnimalSpecies.MULE]: MersAnimalSpeciesForApi.Mule,
  [MersEventAnimalSpecies.BUFFALO]: MersAnimalSpeciesForApi.Buffalo,
  [MersEventAnimalSpecies.HORSE]: MersAnimalSpeciesForApi.Horse,
  [MersEventAnimalSpecies.CATTLE]: MersAnimalSpeciesForApi.Cattle,
  [MersEventAnimalSpecies.SHEEP]: MersAnimalSpeciesForApi.Sheep,
  [MersEventAnimalSpecies.DONKEY]: MersAnimalSpeciesForApi.Donkey,
  [MersEventAnimalSpecies.WATER_BUFFALO]: MersAnimalSpeciesForApi.WaterBuffalo,
  [MersEventAnimalSpecies.BABOON]: MersAnimalSpeciesForApi.Baboon
}

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
      animalSpecies: mersAnimalSpeciesMapForApi[document.animalSpecies],
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

export const generateMersEventResolvers = (input: GenerateMersEventResolversInput): GenerateMersEventResolversOutput => {
  const { mongoClient } = input;

  const databaseName = process.env.DATABASE_NAME;

  if(!databaseName) {
    throw new Error("Unable to find value for DATABASE_NAME. Please make sure you have run generate-env-files.sh and have specified one in the appropriate environment file.")
  }

  const faoMersEventFilterOptions = async () => {
    const faoMersEventsCollection = mongoClient.db(databaseName).collection<FaoMersEventDocument>('mersFaoEventData');

    const [
      diagnosisSource,
      animalType,
      animalSpecies,
    ] = await Promise.all([
      faoMersEventsCollection.distinct('diagnosisSource').then((element) => filterUndefinedValuesFromArray(element)),
      faoMersEventsCollection.distinct('animalType').then((element) => filterUndefinedValuesFromArray(element)),
      faoMersEventsCollection.distinct('animalSpecies').then((element) => filterUndefinedValuesFromArray(element)),
    ])

    return {
      diagnosisSource: diagnosisSource.map((element) => transformFaoMersEventDiagnosisSourceForApi(element)),
      animalType: animalType.map((element) => transformFaoMersEventAnimalTypeForApi(element)),
      animalSpecies: animalSpecies.map((element) => mersAnimalSpeciesMapForApi[element]),
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


  return {
    mersEventResolvers: {
      Query: {
        allFaoMersEventPartitionKeys,
        partitionedFaoMersEvents,
        faoMersEventFilterOptions
      }
    }
  }
}