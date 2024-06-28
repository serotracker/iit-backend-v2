import { MongoClient } from "mongodb";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";
import { CountryPopulationDataAfterTransformingFormatForDatabaseStep, EstimateFieldsAfterTransformingFormatForDatabaseStep, FaoMersEventAfterTransformingFormatForDatabaseStep, YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep } from "./transform-into-format-for-database-step";

export type EstimateFieldsAfterWritingEstimateToMongodbStep =
  EstimateFieldsAfterTransformingFormatForDatabaseStep;
export type FaoMersEventAfterWritingEstimateToMongodbStep =
  FaoMersEventAfterTransformingFormatForDatabaseStep;
export type YearlyCamelPopulationDataAfterWritingEstimateToMongodbStep =
  YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep;
export type CountryPopulationDataAfterWritingEstimateToMongodbStep =
  CountryPopulationDataAfterTransformingFormatForDatabaseStep;

interface WriteEstimateDataToMongoDbStepInput {
  allEstimates: EstimateFieldsAfterTransformingFormatForDatabaseStep[];
  allFaoMersEvents: FaoMersEventAfterTransformingFormatForDatabaseStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep[];
  countryPopulationData: CountryPopulationDataAfterTransformingFormatForDatabaseStep[];
  mongoClient: MongoClient;
}

interface WriteEstimateDataToMongoDbStepOutput {
  allEstimates: EstimateFieldsAfterWritingEstimateToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingEstimateToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingEstimateToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingEstimateToMongodbStep[];
  mongoClient: MongoClient;
}

export const writeEstimateDataToMongoDbStep = async(
  input: WriteEstimateDataToMongoDbStepInput
): Promise<WriteEstimateDataToMongoDbStepOutput> => {
  console.log(`Running step: writeEstimateDataToMongoDbStep. Remaining estimates: ${input.allEstimates.length}.`);

  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: "mersEstimates",
    data: input.allEstimates,
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