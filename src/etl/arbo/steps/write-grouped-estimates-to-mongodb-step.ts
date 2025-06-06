import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep,
  AirtableEstimateFieldsAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep,
  AirtableSourceFieldsAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep,
  GroupedEstimatesAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep,
  UnravelledGroupedEstimatesAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep
} from "./write-enviromental-suitability-stats-by-country-to-mongodb-step";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";

export type AirtableEstimateFieldsAfterWritingGroupedEstimatesToMongoDbStep =
  AirtableEstimateFieldsAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep;
export type AirtableSourceFieldsAfterWritingGroupedEstimatesToMongoDbStep =
  AirtableSourceFieldsAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep;
export type AirtableCountryFieldsAfterWritingGroupedEstimatesToMongoDbStep =
  AirtableCountryFieldsAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterWritingGroupedEstimatesToMongoDbStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep;
export type GroupedEstimatesAfterWritingGroupedEstimatesToMongoDbStep =
  GroupedEstimatesAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep;
export type UnravelledGroupedEstimatesAfterWritingGroupedEstimatesToMongoDbStep =
  UnravelledGroupedEstimatesAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep;

interface WriteGroupedEstimatesToMongoDbStepInput {
  allEstimates: AirtableEstimateFieldsAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep[];
  allSources: AirtableSourceFieldsAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep[];
  allCountries: AirtableCountryFieldsAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep[];
  groupedEstimates: GroupedEstimatesAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep[];
  mongoClient: MongoClient;
}

interface WriteGroupedEstimatesToMongoDbStepOutput {
  allEstimates: AirtableEstimateFieldsAfterWritingGroupedEstimatesToMongoDbStep[];
  allSources: AirtableSourceFieldsAfterWritingGroupedEstimatesToMongoDbStep[];
  allCountries: AirtableCountryFieldsAfterWritingGroupedEstimatesToMongoDbStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterWritingGroupedEstimatesToMongoDbStep[];
  groupedEstimates: GroupedEstimatesAfterWritingGroupedEstimatesToMongoDbStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterWritingGroupedEstimatesToMongoDbStep[];
  mongoClient: MongoClient;
}

export const writeGroupedEstimatesToMongoDbStep = async(
  input: WriteGroupedEstimatesToMongoDbStepInput
): Promise<WriteGroupedEstimatesToMongoDbStepOutput> => {
  console.log(`Running step: writeGroupedEstimatesToMongoDbStep. Remaining estimates: ${input.allEstimates.length}`);

  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: "groupedArbovirusEstimates",
    data: input.groupedEstimates,
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