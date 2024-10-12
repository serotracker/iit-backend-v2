import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterCleaningCountriesStep,
  CountryPopulationDataAfterCleaningCountriesStep,
  EstimateFieldsAfterCleaningCountriesStep,
  FaoMersEventAfterCleaningCountriesStep,
  MacroSampleFrameFieldsAfterCleaningCountriesStep,
  SourceFieldsAfterCleaningCountriesStep,
  StudyFieldsAfterCleaningCountriesStep,
  WhoCaseDataAfterCleaningCountriesStep,
  YearlyCamelPopulationDataAfterCleaningCountriesStep
} from "./clean-countries-step";

export type EstimateFieldsAfterCleaningMacroSampleFramesStep = EstimateFieldsAfterCleaningCountriesStep;
export type SourceFieldsAfterCleaningMacroSampleFramesStep = SourceFieldsAfterCleaningCountriesStep;
export type StudyFieldsAfterCleaningMacroSampleFramesStep = StudyFieldsAfterCleaningCountriesStep;
export type CountryFieldsAfterCleaningMacroSampleFramesStep = CountryFieldsAfterCleaningCountriesStep;
export interface MacroSampleFrameFieldsAfterCleaningMacroSampleFramesStep {
  id: string;
  sampleFrame: string;
  populationType: string | null;
  occupationallyExposedToDromedaries: boolean;
};
export type FaoMersEventAfterCleaningMacroSampleFramesStep = FaoMersEventAfterCleaningCountriesStep;
export type YearlyCamelPopulationDataAfterCleaningMacroSampleFramesStep = YearlyCamelPopulationDataAfterCleaningCountriesStep;
export type CountryPopulationDataAfterCleaningMacroSampleFramesStep = CountryPopulationDataAfterCleaningCountriesStep;
export type WhoCaseDataAfterCleaningMacroSampleFramesStep = WhoCaseDataAfterCleaningCountriesStep;

interface CleanMacroSampleFramesStepInput {
  allEstimates: EstimateFieldsAfterCleaningCountriesStep[];
  allSources: SourceFieldsAfterCleaningCountriesStep[];
  allStudies: StudyFieldsAfterCleaningCountriesStep[];
  allCountries: CountryFieldsAfterCleaningCountriesStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterCleaningCountriesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningCountriesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningCountriesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningCountriesStep[];
  whoCaseData: WhoCaseDataAfterCleaningCountriesStep[];
  mongoClient: MongoClient;
}

interface CleanMacroSampleFramesStepOutput {
  allEstimates: EstimateFieldsAfterCleaningMacroSampleFramesStep[];
  allSources: SourceFieldsAfterCleaningMacroSampleFramesStep[];
  allStudies: StudyFieldsAfterCleaningMacroSampleFramesStep[];
  allCountries: CountryFieldsAfterCleaningMacroSampleFramesStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterCleaningMacroSampleFramesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningMacroSampleFramesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningMacroSampleFramesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningMacroSampleFramesStep[];
  whoCaseData: WhoCaseDataAfterCleaningMacroSampleFramesStep[];
  mongoClient: MongoClient;
}

export const cleanMacroSampleFramesStep = (input: CleanMacroSampleFramesStepInput): CleanMacroSampleFramesStepOutput => {
  console.log(`Running step: cleanMacroSampleFramesStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames.map((macroSampleFrame) => ({
      id: macroSampleFrame['id'],
      sampleFrame: macroSampleFrame['Name'],
      populationType: macroSampleFrame['Population type'],
      occupationallyExposedToDromedaries: macroSampleFrame['Occupationally exposed to dromedaries']
    })),
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  }
}