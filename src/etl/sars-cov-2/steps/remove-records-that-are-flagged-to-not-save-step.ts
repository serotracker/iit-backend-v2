import { EstimateFieldsAfterCleaningFieldNamesStep, StructuredPositiveCaseDataAfterCleaningFieldNamesStep, StructuredVaccinationDataAfterCleaningFieldNamesStep } from "./clean-field-names-and-remove-unused-fields-step.js";

export type EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep =
  EstimateFieldsAfterCleaningFieldNamesStep;
export type StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep = StructuredVaccinationDataAfterCleaningFieldNamesStep;
export type StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep = StructuredPositiveCaseDataAfterCleaningFieldNamesStep;

interface RemoveRecordsThatAreFlaggedNotToSaveInput {
  allEstimates: EstimateFieldsAfterCleaningFieldNamesStep[];
  vaccinationData: StructuredVaccinationDataAfterCleaningFieldNamesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterCleaningFieldNamesStep;
}

interface RemoveRecordsThatAreFlaggedNotToSaveOutput {
  allEstimates: EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep[];
  vaccinationData: StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
  positiveCaseData: StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
}

export const removeRecordsThatAreFlaggedNotToSave = (
  input: RemoveRecordsThatAreFlaggedNotToSaveInput
): RemoveRecordsThatAreFlaggedNotToSaveOutput => {
  console.log(`Running step: removeRecordsThatAreFlaggedNotToSave. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates.filter(
      (estimate) => estimate.includedInETL !== 0
    ),
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
  };
};
