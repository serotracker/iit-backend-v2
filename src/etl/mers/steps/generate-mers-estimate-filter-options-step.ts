import { MongoClient } from "mongodb";
import uniq from "lodash/uniq.js";
import {
  CountryFieldsAfterApplyingTypedEstimateConstraintsStep,
  CountryPopulationDataAfterApplyingTypedEstimateConstraintsStep,
  EstimateFieldsAfterApplyingTypedEstimateConstraintsStep,
  FaoMersEventAfterApplyingTypedEstimateConstraintsStep,
  MacroSampleFrameFieldsAfterApplyingTypedEstimateConstraintsStep,
  SourceFieldsAfterApplyingTypedEstimateConstraintsStep,
  StudyFieldsAfterApplyingTypedEstimateConstraintsStep,
  WhoCaseDataAfterApplyingTypedEstimateConstraintsStep,
  YearlyCamelPopulationDataAfterApplyingTypedEstimateConstraintsStep
} from "./apply-typed-estimate-constraints-step.js";
import { Clade, MersAnimalSpecies } from "../../../storage/types.js";

export type EstimateFieldsAfterGeneratingMersEstimateFilterOptionsStep = EstimateFieldsAfterApplyingTypedEstimateConstraintsStep;
export type SourceFieldsAfterGeneratingMersEstimateFilterOptionsStep = SourceFieldsAfterApplyingTypedEstimateConstraintsStep;
export type EstimateFilterOptionsAfterGeneratingMersEstimateFilterOptionsStep = {
  sourceType: string[];
  ageGroup: string[];
  assay: string[];
  specimenType: string[];
  sex: string[];
  isotypes: string[];
  samplingMethod: string[];
  geographicScope: string[];
  animalDetectionSettings: string[];
  animalPurpose: string[];
  animalSpecies: MersAnimalSpecies[];
  animalImportedOrLocal: string[];
  sampleFrame: string[];
  testProducer: string[];
  testValidation: string[];
  exposureToCamels: string[];
  antigen: string[];
  clade: Clade[];
}
export type StudyFieldsAfterGeneratingMersEstimateFilterOptionsStep = StudyFieldsAfterApplyingTypedEstimateConstraintsStep;
export type CountryFieldsAfterGeneratingMersEstimateFilterOptionsStep = CountryFieldsAfterApplyingTypedEstimateConstraintsStep;
export type MacroSampleFrameFieldsAfterGeneratingMersEstimateFilterOptionsStep = MacroSampleFrameFieldsAfterApplyingTypedEstimateConstraintsStep;
export type FaoMersEventAfterGeneratingMersEstimateFilterOptionsStep = FaoMersEventAfterApplyingTypedEstimateConstraintsStep;
export type YearlyCamelPopulationDataAfterGeneratingMersEstimateFilterOptionsStep = YearlyCamelPopulationDataAfterApplyingTypedEstimateConstraintsStep;
export type CountryPopulationDataAfterGeneratingMersEstimateFilterOptionsStep = CountryPopulationDataAfterApplyingTypedEstimateConstraintsStep;
export type WhoCaseDataAfterGeneratingMersEstimateFilterOptionsStep = WhoCaseDataAfterApplyingTypedEstimateConstraintsStep;

interface GenerateMersEstimateFilterOptionsStepInput {
  allEstimates: EstimateFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allSources: SourceFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allStudies: StudyFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allCountries: CountryFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allFaoMersEvents: FaoMersEventAfterApplyingTypedEstimateConstraintsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterApplyingTypedEstimateConstraintsStep[];
  countryPopulationData: CountryPopulationDataAfterApplyingTypedEstimateConstraintsStep[];
  whoCaseData: WhoCaseDataAfterApplyingTypedEstimateConstraintsStep[];
  mongoClient: MongoClient;
}

interface GenerateMersEstimateFilterOptionsStepOutput {
  allEstimates: EstimateFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  allSources: SourceFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterGeneratingMersEstimateFilterOptionsStep
  allStudies: StudyFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  allCountries: CountryFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  allFaoMersEvents: FaoMersEventAfterGeneratingMersEstimateFilterOptionsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterGeneratingMersEstimateFilterOptionsStep[];
  countryPopulationData: CountryPopulationDataAfterGeneratingMersEstimateFilterOptionsStep[];
  whoCaseData: WhoCaseDataAfterGeneratingMersEstimateFilterOptionsStep[];
  mongoClient: MongoClient;
}

export const generateMersEstimateFilterOptionsStep = (input: GenerateMersEstimateFilterOptionsStepInput): GenerateMersEstimateFilterOptionsStepOutput => {
  console.log(`Running step: generateMersEstimateFilterOptionsStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates,
    estimateFilterOptions: {
      sourceType: uniq(input.allEstimates
        .map((estimate) => estimate.study.source.type)
        .filter((element): element is NonNullable<typeof element> => !!element)),
      ageGroup: uniq(input.allEstimates
        .flatMap((estimate) => estimate.ageGroup)
        .filter((element): element is NonNullable<typeof element> => !!element)),
      assay: uniq(input.allEstimates
        .flatMap((estimate) => estimate.assay)
        .filter((element): element is NonNullable<typeof element> => !!element)),
      specimenType: uniq(input.allEstimates
        .flatMap((estimate) => estimate.specimenType)
        .filter((element): element is NonNullable<typeof element> => !!element)),
      sex: uniq(input.allEstimates
        .map((estimate) => estimate.sex)
        .filter((element): element is NonNullable<typeof element> => !!element)),
      isotypes: uniq(input.allEstimates
        .flatMap((estimate) => estimate.isotypes)
        .filter((element): element is NonNullable<typeof element> => !!element)),
      samplingMethod: uniq(input.allEstimates
        .map((estimate) => estimate.samplingMethod)
        .filter((element): element is NonNullable<typeof element> => !!element)),
      geographicScope: uniq(input.allEstimates
        .map((estimate) => estimate.geographicScope)
        .filter((element): element is NonNullable<typeof element> => !!element)),
      animalDetectionSettings: uniq(input.allEstimates
        .flatMap((estimate) => estimate.animalDetectionSettings)
        .filter((element): element is NonNullable<typeof element> => !!element)),
      animalPurpose: uniq(input.allEstimates
        .map((estimate) => estimate.animalPurpose)
        .filter((element): element is NonNullable<typeof element> => !!element)),
      animalSpecies: uniq(input.allEstimates
        .map((estimate) => estimate.animalSpecies)
        .filter((element): element is NonNullable<typeof element> => !!element)),
      animalImportedOrLocal: uniq(input.allEstimates
        .map((estimate) => estimate.animalImportedOrLocal)
        .filter((element): element is NonNullable<typeof element> => !!element)),
      sampleFrame: uniq(input.allEstimates
        .map((estimate) => estimate.sampleFrame)
        .filter((element): element is NonNullable<typeof element> => !!element)),
      testProducer: uniq(input.allEstimates
        .flatMap((estimate) => estimate.testProducer)
        .filter((element): element is NonNullable<typeof element> => !!element)),
      testValidation: uniq(input.allEstimates
        .flatMap((estimate) => estimate.testValidation)
        .filter((element): element is NonNullable<typeof element> => !!element)),
      exposureToCamels: uniq(input.allEstimates
        .map((estimate) => estimate.exposureToCamels)
        .filter((element): element is NonNullable<typeof element> => !!element)),
      antigen: uniq(input.allEstimates
        .flatMap((estimate) => estimate.antigen)
        .filter((element): element is NonNullable<typeof element> => !!element)),
      clade: uniq(input.allEstimates
        .flatMap((estimate) => estimate.clade)
        .filter((element): element is NonNullable<typeof element> => !!element))
    },
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  };
}