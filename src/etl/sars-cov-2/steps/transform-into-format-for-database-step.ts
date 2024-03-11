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
      riskOfBias: estimate.riskOfBias,
      age: estimate.age,
      sex: estimate.sex,
      sourceType: estimate.sourceType,
      populationGroup: estimate.populationGroup,
      country: estimate.country,
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
