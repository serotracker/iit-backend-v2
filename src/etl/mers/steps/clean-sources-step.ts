import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterValidatingFieldSetFromAirtableStep,
  CountryPopulationDataAfterValidatingFieldSetFromAirtableStep,
  EstimateFieldsAfterValidatingFieldSetFromAirtableStep,
  FaoMersEventAfterValidatingFieldSetFromAirtableStep,
  MacroSampleFrameFieldsAfterValidatingFieldSetFromAirtableStep,
  SourceFieldsAfterValidatingFieldSetFromAirtableStep,
  StudyFieldsAfterValidatingFieldSetFromAirtableStep,
  WhoCaseDataAfterValidatingFieldSetFromAirtableStep,
  YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep
} from "./validate-field-set-from-airtable-step";

export type EstimateFieldsAfterCleaningSourcesStep = EstimateFieldsAfterValidatingFieldSetFromAirtableStep;
export type SourceFieldsAfterCleaningSourcesStep = {
  id: string;
  firstAuthorFullName: string;
  url: string | undefined;
  type: string | undefined;
  title: string;
  insitutution: string | undefined;
  country: string[];
  populationType: string[];
  publicationYear: number;
};
export type StudyFieldsAfterCleaningSourcesStep = StudyFieldsAfterValidatingFieldSetFromAirtableStep;
export type CountryFieldsAfterCleaningSourcesStep = CountryFieldsAfterValidatingFieldSetFromAirtableStep;
export type MacroSampleFrameFieldsAfterCleaningSourcesStep = MacroSampleFrameFieldsAfterValidatingFieldSetFromAirtableStep;
export type FaoMersEventAfterCleaningSourcesStep = FaoMersEventAfterValidatingFieldSetFromAirtableStep;
export type YearlyCamelPopulationDataAfterCleaningSourcesStep = YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep;
export type CountryPopulationDataAfterCleaningSourcesStep = CountryPopulationDataAfterValidatingFieldSetFromAirtableStep;
export type WhoCaseDataAfterCleaningSourcesStep = WhoCaseDataAfterValidatingFieldSetFromAirtableStep;

interface CleanSourcesStepInput {
  allEstimates: EstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
  allSources: SourceFieldsAfterValidatingFieldSetFromAirtableStep[];
  allStudies: StudyFieldsAfterValidatingFieldSetFromAirtableStep[];
  allCountries: CountryFieldsAfterValidatingFieldSetFromAirtableStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterValidatingFieldSetFromAirtableStep[];
  allFaoMersEvents: FaoMersEventAfterValidatingFieldSetFromAirtableStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep[];
  countryPopulationData: CountryPopulationDataAfterValidatingFieldSetFromAirtableStep[];
  whoCaseData: WhoCaseDataAfterValidatingFieldSetFromAirtableStep[];
  mongoClient: MongoClient;
}

interface CleanSourcesStepOutput {
  allEstimates: EstimateFieldsAfterCleaningSourcesStep[];
  allSources: SourceFieldsAfterCleaningSourcesStep[];
  allStudies: StudyFieldsAfterCleaningSourcesStep[];
  allCountries: CountryFieldsAfterCleaningSourcesStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterCleaningSourcesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningSourcesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningSourcesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningSourcesStep[];
  whoCaseData: WhoCaseDataAfterCleaningSourcesStep[];
  mongoClient: MongoClient;
}

export const cleanSourcesStep = (input: CleanSourcesStepInput): CleanSourcesStepOutput => {
  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources.map((source) => ({
      id: source['id'],
      firstAuthorFullName: source['First author name'],
      url: source['DOI'] !== null ? source['DOI'] : undefined,
      type: source['Source type'] !== null ? source['Source type'] : undefined,
      title: source['Source title'],
      insitutution: source['Institution'] ?? undefined,
      country: source['Country'].filter((country): country is NonNullable<typeof country> => !!country),
      populationType: source['Population type'].filter((populationType): populationType is NonNullable<typeof populationType> => !!populationType),
      publicationYear: source['Publication year']
    })),
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  }
}