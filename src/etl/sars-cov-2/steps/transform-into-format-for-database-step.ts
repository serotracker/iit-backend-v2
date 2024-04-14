import { ObjectId } from "mongodb";
import { EstimateFieldsAfterJitteringPinLatLngStep } from "./jitter-pin-lat-lng-step.js";
import { SarsCov2EstimateDocument } from "../../../storage/types.js";

interface TransformIntoFormatForDatabaseStepInput {
  allEstimates: EstimateFieldsAfterJitteringPinLatLngStep[];
}

interface TransformIntoFormatForDatabaseStepOutput {
  allEstimates: SarsCov2EstimateDocument[];
}

export const transformIntoFormatForDatabaseStep = (
  input: TransformIntoFormatForDatabaseStepInput
): TransformIntoFormatForDatabaseStepOutput => {
  const { allEstimates } = input;

  console.log(
    `Running step: transformIntoFormatForDatabaseStep. Remaining estimates: ${input.allEstimates.length}`
  );

  const createdAtForAllRecords = new Date();
  const updatedAtForAllRecords = createdAtForAllRecords;

  return {
    allEstimates: allEstimates.map((estimate) => ({
      _id: new ObjectId(),
      antibodies: estimate.antibodies,
      isotypes: estimate.isotypes,
      isWHOUnityAligned: estimate.isWHOUnityAligned,
      testType: estimate.testType,
      riskOfBias: estimate.riskOfBias,
      ageGroup: estimate.ageGroup,
      sex: estimate.sex,
      sourceType: estimate.sourceType,
      populationGroup: estimate.populationGroup,
      latitude: estimate.latitude,
      longitude: estimate.longitude,
      country: estimate.country,
      countryAlphaTwoCode: estimate.countryAlphaTwoCode,
      whoRegion: estimate.whoRegion,
      unRegion: estimate.unRegion,
      state: estimate.state,
      county: estimate.county,
      city: estimate.city,
      scope: estimate.scope,
      samplingStartDate: estimate.samplingStartDate,
      samplingEndDate: estimate.samplingEndDate,
      createdAt: createdAtForAllRecords,
      updatedAt: updatedAtForAllRecords,
    })),
  };
};
