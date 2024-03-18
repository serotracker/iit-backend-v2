import { EstimateFieldsAfterAddingVaccinationDataStep, StructuredPositiveCaseDataAfterAddingVaccinationDataStep, StructuredVaccinationDataAfterAddingVaccinationDataStep } from "./add-vaccination-data-to-estimate-step";

export type EstimateFieldsAfterAddingPositiveCaseDataStep =
  EstimateFieldsAfterAddingVaccinationDataStep;
export type StructuredVaccinationDataAfterAddingPositiveCaseDataStep =
  StructuredVaccinationDataAfterAddingVaccinationDataStep;
export type StructuredPositiveCaseDataAfterAddingPositiveCaseDataStep =
  StructuredPositiveCaseDataAfterAddingVaccinationDataStep;

interface AddPositiveCaseDataToEstimateStepInput {
  allEstimates: EstimateFieldsAfterAddingVaccinationDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingVaccinationDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingVaccinationDataStep;
}

interface AddPositiveCaseDataToEstimateStepOutput {
  allEstimates: EstimateFieldsAfterAddingPositiveCaseDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingPositiveCaseDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingPositiveCaseDataStep;
}

export const addPositiveCaseDataToEstimateStep = (
  input: AddPositiveCaseDataToEstimateStepInput
): AddPositiveCaseDataToEstimateStepOutput => {
  console.log(
    `Running step: addPositiveCaseDataToEstimateStep. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
  };
};
