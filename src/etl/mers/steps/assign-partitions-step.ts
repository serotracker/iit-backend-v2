import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterJitteringPinLatLngStep,
  CountryPopulationDataAfterJitteringPinLatLngStep,
  EstimateFieldsAfterJitteringPinLatLngStep,
  FaoMersEventAfterJitteringPinLatLngStep,
  MacroSampleFrameFieldsAfterJitteringPinLatLngStep,
  SourceFieldsAfterJitteringPinLatLngStep,
  StudyFieldsAfterJitteringPinLatLngStep,
  YearlyCamelPopulationDataAfterJitteringPinLatLngStep
} from "./jitter-pin-lat-lng-step.js";

export type EstimateFieldsAfterAssigningPartitionsStep = EstimateFieldsAfterJitteringPinLatLngStep;
export type SourceFieldsAfterAssigningPartitionsStep = SourceFieldsAfterJitteringPinLatLngStep;
export type StudyFieldsAfterAssigningPartitionsStep = StudyFieldsAfterJitteringPinLatLngStep;
export type CountryFieldsAfterAssigningPartitionsStep = CountryFieldsAfterJitteringPinLatLngStep;
export type MacroSampleFrameFieldsAfterAssigningPartitionsStep = MacroSampleFrameFieldsAfterJitteringPinLatLngStep;
export type FaoMersEventAfterAssigningPartitionsStep = FaoMersEventAfterJitteringPinLatLngStep & {
  partitionKey: number;
};
export type YearlyCamelPopulationDataAfterAssigningPartitionsStep = YearlyCamelPopulationDataAfterJitteringPinLatLngStep & {
  partitionKey: number;
};
export type CountryPopulationDataAfterAssigningPartitionsStep = CountryPopulationDataAfterJitteringPinLatLngStep;

interface AssignPartitionsStepInput {
  allEstimates: EstimateFieldsAfterJitteringPinLatLngStep[];
  allSources: SourceFieldsAfterJitteringPinLatLngStep[];
  allStudies: StudyFieldsAfterJitteringPinLatLngStep[];
  allCountries: CountryFieldsAfterJitteringPinLatLngStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterJitteringPinLatLngStep[];
  allFaoMersEvents: FaoMersEventAfterJitteringPinLatLngStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterJitteringPinLatLngStep[];
  countryPopulationData: CountryPopulationDataAfterJitteringPinLatLngStep[];
  mongoClient: MongoClient;
}

interface AssignPartitionsStepOutput {
  allEstimates: EstimateFieldsAfterAssigningPartitionsStep[];
  allSources: SourceFieldsAfterAssigningPartitionsStep[];
  allStudies: StudyFieldsAfterAssigningPartitionsStep[];
  allCountries: CountryFieldsAfterAssigningPartitionsStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterAssigningPartitionsStep[];
  allFaoMersEvents: FaoMersEventAfterAssigningPartitionsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterAssigningPartitionsStep[];
  countryPopulationData: CountryPopulationDataAfterAssigningPartitionsStep[];
  mongoClient: MongoClient;
}

export const assignPartitionsStep = (
  input: AssignPartitionsStepInput
): AssignPartitionsStepOutput => {
  const faoMersEventPartitionSize = 1000;
  const faoYearlyCamelPopulationPartitionSize = 1000;
  console.log(`Running step: assignPartitionsStep. Remaining estimates: ${input.allEstimates.length}. faoMersEventPartitionSize: ${faoMersEventPartitionSize}. faoYearlyCamelPopulationPartitionSize: ${faoYearlyCamelPopulationPartitionSize}`);

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents.map((event, index) => ({
      ...event,
      partitionKey: Math.floor(index / faoMersEventPartitionSize)
    })),
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData.map((element, index) => ({
      ...element,
      partitionKey: Math.floor(index / faoMersEventPartitionSize)
    })),
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
