import { MongoClient } from "mongodb";
import { getEnvironmentVariableOrThrow } from "../../helpers.js";
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

export type EstimateFieldsAfterAddingDatabaseIndexesStep =
  EstimateFieldsAfterWritingMersMacroSampleFramesToMongodbStep;
export type GroupedEstimateFieldsAfterAddingDatabaseIndexesStep =
  GroupedEstimateFieldsAfterWritingMersMacroSampleFramesToMongodbStep;
export type SourceFieldsAfterAddingDatabaseIndexesStep =
  SourceFieldsAfterWritingMersMacroSampleFramesToMongodbStep;
export type EstimateFilterOptionsAfterAddingDatabaseIndexesStep =
  EstimateFilterOptionsAfterWritingMersMacroSampleFramesToMongodbStep;
export type StudyFieldsAfterAddingDatabaseIndexesStep =
  StudyFieldsAfterWritingMersMacroSampleFramesToMongodbStep;
export type CountryFieldsAfterAddingDatabaseIndexesStep =
  CountryFieldsAfterWritingMersMacroSampleFramesToMongodbStep;
export type MacroSampleFrameFieldsAfterAddingDatabaseIndexesStep =
  MacroSampleFrameFieldsAfterWritingMersMacroSampleFramesToMongodbStep;
export type FaoMersEventAfterAddingDatabaseIndexesStep =
  FaoMersEventAfterWritingMersMacroSampleFramesToMongodbStep;
export type YearlyCamelPopulationDataAfterAddingDatabaseIndexesStep =
  YearlyCamelPopulationDataAfterWritingMersMacroSampleFramesToMongodbStep;
export type CountryPopulationDataAfterAddingDatabaseIndexesStep =
  CountryPopulationDataAfterWritingMersMacroSampleFramesToMongodbStep;
export type WhoCaseDataAfterAddingDatabaseIndexesStep =
  WhoCaseDataAfterWritingMersMacroSampleFramesToMongodbStep;

interface AddDatabaseIndexesStepInput {
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

interface AddDatabaseIndexesStepOutput {
  allEstimates: EstimateFieldsAfterAddingDatabaseIndexesStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterAddingDatabaseIndexesStep[];
  allSources: SourceFieldsAfterAddingDatabaseIndexesStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterAddingDatabaseIndexesStep;
  allStudies: StudyFieldsAfterAddingDatabaseIndexesStep[];
  allCountries: CountryFieldsAfterAddingDatabaseIndexesStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterAddingDatabaseIndexesStep[];
  allFaoMersEvents: FaoMersEventAfterAddingDatabaseIndexesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterAddingDatabaseIndexesStep[];
  countryPopulationData: CountryPopulationDataAfterAddingDatabaseIndexesStep[];
  whoCaseData: WhoCaseDataAfterAddingDatabaseIndexesStep[];
  mongoClient: MongoClient;
}

export const addDatabaseIndexesStep = async(
  input: AddDatabaseIndexesStepInput
): Promise<AddDatabaseIndexesStepOutput> => {
  console.log(`Running step: addDatabaseIndexesStep. Remaining estimates: ${input.allEstimates.length}.`);

  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  await input.mongoClient.db(databaseName).collection('mersEstimates').dropIndexes()
  await input.mongoClient.db(databaseName).collection('mersFaoEventData').dropIndexes()
  await input.mongoClient.db(databaseName).collection('mersFaoYearlyCamelPopulationData').dropIndexes()

  await input.mongoClient.db(databaseName).collection('mersFaoEventData').createIndex({ partitionKey: 1 })
  await input.mongoClient.db(databaseName).collection('mersFaoYearlyCamelPopulationData').createIndex({ partitionKey: 1 })

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