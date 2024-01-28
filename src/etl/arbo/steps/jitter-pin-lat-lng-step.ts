import { AirtableEstimateFieldsAfterLatLngGenerationStep, AirtableSourceFieldsAfterLatLngGenerationStep } from "./lat-lng-generation-step.js";

export type AirtableEstimateFieldsAfterJitteringPinLatLngStep = AirtableEstimateFieldsAfterLatLngGenerationStep;

export type AirtableSourceFieldsAfterJitteringPinLatLngStep = AirtableSourceFieldsAfterLatLngGenerationStep

interface JitterNumberValueByAmountInput {
  value: number;
  jitterAmount: number;
}

const jitterNumberValueByAmount = (input: JitterNumberValueByAmountInput): number => {
  const { value, jitterAmount } = input;

  const maximumJitter = jitterAmount;
  const minimumJitter = -jitterAmount;

  return value + (Math.random() * (maximumJitter - minimumJitter) + minimumJitter);
}

interface JitterPinLatLngStepInput {
  allEstimates: AirtableEstimateFieldsAfterLatLngGenerationStep[];
  allSources: AirtableSourceFieldsAfterLatLngGenerationStep[];
}

interface JitterPinLatLngStepOutput {
  allEstimates: AirtableEstimateFieldsAfterJitteringPinLatLngStep[];
  allSources: AirtableSourceFieldsAfterJitteringPinLatLngStep[];
}

export const jitterPinLatLngStep = (
  input: JitterPinLatLngStepInput
): JitterPinLatLngStepOutput => {
  const { allEstimates, allSources } = input;
  const maximumPinJitterMagnitude = 0.1;

  console.log(`Running step: jitterPinLatLngStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: allEstimates.map((estimate) => ({
      ...estimate,
      latitude: jitterNumberValueByAmount({value: estimate.latitude, jitterAmount: maximumPinJitterMagnitude}),
      longitude: jitterNumberValueByAmount({value: estimate.longitude, jitterAmount: maximumPinJitterMagnitude}),
    })),
    allSources: allSources,
  };
};
