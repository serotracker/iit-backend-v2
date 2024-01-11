import { MongoClient } from "mongodb";
import {
  ArbovirusEstimate,
  ArbovirusEstimateResolvers,
  ArbovirusFilterOptions,
  ArbovirusFilterOptionsResolvers,
  Country,
  CountryResolvers,
  QueryResolvers,
  Resolver,
  UnRegion,
  UnRegionResolvers,
  WhoRegion,
  WhoRegionResolvers
} from "./graphql-types/__generated__/graphql-types";
import { ArbovirusEstimateDocument } from "../storage/types";
import { countryNameToTwoLetterIsoCountryCode } from "../etl/geocoding-api/country-codes.js";

interface GenerateArboResolversInput {
  mongoClient: MongoClient;
}

type UndecoratedCountry = Omit<Country, 'unRegions'|'whoRegions'>;
type UndecoratedUnRegion = Omit<UnRegion, 'countries'|'whoRegions'>;
type UndecoratedWhoRegion = Omit<WhoRegion, 'countries'|'unRegions'>;
type UndecoratedArbovirusEstimate = Omit<ArbovirusEstimate, 'country'|'whoRegion'|'unRegion'> & {
  country: UndecoratedCountry,
  unRegion: UndecoratedUnRegion,
  whoRegion: UndecoratedWhoRegion | undefined,
}
type UndecoratedArbovirusFilterOptions = Omit<ArbovirusFilterOptions, 'country'|'whoRegion'|'unRegion'> & {
  country: UndecoratedCountry[],
  unRegion: UndecoratedUnRegion[],
  whoRegion: UndecoratedWhoRegion[]
}

interface GenerateArboResolversOutput {
  arboResolvers: {
    Query: {
      arbovirusEstimates: Resolver<UndecoratedArbovirusEstimate[]>,
      arbovirusFilterOptions: Resolver<UndecoratedArbovirusFilterOptions>
    }
    Country: CountryResolvers,
    UNRegion: UnRegionResolvers,
    WHORegion: WhoRegionResolvers
  }
}

const filterUndefinedValuesFromArray = <T>(array: (T | undefined)[]): T[] => array.filter((element): element is T => !!element);

const transformArbovirusEstimateDocumentForApi = (document: ArbovirusEstimateDocument): UndecoratedArbovirusEstimate => {
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
    country: {
      name: document.country,
      alphaTwoCode: document.countryAlphaTwoCode
    },
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
    unRegion: {
      name: 'abc'
    },
    url: document.url,
    whoRegionDeprecated: document.whoRegion,
    whoRegion: document.whoRegion ? {
      name: document.whoRegion
    } : undefined
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
      countryNames,
      countryDeprecated,
      pathogen,
      producer,
      sampleFrame,
      serotype,
      sex,
      whoRegionNames,
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

    const unRegion: UndecoratedUnRegion[] = [];

    return {
      ageGroup,
      antibody,
      assay,
      country: countryNames.map((countryName) => {
        const alphaTwoCode = countryNameToTwoLetterIsoCountryCode(countryName);

        if(!alphaTwoCode) {
          return undefined;
        }

        return {
          name: countryName,
          alphaTwoCode
        }
      }).filter(<T>(country: T | undefined): country is T => !!country),
      countryDeprecated,
      pathogen,
      producer,
      sampleFrame,
      serotype,
      sex,
      unRegion,
      whoRegion: whoRegionNames.map((whoRegionName) => ({
        name: whoRegionName
      })),
      whoRegionDeprecated
    }
  }
  
  const countryUNRegionsResolver = () => []
  const countryWhoRegionsResolver = () => []

  const unRegionCountriesResolver = () => []
  const unRegionWHORegionsResolver = () => []

  const whoRegionUNRegionsResolver = () => []
  const whoRegionCountriesResolver = () => []

  return {
    arboResolvers: {
      Query: {
        arbovirusEstimates,
        arbovirusFilterOptions
      },
      Country: {
        unRegions: countryUNRegionsResolver,
        whoRegions: countryWhoRegionsResolver,
      },
      UNRegion: {
        countries: unRegionCountriesResolver,
        whoRegions: unRegionWHORegionsResolver,
      },
      WHORegion: {
        countries: whoRegionCountriesResolver,
        unRegions: whoRegionUNRegionsResolver,
      }
    }
  }
}