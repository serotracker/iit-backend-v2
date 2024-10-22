import { MongoClient } from "mongodb";
import { ArbovirusEstimate, CountryIdentifiers, QueryResolvers } from "../graphql-types/__generated__/graphql-types.js";
import { Arbovirus, ArbovirusEnvironmentalSuitabilityStatsEntryDocument, ArbovirusEstimateDocument, ArbovirusEstimateType } from '../../storage/types.js';
import { Arbovirus as ArbovirusForApi, ArbovirusEstimateType as ArbovirusEstimateTypeForApi } from "../graphql-types/__generated__/graphql-types.js";
import { mapUnRegionForApi } from "../shared/shared-mappers.js";
import { runCountryIdentifierAggregation } from "../aggregations/country-identifier-aggregation.js";

const arbovirusMap: {[key in Arbovirus]: ArbovirusForApi} = {
  [Arbovirus.ZIKV]: ArbovirusForApi.Zikv,
  [Arbovirus.DENV]: ArbovirusForApi.Denv,
  [Arbovirus.CHIKV]: ArbovirusForApi.Chikv,
  [Arbovirus.YFV]: ArbovirusForApi.Yfv,
  [Arbovirus.WNV]: ArbovirusForApi.Wnv,
  [Arbovirus.MAYV]: ArbovirusForApi.Mayv,
  [Arbovirus.OROV]: ArbovirusForApi.Orov
}

const arbovirusEstimateTypeMap: {[key in ArbovirusEstimateType]: ArbovirusEstimateTypeForApi } = {
  [ArbovirusEstimateType.SEROPREVALENCE]: ArbovirusEstimateTypeForApi.Seroprevalence,
  [ArbovirusEstimateType.VIRAL_PREVALENCE]: ArbovirusEstimateTypeForApi.ViralPrevalence
}

const mapArbovirusForApi = (arbovirus: Arbovirus): ArbovirusForApi => arbovirusMap[arbovirus];

interface GenerateArboResolversInput {
  mongoClient: MongoClient;
}

interface GenerateArboResolversOutput {
  arboResolvers: { Query: QueryResolvers }
}

const filterUndefinedValuesFromArray = <T>(array: (T | undefined)[]): T[] => array.filter((element): element is T => !!element);

const transformArbovirusEstimateDocumentForApi = (document: ArbovirusEstimateDocument): ArbovirusEstimate => {
  return {
    estimateType: arbovirusEstimateTypeMap[document.estimateType],
    ageGroup: document.ageGroup,
    ageMaximum: document.ageMaximum,
    ageMinimum: document.ageMinimum,
    antibodies: document.antibodies ?? [],
    antigen: document.antigen,
    assay: document.assay,
    assayOther: document.assayOther,
    city: document.city,
    state: document.state,
    country: document.country,
    countryAlphaTwoCode: document.countryAlphaTwoCode,
    countryAlphaThreeCode: document.countryAlphaThreeCode,
    createdAt: document.createdAt.toISOString(),
    estimateId: document.estimateId,
    id: document._id.toHexString(),
    inclusionCriteria: document.inclusionCriteria,
    latitude: document.latitude,
    longitude: document.longitude,
    pathogen: mapArbovirusForApi(document.pathogen),
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
    unRegion: document.unRegion ? mapUnRegionForApi(document.unRegion) : undefined,
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
    const databaseEstimates = await mongoClient
      .db(databaseName)
      .collection<ArbovirusEstimateDocument>('arbovirusEstimates')
      .find({})
      .toArray();

    return databaseEstimates.map((estimate) => transformArbovirusEstimateDocumentForApi(estimate));
  }
  
  const arbovirusEnviromentalSuitabilityData = async () => {
    const databaseEnvironmentalSuitabilityData = await mongoClient
      .db(databaseName)
      .collection<ArbovirusEnvironmentalSuitabilityStatsEntryDocument>('arbovirusEnviromentalSuitabilityStats')
      .find({})
      .toArray();
    
    return databaseEnvironmentalSuitabilityData.map((dataPoint) => ({
      id: dataPoint._id.toHexString(),
      countryAlphaThreeCode: dataPoint.countryAlphaThreeCode,
      countryAlphaTwoCode: dataPoint.countryAlphaTwoCode,
      countryName: dataPoint.countryName,
      zikaData: {
        minimumValue: dataPoint.zikaData.minimumValue,
        maximumValue: dataPoint.zikaData.maximumValue,
        valueRange: dataPoint.zikaData.valueRange,
        meanValue: dataPoint.zikaData.meanValue,
        medianValue: dataPoint.zikaData.medianValue,
        ninetyPercentOfValuesAreBelowThisValue: dataPoint.zikaData.ninetyPercentOfValuesAreBelowThisValue,
      },
      dengue2015Data: {
        minimumValue: dataPoint.dengue2015Data.minimumValue,
        maximumValue: dataPoint.dengue2015Data.maximumValue,
        valueRange: dataPoint.dengue2015Data.valueRange,
        meanValue: dataPoint.dengue2015Data.meanValue,
        medianValue: dataPoint.dengue2015Data.medianValue,
        ninetyPercentOfValuesAreBelowThisValue: dataPoint.dengue2015Data.ninetyPercentOfValuesAreBelowThisValue,
      },
      dengue2050Data: {
        minimumValue: dataPoint.dengue2050Data.minimumValue,
        maximumValue: dataPoint.dengue2050Data.maximumValue,
        valueRange: dataPoint.dengue2050Data.valueRange,
        meanValue: dataPoint.dengue2050Data.meanValue,
        medianValue: dataPoint.dengue2050Data.medianValue,
        ninetyPercentOfValuesAreBelowThisValue: dataPoint.dengue2050Data.ninetyPercentOfValuesAreBelowThisValue,
      },
    }))
  }

  const arbovirusFilterOptions = async () => {
    const estimateCollection = mongoClient.db(databaseName).collection<ArbovirusEstimateDocument>('arbovirusEstimates');

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
      whoRegion,
      countryIdentifiers
    ] = await Promise.all([
      estimateCollection.distinct('ageGroup').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('antibodies').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('assay').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('country').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('pathogen').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('pediatricAgeGroup').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('producer').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('sampleFrame').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('serotype').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('sex').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('unRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('whoRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
      runCountryIdentifierAggregation({ collection: estimateCollection })
    ])

    return {
      ageGroup,
      antibody,
      assay,
      country,
      pathogen: pathogen.filter((element) => element !== 'OROV'),
      pediatricAgeGroup,
      producer,
      sampleFrame,
      serotype,
      sex,
      unRegion,
      whoRegion,
      countryIdentifiers: countryIdentifiers as CountryIdentifiers[]
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
        arbovirusEnviromentalSuitabilityData,
        arbovirusFilterOptions,
        arbovirusDataStatistics
      }
    }
  }
}