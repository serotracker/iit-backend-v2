import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterAssigningPartitionsStep,
  CountryPopulationDataAfterAssigningPartitionsStep,
  EstimateFieldsAfterAssigningPartitionsStep,
  FaoMersEventAfterAssigningPartitionsStep,
  MacroSampleFrameFieldsAfterAssigningPartitionsStep,
  SourceFieldsAfterAssigningPartitionsStep,
  StudyFieldsAfterAssigningPartitionsStep,
  YearlyCamelPopulationDataAfterAssigningPartitionsStep
} from "./assign-partitions-step";
import { MersAnimalSpecies, MersAnimalType, MersEstimateType } from "../../../storage/types.js";
import assertNever from "assert-never";

type HumanSeroprevalenceEstimateFieldsAfterApplyingTypedEstimateConstraintsStep = Omit<
  EstimateFieldsAfterAssigningPartitionsStep,
  'type'|'positivePrevalence'|'positivePrevalence95CILower'|
  'positivePrevalence95CIUpper'|'seroprevalence'|'seroprevalence95CILower'|
  'seroprevalence95CIUpper'|'animalType'|'animalSpecies'|'ageGroup'|
  'positivePrevalenceCalculated95CILower'|'positivePrevalenceCalculated95CIUpper'
> & {
  type: MersEstimateType.HUMAN_SEROPREVALENCE;
  seroprevalence: number;
  seroprevalence95CILower: number | undefined;
  seroprevalence95CIUpper: number | undefined;
  seroprevalenceCalculated95CILower: number;
  seroprevalenceCalculated95CIUpper: number;
  positivePrevalence: undefined;
  positivePrevalence95CILower: undefined;
  positivePrevalence95CIUpper: undefined;
  positivePrevalenceCalculated95CILower: undefined;
  positivePrevalenceCalculated95CIUpper: undefined;
  ageGroup: string[];
  animalType: undefined;
  animalSpecies: undefined;
  sampleFrame: string | undefined;
  animalDetectionSettings: never[];
  animalPurpose: undefined;
  animalImportedOrLocal: undefined;
  animalAgeGroup: never[];
}
type HumanViralEstimateFieldsAfterApplyingTypedEstimateConstraintsStep = Omit<
  EstimateFieldsAfterAssigningPartitionsStep,
  'type'|'positivePrevalence'|'positivePrevalence95CILower'|
  'positivePrevalence95CIUpper'|'seroprevalence'|'seroprevalence95CILower'|
  'seroprevalence95CIUpper'|'animalType'|'animalSpecies'|'ageGroup'|
  'positivePrevalenceCalculated95CILower'|'positivePrevalenceCalculated95CIUpper'
> & {
  type: MersEstimateType.HUMAN_VIRAL;
  seroprevalence: undefined;
  seroprevalence95CILower: undefined;
  seroprevalence95CIUpper: undefined;
  seroprevalenceCalculated95CILower: undefined;
  seroprevalenceCalculated95CIUpper: undefined;
  positivePrevalence: number;
  positivePrevalence95CILower: number | undefined;
  positivePrevalence95CIUpper: number | undefined;
  positivePrevalenceCalculated95CILower: number;
  positivePrevalenceCalculated95CIUpper: number;
  ageGroup: string[];
  animalType: undefined;
  animalSpecies: undefined;
  sampleFrame: string | undefined;
  animalDetectionSettings: never[];
  animalPurpose: undefined;
  animalImportedOrLocal: undefined;
  animalAgeGroup: never[];
}
type AnimalSeroprevalenceEstimateFieldsAfterApplyingTypedEstimateConstraintsStep = Omit<
  EstimateFieldsAfterAssigningPartitionsStep,
  'type'|'positivePrevalence'|'positivePrevalence95CILower'|
  'positivePrevalence95CIUpper'|'seroprevalence'|'seroprevalence95CILower'|
  'seroprevalence95CIUpper'|'animalType'|'animalSpecies'|'ageGroup'|
  'positivePrevalenceCalculated95CILower'|'positivePrevalenceCalculated95CIUpper'
> & {
  type: MersEstimateType.ANIMAL_SEROPREVALENCE;
  seroprevalence: number;
  seroprevalence95CILower: number | undefined;
  seroprevalence95CIUpper: number | undefined;
  seroprevalenceCalculated95CILower: number;
  seroprevalenceCalculated95CIUpper: number;
  positivePrevalence: undefined;
  positivePrevalence95CILower: undefined;
  positivePrevalence95CIUpper: undefined;
  positivePrevalenceCalculated95CILower: undefined;
  positivePrevalenceCalculated95CIUpper: undefined;
  ageGroup: never[];
  animalType: MersAnimalType[];
  animalSpecies: MersAnimalSpecies;
  sampleFrame: undefined;
  animalDetectionSettings: string[];
  animalPurpose: string | undefined;
  animalImportedOrLocal: string | undefined;
  animalAgeGroup: string[];
}
type AnimalViralEstimateFieldsAfterApplyingTypedEstimateConstraintsStep = Omit<
  EstimateFieldsAfterAssigningPartitionsStep,
  'type'|'positivePrevalence'|'positivePrevalence95CILower'|
  'positivePrevalence95CIUpper'|'seroprevalence'|'seroprevalence95CILower'|
  'seroprevalence95CIUpper'|'animalType'|'animalSpecies'|'ageGroup'|
  'positivePrevalenceCalculated95CILower'|'positivePrevalenceCalculated95CIUpper'
> & {
  type: MersEstimateType.ANIMAL_VIRAL;
  seroprevalence: undefined;
  seroprevalence95CILower: undefined;
  seroprevalence95CIUpper: undefined;
  seroprevalenceCalculated95CILower: undefined;
  seroprevalenceCalculated95CIUpper: undefined;
  positivePrevalence: number;
  positivePrevalence95CILower: number | undefined;
  positivePrevalence95CIUpper: number | undefined;
  positivePrevalenceCalculated95CILower: number;
  positivePrevalenceCalculated95CIUpper: number;
  ageGroup: never[];
  animalType: MersAnimalType[];
  animalSpecies: MersAnimalSpecies;
  sampleFrame: undefined;
  animalDetectionSettings: string[];
  animalPurpose: string | undefined;
  animalImportedOrLocal: string | undefined;
  animalAgeGroup: string[];
}

export type EstimateFieldsAfterApplyingTypedEstimateConstraintsStep = 
  | HumanSeroprevalenceEstimateFieldsAfterApplyingTypedEstimateConstraintsStep
  | HumanViralEstimateFieldsAfterApplyingTypedEstimateConstraintsStep
  | AnimalSeroprevalenceEstimateFieldsAfterApplyingTypedEstimateConstraintsStep
  | AnimalViralEstimateFieldsAfterApplyingTypedEstimateConstraintsStep;
export type SourceFieldsAfterApplyingTypedEstimateConstraintsStep = SourceFieldsAfterAssigningPartitionsStep;
export type StudyFieldsAfterApplyingTypedEstimateConstraintsStep = StudyFieldsAfterAssigningPartitionsStep;
export type CountryFieldsAfterApplyingTypedEstimateConstraintsStep = CountryFieldsAfterAssigningPartitionsStep;
export type MacroSampleFrameFieldsAfterApplyingTypedEstimateConstraintsStep = MacroSampleFrameFieldsAfterAssigningPartitionsStep;
export type FaoMersEventAfterApplyingTypedEstimateConstraintsStep = FaoMersEventAfterAssigningPartitionsStep;
export type YearlyCamelPopulationDataAfterApplyingTypedEstimateConstraintsStep = YearlyCamelPopulationDataAfterAssigningPartitionsStep;
export type CountryPopulationDataAfterApplyingTypedEstimateConstraintsStep = CountryPopulationDataAfterAssigningPartitionsStep;

interface ApplyTypedEstimateConstraintsStepInput {
  allEstimates: EstimateFieldsAfterAssigningPartitionsStep[];
  allSources: SourceFieldsAfterAssigningPartitionsStep[];
  allStudies: StudyFieldsAfterAssigningPartitionsStep[];
  allCountries: CountryFieldsAfterAssigningPartitionsStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterAssigningPartitionsStep[];
  allFaoMersEvents: FaoMersEventAfterAssigningPartitionsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterAssigningPartitionsStep[];
  countryPopulationData: CountryPopulationDataAfterAssigningPartitionsStep[];
  mongoClient: MongoClient;
}

interface ApplyTypedEstimateConstraintsStepOutput {
  allEstimates: EstimateFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allSources: SourceFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allStudies: StudyFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allCountries: CountryFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterApplyingTypedEstimateConstraintsStep[];
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
      seroprevalence95CILower: estimate.positivePrevalence95CILower,
      seroprevalence95CIUpper: estimate.positivePrevalence95CIUpper,
      seroprevalenceCalculated95CILower: estimate.positivePrevalenceCalculated95CILower,
      seroprevalenceCalculated95CIUpper: estimate.positivePrevalenceCalculated95CIUpper,
      positivePrevalence: undefined,
      positivePrevalence95CILower: undefined,
      positivePrevalence95CIUpper: undefined,
      positivePrevalenceCalculated95CILower: undefined,
      positivePrevalenceCalculated95CIUpper: undefined,
      ageGroup: estimate.ageGroup,
      animalType: undefined,
      animalSpecies: undefined,
      sampleFrame: estimate.sampleFrame,
      animalDetectionSettings: [],
      animalPurpose: undefined,
      animalImportedOrLocal: undefined,
      animalAgeGroup: [],
    }
  }
  if(estimate.type === MersEstimateType.HUMAN_VIRAL) {
    return {
      ...estimate,
      type: MersEstimateType.HUMAN_VIRAL,
      seroprevalence: undefined,
      seroprevalence95CILower: undefined,
      seroprevalence95CIUpper: undefined,
      seroprevalenceCalculated95CILower: undefined,
      seroprevalenceCalculated95CIUpper: undefined,
      positivePrevalence: estimate.positivePrevalence,
      positivePrevalence95CILower: estimate.positivePrevalence95CILower,
      positivePrevalence95CIUpper: estimate.positivePrevalence95CIUpper,
      positivePrevalenceCalculated95CILower: estimate.positivePrevalenceCalculated95CILower,
      positivePrevalenceCalculated95CIUpper: estimate.positivePrevalenceCalculated95CIUpper,
      ageGroup: estimate.ageGroup,
      animalType: undefined,
      animalSpecies: undefined,
      sampleFrame: estimate.sampleFrame,
      animalDetectionSettings: [],
      animalPurpose: undefined,
      animalImportedOrLocal: undefined,
      animalAgeGroup: [],
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
      seroprevalence95CILower: estimate.positivePrevalence95CILower,
      seroprevalence95CIUpper: estimate.positivePrevalence95CIUpper,
      seroprevalenceCalculated95CILower: estimate.positivePrevalenceCalculated95CILower,
      seroprevalenceCalculated95CIUpper: estimate.positivePrevalenceCalculated95CIUpper,
      positivePrevalence: undefined,
      positivePrevalence95CILower: undefined,
      positivePrevalence95CIUpper: undefined,
      positivePrevalenceCalculated95CILower: undefined,
      positivePrevalenceCalculated95CIUpper: undefined,
      ageGroup: [],
      animalType: animalType,
      animalSpecies: animalSpecies,
      sampleFrame: undefined,
      animalDetectionSettings: estimate.animalDetectionSettings,
      animalPurpose: estimate.animalPurpose,
      animalImportedOrLocal: estimate.animalImportedOrLocal,
      animalAgeGroup: estimate.animalAgeGroup,
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
      seroprevalence95CILower: undefined,
      seroprevalence95CIUpper: undefined,
      seroprevalenceCalculated95CILower: undefined,
      seroprevalenceCalculated95CIUpper: undefined,
      positivePrevalence: estimate.positivePrevalence,
      positivePrevalence95CILower: estimate.positivePrevalence95CILower,
      positivePrevalence95CIUpper: estimate.positivePrevalence95CIUpper,
      positivePrevalenceCalculated95CILower: estimate.positivePrevalenceCalculated95CILower,
      positivePrevalenceCalculated95CIUpper: estimate.positivePrevalenceCalculated95CIUpper,
      ageGroup: [],
      animalType: animalType,
      animalSpecies: animalSpecies,
      sampleFrame: undefined,
      animalDetectionSettings: estimate.animalDetectionSettings,
      animalPurpose: estimate.animalPurpose,
      animalImportedOrLocal: estimate.animalImportedOrLocal,
      animalAgeGroup: estimate.animalAgeGroup,
    }
  }

  assertNever(estimate.type);
}

export const applyTypedEstimateConstraintsStep = (input: ApplyTypedEstimateConstraintsStepInput): ApplyTypedEstimateConstraintsStepOutput => {
  console.log(`Running step: applyTypedEstimateConstraintsStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates
      .map((estimate) => applyTypedEstimateConstraintToEstimate(estimate))
      .filter((estimate): estimate is NonNullable<typeof estimate> => !!estimate),
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  }
}