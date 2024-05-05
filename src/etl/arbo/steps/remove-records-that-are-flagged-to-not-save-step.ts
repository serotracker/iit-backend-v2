import { MongoClient } from "mongodb";
import {
  AirtableEstimateFieldsAfterRemovingEstimatesWithLowSampleSizeStep,
  AirtableSourceFieldsAfterRemovingEstimatesWithLowSampleSizeStep,
} from "./remove-estimates-with-low-sample-size-step.js";

export type AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep =
  Omit<AirtableEstimateFieldsAfterRemovingEstimatesWithLowSampleSizeStep, "includeInEtl"> & {
    includeInEtl: 1;
  };

export type AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep =
  AirtableSourceFieldsAfterRemovingEstimatesWithLowSampleSizeStep;

interface RemoveRecordsThatAreFlaggedToNotSaveStepInput {
  allEstimates: AirtableEstimateFieldsAfterRemovingEstimatesWithLowSampleSizeStep[];
  allSources: AirtableSourceFieldsAfterRemovingEstimatesWithLowSampleSizeStep[];
  mongoClient: MongoClient;
}

interface RemoveRecordsThatAreFlaggedToNotSaveStepOutput {
  allEstimates: AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  allSources: AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  mongoClient: MongoClient;
}

export const removeRecordsThatAreFlaggedToNotSaveStep = (
  input: RemoveRecordsThatAreFlaggedToNotSaveStepInput
): RemoveRecordsThatAreFlaggedToNotSaveStepOutput => {
  const { allEstimates, allSources } = input;

  console.log(`Running step: removeRecordsThatAreFlaggedToNotSaveStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: allEstimates.filter((estimate): estimate is AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep =>
      estimate.includeInEtl === 1
    ),
    allSources: allSources,
    mongoClient: input.mongoClient
  };
};
