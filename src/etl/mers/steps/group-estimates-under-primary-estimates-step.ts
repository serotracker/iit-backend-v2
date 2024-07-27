import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterApplyingTypedEstimateConstraintsStep,
  CountryPopulationDataAfterApplyingTypedEstimateConstraintsStep,
  EstimateFieldsAfterApplyingTypedEstimateConstraintsStep,
  FaoMersEventAfterApplyingTypedEstimateConstraintsStep,
  SourceFieldsAfterApplyingTypedEstimateConstraintsStep,
  StudyFieldsAfterApplyingTypedEstimateConstraintsStep,
  YearlyCamelPopulationDataAfterApplyingTypedEstimateConstraintsStep
} from "./apply-typed-estimate-constraints-step.js";
import uniq from "lodash/uniq.js";
import { MersEstimateType, MersSubGroupingVariable } from "../../../storage/types.js";

interface GroupEstimatesUnderPrimaryEstimatesStepInput {
  allEstimates: EstimateFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allSources: SourceFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allStudies: StudyFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allCountries: CountryFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allFaoMersEvents: FaoMersEventAfterApplyingTypedEstimateConstraintsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterApplyingTypedEstimateConstraintsStep[];
  countryPopulationData: CountryPopulationDataAfterApplyingTypedEstimateConstraintsStep[];
  mongoClient: MongoClient;
}

interface GroupEstimatesUnderPrimaryEstimatesStepOutput {
  allEstimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allSources: SourceFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allStudies: StudyFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allCountries: CountryFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allFaoMersEvents: FaoMersEventAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  countryPopulationData: CountryPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  mongoClient: MongoClient;
}

export type EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep = EstimateFieldsAfterApplyingTypedEstimateConstraintsStep;
export type GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep = {
  primaryEstimate: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
  geographicalAreaSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  ageGroupSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  testUsedSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  animalSpeciesSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  sexSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
}
export type SourceFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep = SourceFieldsAfterApplyingTypedEstimateConstraintsStep;
export type StudyFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep = StudyFieldsAfterApplyingTypedEstimateConstraintsStep;
export type CountryFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep = CountryFieldsAfterApplyingTypedEstimateConstraintsStep;
export type FaoMersEventAfterGroupingEstimatesUnderPrimaryEstimatesStep = FaoMersEventAfterApplyingTypedEstimateConstraintsStep;
export type YearlyCamelPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep = YearlyCamelPopulationDataAfterApplyingTypedEstimateConstraintsStep;
export type CountryPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep = CountryPopulationDataAfterApplyingTypedEstimateConstraintsStep;

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
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
}