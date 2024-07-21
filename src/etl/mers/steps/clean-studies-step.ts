import { MongoClient } from "mongodb";
import {
  CountryPopulationDataAfterCleaningSourcesStep,
  EstimateFieldsAfterCleaningSourcesStep,
  FaoMersEventAfterCleaningSourcesStep,
  SourceFieldsAfterCleaningSourcesStep,
  StudyFieldsAfterCleaningSourcesStep,
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
export type FaoMersEventAfterCleaningStudiesStep = FaoMersEventAfterCleaningSourcesStep;
export type YearlyCamelPopulationDataAfterCleaningStudiesStep = YearlyCamelPopulationDataAfterCleaningSourcesStep;
export type CountryPopulationDataAfterCleaningStudiesStep = CountryPopulationDataAfterCleaningSourcesStep;

interface CleanStudiesStepInput {
  allEstimates: EstimateFieldsAfterCleaningSourcesStep[];
  allSources: SourceFieldsAfterCleaningSourcesStep[];
  allStudies: StudyFieldsAfterCleaningSourcesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningSourcesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningSourcesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningSourcesStep[];
  mongoClient: MongoClient;
}

interface CleanStudiesStepOutput {
  allEstimates: EstimateFieldsAfterCleaningStudiesStep[];
  allSources: SourceFieldsAfterCleaningStudiesStep[];
  allStudies: StudyFieldsAfterCleaningStudiesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningStudiesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningStudiesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningStudiesStep[];
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
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  }
}