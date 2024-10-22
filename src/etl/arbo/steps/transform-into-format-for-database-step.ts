import { ObjectId, MongoClient } from "mongodb";
import {
  ArbovirusEnvironmentalSuitabilityStatsEntryDocument,
  ArbovirusEstimateDocument
} from "../../../storage/types.js";
import {
  AirtableCountryFieldsAfterJitteringPinLatLngStep,
  AirtableEstimateFieldsAfterJitteringPinLatLngStep,
  AirtableSourceFieldsAfterJitteringPinLatLngStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterJitteringPinLatLngStep,
} from "./jitter-pin-lat-lng-step.js";

export type AirtableEstimateFieldsAfterTransformingIntoFormatForDatabaseStep =
  ArbovirusEstimateDocument;
export type AirtableSourceFieldsAfterTransformingIntoFormatForDatabaseStep =
  AirtableSourceFieldsAfterJitteringPinLatLngStep;
export type AirtableCountryFieldsAfterTransformingIntoFormatForDatabaseStep =
  AirtableCountryFieldsAfterJitteringPinLatLngStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterTransformingIntoFormatForDatabaseStep =
  ArbovirusEnvironmentalSuitabilityStatsEntryDocument;

interface TransformIntoFormatForDatabaseStepInput {
  allEstimates: AirtableEstimateFieldsAfterJitteringPinLatLngStep[];
  allSources: AirtableSourceFieldsAfterJitteringPinLatLngStep[];
  allCountries: AirtableCountryFieldsAfterJitteringPinLatLngStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterJitteringPinLatLngStep[];
  mongoClient: MongoClient;
}

interface TransformIntoFormatForDatabaseStepOutput {
  allEstimates: AirtableEstimateFieldsAfterTransformingIntoFormatForDatabaseStep[];
  allSources: AirtableSourceFieldsAfterTransformingIntoFormatForDatabaseStep[];
  allCountries: AirtableCountryFieldsAfterTransformingIntoFormatForDatabaseStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterTransformingIntoFormatForDatabaseStep[];
  mongoClient: MongoClient;
}

export const transformIntoFormatForDatabaseStep = (
  input: TransformIntoFormatForDatabaseStepInput
): TransformIntoFormatForDatabaseStepOutput => {
  console.log(`Running step: transformIntoFormatForDatabaseStep. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources, allCountries } = input;

  const createdAtForAllRecords = new Date();
  const updatedAtForAllRecords = createdAtForAllRecords;

  return {
    allEstimates: allEstimates.map((estimate) => ({
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
      unRegion: estimate.unRegion,
      url: estimate.url,
      sourceSheetId: estimate.sourceSheetId,
      antigen: estimate.antigen,
      whoRegion: estimate.whoRegion,
      sourceSheetName: estimate.sourceSheetName,
      estimateId: estimate.estimateId,
      createdAt: createdAtForAllRecords,
      updatedAt: updatedAtForAllRecords
    })),
    allSources: allSources,
    allCountries: allCountries,
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry.map((dataPoint) => ({
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
    })),
    mongoClient: input.mongoClient
  };
};
