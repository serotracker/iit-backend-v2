import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterCleaningStudiesStep,
  CountryPopulationDataAfterCleaningStudiesStep,
  FaoMersEventAfterCleaningStudiesStep,
  SourceFieldsAfterCleaningStudiesStep,
  StudyFieldsAfterCleaningStudiesStep,
  YearlyCamelPopulationDataAfterCleaningStudiesStep
} from "./clean-studies-step";
import { MersAnimalSpecies, MersAnimalType, MersEstimateType } from "../../../storage/types.js";

export type EstimateFieldsAfterCleaningEstimatesStep = {
  id: string;
  type: MersEstimateType;
  positivePrevalence: number;
  positivePrevalence95CILower: number | undefined;
  positivePrevalence95CIUpper: number | undefined;
  ageGroup: string | undefined;
  estimateId: string;
  city: string | undefined;
  state: string | undefined;
  studyInclusionCriteria: string | undefined;
  studyExclusionCriteria: string | undefined;
  animalType: MersAnimalType | undefined;
  animalSpecies: MersAnimalSpecies | undefined;
  sensitivity: number | undefined;
  sensitivity95CILower: number | undefined;
  sensitivity95CIUpper: number | undefined;
  sensitivityDenominator: number | undefined;
  specificity: number | undefined;
  specificity95CILower: number | undefined;
  specificity95CIUpper: number | undefined;
  specificityDenominator: number | undefined;
  sampleDenominator: number | undefined;
  sampleNumerator: number | undefined;
  assay: string[];
  specimenType: string | undefined;
  sex: string | undefined;
  isotypes: string[];
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
      type: MersEstimateType.HUMAN_SEROPREVALENCE,
      positivePrevalence: 0.5,
      positivePrevalence95CILower: 0.3,
      positivePrevalence95CIUpper: 0.8,
      ageGroup: 'Test Age Group',
      estimateId: 'Test Data',
      city: undefined,
      state: undefined,
      studyInclusionCriteria: 'Test Inclusion Criteria',
      studyExclusionCriteria: 'Test Exclusion Criteria',
      animalSpecies: MersAnimalSpecies.CAMEL,
      animalType: MersAnimalType.DOMESTIC,
      sensitivity: 0.2,
      sensitivity95CILower: 0.1,
      sensitivity95CIUpper: 0.3,
      sensitivityDenominator: 200,
      specificity: 0.2,
      specificity95CILower: 0.1,
      specificity95CIUpper: 0.3,
      specificityDenominator: 100,
      sampleDenominator: 3000,
      sampleNumerator: 1500,
      assay: ['ELISA'],
      specimenType: 'Serum',
      sex: 'Male',
      isotypes: ['IgG']
    })),
    allSources: input.allSources,
    allStudies: input.allStudies,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  }
}