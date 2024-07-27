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
import {
  CountryFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep,
  CountryPopulationDataAfterWritingMersEstimateFilterOptionsToMongodbStep,
  EstimateFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep,
  EstimateFilterOptionsAfterWritingMersEstimateFilterOptionsToMongodbStep,
  FaoMersEventAfterWritingMersEstimateFilterOptionsToMongodbStep,
  GroupedEstimateFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep,
  SourceFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep,
  StudyFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep,
  YearlyCamelPopulationDataAfterWritingMersEstimateFilterOptionsToMongodbStep
} from "./write-mers-estimate-filter-options-to-mongodb-step";

export type EstimateFieldsAfterAddingDatabaseIndexesStep =
  EstimateFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep;
export type GroupedEstimateFieldsAfterAddingDatabaseIndexesStep =
  GroupedEstimateFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep;
export type SourceFieldsAfterAddingDatabaseIndexesStep =
  SourceFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep;
export type EstimateFilterOptionsAfterAddingDatabaseIndexesStep =
  EstimateFilterOptionsAfterWritingMersEstimateFilterOptionsToMongodbStep;
export type StudyFieldsAfterAddingDatabaseIndexesStep =
  StudyFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep;
export type CountryFieldsAfterAddingDatabaseIndexesStep =
  CountryFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep;
export type FaoMersEventAfterAddingDatabaseIndexesStep =
  FaoMersEventAfterWritingMersEstimateFilterOptionsToMongodbStep;
export type YearlyCamelPopulationDataAfterAddingDatabaseIndexesStep =
  YearlyCamelPopulationDataAfterWritingMersEstimateFilterOptionsToMongodbStep;
export type CountryPopulationDataAfterAddingDatabaseIndexesStep =
  CountryPopulationDataAfterWritingMersEstimateFilterOptionsToMongodbStep;

interface AddDatabaseIndexesStepInput {
  allEstimates: EstimateFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  allSources: SourceFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterWritingMersEstimateFilterOptionsToMongodbStep;
  allStudies: StudyFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  allCountries: CountryFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingMersEstimateFilterOptionsToMongodbStep[];
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