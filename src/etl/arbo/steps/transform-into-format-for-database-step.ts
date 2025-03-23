import { ObjectId, MongoClient } from "mongodb";
import {
  ArbovirusEnvironmentalSuitabilityStatsEntryDocument,
  ArbovirusEstimateDocument,
  ArbovirusGroupedEstimateDocument,
  ArbovirusStudyPopulation,
} from "../../../storage/types.js";
import {
  AirtableEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep,
  AirtableCountryFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep,
  AirtableSourceFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterGroupingEstimatesUnderPrimaryEstimateStep,
  GroupedEstimatesAfterGroupingEstimatesUnderPrimaryEstimateStep,
} from "./group-estimates-under-primary-estimate-step.js";

export type AirtableEstimateFieldsAfterTransformingIntoFormatForDatabaseStep =
  ArbovirusEstimateDocument;
export type AirtableSourceFieldsAfterTransformingIntoFormatForDatabaseStep =
  AirtableSourceFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep;
export type AirtableCountryFieldsAfterTransformingIntoFormatForDatabaseStep =
  AirtableCountryFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterTransformingIntoFormatForDatabaseStep =
  ArbovirusEnvironmentalSuitabilityStatsEntryDocument;
export type GroupedEstimatesAfterTransformingIntoFormatForDatabaseStep =
  ArbovirusGroupedEstimateDocument;

const transformStudyPopulationForDatabase = (studyPopulation: string | undefined): ArbovirusStudyPopulation => {
  if(!studyPopulation) {
    return ArbovirusStudyPopulation.HUMAN;
  }
  if(studyPopulation === 'Human') {
    return ArbovirusStudyPopulation.HUMAN;
  }
  if(studyPopulation === 'Insect') {
    return ArbovirusStudyPopulation.INSECT;
  }
  if(studyPopulation === 'Non-human animal') {
    return ArbovirusStudyPopulation.NON_HUMAN_ANIMAL;
  }
  return ArbovirusStudyPopulation.HUMAN;
}

interface TransformIntoFormatForDatabaseStepInput {
  allEstimates: AirtableEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep[];
  allSources: AirtableSourceFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep[];
  allCountries: AirtableCountryFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterGroupingEstimatesUnderPrimaryEstimateStep[];
  groupedEstimates: GroupedEstimatesAfterGroupingEstimatesUnderPrimaryEstimateStep[];
  mongoClient: MongoClient;
}

interface TransformIntoFormatForDatabaseStepOutput {
  allEstimates: AirtableEstimateFieldsAfterTransformingIntoFormatForDatabaseStep[];
  allSources: AirtableSourceFieldsAfterTransformingIntoFormatForDatabaseStep[];
  allCountries: AirtableCountryFieldsAfterTransformingIntoFormatForDatabaseStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterTransformingIntoFormatForDatabaseStep[];
  groupedEstimates: GroupedEstimatesAfterTransformingIntoFormatForDatabaseStep[];
  mongoClient: MongoClient;
}

interface TransformArbovirusEstimateForDatabaseInput {
  estimate: TransformIntoFormatForDatabaseStepInput['allEstimates'][number];
  createdAtForAllRecords: Date;
  updatedAtForAllRecords: Date;
}

interface TransformEnvironmentalSuitabilityStatsByCountryForDatabaseInput {
  dataPoint: TransformIntoFormatForDatabaseStepInput['environmentalSuitabilityStatsByCountry'][number];
  createdAtForAllRecords: Date;
  updatedAtForAllRecords: Date;
}

interface TransformGroupedArbovirusSubestimateForDatabaseInput {
  subEstimate: 
    | TransformIntoFormatForDatabaseStepInput['groupedEstimates'][number]['shownEstimates'][number]
    | TransformIntoFormatForDatabaseStepInput['groupedEstimates'][number]['hiddenEstimates'][number];
  createdAtForAllRecords: Date;
  updatedAtForAllRecords: Date;
}

interface TransformGroupedArbovirusEstimateForDatabaseInput {
  groupedEstimate: TransformIntoFormatForDatabaseStepInput['groupedEstimates'][number];
  createdAtForAllRecords: Date;
  updatedAtForAllRecords: Date;
}

const transformArbovirusEstimateForDatabase = (
  input: TransformArbovirusEstimateForDatabaseInput
): TransformIntoFormatForDatabaseStepOutput['allEstimates'][number] => {
  const { estimate, createdAtForAllRecords, updatedAtForAllRecords } = input;

  return {
    _id: new ObjectId(),
    estimateType: estimate.estimateType,
    sex: estimate.sex,
    antibodies: estimate.antibodies,
    ageMinimum: estimate.ageMinimum,
    ageMaximum: estimate.ageMaximum,
    ageGroup: estimate.ageGroup,
    assayOther: estimate.assayOther,
    producer: estimate.producer,
    producerOther: estimate.producerOther,
    sampleFrame: estimate.sampleFrame,
    sameFrameTargetGroup: estimate.sampleFrameTargetGroup,
    sampleSize: estimate.sampleSize,
    sampleNumerator: estimate.sampleNumerator,
    serotype: estimate.serotype ?? [],
    inclusionCriteria: estimate.inclusionCriteria,
    pathogen: estimate.pathogen,
    pediatricAgeGroup: estimate.pediatricAgeGroup,
    seroprevalence: estimate.seroprevalence,
    seroprevalenceStudy95CILower: estimate.seroprevalenceStudy95CILower,
    seroprevalenceStudy95CIUpper: estimate.seroprevalenceStudy95CIUpper,
    seroprevalenceCalculated95CILower: estimate.seroprevalenceCalculated95CILower,
    seroprevalenceCalculated95CIUpper: estimate.seroprevalenceCalculated95CIUpper,
    country: estimate.country,
    countryAlphaTwoCode: estimate.countryAlphaTwoCode,
    countryAlphaThreeCode: estimate.countryAlphaThreeCode,
    state: estimate.state,
    city: estimate.city,
    latitude: estimate.latitude,
    longitude: estimate.longitude,
    sampleStartDate: estimate.sampleStartDate,
    sampleEndDate: estimate.sampleEndDate,
    assay: estimate.assay,
    groupingVariable: estimate.groupingVariable,
    unRegion: estimate.unRegion,
    url: estimate.url,
    sourceSheetId: estimate.sourceSheetId,
    antigen: estimate.antigen,
    whoRegion: estimate.whoRegion,
    sourceSheetName: estimate.sourceSheetName,
    estimateId: estimate.estimateId,
    studyPopulation: transformStudyPopulationForDatabase(estimate.studyPopulation),
    studySpecies: estimate.studySpecies ?? 'Homo sapiens',
    createdAt: createdAtForAllRecords,
    updatedAt: updatedAtForAllRecords
  }
}

const transformEnvironmentalSuitabilityStatsByCountryForDatabase = (
  input: TransformEnvironmentalSuitabilityStatsByCountryForDatabaseInput
): TransformIntoFormatForDatabaseStepOutput['environmentalSuitabilityStatsByCountry'][number] => {
  const { dataPoint, createdAtForAllRecords, updatedAtForAllRecords } = input;

  return {
    _id: new ObjectId(),
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
    createdAt: createdAtForAllRecords,
    updatedAt: updatedAtForAllRecords
  }
}

const transformGroupedArbovirusSubestimateForDatabase = (
  input: TransformGroupedArbovirusSubestimateForDatabaseInput
): (
  | TransformIntoFormatForDatabaseStepOutput['groupedEstimates'][number]['shownEstimates'][number]
  | TransformIntoFormatForDatabaseStepOutput['groupedEstimates'][number]['hiddenEstimates'][number]
) => {
  const { subEstimate, createdAtForAllRecords, updatedAtForAllRecords } = input;
  const {
    sex: _sex,
    ageGroup: _ageGroup,
    _id: _id,
    ...genericEstimateFields
  } = transformArbovirusEstimateForDatabase({
    estimate: {
      ...subEstimate,
      ageGroup: 'N/A',
      sex: 'N/A'
    },
    createdAtForAllRecords,
    updatedAtForAllRecords,
  });

  return {
    ...genericEstimateFields,
    id: _id,
    ageGroup: subEstimate.ageGroup,
    sex: subEstimate.sex,
    assay: subEstimate.assay,
  }
} 

const transformGroupedArbovirusEstimateForDatabase = (
  input: TransformGroupedArbovirusEstimateForDatabaseInput
): TransformIntoFormatForDatabaseStepOutput['groupedEstimates'][number] => {
  const { groupedEstimate, createdAtForAllRecords, updatedAtForAllRecords } = input;

  return {
    _id: new ObjectId(),
    shownEstimates: groupedEstimate.shownEstimates.map((subEstimate) => transformGroupedArbovirusSubestimateForDatabase({
      subEstimate,
      createdAtForAllRecords,
      updatedAtForAllRecords,
    })),
    hiddenEstimates: groupedEstimate.hiddenEstimates.map((subEstimate) => transformGroupedArbovirusSubestimateForDatabase({
      subEstimate,
      createdAtForAllRecords,
      updatedAtForAllRecords,
    })),
    createdAt: createdAtForAllRecords,
    updatedAt: updatedAtForAllRecords
  }
}

export const transformIntoFormatForDatabaseStep = (
  input: TransformIntoFormatForDatabaseStepInput
): TransformIntoFormatForDatabaseStepOutput => {
  console.log(`Running step: transformIntoFormatForDatabaseStep. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources, allCountries, groupedEstimates } = input;

  const createdAtForAllRecords = new Date();
  const updatedAtForAllRecords = createdAtForAllRecords;

  return {
    allEstimates: allEstimates.map((estimate) => transformArbovirusEstimateForDatabase({
      estimate,
      createdAtForAllRecords,
      updatedAtForAllRecords,
    })),
    allSources: allSources,
    allCountries: allCountries,
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry.map((dataPoint) => transformEnvironmentalSuitabilityStatsByCountryForDatabase({
      dataPoint,
      createdAtForAllRecords,
      updatedAtForAllRecords,
    })),
    groupedEstimates: groupedEstimates.map((groupedEstimate) => transformGroupedArbovirusEstimateForDatabase({
      groupedEstimate,
      createdAtForAllRecords,
      updatedAtForAllRecords,
    })),
    mongoClient: input.mongoClient
  };
};
