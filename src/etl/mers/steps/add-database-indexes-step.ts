import { MongoClient } from "mongodb";
import {
  CountryPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  EstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  FaoMersEventAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  YearlyCamelPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep
} from "./write-fao-yearly-camel-population-data-to-mongodb-step";
import { getEnvironmentVariableOrThrow } from "../../helpers";

export type EstimateFieldsAfterAddingDatabaseIndexesStep =
  EstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type FaoMersEventAfterAddingDatabaseIndexesStep =
  FaoMersEventAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type YearlyCamelPopulationDataAfterAddingDatabaseIndexesStep =
  YearlyCamelPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type CountryPopulationDataAfterAddingDatabaseIndexesStep =
  CountryPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;

interface AddDatabaseIndexesStepInput {
  allEstimates: EstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  mongoClient: MongoClient;
}

interface AddDatabaseIndexesStepOutput {
  allEstimates: EstimateFieldsAfterAddingDatabaseIndexesStep[];
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

  input.mongoClient.db(databaseName).collection('mersEstimates').dropIndexes()
  input.mongoClient.db(databaseName).collection('mersFaoEventData').dropIndexes()
  input.mongoClient.db(databaseName).collection('mersFaoYearlyCamelPopulationData').dropIndexes()

  input.mongoClient.db(databaseName).collection('mersFaoEventData').createIndex({ partitionKey: 1 })
  input.mongoClient.db(databaseName).collection('mersFaoYearlyCamelPopulationData').createIndex({ partitionKey: 1 })

  return {
    allEstimates: input.allEstimates,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  }
}