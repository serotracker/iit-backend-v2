import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterCleaningStudiesStep,
  CountryPopulationDataAfterCleaningStudiesStep,
  FaoMersEventAfterCleaningStudiesStep,
  SourceFieldsAfterCleaningStudiesStep,
  StudyFieldsAfterCleaningStudiesStep,
  YearlyCamelPopulationDataAfterCleaningStudiesStep,
  CountryFieldsAfterCleaningStudiesStep
} from "./clean-studies-step";
import { MersAnimalSpecies, MersAnimalType, MersEstimateType, isMersAnimalType } from "../../../storage/types.js";

export type EstimateFieldsAfterCleaningEstimatesStep = {
  id: string;
  type: MersEstimateType;
  positivePrevalence: number;
  positivePrevalence95CILower: number | undefined;
  positivePrevalence95CIUpper: number | undefined;
  ageGroup: string[];
  estimateId: string;
  city: string | undefined;
  state: string | undefined;
  countryId: string | undefined;
  studyId: string | undefined;
  animalType: MersAnimalType[];
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
  samplingStartDate: string | undefined;
  samplingEndDate: string | undefined;
  assay: string[];
  specimenType: string | undefined;
  sex: string | undefined;
  isotypes: string[];
}
export type SourceFieldsAfterCleaningEstimatesStep = SourceFieldsAfterCleaningStudiesStep;
export type StudyFieldsAfterCleaningEstimatesStep = StudyFieldsAfterCleaningStudiesStep;
export type CountryFieldsAfterCleaningEstimatesStep = CountryFieldsAfterCleaningStudiesStep;
export type FaoMersEventAfterCleaningEstimatesStep = FaoMersEventAfterCleaningStudiesStep;
export type YearlyCamelPopulationDataAfterCleaningEstimatesStep = YearlyCamelPopulationDataAfterCleaningStudiesStep;
export type CountryPopulationDataAfterCleaningEstimatesStep = CountryPopulationDataAfterCleaningStudiesStep;

interface CleanEstimatesStepInput {
  allEstimates: EstimateFieldsAfterCleaningStudiesStep[];
  allSources: SourceFieldsAfterCleaningStudiesStep[];
  allStudies: StudyFieldsAfterCleaningStudiesStep[];
  allCountries: CountryFieldsAfterCleaningStudiesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningStudiesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningStudiesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningStudiesStep[];
  mongoClient: MongoClient;
}

interface CleanEstimatesStepOutput {
  allEstimates: EstimateFieldsAfterCleaningEstimatesStep[];
  allSources: SourceFieldsAfterCleaningEstimatesStep[];
  allStudies: StudyFieldsAfterCleaningEstimatesStep[];
  allCountries: CountryFieldsAfterCleaningEstimatesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningEstimatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningEstimatesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningEstimatesStep[];
  mongoClient: MongoClient;
}

export const cleanEstimatesStep = (input: CleanEstimatesStepInput): CleanEstimatesStepOutput => {
  return {
    allEstimates: input.allEstimates.map((estimate) => ({
      id: estimate['id'],
      type: MersEstimateType.HUMAN_SEROPREVALENCE,
      positivePrevalence: estimate['Positive Prevalence'],
      positivePrevalence95CILower: estimate['Positive Prevalence 95% CI Lower'] !== null ? estimate['Positive Prevalence 95% CI Lower'] : undefined,
      positivePrevalence95CIUpper: estimate['Positive Prevalence 95% CI Upper'] !== null ? estimate['Positive Prevalence 95% CI Upper'] : undefined,
      ageGroup: estimate['Age Group'].filter((element): element is NonNullable<typeof element> => !!element),
      estimateId: estimate['Prevalence Estimate Name'],
      city: estimate['City'] ?? undefined,
      state: estimate['State/Province'] ?? undefined,
      countryId: estimate['Country']
        .filter((element): element is NonNullable<typeof element> => !!element)
        .at(0),
      studyId: estimate['Study']
        .filter((element): element is NonNullable<typeof element> => !!element)
        .at(0),
      animalSpecies: MersAnimalSpecies.CAMEL,
      animalType: estimate['Animal type']
        .filter((animalType): animalType is NonNullable<typeof animalType> => !!animalType)
        .map((animalType) => animalType.toUpperCase())
        .filter((animalType): animalType is MersAnimalType => isMersAnimalType(animalType)),
      sensitivity: estimate['Sensitivity'] !== null ? estimate['Sensitivity'] : undefined,
      sensitivity95CILower: estimate['Sensitivity, 95% CI Lower'] !== null ? estimate['Sensitivity, 95% CI Lower'] : undefined,
      sensitivity95CIUpper: estimate['Sensitivity, 95% CI Upper'] !== null ? estimate['Sensitivity, 95% CI Upper'] : undefined,
      sensitivityDenominator: estimate['Sensitivity Denominator'] !== null ? estimate['Sensitivity Denominator'] : undefined,
      specificity: estimate['Specificity'] !== null ? estimate['Specificity'] : undefined,
      specificity95CILower: estimate['Specificity, 95% CI Lower'] !== null ? estimate['Specificity, 95% CI Lower'] : undefined,
      specificity95CIUpper: estimate['Specificity, 95% CI Upper'] !== null ? estimate['Specificity, 95% CI Upper'] : undefined,
      specificityDenominator: estimate['Specificity Denominator'] !== null ? estimate['Specificity Denominator'] : undefined,
      sampleDenominator: estimate['Denominator'] !== null ? estimate['Denominator'] : undefined,
      sampleNumerator: estimate['Numerator'] !== null ? estimate['Numerator'] : undefined,
      assay: estimate['Assay Type'].filter((element): element is NonNullable<typeof element> => !!element),
      specimenType: estimate['Specimen Type'] ?? undefined,
      sex: estimate['Sex'] ?? undefined,
      isotypes: estimate['Isotype(s)'].filter((element): element is NonNullable<typeof element> => !!element),
      samplingStartDate: estimate['Sample Start Date'] ?? undefined,
      samplingEndDate: estimate['Sample End Date'] ?? undefined
    })),
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  }
}