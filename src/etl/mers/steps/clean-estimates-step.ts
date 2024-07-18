import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterCleaningStudiesStep,
  CountryPopulationDataAfterCleaningStudiesStep,
  FaoMersEventAfterCleaningStudiesStep,
  SourceFieldsAfterCleaningStudiesStep,
  StudyFieldsAfterCleaningStudiesStep,
  YearlyCamelPopulationDataAfterCleaningStudiesStep
} from "./clean-studies-step";
import { MersEstimateType } from "../../../storage/types.js";

export type EstimateFieldsAfterCleaningEstimatesStep = {
  id: string;
  type: MersEstimateType;
  seroprevalence: number;
  estimateId: string;
  city: string | undefined;
  state: string | undefined;
  studyInclusionCriteria: string | undefined;
  studyExclusionCriteria: string | undefined;
}
export type SourceFieldsAfterCleaningEstimatesStep = SourceFieldsAfterCleaningStudiesStep;
export type StudyFieldsAfterCleaningEstimatesStep = StudyFieldsAfterCleaningStudiesStep;
export type FaoMersEventAfterCleaningEstimatesStep = FaoMersEventAfterCleaningStudiesStep;
export type YearlyCamelPopulationDataAfterCleaningEstimatesStep = YearlyCamelPopulationDataAfterCleaningStudiesStep;
export type CountryPopulationDataAfterCleaningEstimatesStep = CountryPopulationDataAfterCleaningStudiesStep;

interface CleanEstimatesStepInput {
  allEstimates: EstimateFieldsAfterCleaningStudiesStep[];
  allSources: SourceFieldsAfterCleaningStudiesStep[];
  allStudies: StudyFieldsAfterCleaningStudiesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningStudiesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningStudiesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningStudiesStep[];
  mongoClient: MongoClient;
}

interface CleanEstimatesStepOutput {
  allEstimates: EstimateFieldsAfterCleaningEstimatesStep[];
  allSources: SourceFieldsAfterCleaningEstimatesStep[];
  allStudies: StudyFieldsAfterCleaningEstimatesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningEstimatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningEstimatesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningEstimatesStep[];
  mongoClient: MongoClient;
}

export const cleanEstimatesStep = (input: CleanEstimatesStepInput): CleanEstimatesStepOutput => {
  return {
    allEstimates: input.allEstimates.map((estimate) => ({
      id: estimate.id,
      type: MersEstimateType.HUMAN,
      seroprevalence: 0.1,
      estimateId: 'Test Data',
      city: undefined,
      state: undefined,
      studyInclusionCriteria: 'Test Inclusion Criteria',
      studyExclusionCriteria: 'Test Exclusion Criteria',
    })),
    allSources: input.allSources,
    allStudies: input.allStudies,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  }
}