import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  CountryPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  EstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  EstimateFilterOptionsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  FaoMersEventAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  GroupedEstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  SourceFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  StudyFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  YearlyCamelPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep
} from "./write-fao-yearly-camel-population-data-to-mongodb-step";
import { getEnvironmentVariableOrThrow } from "../../helpers.js";

export type EstimateFieldsAfterAddingDatabaseIndexesStep =
  EstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type GroupedEstimateFieldsAfterAddingDatabaseIndexesStep =
  GroupedEstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type SourceFieldsAfterAddingDatabaseIndexesStep =
  SourceFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type EstimateFilterOptionsAfterAddingDatabaseIndexesStep =
  EstimateFilterOptionsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type StudyFieldsAfterAddingDatabaseIndexesStep =
  StudyFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type CountryFieldsAfterAddingDatabaseIndexesStep =
  CountryFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type FaoMersEventAfterAddingDatabaseIndexesStep =
  FaoMersEventAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type YearlyCamelPopulationDataAfterAddingDatabaseIndexesStep =
  YearlyCamelPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type CountryPopulationDataAfterAddingDatabaseIndexesStep =
  CountryPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;

interface AddDatabaseIndexesStepInput {
  allEstimates: EstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  allSources: SourceFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
  allStudies: StudyFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  allCountries: CountryFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  mongoClient: MongoClient;
}

interface AddDatabaseIndexesStepOutput {
  allEstimates: EstimateFieldsAfterAddingDatabaseIndexesStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterAddingDatabaseIndexesStep[];
  allSources: SourceFieldsAfterAddingDatabaseIndexesStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterAddingDatabaseIndexesStep;
  allStudies: StudyFieldsAfterAddingDatabaseIndexesStep[];
  allCountries: CountryFieldsAfterAddingDatabaseIndexesStep[];
  allFaoMersEvents: FaoMersEventAfterAddingDatabaseIndexesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterAddingDatabaseIndexesStep[];
  countryPopulationData: CountryPopulationDataAfterAddingDatabaseIndexesStep[];
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
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  }
}