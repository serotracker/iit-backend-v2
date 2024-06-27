import { MongoClient } from "mongodb";
import { CountryFieldsAfterLatLngGenerationStep, EstimateFieldsAfterLatLngGenerationStep, StructuredCountryPopulationDataAfterLatLngGenerationStep, StructuredPositiveCaseDataAfterLatLngGenerationStep, StructuredVaccinationDataAfterLatLngGenerationStep, StudyFieldsAfterLatLngGenerationStep } from "./lat-lng-generation-step.js";

export type EstimateFieldsAfterJitteringPinLatLngStep =
  EstimateFieldsAfterLatLngGenerationStep;
export type StudyFieldsAfterJitteringPinLatLngStep =
  StudyFieldsAfterLatLngGenerationStep;
export type CountryFieldsAfterJitteringPinLatLngStep = CountryFieldsAfterLatLngGenerationStep;
export type StructuredVaccinationDataAfterJitteringPinLatLngStep = StructuredVaccinationDataAfterLatLngGenerationStep;
export type StructuredPositiveCaseDataAfterJitteringPinLatLngStep = StructuredPositiveCaseDataAfterLatLngGenerationStep;
export type StructuredCountryPopulationDataAfterJitteringPinLatLngStep = StructuredCountryPopulationDataAfterLatLngGenerationStep;

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
  allCountries: CountryFieldsAfterLatLngGenerationStep[];
  vaccinationData: StructuredVaccinationDataAfterLatLngGenerationStep;
  positiveCaseData: StructuredPositiveCaseDataAfterLatLngGenerationStep;
  countryPopulationData: StructuredCountryPopulationDataAfterLatLngGenerationStep;
  mongoClient: MongoClient;
}

interface JitterPinLatLngStepOutput {
  allEstimates: EstimateFieldsAfterJitteringPinLatLngStep[];
  allStudies: StudyFieldsAfterJitteringPinLatLngStep[];
  allCountries: CountryFieldsAfterJitteringPinLatLngStep[];
  vaccinationData: StructuredVaccinationDataAfterJitteringPinLatLngStep;
  positiveCaseData: StructuredPositiveCaseDataAfterJitteringPinLatLngStep;
  countryPopulationData: StructuredCountryPopulationDataAfterJitteringPinLatLngStep;
  mongoClient: MongoClient;
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
    allCountries: input.allCountries,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
