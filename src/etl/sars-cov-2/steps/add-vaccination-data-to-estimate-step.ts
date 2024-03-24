import {
  EstimateFieldsAfterJitteringPinLatLngStep,
  StructuredPositiveCaseDataAfterJitteringPinLatLngStep,
  StructuredVaccinationDataAfterJitteringPinLatLngStep,
} from "./jitter-pin-lat-lng-step";

export type EstimateFieldsAfterAddingVaccinationDataStep =
  EstimateFieldsAfterJitteringPinLatLngStep;
export type StructuredVaccinationDataAfterAddingVaccinationDataStep =
  StructuredVaccinationDataAfterJitteringPinLatLngStep;
export type StructuredPositiveCaseDataAfterAddingVaccinationDataStep =
  StructuredPositiveCaseDataAfterJitteringPinLatLngStep;

interface AddVaccinationDataToEstimateStepInput {
  allEstimates: EstimateFieldsAfterJitteringPinLatLngStep[];
  vaccinationData: StructuredVaccinationDataAfterJitteringPinLatLngStep;
  positiveCaseData: StructuredPositiveCaseDataAfterJitteringPinLatLngStep;
}

interface AddVaccinationDataToEstimateStepOutput {
  allEstimates: EstimateFieldsAfterAddingVaccinationDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingVaccinationDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingVaccinationDataStep;
}

export const addVaccinationDataToEstimateStep = (
  input: AddVaccinationDataToEstimateStepInput
): AddVaccinationDataToEstimateStepOutput => {
  console.log(
    `Running step: addVaccinationDataToEstimateStep. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
  };
};
