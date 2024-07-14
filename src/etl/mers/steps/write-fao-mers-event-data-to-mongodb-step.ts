import { MongoClient } from "mongodb";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";
import {
  CountryPopulationDataAfterWritingEstimateToMongodbStep,
  EstimateFieldsAfterWritingEstimateToMongodbStep,
  FaoMersEventAfterWritingEstimateToMongodbStep,
  SourceFieldsAfterWritingEstimateToMongodbStep,
  YearlyCamelPopulationDataAfterWritingEstimateToMongodbStep
} from "./write-estimate-data-to-mongodb-step.js";

export type EstimateFieldsAfterWritingFaoMersEventsToMongodbStep =
  EstimateFieldsAfterWritingEstimateToMongodbStep;
export type SourceFieldsAfterWritingFaoMersEventsToMongodbStep =
  SourceFieldsAfterWritingEstimateToMongodbStep;
export type FaoMersEventAfterWritingFaoMersEventsToMongodbStep =
  FaoMersEventAfterWritingEstimateToMongodbStep;
export type YearlyCamelPopulationDataAfterWritingFaoMersEventsToMongodbStep =
  YearlyCamelPopulationDataAfterWritingEstimateToMongodbStep;
export type CountryPopulationDataAfterWritingFaoMersEventsToMongodbStep =
  CountryPopulationDataAfterWritingEstimateToMongodbStep;

interface WriteFaoMersEventDataToMongoDbStepInput {
  allEstimates: EstimateFieldsAfterWritingEstimateToMongodbStep[];
  allSources: SourceFieldsAfterWritingEstimateToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingEstimateToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingEstimateToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingEstimateToMongodbStep[];
  mongoClient: MongoClient;
}

interface WriteFaoMersEventDataToMongoDbStepOutput {
  allEstimates: EstimateFieldsAfterWritingFaoMersEventsToMongodbStep[];
  allSources: SourceFieldsAfterWritingFaoMersEventsToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingFaoMersEventsToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingFaoMersEventsToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingFaoMersEventsToMongodbStep[];
  mongoClient: MongoClient;
}

export const writeFaoMersEventDataToMongoDbStep = async(
  input: WriteFaoMersEventDataToMongoDbStepInput
): Promise<WriteFaoMersEventDataToMongoDbStepOutput> => {
  console.log(`Running step: writeFaoMersEventDataToMongoDbStep. Remaining estimates: ${input.allEstimates.length}.`);

  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: "mersFaoEventData",
    data: input.allFaoMersEvents,
    mongoClient: input.mongoClient,
  });

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};