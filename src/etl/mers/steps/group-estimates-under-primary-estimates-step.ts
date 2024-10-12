import { MongoClient } from "mongodb";
import { MersSubGroupingVariable } from "../../../storage/types.js";
import {
  CountryFieldsAfterGeneratingMersEstimateFilterOptionsStep,
  CountryPopulationDataAfterGeneratingMersEstimateFilterOptionsStep,
  EstimateFieldsAfterGeneratingMersEstimateFilterOptionsStep,
  EstimateFilterOptionsAfterGeneratingMersEstimateFilterOptionsStep,
  FaoMersEventAfterGeneratingMersEstimateFilterOptionsStep,
  MacroSampleFrameFieldsAfterGeneratingMersEstimateFilterOptionsStep,
  SourceFieldsAfterGeneratingMersEstimateFilterOptionsStep,
  StudyFieldsAfterGeneratingMersEstimateFilterOptionsStep,
  WhoCaseDataAfterGeneratingMersEstimateFilterOptionsStep,
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
  timeFrameSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  sampleTypeSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  occupationSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  animalSourceLocationSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  animalSamplingContextSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  camelExposureLevelSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  nomadismSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  humanCountriesOfTravelSubestimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
}
export type EstimateFilterOptionsAfterGroupingEstimatesUnderPrimaryEstimatesStep = EstimateFilterOptionsAfterGeneratingMersEstimateFilterOptionsStep;
export type SourceFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep = SourceFieldsAfterGeneratingMersEstimateFilterOptionsStep;
export type StudyFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep = StudyFieldsAfterGeneratingMersEstimateFilterOptionsStep;
export type CountryFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep = CountryFieldsAfterGeneratingMersEstimateFilterOptionsStep;
export type MacroSampleFrameFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep = MacroSampleFrameFieldsAfterGeneratingMersEstimateFilterOptionsStep;
export type FaoMersEventAfterGroupingEstimatesUnderPrimaryEstimatesStep = FaoMersEventAfterGeneratingMersEstimateFilterOptionsStep;
export type YearlyCamelPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep = YearlyCamelPopulationDataAfterGeneratingMersEstimateFilterOptionsStep;
export type CountryPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep = CountryPopulationDataAfterGeneratingMersEstimateFilterOptionsStep;
export type WhoCaseDataAfterGroupingEstimatesUnderPrimaryEstimatesStep = WhoCaseDataAfterGeneratingMersEstimateFilterOptionsStep;

interface GroupEstimatesUnderPrimaryEstimatesStepInput {
  allEstimates: EstimateFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  allSources: SourceFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterGeneratingMersEstimateFilterOptionsStep;
  allStudies: StudyFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  allCountries: CountryFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterGeneratingMersEstimateFilterOptionsStep[];
  allFaoMersEvents: FaoMersEventAfterGeneratingMersEstimateFilterOptionsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterGeneratingMersEstimateFilterOptionsStep[];
  countryPopulationData: CountryPopulationDataAfterGeneratingMersEstimateFilterOptionsStep[];
  whoCaseData: WhoCaseDataAfterGeneratingMersEstimateFilterOptionsStep[];
  mongoClient: MongoClient;
}

interface GroupEstimatesUnderPrimaryEstimatesStepOutput {
  allEstimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allSources: SourceFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
  allStudies: StudyFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allCountries: CountryFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allFaoMersEvents: FaoMersEventAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  countryPopulationData: CountryPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  whoCaseData: WhoCaseDataAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
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
        timeFrameSubestimates: input.allEstimates
          .filter((estimate) => estimate.subGroupingVariable === MersSubGroupingVariable.TIME_FRAME)
          .filter((estimate) => estimate.studyId === primaryEstimate.studyId && estimate.type === primaryEstimate.type),
        sampleTypeSubestimates: input.allEstimates
          .filter((estimate) => estimate.subGroupingVariable === MersSubGroupingVariable.SAMPLE_TYPE)
          .filter((estimate) => estimate.studyId === primaryEstimate.studyId && estimate.type === primaryEstimate.type),
        occupationSubestimates: input.allEstimates
          .filter((estimate) => estimate.subGroupingVariable === MersSubGroupingVariable.OCCUPATION)
          .filter((estimate) => estimate.studyId === primaryEstimate.studyId && estimate.type === primaryEstimate.type),
        animalSourceLocationSubestimates: input.allEstimates
          .filter((estimate) => estimate.subGroupingVariable === MersSubGroupingVariable.ANIMAL_SOURCE_LOCATION)
          .filter((estimate) => estimate.studyId === primaryEstimate.studyId && estimate.type === primaryEstimate.type),
        animalSamplingContextSubestimates: input.allEstimates
          .filter((estimate) => estimate.subGroupingVariable === MersSubGroupingVariable.ANIMAL_SAMPLING_CONTEXT)
          .filter((estimate) => estimate.studyId === primaryEstimate.studyId && estimate.type === primaryEstimate.type),
        camelExposureLevelSubestimates: input.allEstimates
          .filter((estimate) => estimate.subGroupingVariable === MersSubGroupingVariable.EXPOSURE_LEVEL)
          .filter((estimate) => estimate.studyId === primaryEstimate.studyId && estimate.type === primaryEstimate.type),
        nomadismSubestimates: input.allEstimates
          .filter((estimate) => estimate.subGroupingVariable === MersSubGroupingVariable.NOMADISM)
          .filter((estimate) => estimate.studyId === primaryEstimate.studyId && estimate.type === primaryEstimate.type),
        humanCountriesOfTravelSubestimates: input.allEstimates
          .filter((estimate) => estimate.subGroupingVariable === MersSubGroupingVariable.TRAVEL)
          .filter((estimate) => estimate.studyId === primaryEstimate.studyId && estimate.type === primaryEstimate.type),
      })),
    allSources: input.allSources,
    estimateFilterOptions: input.estimateFilterOptions,
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