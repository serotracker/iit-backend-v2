import { MongoClient } from "mongodb";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";
import { EstimateFieldsAfterTransformingFormatForDatabaseStep } from "./transform-into-format-for-database-step";

type EstimateFieldsAfterWritingEstimateToMongodbStep =
  EstimateFieldsAfterTransformingFormatForDatabaseStep;

interface WriteEstimateDataToMongoDbStepInput {
  allEstimates: EstimateFieldsAfterTransformingFormatForDatabaseStep[];
  mongoClient: MongoClient;
}

interface WriteEstimateDataToMongoDbStepOutput {
  allEstimates: EstimateFieldsAfterWritingEstimateToMongodbStep[];
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
    mongoClient: input.mongoClient
  };
};