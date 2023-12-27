import { ObjectId } from "mongodb";
import { EstimateDocument } from "../../storage/types.js";
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
  allEstimates: EstimateDocument[];
  allSources: AirtableSourceFieldsAfterTransformingIntoFormatForDatabaseStep[];
}

export const transformIntoFormatForDatabaseStep = (
  input: TransformIntoFormatForDatabaseStepInput
): TransformIntoFormatForDatabaseStepOutput => {
  const { allEstimates, allSources } = input;

  console.log("Running step: transformIntoFormatForDatabaseStep");

  return {
    allEstimates: allEstimates.map((estimate) => ({
      _id: new ObjectId(),
      sex: estimate.sex,
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
      inclusionCriteria: estimate.inclusionCriteria,
      pathogen: estimate.pathogen,
      seroprevalence: estimate.seroprevalence,
      country: estimate.country,
      state: estimate.state,
      city: estimate.city,
      latitude: estimate.latitude,
      longitude: estimate.longitude,
      sampleStartDate: estimate.sampleStartDate,
      sampleEndDate: estimate.sampleEndDate,
      assay: estimate.assay,
      url: estimate.url,
      sourceSheetId: estimate.sourceSheetId,
      antigen: estimate.antigen,
      whoRegion: estimate.whoRegion,
      sourceSheetName: estimate.sourceSheetName,
      estimateId: estimate.estimateId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    allSources: allSources,
  };
};
