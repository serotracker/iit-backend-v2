import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterTransformingIntoFormatForDatabaseStep,
  AirtableEstimateFieldsAfterTransformingIntoFormatForDatabaseStep,
  AirtableSourceFieldsAfterTransformingIntoFormatForDatabaseStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterTransformingIntoFormatForDatabaseStep,
  GroupedEstimatesAfterTransformingIntoFormatForDatabaseStep,
  UnravelledGroupedEstimatesAfterTransformingIntoFormatForDatabaseStep
} from "./transform-into-format-for-database-step";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";

export type AirtableEstimateFieldsAfterWritingEstimatesToMongoDbStep =
  AirtableEstimateFieldsAfterTransformingIntoFormatForDatabaseStep;
export type AirtableSourceFieldsAfterWritingEstimatesToMongoDbStep =
  AirtableSourceFieldsAfterTransformingIntoFormatForDatabaseStep;
export type AirtableCountryFieldsAfterWritingEstimatesToMongoDbStep =
  AirtableCountryFieldsAfterTransformingIntoFormatForDatabaseStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterWritingEstimatesToMongoDbStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterTransformingIntoFormatForDatabaseStep;
export type GroupedEstimatesAfterWritingEstimatesToMongoDbStep =
  GroupedEstimatesAfterTransformingIntoFormatForDatabaseStep;
export type UnravelledGroupedEstimatesAfterWritingEstimatesToMongoDbStep =
  UnravelledGroupedEstimatesAfterTransformingIntoFormatForDatabaseStep;

interface WriteEstimatesToMongoDbStepInput {
  allEstimates: AirtableEstimateFieldsAfterTransformingIntoFormatForDatabaseStep[];
  allSources: AirtableSourceFieldsAfterTransformingIntoFormatForDatabaseStep[];
  allCountries: AirtableCountryFieldsAfterTransformingIntoFormatForDatabaseStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterTransformingIntoFormatForDatabaseStep[];
  groupedEstimates: GroupedEstimatesAfterTransformingIntoFormatForDatabaseStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterTransformingIntoFormatForDatabaseStep[];
  mongoClient: MongoClient;
}

interface WriteEstimatesToMongoDbStepOutput {
  allEstimates: AirtableEstimateFieldsAfterWritingEstimatesToMongoDbStep[];
  allSources: AirtableSourceFieldsAfterWritingEstimatesToMongoDbStep[];
  allCountries: AirtableCountryFieldsAfterWritingEstimatesToMongoDbStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterWritingEstimatesToMongoDbStep[];
  groupedEstimates: GroupedEstimatesAfterWritingEstimatesToMongoDbStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterWritingEstimatesToMongoDbStep[];
  mongoClient: MongoClient;
}

export const writeEstimatesToMongoDbStep = async(
  input: WriteEstimatesToMongoDbStepInput
): Promise<WriteEstimatesToMongoDbStepOutput> => {
  console.log(`Running step: writeEstimatesToMongoDbStep. Remaining estimates: ${input.allEstimates.length}`);

  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: "arbovirusEstimates",
    data: input.allEstimates,
    mongoClient: input.mongoClient
  });

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allCountries: input.allCountries,
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry,
    groupedEstimates: input.groupedEstimates,
    unravelledGroupedEstimates: input.unravelledGroupedEstimates,
    mongoClient: input.mongoClient
  }
}