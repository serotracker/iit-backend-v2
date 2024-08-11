import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterLatLngGenerationStep,
  AirtableEstimateFieldsAfterLatLngGenerationStep,
  AirtableSourceFieldsAfterLatLngGenerationStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterLatLngGenerationStep
} from "./lat-lng-generation-step.js";

export type AirtableEstimateFieldsAfterJitteringPinLatLngStep =
  AirtableEstimateFieldsAfterLatLngGenerationStep;
export type AirtableSourceFieldsAfterJitteringPinLatLngStep =
  AirtableSourceFieldsAfterLatLngGenerationStep;
export type AirtableCountryFieldsAfterJitteringPinLatLngStep =
  AirtableCountryFieldsAfterLatLngGenerationStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterJitteringPinLatLngStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterLatLngGenerationStep;

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
  allCountries: AirtableCountryFieldsAfterLatLngGenerationStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterLatLngGenerationStep[];
  mongoClient: MongoClient;
}

interface JitterPinLatLngStepOutput {
  allEstimates: AirtableEstimateFieldsAfterJitteringPinLatLngStep[];
  allSources: AirtableSourceFieldsAfterJitteringPinLatLngStep[];
  allCountries: AirtableCountryFieldsAfterJitteringPinLatLngStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterJitteringPinLatLngStep[];
  mongoClient: MongoClient;
}

export const jitterPinLatLngStep = (
  input: JitterPinLatLngStepInput
): JitterPinLatLngStepOutput => {
  const maximumPinJitterMagnitude = 0.1;
  console.log(`Running step: jitterPinLatLngStep. Remaining estimates: ${input.allEstimates.length}. Maximum pin jitter mangnitude: ${maximumPinJitterMagnitude}`);

  const { allEstimates, allSources, allCountries } = input;

  return {
    allEstimates: allEstimates.map((estimate) => ({
      ...estimate,
      latitude: jitterNumberValueByAmount({value: estimate.latitude, jitterAmount: maximumPinJitterMagnitude}),
      longitude: jitterNumberValueByAmount({value: estimate.longitude, jitterAmount: maximumPinJitterMagnitude}),
    })),
    allSources: allSources,
    allCountries: allCountries,
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry,
    mongoClient: input.mongoClient
  };
};
