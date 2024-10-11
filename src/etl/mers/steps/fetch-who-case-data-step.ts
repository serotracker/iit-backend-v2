import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterCleaningCamelPopulationByCountryDataStep,
  CountryPopulationDataAfterCleaningCamelPopulationByCountryDataStep,
  EstimateFieldsAfterCleaningCamelPopulationByCountryDataStep,
  FaoMersEventAfterCleaningCamelPopulationByCountryDataStep,
  MacroSampleFrameFieldsAfterCleaningCamelPopulationByCountryDataStep,
  SourceFieldsAfterCleaningCamelPopulationByCountryDataStep,
  StudyFieldsAfterCleaningCamelPopulationByCountryDataStep,
  WhoCaseDataAfterCleaningCamelPopulationByCountryDataStep,
  YearlyCamelPopulationDataAfterCleaningCamelPopulationByCountryDataStep
} from "./clean-camel-population-by-country-data-step";

export type EstimateFieldsAfterFetchingWhoCaseDataStep = EstimateFieldsAfterCleaningCamelPopulationByCountryDataStep;
export type SourceFieldsAfterFetchingWhoCaseDataStep = SourceFieldsAfterCleaningCamelPopulationByCountryDataStep;
export type StudyFieldsAfterFetchingWhoCaseDataStep = StudyFieldsAfterCleaningCamelPopulationByCountryDataStep;
export type CountryFieldsAfterFetchingWhoCaseDataStep = CountryFieldsAfterCleaningCamelPopulationByCountryDataStep;
export type MacroSampleFrameFieldsAfterFetchingWhoCaseDataStep = MacroSampleFrameFieldsAfterCleaningCamelPopulationByCountryDataStep;
export type FaoMersEventAfterFetchingWhoCaseDataStep = FaoMersEventAfterCleaningCamelPopulationByCountryDataStep;
export type YearlyCamelPopulationDataAfterFetchingWhoCaseDataStep = YearlyCamelPopulationDataAfterCleaningCamelPopulationByCountryDataStep;
export type CountryPopulationDataAfterFetchingWhoCaseDataStep = CountryPopulationDataAfterCleaningCamelPopulationByCountryDataStep;
export type WhoCaseDataAfterFetchingWhoCaseDataStep = WhoCaseDataAfterCleaningCamelPopulationByCountryDataStep;

interface FetchWhoCaseDataStepInput {
  allEstimates: EstimateFieldsAfterCleaningCamelPopulationByCountryDataStep[];
  allSources: SourceFieldsAfterCleaningCamelPopulationByCountryDataStep[];
  allStudies: StudyFieldsAfterCleaningCamelPopulationByCountryDataStep[];
  allCountries: CountryFieldsAfterCleaningCamelPopulationByCountryDataStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterCleaningCamelPopulationByCountryDataStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningCamelPopulationByCountryDataStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningCamelPopulationByCountryDataStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningCamelPopulationByCountryDataStep[];
  whoCaseData: WhoCaseDataAfterCleaningCamelPopulationByCountryDataStep[];
  mongoClient: MongoClient;
}

interface FetchWhoCaseDataStepOutput {
  allEstimates: EstimateFieldsAfterFetchingWhoCaseDataStep[];
  allSources: SourceFieldsAfterFetchingWhoCaseDataStep[];
  allStudies: StudyFieldsAfterFetchingWhoCaseDataStep[];
  allCountries: CountryFieldsAfterFetchingWhoCaseDataStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterFetchingWhoCaseDataStep[];
  allFaoMersEvents: FaoMersEventAfterFetchingWhoCaseDataStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterFetchingWhoCaseDataStep[];
  countryPopulationData: CountryPopulationDataAfterFetchingWhoCaseDataStep[];
  whoCaseData: WhoCaseDataAfterFetchingWhoCaseDataStep[];
  mongoClient: MongoClient;
}

export const fetchWhoCaseDataStep = (
  input: FetchWhoCaseDataStepInput
): FetchWhoCaseDataStepOutput => {
  console.log(`Running step: fetchWhoCaseData. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  };
}