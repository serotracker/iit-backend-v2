import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterValidatingFieldSetFromAirtableStep,
  CountryPopulationDataAfterValidatingFieldSetFromAirtableStep,
  EstimateFieldsAfterValidatingFieldSetFromAirtableStep,
  FaoMersEventAfterValidatingFieldSetFromAirtableStep,
  SourceFieldsAfterValidatingFieldSetFromAirtableStep,
  StudyFieldsAfterValidatingFieldSetFromAirtableStep,
  YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep
} from "./validate-field-set-from-airtable-step";

export type EstimateFieldsAfterCleaningSourcesStep = EstimateFieldsAfterValidatingFieldSetFromAirtableStep;
export type SourceFieldsAfterCleaningSourcesStep = {
  id: string;
  firstAuthorFullName: string;
  url: string;
  type: string;
  title: string;
  insitutution: string | undefined;
  country: string[];
  populationType: string[];
};
export type StudyFieldsAfterCleaningSourcesStep = StudyFieldsAfterValidatingFieldSetFromAirtableStep;
export type CountryFieldsAfterCleaningSourcesStep = CountryFieldsAfterValidatingFieldSetFromAirtableStep;
export type FaoMersEventAfterCleaningSourcesStep = FaoMersEventAfterValidatingFieldSetFromAirtableStep;
export type YearlyCamelPopulationDataAfterCleaningSourcesStep = YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep;
export type CountryPopulationDataAfterCleaningSourcesStep = CountryPopulationDataAfterValidatingFieldSetFromAirtableStep;

interface CleanSourcesStepInput {
  allEstimates: EstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
  allSources: SourceFieldsAfterValidatingFieldSetFromAirtableStep[];
  allStudies: StudyFieldsAfterValidatingFieldSetFromAirtableStep[];
  allCountries: CountryFieldsAfterValidatingFieldSetFromAirtableStep[];
  allFaoMersEvents: FaoMersEventAfterValidatingFieldSetFromAirtableStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep[];
  countryPopulationData: CountryPopulationDataAfterValidatingFieldSetFromAirtableStep[];
  mongoClient: MongoClient;
}

interface CleanSourcesStepOutput {
  allEstimates: EstimateFieldsAfterCleaningSourcesStep[];
  allSources: SourceFieldsAfterCleaningSourcesStep[];
  allStudies: StudyFieldsAfterCleaningSourcesStep[];
  allCountries: CountryFieldsAfterCleaningSourcesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningSourcesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningSourcesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningSourcesStep[];
  mongoClient: MongoClient;
}

export const cleanSourcesStep = (input: CleanSourcesStepInput): CleanSourcesStepOutput => {
  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources.map((source) => ({
      id: source['id'],
      firstAuthorFullName: source['First author name'],
      url: source['DOI/url'],
      type: source['Source type'],
      title: source['Source title'],
      insitutution: source['Institution'] ?? undefined,
      country: source['Country'],
      populationType: source['Population type']
    })),
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  }
}