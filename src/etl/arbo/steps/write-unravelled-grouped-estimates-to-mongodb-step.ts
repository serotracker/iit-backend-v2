import { MongoClient } from "mongodb";
import {
    AirtableCountryFieldsAfterWritingGroupedEstimatesToMongoDbStep,
  AirtableEstimateFieldsAfterWritingGroupedEstimatesToMongoDbStep,
  AirtableSourceFieldsAfterWritingGroupedEstimatesToMongoDbStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterWritingGroupedEstimatesToMongoDbStep,
  GroupedEstimatesAfterWritingGroupedEstimatesToMongoDbStep,
  UnravelledGroupedEstimatesAfterWritingGroupedEstimatesToMongoDbStep
} from "./write-grouped-estimates-to-mongodb-step.js";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";

export type AirtableEstimateFieldsAfterWritingUnravelledGroupedEstimatesToMongoDbStep =
  AirtableEstimateFieldsAfterWritingGroupedEstimatesToMongoDbStep;
export type AirtableSourceFieldsAfterWritingUnravelledGroupedEstimatesToMongoDbStep =
  AirtableSourceFieldsAfterWritingGroupedEstimatesToMongoDbStep;
export type AirtableCountryFieldsAfterWritingUnravelledGroupedEstimatesToMongoDbStep =
  AirtableCountryFieldsAfterWritingGroupedEstimatesToMongoDbStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterWritingUnravelledGroupedEstimatesToMongoDbStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterWritingGroupedEstimatesToMongoDbStep;
export type GroupedEstimatesAfterWritingUnravelledGroupedEstimatesToMongoDbStep =
  GroupedEstimatesAfterWritingGroupedEstimatesToMongoDbStep;
export type UnravelledGroupedEstimatesAfterWritingUnravelledGroupedEstimatesToMongoDbStep =
  UnravelledGroupedEstimatesAfterWritingGroupedEstimatesToMongoDbStep;

interface WriteUnravelledGroupedEstimatesToMongoDbStepInput {
  allEstimates: AirtableEstimateFieldsAfterWritingGroupedEstimatesToMongoDbStep[];
  allSources: AirtableSourceFieldsAfterWritingGroupedEstimatesToMongoDbStep[];
  allCountries: AirtableCountryFieldsAfterWritingGroupedEstimatesToMongoDbStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterWritingGroupedEstimatesToMongoDbStep[];
  groupedEstimates: GroupedEstimatesAfterWritingGroupedEstimatesToMongoDbStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterWritingGroupedEstimatesToMongoDbStep[];
  mongoClient: MongoClient;
}

interface WriteUnravelledGroupedEstimatesToMongoDbStepOutput {
  allEstimates: AirtableEstimateFieldsAfterWritingUnravelledGroupedEstimatesToMongoDbStep[];
  allSources: AirtableSourceFieldsAfterWritingUnravelledGroupedEstimatesToMongoDbStep[];
  allCountries: AirtableCountryFieldsAfterWritingUnravelledGroupedEstimatesToMongoDbStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterWritingUnravelledGroupedEstimatesToMongoDbStep[];
  groupedEstimates: GroupedEstimatesAfterWritingUnravelledGroupedEstimatesToMongoDbStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterWritingUnravelledGroupedEstimatesToMongoDbStep[];
  mongoClient: MongoClient;
}

export const writeUnravelledGroupedEstimatesToMongoDbStepOutput = async(
  input: WriteUnravelledGroupedEstimatesToMongoDbStepInput
): Promise<WriteUnravelledGroupedEstimatesToMongoDbStepOutput> => {
  console.log(`Running step: writeUnravelledGroupedEstimatesToMongoDbStepOutput. Remaining estimates: ${input.allEstimates.length}`);

  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: "unravelledGroupedArbovirusEstimates",
    data: input.unravelledGroupedEstimates,
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