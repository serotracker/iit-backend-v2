import { MongoClient } from "mongodb";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";
import {
  CountryFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep,
  CountryPopulationDataAfterWritingMersEstimateFilterOptionsToMongodbStep,
  EstimateFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep,
  EstimateFilterOptionsAfterWritingMersEstimateFilterOptionsToMongodbStep,
  FaoMersEventAfterWritingMersEstimateFilterOptionsToMongodbStep,
  GroupedEstimateFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep,
  MacroSampleFrameFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep,
  SourceFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep,
  StudyFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep,
  YearlyCamelPopulationDataAfterWritingMersEstimateFilterOptionsToMongodbStep
} from "./write-mers-estimate-filter-options-to-mongodb-step";

export type EstimateFieldsAfterWritingMersMacroSampleFramesToMongodbStep =
  EstimateFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep;
export type GroupedEstimateFieldsAfterWritingMersMacroSampleFramesToMongodbStep =
  GroupedEstimateFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep;
export type SourceFieldsAfterWritingMersMacroSampleFramesToMongodbStep =
  SourceFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep;
export type EstimateFilterOptionsAfterWritingMersMacroSampleFramesToMongodbStep =
  EstimateFilterOptionsAfterWritingMersEstimateFilterOptionsToMongodbStep;
export type StudyFieldsAfterWritingMersMacroSampleFramesToMongodbStep =
  StudyFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep;
export type CountryFieldsAfterWritingMersMacroSampleFramesToMongodbStep =
  CountryFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep;
export type MacroSampleFrameFieldsAfterWritingMersMacroSampleFramesToMongodbStep =
  MacroSampleFrameFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep;
export type FaoMersEventAfterWritingMersMacroSampleFramesToMongodbStep =
  FaoMersEventAfterWritingMersEstimateFilterOptionsToMongodbStep;
export type YearlyCamelPopulationDataAfterWritingMersMacroSampleFramesToMongodbStep =
  YearlyCamelPopulationDataAfterWritingMersEstimateFilterOptionsToMongodbStep;
export type CountryPopulationDataAfterWritingMersMacroSampleFramesToMongodbStep =
  CountryPopulationDataAfterWritingMersEstimateFilterOptionsToMongodbStep;

interface WriteMersMacroSampleFramesToMongoDbStepInput {
  allEstimates: EstimateFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  allSources: SourceFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterWritingMersEstimateFilterOptionsToMongodbStep;
  allStudies: StudyFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  allCountries: CountryFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  mongoClient: MongoClient;
}

interface WriteMersMacroSampleFramesToMongoDbStepOutput {
  allEstimates: EstimateFieldsAfterWritingMersMacroSampleFramesToMongodbStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterWritingMersMacroSampleFramesToMongodbStep[];
  allSources: SourceFieldsAfterWritingMersMacroSampleFramesToMongodbStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterWritingMersMacroSampleFramesToMongodbStep;
  allStudies: StudyFieldsAfterWritingMersMacroSampleFramesToMongodbStep[];
  allCountries: CountryFieldsAfterWritingMersMacroSampleFramesToMongodbStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterWritingMersMacroSampleFramesToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingMersMacroSampleFramesToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingMersMacroSampleFramesToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingMersMacroSampleFramesToMongodbStep[];
  mongoClient: MongoClient;
}

export const writeMersMacroSampleFramesToMongoDbStep = async(
  input: WriteMersMacroSampleFramesToMongoDbStepInput
): Promise<WriteMersMacroSampleFramesToMongoDbStepOutput> => {
  console.log(`Running step: writeMersMacroSampleFramesToMongoDbStep. Remaining estimates: ${input.allEstimates.length}.`);

  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: "mersMacroSampleFrames",
    data: input.allMacroSampleFrames,
    mongoClient: input.mongoClient,
  });

  return {
    allEstimates: input.allEstimates,
    allGroupedEstimates: input.allGroupedEstimates,
    allSources: input.allSources,
    estimateFilterOptions: input.estimateFilterOptions,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};