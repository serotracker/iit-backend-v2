import { MongoClient } from "mongodb";
import { CountryFieldsAfterLatLngGenerationStep, CountryPopulationDataAfterLatLngGenerationStep, EstimateFieldsAfterLatLngGenerationStep, FaoMersEventAfterLatLngGenerationStep, MacroSampleFrameFieldsAfterLatLngGenerationStep, SourceFieldsAfterLatLngGenerationStep, StudyFieldsAfterLatLngGenerationStep, WhoCaseDataAfterLatLngGenerationStep, YearlyCamelPopulationDataAfterLatLngGenerationStep } from "./lat-lng-generation-step.js";

export type EstimateFieldsAfterJitteringPinLatLngStep = EstimateFieldsAfterLatLngGenerationStep;
export type SourceFieldsAfterJitteringPinLatLngStep = SourceFieldsAfterLatLngGenerationStep;
export type StudyFieldsAfterJitteringPinLatLngStep = StudyFieldsAfterLatLngGenerationStep;
export type CountryFieldsAfterJitteringPinLatLngStep = CountryFieldsAfterLatLngGenerationStep;
export type MacroSampleFrameFieldsAfterJitteringPinLatLngStep = MacroSampleFrameFieldsAfterLatLngGenerationStep;
export type FaoMersEventAfterJitteringPinLatLngStep = FaoMersEventAfterLatLngGenerationStep;
export type YearlyCamelPopulationDataAfterJitteringPinLatLngStep = YearlyCamelPopulationDataAfterLatLngGenerationStep;
export type CountryPopulationDataAfterJitteringPinLatLngStep = CountryPopulationDataAfterLatLngGenerationStep;
export type WhoCaseDataAfterJitteringPinLatLngStep = WhoCaseDataAfterLatLngGenerationStep;

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
  allCountries: CountryFieldsAfterLatLngGenerationStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterLatLngGenerationStep[];
  allFaoMersEvents: FaoMersEventAfterLatLngGenerationStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterLatLngGenerationStep[];
  countryPopulationData: CountryPopulationDataAfterLatLngGenerationStep[];
  whoCaseData: WhoCaseDataAfterLatLngGenerationStep[];
  mongoClient: MongoClient;
}

interface JitterPinLatLngStepOutput {
  allEstimates: EstimateFieldsAfterJitteringPinLatLngStep[];
  allSources: SourceFieldsAfterJitteringPinLatLngStep[];
  allStudies: StudyFieldsAfterJitteringPinLatLngStep[];
  allCountries: CountryFieldsAfterJitteringPinLatLngStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterJitteringPinLatLngStep[];
  allFaoMersEvents: FaoMersEventAfterJitteringPinLatLngStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterJitteringPinLatLngStep[];
  countryPopulationData: CountryPopulationDataAfterJitteringPinLatLngStep[];
  whoCaseData: WhoCaseDataAfterJitteringPinLatLngStep[];
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
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
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
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  };
};
