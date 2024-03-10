import { EstimateFieldsAfterCleaningFieldNamesStep } from "./clean-field-names-and-remove-unused-fields-step.js";

export type EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep = EstimateFieldsAfterCleaningFieldNamesStep;

interface RemoveRecordsThatAreFlaggedNotToSaveInput {
  allEstimates: EstimateFieldsAfterCleaningFieldNamesStep[];
}

interface RemoveRecordsThatAreFlaggedNotToSaveOutput {
  allEstimates: EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep[];
}

export const removeRecordsThatAreFlaggedNotToSave = (input: RemoveRecordsThatAreFlaggedNotToSaveInput): RemoveRecordsThatAreFlaggedNotToSaveOutput => {
  console.log(
    `Running step: removeRecordsThatAreFlaggedNotToSave. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates.filter((estimate) => estimate.includedInETL !== 0),
  };
}