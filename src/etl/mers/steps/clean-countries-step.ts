import { MongoClient } from "mongodb";
import { ThreeLetterIsoCountryCode, TwoLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes";
import {
  CountryFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep,
  CountryPopulationDataAfterFilteringEstimatesWithoutRequiredFieldsStep,
  EstimateFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep,
  FaoMersEventAfterFilteringEstimatesWithoutRequiredFieldsStep,
  MacroSampleFrameFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep,
  SourceFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep,
  StudyFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep,
  WhoCaseDataAfterFilteringEstimatesWithoutRequiredFieldsStep,
  YearlyCamelPopulationDataAfterFilteringEstimatesWithoutRequiredFieldsStep
} from "./filter-estimates-without-required-fields-step";

export type EstimateFieldsAfterCleaningCountriesStep = EstimateFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep;
export type SourceFieldsAfterCleaningCountriesStep = SourceFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep;
export type StudyFieldsAfterCleaningCountriesStep = StudyFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep;
export interface CountryFieldsAfterCleaningCountriesStep {
  id: string;
  countryName: string;
  countryAlphaThreeCode: ThreeLetterIsoCountryCode;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
};
export type MacroSampleFrameFieldsAfterCleaningCountriesStep = MacroSampleFrameFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep;
export type FaoMersEventAfterCleaningCountriesStep = FaoMersEventAfterFilteringEstimatesWithoutRequiredFieldsStep;
export type YearlyCamelPopulationDataAfterCleaningCountriesStep = YearlyCamelPopulationDataAfterFilteringEstimatesWithoutRequiredFieldsStep;
export type CountryPopulationDataAfterCleaningCountriesStep = CountryPopulationDataAfterFilteringEstimatesWithoutRequiredFieldsStep;
export type WhoCaseDataAfterCleaningCountriesStep = WhoCaseDataAfterFilteringEstimatesWithoutRequiredFieldsStep;

interface CleanCountriesStepInput {
  allEstimates: EstimateFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  allSources: SourceFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  allStudies: StudyFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  allCountries: CountryFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  allFaoMersEvents: FaoMersEventAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  countryPopulationData: CountryPopulationDataAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  whoCaseData: WhoCaseDataAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  mongoClient: MongoClient;
}

interface CleanCountriesStepOutput {
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

export const cleanCountriesStep = (input: CleanCountriesStepInput): CleanCountriesStepOutput => {
  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries.map((country) => ({
      id: country['id'],
      countryName: country['Country'],
      countryAlphaThreeCode: country['Alpha3 Code'] as ThreeLetterIsoCountryCode,
      countryAlphaTwoCode: country['Alpha2 Code'] as TwoLetterIsoCountryCode
    })),
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  }
}