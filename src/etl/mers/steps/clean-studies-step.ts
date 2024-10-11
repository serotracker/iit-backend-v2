import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterCleaningSourcesStep,
  CountryPopulationDataAfterCleaningSourcesStep,
  EstimateFieldsAfterCleaningSourcesStep,
  FaoMersEventAfterCleaningSourcesStep,
  MacroSampleFrameFieldsAfterCleaningSourcesStep,
  SourceFieldsAfterCleaningSourcesStep,
  StudyFieldsAfterCleaningSourcesStep,
  WhoCaseDataAfterCleaningSourcesStep,
  YearlyCamelPopulationDataAfterCleaningSourcesStep
} from "./clean-sources-step";

export type EstimateFieldsAfterCleaningStudiesStep = EstimateFieldsAfterCleaningSourcesStep;
export type SourceFieldsAfterCleaningStudiesStep = SourceFieldsAfterCleaningSourcesStep;
export interface StudyFieldsAfterCleaningStudiesStep {
  id: string;
  inclusionCriteria: string | undefined;
  exclusionCriteria: string | undefined;
  sourceId: string | undefined;
}
export type CountryFieldsAfterCleaningStudiesStep = CountryFieldsAfterCleaningSourcesStep;
export type MacroSampleFrameFieldsAfterCleaningStudiesStep = MacroSampleFrameFieldsAfterCleaningSourcesStep;
export type FaoMersEventAfterCleaningStudiesStep = FaoMersEventAfterCleaningSourcesStep;
export type YearlyCamelPopulationDataAfterCleaningStudiesStep = YearlyCamelPopulationDataAfterCleaningSourcesStep;
export type CountryPopulationDataAfterCleaningStudiesStep = CountryPopulationDataAfterCleaningSourcesStep;
export type WhoCaseDataAfterCleaningStudiesStep = WhoCaseDataAfterCleaningSourcesStep;

interface CleanStudiesStepInput {
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

interface CleanStudiesStepOutput {
  allEstimates: EstimateFieldsAfterCleaningStudiesStep[];
  allSources: SourceFieldsAfterCleaningStudiesStep[];
  allStudies: StudyFieldsAfterCleaningStudiesStep[];
  allCountries: CountryFieldsAfterCleaningStudiesStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterCleaningStudiesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningStudiesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningStudiesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningStudiesStep[];
  whoCaseData: WhoCaseDataAfterCleaningStudiesStep[];
  mongoClient: MongoClient;
}

export const cleanStudiesStep = (input: CleanStudiesStepInput): CleanStudiesStepOutput => {
  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allStudies: input.allStudies.map((study) => ({
      id: study['id'],
      inclusionCriteria: study['Inclusion Criteria'] ?? undefined,
      exclusionCriteria: study['Exclusion Criteria'] ?? undefined,
      sourceId: study['Source Sheet']
        .filter((sourceSheetId): sourceSheetId is NonNullable<typeof sourceSheetId> => !!sourceSheetId)
        .at(0)
    })),
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  }
}