import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterCleaningEstimatesStep,
  CountryPopulationDataAfterCleaningEstimatesStep,
  EstimateFieldsAfterCleaningEstimatesStep,
  FaoMersEventAfterCleaningEstimatesStep,
  SourceFieldsAfterCleaningEstimatesStep,
  StudyFieldsAfterCleaningEstimatesStep,
  YearlyCamelPopulationDataAfterCleaningEstimatesStep
} from "./clean-estimates-step";
import { ThreeLetterIsoCountryCode, TwoLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes";

export type EstimateFieldsAfterCleaningCountriesStep = EstimateFieldsAfterCleaningEstimatesStep;
export type SourceFieldsAfterCleaningCountriesStep = SourceFieldsAfterCleaningEstimatesStep;
export type StudyFieldsAfterCleaningCountriesStep = StudyFieldsAfterCleaningEstimatesStep;
export interface CountryFieldsAfterCleaningCountriesStep {
  id: string;
  countryName: string;
  countryAlphaThreeCode: ThreeLetterIsoCountryCode;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
};
export type FaoMersEventAfterCleaningCountriesStep = FaoMersEventAfterCleaningEstimatesStep;
export type YearlyCamelPopulationDataAfterCleaningCountriesStep = YearlyCamelPopulationDataAfterCleaningEstimatesStep;
export type CountryPopulationDataAfterCleaningCountriesStep = CountryPopulationDataAfterCleaningEstimatesStep;

interface CleanCountriesStepInput {
  allEstimates: EstimateFieldsAfterCleaningEstimatesStep[];
  allSources: SourceFieldsAfterCleaningEstimatesStep[];
  allStudies: StudyFieldsAfterCleaningEstimatesStep[];
  allCountries: CountryFieldsAfterCleaningEstimatesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningEstimatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningEstimatesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningEstimatesStep[];
  mongoClient: MongoClient;
}

interface CleanCountriesStepOutput {
  allEstimates: EstimateFieldsAfterCleaningCountriesStep[];
  allSources: SourceFieldsAfterCleaningCountriesStep[];
  allStudies: StudyFieldsAfterCleaningCountriesStep[];
  allCountries: CountryFieldsAfterCleaningCountriesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningCountriesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningCountriesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningCountriesStep[];
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
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  }
}