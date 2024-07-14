import { MongoClient } from "mongodb";
import {
  CountryPopulationDataAfterValidatingFieldSetFromAirtableStep,
  EstimateFieldsAfterValidatingFieldSetFromAirtableStep,
  FaoMersEventAfterValidatingFieldSetFromAirtableStep,
  SourceFieldsAfterValidatingFieldSetFromAirtableStep,
  YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep
} from "./validate-field-set-from-airtable-step";

export type EstimateFieldsAfterCleaningSourcesStep = EstimateFieldsAfterValidatingFieldSetFromAirtableStep;
export type SourceFieldsAfterCleaningSourcesStep = SourceFieldsAfterValidatingFieldSetFromAirtableStep;
export type FaoMersEventAfterCleaningSourcesStep = FaoMersEventAfterValidatingFieldSetFromAirtableStep;
export type YearlyCamelPopulationDataAfterCleaningSourcesStep = YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep;
export type CountryPopulationDataAfterCleaningSourcesStep = CountryPopulationDataAfterValidatingFieldSetFromAirtableStep;

interface CleanSourcesStepInput {
  allEstimates: EstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
  allSources: SourceFieldsAfterValidatingFieldSetFromAirtableStep[];
  allFaoMersEvents: FaoMersEventAfterValidatingFieldSetFromAirtableStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep[];
  countryPopulationData: CountryPopulationDataAfterValidatingFieldSetFromAirtableStep[];
  mongoClient: MongoClient;
}

interface CleanSourcesStepOutput {
  allEstimates: EstimateFieldsAfterCleaningSourcesStep[];
  allSources: SourceFieldsAfterCleaningSourcesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningSourcesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningSourcesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningSourcesStep[];
  mongoClient: MongoClient;
}

export const cleanSourcesStep = (input: CleanSourcesStepInput): CleanSourcesStepOutput => {
  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  }
}