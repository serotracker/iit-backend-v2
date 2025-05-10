import { MongoClient } from "mongodb";
import { ArbovirusEstimate, CountryIdentifiers, QueryResolvers } from "../graphql-types/__generated__/graphql-types.js";
import {
  Arbovirus,
  ArbovirusEnvironmentalSuitabilityStatsEntryDocument,
  ArbovirusEstimateDocument,
  ArbovirusEstimateType,
  ArbovirusGroupedEstimateDocument,
  ArbovirusGroupingVariable,
  ArbovirusStudyPopulation,
  UnravelledArbovirusGroupedEstimateDocument
} from '../../storage/types.js';
import {
  Arbovirus as ArbovirusForApi,
  ArbovirusGroupingVariable as ArbovirusGroupingVariableForApi,
  ArbovirusEstimateType as ArbovirusEstimateTypeForApi,
  ArbovirusStudyPopulation as ArbovirusStudyPopulationForApi
} from "../graphql-types/__generated__/graphql-types.js";
import { mapUnRegionForApi } from "../shared/shared-mappers.js";
import { runCountryIdentifierAggregation } from "../aggregations/country-identifier-aggregation.js";
import uniq from "lodash/uniq.js";

const arbovirusMap: {[key in Arbovirus]: ArbovirusForApi} = {
  [Arbovirus.ZIKV]: ArbovirusForApi.Zikv,
  [Arbovirus.DENV]: ArbovirusForApi.Denv,
  [Arbovirus.CHIKV]: ArbovirusForApi.Chikv,
  [Arbovirus.YFV]: ArbovirusForApi.Yfv,
  [Arbovirus.WNV]: ArbovirusForApi.Wnv,
  [Arbovirus.MAYV]: ArbovirusForApi.Mayv,
  [Arbovirus.OROV]: ArbovirusForApi.Orov
}

const groupingVariableMap: {[key in ArbovirusGroupingVariable]: ArbovirusGroupingVariableForApi} = {
  [ArbovirusGroupingVariable.TIMEFRAME]: ArbovirusGroupingVariableForApi.Timeframe,
  [ArbovirusGroupingVariable.AGE]: ArbovirusGroupingVariableForApi.Age,
  [ArbovirusGroupingVariable.GENDER]: ArbovirusGroupingVariableForApi.Gender,
  [ArbovirusGroupingVariable.GEOGRAPHY]: ArbovirusGroupingVariableForApi.Geography,
  [ArbovirusGroupingVariable.TEST_TYPE]: ArbovirusGroupingVariableForApi.TestType,
  [ArbovirusGroupingVariable.OVERALL]: ArbovirusGroupingVariableForApi.Overall,
  [ArbovirusGroupingVariable.DENV_SEROTYPE]: ArbovirusGroupingVariableForApi.DenvSerotype,
  [ArbovirusGroupingVariable.SPECIES]: ArbovirusGroupingVariableForApi.Species,
  [ArbovirusGroupingVariable.RACE]: ArbovirusGroupingVariableForApi.Race,
  [ArbovirusGroupingVariable.EDUCATION]: ArbovirusGroupingVariableForApi.Education,
}

const arbovirusEstimateTypeMap: {[key in ArbovirusEstimateType]: ArbovirusEstimateTypeForApi } = {
  [ArbovirusEstimateType.SEROPREVALENCE]: ArbovirusEstimateTypeForApi.Seroprevalence,
  [ArbovirusEstimateType.VIRAL_PREVALENCE]: ArbovirusEstimateTypeForApi.ViralPrevalence
}

const arbovirusStudyPopulationMap: {[key in ArbovirusStudyPopulation]: ArbovirusStudyPopulationForApi } = {
  [ArbovirusStudyPopulation.HUMAN]: ArbovirusStudyPopulationForApi.Human,
  [ArbovirusStudyPopulation.INSECT]: ArbovirusStudyPopulationForApi.Insect,
  [ArbovirusStudyPopulation.NON_HUMAN_ANIMAL]: ArbovirusStudyPopulationForApi.NonHumanAnimal,
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
    assay: Array.isArray(document.assay) ? document.assay.at(0) : document.assay,
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
    studyPopulation: arbovirusStudyPopulationMap[document.studyPopulation],
    studySpecies: document.studySpecies,
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
      .sort({ country: 1 })
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
      estimateType,
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
      countryIdentifiers,
      studyPopulation
    ] = await Promise.all([
      estimateCollection.distinct('ageGroup').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('estimateType')
        .then((estimateTypes) => filterUndefinedValuesFromArray(estimateTypes))
        .then((estimateTypes) => estimateTypes.map((estimateType) => arbovirusEstimateTypeMap[estimateType])),
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
      runCountryIdentifierAggregation({ collection: estimateCollection }),
      estimateCollection.distinct('studyPopulation')
        .then((elements) => filterUndefinedValuesFromArray(elements))
        .then((elements) => elements.map((element) => arbovirusStudyPopulationMap[element]))
    ])

    return {
      ageGroup,
      estimateType,
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
      countryIdentifiers: countryIdentifiers as CountryIdentifiers[],
      studyPopulation
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
  
  const transformArbovirusSubEstimateDocumentForApi = (subEstimate: 
    | ArbovirusGroupedEstimateDocument['shownEstimates'][number]
    | ArbovirusGroupedEstimateDocument['hiddenEstimates'][number]
  ) => ({
    estimateType: arbovirusEstimateTypeMap[subEstimate.estimateType],
    ageGroup: subEstimate.ageGroup,
    ageMaximum: subEstimate.ageMaximum,
    ageMinimum: subEstimate.ageMinimum,
    antibodies: subEstimate.antibodies ?? [],
    antigen: subEstimate.antigen,
    assay: subEstimate.assay,
    assayOther: subEstimate.assayOther,
    city: subEstimate.city,
    state: subEstimate.state,
    country: subEstimate.country,
    countryAlphaTwoCode: subEstimate.countryAlphaTwoCode,
    countryAlphaThreeCode: subEstimate.countryAlphaThreeCode,
    createdAt: subEstimate.createdAt.toISOString(),
    estimateId: subEstimate.estimateId,
    id: subEstimate.id.toHexString(),
    inclusionCriteria: subEstimate.inclusionCriteria,
    latitude: subEstimate.latitude,
    longitude: subEstimate.longitude,
    pathogen: mapArbovirusForApi(subEstimate.pathogen),
    pediatricAgeGroup: subEstimate.pediatricAgeGroup,
    producer: subEstimate.producer,
    producerOther: subEstimate.producerOther,
    sameFrameTargetGroup: subEstimate.sameFrameTargetGroup,
    sampleEndDate: subEstimate.sampleEndDate?.toISOString(),
    sampleFrame: subEstimate.sampleFrame,
    sampleNumerator: subEstimate.sampleNumerator,
    sampleSize: subEstimate.sampleSize,
    sampleStartDate: subEstimate.sampleStartDate?.toISOString(),
    seroprevalence: subEstimate.seroprevalence,
    seroprevalenceStudy95CILower: subEstimate.seroprevalenceStudy95CILower,
    seroprevalenceStudy95CIUpper: subEstimate.seroprevalenceStudy95CIUpper,
    seroprevalenceCalculated95CILower: subEstimate.seroprevalenceCalculated95CILower,
    seroprevalenceCalculated95CIUpper: subEstimate.seroprevalenceCalculated95CIUpper,
    serotype: subEstimate.serotype,
    sex: subEstimate.sex,
    sourceSheetId: subEstimate.sourceSheetId,
    sourceSheetName: subEstimate.sourceSheetName,
    studyPopulation: arbovirusStudyPopulationMap[subEstimate.studyPopulation],
    studySpecies: subEstimate.studySpecies,
    unRegion: subEstimate.unRegion ? mapUnRegionForApi(subEstimate.unRegion) : undefined,
    url: subEstimate.url,
    groupingVariable: subEstimate.groupingVariable ? groupingVariableMap[subEstimate.groupingVariable] : undefined,
    whoRegion: subEstimate.whoRegion
  });

  const groupedArbovirusEstimates = async () => {
    const databaseEstimates = await mongoClient
      .db(databaseName)
      .collection<ArbovirusGroupedEstimateDocument>('groupedArbovirusEstimates')
      .find({})
      .toArray();

    return databaseEstimates.map((estimate) => ({
      id: estimate._id.toHexString(),
      shownEstimates: estimate.shownEstimates.map((subEstimate) => transformArbovirusSubEstimateDocumentForApi(subEstimate)),
      hiddenEstimates: estimate.hiddenEstimates.map((subEstimate) => transformArbovirusSubEstimateDocumentForApi(subEstimate)),
    }));
  }

  const partitionedGroupedArbovirusEstimates: QueryResolvers['partitionedGroupedArbovirusEstimates'] = async (_, variables) => {
    const databaseEstimates = await mongoClient
      .db(databaseName)
      .collection<ArbovirusGroupedEstimateDocument>('groupedArbovirusEstimates')
      .find({ partitionKey: variables.input.partitionKey })
      .toArray();

    const arboEstimates = databaseEstimates.map((estimate) => ({
      id: estimate._id.toHexString(),
      shownEstimates: estimate.shownEstimates.map((subEstimate) => transformArbovirusSubEstimateDocumentForApi(subEstimate)),
      hiddenEstimates: estimate.hiddenEstimates.map((subEstimate) => transformArbovirusSubEstimateDocumentForApi(subEstimate)),
    }));

    return {
      partitionKey: variables.input.partitionKey,
      arboEstimates,
    }
  }

  const partitionedUnravelledGroupedArbovirusEstimates: QueryResolvers['partitionedUnravelledGroupedArbovirusEstimates'] = async (_, variables) => {
    const databaseEstimates = await mongoClient
      .db(databaseName)
      .collection<UnravelledArbovirusGroupedEstimateDocument>('unravelledGroupedArbovirusEstimates')
      .find({ partitionKey: variables.input.partitionKey })
      .toArray();

    const arboEstimates = databaseEstimates.map((estimate) => ({
      ...transformArbovirusSubEstimateDocumentForApi(estimate),
      groupId: estimate.groupId.toHexString(),
      shown: estimate.shown,
    }));

    return {
      partitionKey: variables.input.partitionKey,
      arboEstimates,
    }
  }

  const allUnravelledGroupedArbovirusEstimatePartitionKeys = async () => {
    const [
      partitionKeys
    ] = await Promise.all([
      mongoClient
        .db(databaseName)
        .collection<UnravelledArbovirusGroupedEstimateDocument>('unravelledGroupedArbovirusEstimates')
        .distinct('partitionKey')
    ])

    return partitionKeys;
  }

  const allGroupedArbovirusEstimatePartitionKeys = async () => {
    const [
      partitionKeys
    ] = await Promise.all([
      mongoClient
        .db(databaseName)
        .collection<ArbovirusGroupedEstimateDocument>('groupedArbovirusEstimates')
        .distinct('partitionKey')
    ])

    return partitionKeys;
  }

  const groupedArbovirusEstimateFilterOptions = async () => {
    const estimateCollection = mongoClient.db(databaseName).collection<ArbovirusGroupedEstimateDocument>('groupedArbovirusEstimates');

    const [
      ageGroupForShownEstimates,
      estimateTypeForShownEstimates,
      antibodyForShownEstimates,
      assayForShownEstimates,
      countryForShownEstimates,
      pathogenForShownEstimates,
      pediatricAgeGroupForShownEstimates,
      producerForShownEstimates,
      sampleFrameForShownEstimates,
      serotypeForShownEstimates,
      sexForShownEstimates,
      unRegionForShownEstimates,
      whoRegionForShownEstimates,
      studyPopulationForShownEstimates,
      ageGroupForHiddenEstimates,
      estimateTypeForHiddenEstimates,
      antibodyForHiddenEstimates,
      assayForHiddenEstimates,
      countryForHiddenEstimates,
      pathogenForHiddenEstimates,
      pediatricAgeGroupForHiddenEstimates,
      producerForHiddenEstimates,
      sampleFrameForHiddenEstimates,
      serotypeForHiddenEstimates,
      sexForHiddenEstimates,
      unRegionForHiddenEstimates,
      whoRegionForHiddenEstimates,
      studyPopulationForHiddenEstimates,
      countryIdentifiersForShownEstimates,
      countryIdentifiersForHiddenEstimates,
    ] = await Promise.all([
      estimateCollection.distinct('shownEstimates.ageGroup').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('shownEstimates.estimateType')
        .then((estimateTypes: Array<ArbovirusEstimateDocument['estimateType']>) => filterUndefinedValuesFromArray(estimateTypes))
        .then((estimateTypes) => estimateTypes.map((estimateType) => arbovirusEstimateTypeMap[estimateType])),
      estimateCollection.distinct('shownEstimates.antibodies').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('shownEstimates.assay').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('shownEstimates.country').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('shownEstimates.pathogen').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('shownEstimates.pediatricAgeGroup').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('shownEstimates.producer').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('shownEstimates.sampleFrame').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('shownEstimates.serotype').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('shownEstimates.sex').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('shownEstimates.unRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('shownEstimates.whoRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('shownEstimates.studyPopulation')
        .then((estimateTypes: Array<ArbovirusEstimateDocument['studyPopulation']>) => filterUndefinedValuesFromArray(estimateTypes))
        .then((elements) => elements.map((element) => arbovirusStudyPopulationMap[element])),
      estimateCollection.distinct('hiddenEstimates.ageGroup').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('hiddenEstimates.estimateType')
        .then((estimateTypes: Array<ArbovirusEstimateDocument['estimateType']>) => filterUndefinedValuesFromArray(estimateTypes))
        .then((estimateTypes) => estimateTypes.map((estimateType) => arbovirusEstimateTypeMap[estimateType])),
      estimateCollection.distinct('hiddenEstimates.antibodies').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('hiddenEstimates.assay').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('hiddenEstimates.country').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('hiddenEstimates.pathogen').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('hiddenEstimates.pediatricAgeGroup').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('hiddenEstimates.producer').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('hiddenEstimates.sampleFrame').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('hiddenEstimates.serotype').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('hiddenEstimates.sex').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('hiddenEstimates.unRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('hiddenEstimates.whoRegion').then((elements) => filterUndefinedValuesFromArray(elements)),
      estimateCollection.distinct('hiddenEstimates.studyPopulation')
        .then((estimateTypes: Array<ArbovirusEstimateDocument['studyPopulation']>) => filterUndefinedValuesFromArray(estimateTypes))
        .then((elements) => elements.map((element) => arbovirusStudyPopulationMap[element])),
      estimateCollection.aggregate([
        {
          $project: {
            _id: 0,
            shownEstimates: 1
          }
        },
        {
          $unwind: "$shownEstimates"
        },
        {
          $group: {
            _id: {
              alphaTwoCode: "$shownEstimates.countryAlphaTwoCode"
            },
            name: {
              $first: "$shownEstimates.country"
            },
            alphaThreeCode: {
              $first: "$shownEstimates.countryAlphaThreeCode"
            }
          }
        },
        {
          $project: {
            "_id": 0,
            "alphaTwoCode": "$_id.alphaTwoCode",
            "name": 1,
            "alphaThreeCode": 1
          }
        },
        {
          $sort: {
            name: 1,
            alphaTwoCode: 1,
            alphaThreeCode: 1,
          }
        }
      ]).toArray(),
      estimateCollection.aggregate([
        {
          $project: {
            _id: 0,
            shownEstimates: 1
          }
        },
        {
          $unwind: "$hiddenEstimates"
        },
        {
          $group: {
            _id: {
              alphaTwoCode: "$hiddenEstimates.countryAlphaTwoCode"
            },
            name: {
              $first: "$hiddenEstimates.country"
            },
            alphaThreeCode: {
              $first: "$hiddenEstimates.countryAlphaThreeCode"
            }
          }
        },
        {
          $project: {
            "_id": 0,
            "alphaTwoCode": "$_id.alphaTwoCode",
            "name": 1,
            "alphaThreeCode": 1
          }
        },
        {
          $sort: {
            name: 1,
            alphaTwoCode: 1,
            alphaThreeCode: 1,
          }
        }
      ]).toArray()
    ])

    const ageGroup = uniq([
      ...ageGroupForShownEstimates,
      ...ageGroupForHiddenEstimates,
    ]);
    const estimateType = uniq([
      ...estimateTypeForShownEstimates,
      ...estimateTypeForHiddenEstimates,
    ]);
    const antibody = uniq([
      ...antibodyForShownEstimates,
      ...antibodyForHiddenEstimates,
    ]);
    const assay = uniq([
      ...assayForShownEstimates,
      ...assayForHiddenEstimates,
    ]);
    const country = uniq([
      ...countryForShownEstimates,
      ...countryForHiddenEstimates,
    ]);
    const pathogen = uniq([
      ...pathogenForShownEstimates,
      ...pathogenForHiddenEstimates,
    ]);
    const pediatricAgeGroup = uniq([
      ...pediatricAgeGroupForShownEstimates,
      ...pediatricAgeGroupForHiddenEstimates,
    ]);
    const producer = uniq([
      ...producerForShownEstimates,
      ...producerForHiddenEstimates,
    ]);
    const sampleFrame = uniq([
      ...sampleFrameForShownEstimates,
      ...sampleFrameForHiddenEstimates,
    ]);
    const serotype = uniq([
      ...serotypeForShownEstimates,
      ...serotypeForHiddenEstimates,
    ]);
    const sex = uniq([
      ...sexForShownEstimates,
      ...sexForHiddenEstimates,
    ]);
    const unRegion = uniq([
      ...unRegionForShownEstimates,
      ...unRegionForHiddenEstimates,
    ]);
    const whoRegion = uniq([
      ...whoRegionForShownEstimates,
      ...whoRegionForHiddenEstimates,
    ]);
    const studyPopulation = uniq([
      ...studyPopulationForShownEstimates,
      ...studyPopulationForHiddenEstimates,
    ]);
    const countryIdentifiers = uniq([
      ...countryIdentifiersForShownEstimates,
      ...countryIdentifiersForHiddenEstimates,
    ]);

    return {
      ageGroup,
      estimateType,
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
      countryIdentifiers: countryIdentifiers as CountryIdentifiers[],
      studyPopulation
    }
  }
  
  return {
    arboResolvers: {
      Query: {
        arbovirusEstimates,
        groupedArbovirusEstimates,
        partitionedGroupedArbovirusEstimates,
        allGroupedArbovirusEstimatePartitionKeys,
        arbovirusEnviromentalSuitabilityData,
        arbovirusFilterOptions,
        groupedArbovirusEstimateFilterOptions,
        arbovirusDataStatistics,
        partitionedUnravelledGroupedArbovirusEstimates,
        allUnravelledGroupedArbovirusEstimatePartitionKeys,
      }
    }
  }
}