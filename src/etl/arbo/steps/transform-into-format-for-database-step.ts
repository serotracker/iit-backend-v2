import { ObjectId } from "mongodb";
import { ArbovirusEstimateDocument } from "../../../storage/types.js";
import {
  AirtableEstimateFieldsAfterJitteringPinLatLngStep,
  AirtableSourceFieldsAfterJitteringPinLatLngStep,
} from "./jitter-pin-lat-lng-step.js";

export type AirtableEstimateFieldsAfterTransformingIntoFormatForDatabaseStep = AirtableEstimateFieldsAfterJitteringPinLatLngStep;

export type AirtableSourceFieldsAfterTransformingIntoFormatForDatabaseStep = AirtableSourceFieldsAfterJitteringPinLatLngStep;

interface TransformIntoFormatForDatabaseStepInput {
  allEstimates: AirtableEstimateFieldsAfterJitteringPinLatLngStep[];
  allSources: AirtableSourceFieldsAfterJitteringPinLatLngStep[];
}

interface TransformIntoFormatForDatabaseStepOutput {
  allEstimates: ArbovirusEstimateDocument[];
  allSources: AirtableSourceFieldsAfterTransformingIntoFormatForDatabaseStep[];
}

export const transformIntoFormatForDatabaseStep = (
  input: TransformIntoFormatForDatabaseStepInput
): TransformIntoFormatForDatabaseStepOutput => {
  const { allEstimates, allSources } = input;

  console.log(`Running step: transformIntoFormatForDatabaseStep. Remaining estimates: ${input.allEstimates.length}`);

  const createdAtForAllRecords = new Date();
  const updatedAtForAllRecords = createdAtForAllRecords;

  return {
    allEstimates: allEstimates.map((estimate) => ({
      _id: new ObjectId(),
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
  };
};
