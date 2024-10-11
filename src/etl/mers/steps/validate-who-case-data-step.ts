import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterFetchingWhoCaseDataStep,
  CountryPopulationDataAfterFetchingWhoCaseDataStep,
  EstimateFieldsAfterFetchingWhoCaseDataStep,
  FaoMersEventAfterFetchingWhoCaseDataStep,
  MacroSampleFrameFieldsAfterFetchingWhoCaseDataStep,
  SourceFieldsAfterFetchingWhoCaseDataStep,
  StudyFieldsAfterFetchingWhoCaseDataStep,
  WhoCaseDataAfterFetchingWhoCaseDataStep,
  YearlyCamelPopulationDataAfterFetchingWhoCaseDataStep
} from "./fetch-who-case-data-step";

export type EstimateFieldsAfterValidatingWhoCaseDataStep = EstimateFieldsAfterFetchingWhoCaseDataStep;
export type SourceFieldsAfterValidatingWhoCaseDataStep = SourceFieldsAfterFetchingWhoCaseDataStep;
export type StudyFieldsAfterValidatingWhoCaseDataStep = StudyFieldsAfterFetchingWhoCaseDataStep;
export type CountryFieldsAfterValidatingWhoCaseDataStep = CountryFieldsAfterFetchingWhoCaseDataStep;
export type MacroSampleFrameFieldsAfterValidatingWhoCaseDataStep = MacroSampleFrameFieldsAfterFetchingWhoCaseDataStep;
export type FaoMersEventAfterValidatingWhoCaseDataStep = FaoMersEventAfterFetchingWhoCaseDataStep;
export type YearlyCamelPopulationDataAfterValidatingWhoCaseDataStep = YearlyCamelPopulationDataAfterFetchingWhoCaseDataStep;
export type CountryPopulationDataAfterValidatingWhoCaseDataStep = CountryPopulationDataAfterFetchingWhoCaseDataStep;
export type WhoCaseDataAfterValidatingWhoCaseDataStep = WhoCaseDataAfterFetchingWhoCaseDataStep;

interface ValidateWhoCaseDataStepInput {
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

interface ValidateWhoCaseDataStepOutput {
  allEstimates: EstimateFieldsAfterValidatingWhoCaseDataStep[];
  allSources: SourceFieldsAfterValidatingWhoCaseDataStep[];
  allStudies: StudyFieldsAfterValidatingWhoCaseDataStep[];
  allCountries: CountryFieldsAfterValidatingWhoCaseDataStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterValidatingWhoCaseDataStep[];
  allFaoMersEvents: FaoMersEventAfterValidatingWhoCaseDataStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterValidatingWhoCaseDataStep[];
  countryPopulationData: CountryPopulationDataAfterValidatingWhoCaseDataStep[];
  whoCaseData: WhoCaseDataAfterValidatingWhoCaseDataStep[];
  mongoClient: MongoClient;
}

export const validateWhoCaseDataStep = (
  input: ValidateWhoCaseDataStepInput
): ValidateWhoCaseDataStepOutput => {
  console.log(`Running step: validateWhoCaseDataStep. Remaining estimates: ${input.allEstimates.length}`);

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