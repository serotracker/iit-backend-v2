import { MongoClient } from "mongodb";
import { CountryPopulationDataAfterLatLngGenerationStep, EstimateFieldsAfterLatLngGenerationStep, FaoMersEventAfterLatLngGenerationStep, SourceFieldsAfterLatLngGenerationStep, StudyFieldsAfterLatLngGenerationStep, YearlyCamelPopulationDataAfterLatLngGenerationStep } from "./lat-lng-generation-step.js";

export type EstimateFieldsAfterJitteringPinLatLngStep = EstimateFieldsAfterLatLngGenerationStep;
export type SourceFieldsAfterJitteringPinLatLngStep = SourceFieldsAfterLatLngGenerationStep;
export type StudyFieldsAfterJitteringPinLatLngStep = StudyFieldsAfterLatLngGenerationStep;
export type FaoMersEventAfterJitteringPinLatLngStep = FaoMersEventAfterLatLngGenerationStep;
export type YearlyCamelPopulationDataAfterJitteringPinLatLngStep = YearlyCamelPopulationDataAfterLatLngGenerationStep;
export type CountryPopulationDataAfterJitteringPinLatLngStep = CountryPopulationDataAfterLatLngGenerationStep;

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
  allSources: SourceFieldsAfterLatLngGenerationStep[];
  allStudies: StudyFieldsAfterLatLngGenerationStep[];
  allFaoMersEvents: FaoMersEventAfterLatLngGenerationStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterLatLngGenerationStep[];
  countryPopulationData: CountryPopulationDataAfterLatLngGenerationStep[];
  mongoClient: MongoClient;
}

interface JitterPinLatLngStepOutput {
  allEstimates: EstimateFieldsAfterJitteringPinLatLngStep[];
  allSources: SourceFieldsAfterJitteringPinLatLngStep[];
  allStudies: StudyFieldsAfterJitteringPinLatLngStep[];
  allFaoMersEvents: FaoMersEventAfterJitteringPinLatLngStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterJitteringPinLatLngStep[];
  countryPopulationData: CountryPopulationDataAfterJitteringPinLatLngStep[];
  mongoClient: MongoClient;
}

export const jitterPinLatLngStep = (
  input: JitterPinLatLngStepInput
): JitterPinLatLngStepOutput => {
  const maximumPinJitterMagnitude = 0.1;

  console.log(
    `Running step: jitterPinLatLngStep. Remaining estimates: ${input.allEstimates.length}. Maximum pin jitter mangnitude: ${maximumPinJitterMagnitude}`
  );

  return {
    allEstimates: input.allEstimates.map((estimate) => ({
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
    allSources: input.allSources,
    allStudies: input.allStudies,
    allFaoMersEvents: input.allFaoMersEvents.map((event) => ({
      ...event,
      latitude: jitterNumberValueByAmount({
        value: event.latitude,
        jitterAmount: maximumPinJitterMagnitude,
      }),
      longitude: jitterNumberValueByAmount({
        value: event.longitude,
        jitterAmount: maximumPinJitterMagnitude,
      }),
    })),
    countryPopulationData: input.countryPopulationData,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    mongoClient: input.mongoClient
  };
};
