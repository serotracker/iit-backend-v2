import { MongoClient } from "mongodb";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";
import { EstimateFieldsAfterTransformingFormatForDatabaseStep, FaoMersEventAfterTransformingFormatForDatabaseStep } from "./transform-into-format-for-database-step";

export type EstimateFieldsAfterWritingEstimateToMongodbStep =
  EstimateFieldsAfterTransformingFormatForDatabaseStep;
export type FaoMersEventAfterWritingEstimateToMongodbStep =
  FaoMersEventAfterTransformingFormatForDatabaseStep;

interface WriteEstimateDataToMongoDbStepInput {
  allEstimates: EstimateFieldsAfterTransformingFormatForDatabaseStep[];
  allFaoMersEvents: FaoMersEventAfterTransformingFormatForDatabaseStep[];
  mongoClient: MongoClient;
}

interface WriteEstimateDataToMongoDbStepOutput {
  allEstimates: EstimateFieldsAfterWritingEstimateToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingEstimateToMongodbStep[];
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
    mongoClient: input.mongoClient
  };
};