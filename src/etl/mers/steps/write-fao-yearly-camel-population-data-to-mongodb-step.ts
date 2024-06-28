import { MongoClient } from "mongodb";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";
import {
  CountryPopulationDataAfterWritingFaoMersEventsToMongodbStep,
  EstimateFieldsAfterWritingFaoMersEventsToMongodbStep,
  FaoMersEventAfterWritingFaoMersEventsToMongodbStep,
  YearlyCamelPopulationDataAfterWritingFaoMersEventsToMongodbStep
} from "./write-fao-mers-event-data-to-mongodb-step.js";

export type EstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  EstimateFieldsAfterWritingFaoMersEventsToMongodbStep;
export type FaoMersEventAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  FaoMersEventAfterWritingFaoMersEventsToMongodbStep;
export type YearlyCamelPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  YearlyCamelPopulationDataAfterWritingFaoMersEventsToMongodbStep;
export type CountryPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  CountryPopulationDataAfterWritingFaoMersEventsToMongodbStep;

interface WriteFaoYearlyCamelPopulationDataToMongoDbStepInput {
  allEstimates: EstimateFieldsAfterWritingFaoMersEventsToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingFaoMersEventsToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingFaoMersEventsToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingFaoMersEventsToMongodbStep[];
  mongoClient: MongoClient;
}

interface WriteFaoYearlyCamelPopulationDataToMongoDbStepOutput {
  allEstimates: EstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  mongoClient: MongoClient;
}

export const writeFaoYearlyCamelPopulationDataToMongoDbStep = async(
  input: WriteFaoYearlyCamelPopulationDataToMongoDbStepInput
): Promise<WriteFaoYearlyCamelPopulationDataToMongoDbStepOutput> => {
  console.log(`Running step: writeFaoYearlyCamelPopulationDataToMongoDbStep. Remaining estimates: ${input.allEstimates.length}.`);

  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: "mersFaoYearlyCamelPopulationData",
    data: input.yearlyCamelPopulationByCountryData,
    mongoClient: input.mongoClient,
  });

  return {
    allEstimates: input.allEstimates,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};