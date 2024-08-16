import { MongoClient } from "mongodb";
import uniq from "lodash/uniq.js";
import {
  CountryFieldsAfterApplyingTypedEstimateConstraintsStep,
  CountryPopulationDataAfterApplyingTypedEstimateConstraintsStep,
  EstimateFieldsAfterApplyingTypedEstimateConstraintsStep,
  FaoMersEventAfterApplyingTypedEstimateConstraintsStep,
  SourceFieldsAfterApplyingTypedEstimateConstraintsStep,
  StudyFieldsAfterApplyingTypedEstimateConstraintsStep,
  YearlyCamelPopulationDataAfterApplyingTypedEstimateConstraintsStep
} from "./apply-typed-estimate-constraints-step.js";

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
  animalImportedOrLocal: string[];
  sampleFrame: string[];
  testProducer: string[];
  testValidation: string[];
  exposureToCamels: string[];
  antigen: string[];
}
export type StudyFieldsAfterGeneratingMersEstimateFilterOptionsStep = StudyFieldsAfterApplyingTypedEstimateConstraintsStep;
export type CountryFieldsAfterGeneratingMersEstimateFilterOptionsStep = CountryFieldsAfterApplyingTypedEstimateConstraintsStep;
export type FaoMersEventAfterGeneratingMersEstimateFilterOptionsStep = FaoMersEventAfterApplyingTypedEstimateConstraintsStep;
export type YearlyCamelPopulationDataAfterGeneratingMersEstimateFilterOptionsStep = YearlyCamelPopulationDataAfterApplyingTypedEstimateConstraintsStep;
export type CountryPopulationDataAfterGeneratingMersEstimateFilterOptionsStep = CountryPopulationDataAfterApplyingTypedEstimateConstraintsStep;

interface GenerateMersEstimateFilterOptionsStepInput {
  allEstimates: EstimateFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allSources: SourceFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allStudies: StudyFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allCountries: CountryFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allFaoMersEvents: FaoMersEventAfterApplyingTypedEstimateConstraintsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterApplyingTypedEstimateConstraintsStep[];
  countryPopulationData: CountryPopulationDataAfterApplyingTypedEstimateConstraintsStep[];
  mongoClient: MongoClient;
}

interface GenerateMersEstimateFilterOptionsStepOutput {
  allEstimates: EstimateFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  allSources: SourceFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterGeneratingMersEstimateFilterOptionsStep
  allStudies: StudyFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  allCountries: CountryFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  allFaoMersEvents: FaoMersEventAfterGeneratingMersEstimateFilterOptionsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterGeneratingMersEstimateFilterOptionsStep[];
  countryPopulationData: CountryPopulationDataAfterGeneratingMersEstimateFilterOptionsStep[];
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
    },
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
}