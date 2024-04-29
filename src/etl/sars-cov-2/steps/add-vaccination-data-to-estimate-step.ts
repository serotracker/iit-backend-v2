import {
  EstimateFieldsAfterJitteringPinLatLngStep,
  StructuredPositiveCaseDataAfterJitteringPinLatLngStep,
  StructuredVaccinationDataAfterJitteringPinLatLngStep,
} from "./jitter-pin-lat-lng-step";

export type EstimateFieldsAfterAddingVaccinationDataStep =
  EstimateFieldsAfterJitteringPinLatLngStep & {
    countryPeopleVaccinatedPerHundred: number | undefined;
    countryPeopleFullyVaccinatedPerHundred: number | undefined;
  };
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
    allEstimates: input.allEstimates.map((estimate) => {
      const {
        countryPeopleVaccinatedPerHundred,
        countryPeopleFullyVaccinatedPerHundred
      } = input.vaccinationData
        .find((element) => element.threeLetterCountryCode === estimate.countryAlphaThreeCode)?.data
        .find((element) => estimate.samplingMidDate && element.year === estimate.samplingMidDate.getUTCFullYear().toString())?.data
        .find((element) => estimate.samplingMidDate && element.month === (estimate.samplingMidDate.getUTCMonth() + 1).toString())?.data
        .find((element) => estimate.samplingMidDate && element.day === (estimate.samplingMidDate.getUTCDate()).toString()) ?? {
          countryPeopleVaccinatedPerHundred: undefined,
          countryPeopleFullyVaccinatedPerHundred: undefined
        }
      return {
        ...estimate,
        countryPeopleVaccinatedPerHundred,
        countryPeopleFullyVaccinatedPerHundred
      }
    }),
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
  };
};
