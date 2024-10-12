import { MongoClient } from "mongodb";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";
import {
  CountryFieldsAfterWritingMersMacroSampleFramesToMongodbStep,
  CountryPopulationDataAfterWritingMersMacroSampleFramesToMongodbStep,
  EstimateFieldsAfterWritingMersMacroSampleFramesToMongodbStep,
  EstimateFilterOptionsAfterWritingMersMacroSampleFramesToMongodbStep,
  FaoMersEventAfterWritingMersMacroSampleFramesToMongodbStep,
  GroupedEstimateFieldsAfterWritingMersMacroSampleFramesToMongodbStep,
  MacroSampleFrameFieldsAfterWritingMersMacroSampleFramesToMongodbStep,
  SourceFieldsAfterWritingMersMacroSampleFramesToMongodbStep,
  StudyFieldsAfterWritingMersMacroSampleFramesToMongodbStep,
  WhoCaseDataAfterWritingMersMacroSampleFramesToMongodbStep,
  YearlyCamelPopulationDataAfterWritingMersMacroSampleFramesToMongodbStep
} from "./write-mers-macro-sample-frames-to-mongodb-step";

export type EstimateFieldsAfterWritingMersWhoCaseDataToMongodbStep =
  EstimateFieldsAfterWritingMersMacroSampleFramesToMongodbStep;
export type GroupedEstimateFieldsAfterWritingMersWhoCaseDataToMongodbStep =
  GroupedEstimateFieldsAfterWritingMersMacroSampleFramesToMongodbStep;
export type SourceFieldsAfterWritingMersWhoCaseDataToMongodbStep =
  SourceFieldsAfterWritingMersMacroSampleFramesToMongodbStep;
export type EstimateFilterOptionsAfterWritingMersWhoCaseDataToMongodbStep =
  EstimateFilterOptionsAfterWritingMersMacroSampleFramesToMongodbStep;
export type StudyFieldsAfterWritingMersWhoCaseDataToMongodbStep =
  StudyFieldsAfterWritingMersMacroSampleFramesToMongodbStep;
export type CountryFieldsAfterWritingMersWhoCaseDataToMongodbStep =
  CountryFieldsAfterWritingMersMacroSampleFramesToMongodbStep;
export type MacroSampleFrameFieldsAfterWritingMersWhoCaseDataToMongodbStep =
  MacroSampleFrameFieldsAfterWritingMersMacroSampleFramesToMongodbStep;
export type FaoMersEventAfterWritingMersWhoCaseDataToMongodbStep =
  FaoMersEventAfterWritingMersMacroSampleFramesToMongodbStep;
export type YearlyCamelPopulationDataAfterWritingMersWhoCaseDataToMongodbStep =
  YearlyCamelPopulationDataAfterWritingMersMacroSampleFramesToMongodbStep;
export type CountryPopulationDataAfterWritingMersWhoCaseDataToMongodbStep =
  CountryPopulationDataAfterWritingMersMacroSampleFramesToMongodbStep;
export type WhoCaseDataAfterWritingMersWhoCaseDataToMongodbStep =
  WhoCaseDataAfterWritingMersMacroSampleFramesToMongodbStep;

interface WriteMersWhoCaseDataToMongoDbStepInput {
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
  whoCaseData: WhoCaseDataAfterWritingMersMacroSampleFramesToMongodbStep[];
  mongoClient: MongoClient;
}

interface WriteMersWhoCaseDataToMongoDbStepOutput {
  allEstimates: EstimateFieldsAfterWritingMersWhoCaseDataToMongodbStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterWritingMersWhoCaseDataToMongodbStep[];
  allSources: SourceFieldsAfterWritingMersWhoCaseDataToMongodbStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterWritingMersWhoCaseDataToMongodbStep;
  allStudies: StudyFieldsAfterWritingMersWhoCaseDataToMongodbStep[];
  allCountries: CountryFieldsAfterWritingMersWhoCaseDataToMongodbStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterWritingMersWhoCaseDataToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingMersWhoCaseDataToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingMersWhoCaseDataToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingMersWhoCaseDataToMongodbStep[];
  whoCaseData: WhoCaseDataAfterWritingMersWhoCaseDataToMongodbStep[];
  mongoClient: MongoClient;
}

export const writeMersWhoCaseDataToMongoDbStep = async(
  input: WriteMersWhoCaseDataToMongoDbStepInput
): Promise<WriteMersWhoCaseDataToMongoDbStepOutput> => {
  console.log(`Running step: writeMersWhoCaseDataToMongoDbStep. Remaining estimates: ${input.allEstimates.length}.`);

  const databaseName = getEnvironmentVariableOrThrow({ key: 'DATABASE_NAME' });

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: 'mersWhoCaseData',
    data: input.whoCaseData,
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
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  }
}