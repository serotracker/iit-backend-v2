import { EstimateFieldsAfterLatLngGenerationStep, StructuredPositiveCaseDataAfterLatLngGenerationStep, StructuredVaccinationDataAfterLatLngGenerationStep, StudyFieldsAfterLatLngGenerationStep } from "./lat-lng-generation-step.js";

export type EstimateFieldsAfterJitteringPinLatLngStep =
  EstimateFieldsAfterLatLngGenerationStep;
export type StudyFieldsAfterJitteringPinLatLngStep =
  StudyFieldsAfterLatLngGenerationStep;
export type StructuredVaccinationDataAfterJitteringPinLatLngStep = StructuredVaccinationDataAfterLatLngGenerationStep;
export type StructuredPositiveCaseDataAfterJitteringPinLatLngStep = StructuredPositiveCaseDataAfterLatLngGenerationStep;

interface JitterNumberValueByAmountInput {
  value: number;
  jitterAmount: number;
}

const jitterNumberValueByAmount = (
  input: JitterNumberValueByAmountInput
): number => {
  const { value, jitterAmount } = input;

  const maximumJitter = jitterAmount;
  const minimumJitter = -jitterAmount;

  return (
    value + (Math.random() * (maximumJitter - minimumJitter) + minimumJitter)
  );
};

interface JitterPinLatLngStepInput {
  allEstimates: EstimateFieldsAfterLatLngGenerationStep[];
  allStudies: StudyFieldsAfterLatLngGenerationStep[];
  vaccinationData: StructuredVaccinationDataAfterLatLngGenerationStep;
  positiveCaseData: StructuredPositiveCaseDataAfterLatLngGenerationStep;
}

interface JitterPinLatLngStepOutput {
  allEstimates: EstimateFieldsAfterJitteringPinLatLngStep[];
  allStudies: StudyFieldsAfterJitteringPinLatLngStep[];
  vaccinationData: StructuredVaccinationDataAfterJitteringPinLatLngStep;
  positiveCaseData: StructuredPositiveCaseDataAfterJitteringPinLatLngStep;
}

export const jitterPinLatLngStep = (
  input: JitterPinLatLngStepInput
): JitterPinLatLngStepOutput => {
  const { allEstimates } = input;
  const maximumPinJitterMagnitude = 0.1;

  console.log(
    `Running step: jitterPinLatLngStep. Remaining estimates: ${input.allEstimates.length}. Maximum pin jitter mangnitude: ${maximumPinJitterMagnitude}`
  );

  return {
    allEstimates: allEstimates.map((estimate) => ({
      ...estimate,
      latitude: jitterNumberValueByAmount({
        value: estimate.latitude,
        jitterAmount: maximumPinJitterMagnitude,
      }),
      longitude: jitterNumberValueByAmount({
        value: estimate.longitude,
        jitterAmount: maximumPinJitterMagnitude,
      }),
    })),
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
  };
};
