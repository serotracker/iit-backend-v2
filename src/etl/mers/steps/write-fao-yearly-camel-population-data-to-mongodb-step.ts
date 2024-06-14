import { MongoClient } from "mongodb";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";
import {
  EstimateFieldsAfterWritingFaoMersEventsToMongodbStep,
  FaoMersEventAfterWritingFaoMersEventsToMongodbStep,
  YearlyCamelPopulationDataAfterWritingFaoMersEventsToMongodbStep
} from "./write-fao-mers-event-data-to-mongodb-step.js";

type EstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  EstimateFieldsAfterWritingFaoMersEventsToMongodbStep;
type FaoMersEventAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  FaoMersEventAfterWritingFaoMersEventsToMongodbStep;
type YearlyCamelPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  YearlyCamelPopulationDataAfterWritingFaoMersEventsToMongodbStep;

interface WriteFaoYearlyCamelPopulationDataToMongoDbStepInput {
  allEstimates: EstimateFieldsAfterWritingFaoMersEventsToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingFaoMersEventsToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingFaoMersEventsToMongodbStep[];
  mongoClient: MongoClient;
}

interface WriteFaoYearlyCamelPopulationDataToMongoDbStepOutput {
  allEstimates: EstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
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
    mongoClient: input.mongoClient
  };
};