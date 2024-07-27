import { MongoClient } from "mongodb";
import { MersSubGroupingVariable } from "../../../storage/types.js";
import {
  CountryFieldsAfterGeneratingMersEstimateFilterOptionsStep,
  CountryPopulationDataAfterGeneratingMersEstimateFilterOptionsStep,
  EstimateFieldsAfterGeneratingMersEstimateFilterOptionsStep,
  EstimateFilterOptionsAfterGeneratingMersEstimateFilterOptionsStep,
  FaoMersEventAfterGeneratingMersEstimateFilterOptionsStep,
  SourceFieldsAfterGeneratingMersEstimateFilterOptionsStep,
  StudyFieldsAfterGeneratingMersEstimateFilterOptionsStep,
  YearlyCamelPopulationDataAfterGeneratingMersEstimateFilterOptionsStep
} from "./generate-mers-estimate-filter-options-step.js";

export type EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep = EstimateFieldsAfterGeneratingMersEstimateFilterOptionsStep;
export type GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep = {
  primaryEstimate: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
  geographicalAreaSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  ageGroupSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  testUsedSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  animalSpeciesSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  sexSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
}
export type EstimateFilterOptionsAfterGroupingEstimatesUnderPrimaryEstimatesStep = EstimateFilterOptionsAfterGeneratingMersEstimateFilterOptionsStep;
export type SourceFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep = SourceFieldsAfterGeneratingMersEstimateFilterOptionsStep;
export type StudyFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep = StudyFieldsAfterGeneratingMersEstimateFilterOptionsStep;
export type CountryFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep = CountryFieldsAfterGeneratingMersEstimateFilterOptionsStep;
export type FaoMersEventAfterGroupingEstimatesUnderPrimaryEstimatesStep = FaoMersEventAfterGeneratingMersEstimateFilterOptionsStep;
export type YearlyCamelPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep = YearlyCamelPopulationDataAfterGeneratingMersEstimateFilterOptionsStep;
export type CountryPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep = CountryPopulationDataAfterGeneratingMersEstimateFilterOptionsStep;

interface GroupEstimatesUnderPrimaryEstimatesStepInput {
  allEstimates: EstimateFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  allSources: SourceFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterGeneratingMersEstimateFilterOptionsStep;
  allStudies: StudyFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  allCountries: CountryFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  allFaoMersEvents: FaoMersEventAfterGeneratingMersEstimateFilterOptionsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterGeneratingMersEstimateFilterOptionsStep[];
  countryPopulationData: CountryPopulationDataAfterGeneratingMersEstimateFilterOptionsStep[];
  mongoClient: MongoClient;
}

interface GroupEstimatesUnderPrimaryEstimatesStepOutput {
  allEstimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allSources: SourceFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
  allStudies: StudyFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allCountries: CountryFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allFaoMersEvents: FaoMersEventAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  countryPopulationData: CountryPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  mongoClient: MongoClient;
}

export const groupEstimatesUnderPrimaryEstimatesStep = (input: GroupEstimatesUnderPrimaryEstimatesStepInput): GroupEstimatesUnderPrimaryEstimatesStepOutput => {
  console.log(`Running step: groupEstimatesUnderPrimaryEstimatesStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates,
    allGroupedEstimates: input.allEstimates
      .filter((estimate) => estimate.subGroupingVariable === MersSubGroupingVariable.PRIMARY)
      .map((primaryEstimate) => ({
        primaryEstimate,
        geographicalAreaSubestimates: input.allEstimates
          .filter((estimate) => estimate.subGroupingVariable === MersSubGroupingVariable.GEOGRAPHICAL_AREA)
          .filter((estimate) => estimate.studyId === primaryEstimate.studyId && estimate.type === primaryEstimate.type),
        ageGroupSubestimates: input.allEstimates
          .filter((estimate) => estimate.subGroupingVariable === MersSubGroupingVariable.AGE)
          .filter((estimate) => estimate.studyId === primaryEstimate.studyId && estimate.type === primaryEstimate.type),
        testUsedSubestimates: input.allEstimates
          .filter((estimate) => estimate.subGroupingVariable === MersSubGroupingVariable.TEST_USED)
          .filter((estimate) => estimate.studyId === primaryEstimate.studyId && estimate.type === primaryEstimate.type),
        animalSpeciesSubestimates: input.allEstimates
          .filter((estimate) => estimate.subGroupingVariable === MersSubGroupingVariable.ANIMAL_SPECIES)
          .filter((estimate) => estimate.studyId === primaryEstimate.studyId && estimate.type === primaryEstimate.type),
        sexSubestimates: input.allEstimates
          .filter((estimate) => estimate.subGroupingVariable === MersSubGroupingVariable.SEX)
          .filter((estimate) => estimate.studyId === primaryEstimate.studyId && estimate.type === primaryEstimate.type),
      })),
    allSources: input.allSources,
    estimateFilterOptions: input.estimateFilterOptions,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
}