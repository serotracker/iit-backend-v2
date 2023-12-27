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
}

interface RemoveRecordsThatAreFlaggedToNotSaveStepOutput {
  allEstimates: AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  allSources: AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
}

export const removeRecordsThatAreFlaggedToNotSaveStep = (
  input: RemoveRecordsThatAreFlaggedToNotSaveStepInput
): RemoveRecordsThatAreFlaggedToNotSaveStepOutput => {
  const { allEstimates, allSources } = input;

  console.log("Running step: removeRecordsThatAreFlaggedToNotSaveStep");

  return {
    allEstimates: allEstimates.filter((estimate): estimate is AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep =>
      estimate.includeInEtl === 1
    ),
    allSources: allSources,
  };
};
