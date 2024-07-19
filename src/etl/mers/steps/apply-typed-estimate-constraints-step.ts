import { MongoClient } from "mongodb";
import {
  CountryPopulationDataAfterAssigningPartitionsStep,
  EstimateFieldsAfterAssigningPartitionsStep,
  FaoMersEventAfterAssigningPartitionsStep,
  SourceFieldsAfterAssigningPartitionsStep,
  StudyFieldsAfterAssigningPartitionsStep,
  YearlyCamelPopulationDataAfterAssigningPartitionsStep
} from "./assign-partitions-step";
import { MersAnimalSpecies, MersAnimalType, MersEstimateType } from "../../../storage/types";
import assertNever from "assert-never";

type HumanSeroprevalenceEstimateFieldsAfterApplyingTypedEstimateConstraintsStep = Omit<
  EstimateFieldsAfterAssigningPartitionsStep, 'type'|'positivePrevalence'|'seroprevalence'|'animalType'|'animalSpecies'|'ageGroup'
> & {
  type: MersEstimateType.HUMAN_SEROPREVALENCE;
  seroprevalence: number;
  positivePrevalence: undefined;
  ageGroup: string | undefined;
  animalType: undefined;
  animalSpecies: undefined;
}
type HumanViralEstimateFieldsAfterApplyingTypedEstimateConstraintsStep = Omit<
  EstimateFieldsAfterAssigningPartitionsStep, 'type'|'positivePrevalence'|'seroprevalence'|'animalType'|'animalSpecies'|'ageGroup'
> & {
  type: MersEstimateType.HUMAN_VIRAL;
  seroprevalence: undefined;
  positivePrevalence: number;
  ageGroup: string | undefined;
  animalType: undefined;
  animalSpecies: undefined;
}
type AnimalSeroprevalenceEstimateFieldsAfterApplyingTypedEstimateConstraintsStep = Omit<
  EstimateFieldsAfterAssigningPartitionsStep, 'type'|'positivePrevalence'|'seroprevalence'|'animalType'|'animalSpecies'|'ageGroup'
> & {
  type: MersEstimateType.ANIMAL_SEROPREVALENCE;
  seroprevalence: number;
  positivePrevalence: undefined;
  ageGroup: undefined;
  animalType: MersAnimalType;
  animalSpecies: MersAnimalSpecies;
}
type AnimalViralEstimateFieldsAfterApplyingTypedEstimateConstraintsStep = Omit<
  EstimateFieldsAfterAssigningPartitionsStep, 'type'|'positivePrevalence'|'seroprevalence'|'animalType'|'animalSpecies'|'ageGroup'
> & {
  type: MersEstimateType.ANIMAL_VIRAL;
  seroprevalence: undefined;
  positivePrevalence: number;
  ageGroup: undefined;
  animalType: MersAnimalType;
  animalSpecies: MersAnimalSpecies;
}

export type EstimateFieldsAfterApplyingTypedEstimateConstraintsStep = 
  | HumanSeroprevalenceEstimateFieldsAfterApplyingTypedEstimateConstraintsStep
  | HumanViralEstimateFieldsAfterApplyingTypedEstimateConstraintsStep
  | AnimalSeroprevalenceEstimateFieldsAfterApplyingTypedEstimateConstraintsStep
  | AnimalViralEstimateFieldsAfterApplyingTypedEstimateConstraintsStep;
export type SourceFieldsAfterApplyingTypedEstimateConstraintsStep = SourceFieldsAfterAssigningPartitionsStep;
export type StudyFieldsAfterApplyingTypedEstimateConstraintsStep = StudyFieldsAfterAssigningPartitionsStep;
export type FaoMersEventAfterApplyingTypedEstimateConstraintsStep = FaoMersEventAfterAssigningPartitionsStep;
export type YearlyCamelPopulationDataAfterApplyingTypedEstimateConstraintsStep = YearlyCamelPopulationDataAfterAssigningPartitionsStep;
export type CountryPopulationDataAfterApplyingTypedEstimateConstraintsStep = CountryPopulationDataAfterAssigningPartitionsStep;

interface ApplyTypedEstimateConstraintsStepInput {
  allEstimates: EstimateFieldsAfterAssigningPartitionsStep[];
  allSources: SourceFieldsAfterAssigningPartitionsStep[];
  allStudies: StudyFieldsAfterAssigningPartitionsStep[];
  allFaoMersEvents: FaoMersEventAfterAssigningPartitionsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterAssigningPartitionsStep[];
  countryPopulationData: CountryPopulationDataAfterAssigningPartitionsStep[];
  mongoClient: MongoClient;
}

interface ApplyTypedEstimateConstraintsStepOutput {
  allEstimates: EstimateFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allSources: SourceFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allStudies: StudyFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allFaoMersEvents: FaoMersEventAfterApplyingTypedEstimateConstraintsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterApplyingTypedEstimateConstraintsStep[];
  countryPopulationData: CountryPopulationDataAfterApplyingTypedEstimateConstraintsStep[];
  mongoClient: MongoClient;
}

export const applyTypedEstimateConstraintToEstimate = (estimate: ApplyTypedEstimateConstraintsStepInput['allEstimates'][number]): ApplyTypedEstimateConstraintsStepOutput['allEstimates'][number] | undefined => {
  if(estimate.type === MersEstimateType.HUMAN_SEROPREVALENCE) {
    return {
      ...estimate,
      type: MersEstimateType.HUMAN_SEROPREVALENCE,
      seroprevalence: estimate.positivePrevalence,
      positivePrevalence: undefined,
      ageGroup: estimate.ageGroup,
      animalType: undefined,
      animalSpecies: undefined,
    }
  }
  if(estimate.type === MersEstimateType.HUMAN_VIRAL) {
    return {
      ...estimate,
      type: MersEstimateType.HUMAN_VIRAL,
      seroprevalence: undefined,
      positivePrevalence: estimate.positivePrevalence,
      ageGroup: estimate.ageGroup,
      animalType: undefined,
      animalSpecies: undefined,
    }
  }
  if(estimate.type === MersEstimateType.ANIMAL_SEROPREVALENCE) {
    const animalType = estimate.animalType;
    const animalSpecies = estimate.animalSpecies;

    if(!animalSpecies || !animalType) {
      return undefined;
    }
    return {
      ...estimate,
      type: MersEstimateType.ANIMAL_SEROPREVALENCE,
      seroprevalence: estimate.positivePrevalence,
      positivePrevalence: undefined,
      ageGroup: undefined,
      animalType: animalType,
      animalSpecies: animalSpecies,
    }
  }
  if(estimate.type === MersEstimateType.ANIMAL_VIRAL) {
    const animalType = estimate.animalType;
    const animalSpecies = estimate.animalSpecies;

    if(!animalSpecies || !animalType) {
      return undefined;
    }
    return {
      ...estimate,
      type: MersEstimateType.ANIMAL_VIRAL,
      seroprevalence: undefined,
      positivePrevalence: estimate.positivePrevalence,
      ageGroup: undefined,
      animalType: animalType,
      animalSpecies: animalSpecies,
    }
  }

  assertNever(estimate.type);
}

export const applyTypedEstimateConstraintsStep = (input: ApplyTypedEstimateConstraintsStepInput): ApplyTypedEstimateConstraintsStepOutput => {
  return {
    allEstimates: input.allEstimates
      .map((estimate) => applyTypedEstimateConstraintToEstimate(estimate))
      .filter((estimate): estimate is NonNullable<typeof estimate> => !!estimate),
    allSources: input.allSources,
    allStudies: input.allStudies,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  }
}