import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterWritingEstimatesToMongoDbStep,
  AirtableEstimateFieldsAfterWritingEstimatesToMongoDbStep,
  AirtableSourceFieldsAfterWritingEstimatesToMongoDbStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterWritingEstimatesToMongoDbStep
} from "./write-estimates-to-mongodb-step";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";

export type AirtableEstimateFieldsAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep =
  AirtableEstimateFieldsAfterWritingEstimatesToMongoDbStep;
export type AirtableSourceFieldsAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep =
  AirtableSourceFieldsAfterWritingEstimatesToMongoDbStep;
export type AirtableCountryFieldsAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep =
  AirtableCountryFieldsAfterWritingEstimatesToMongoDbStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterWritingEstimatesToMongoDbStep;

interface WriteEnvironmentalSuitabilityStatsByCountryToMongoDbStepInput {
  allEstimates: AirtableEstimateFieldsAfterWritingEstimatesToMongoDbStep[];
  allSources: AirtableSourceFieldsAfterWritingEstimatesToMongoDbStep[];
  allCountries: AirtableCountryFieldsAfterWritingEstimatesToMongoDbStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterWritingEstimatesToMongoDbStep[];
  mongoClient: MongoClient;
}

interface WriteEnvironmentalSuitabilityStatsByCountryToMongoDbStepOutput {
  allEstimates: AirtableEstimateFieldsAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep[];
  allSources: AirtableSourceFieldsAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep[];
  allCountries: AirtableCountryFieldsAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterWritingEnvironmentalSuitabilityStatsByCountryToMongoDbStep[];
  mongoClient: MongoClient;
}

export const writeEnvironmentalSuitabilityStatsByCountryToMongoDbStep = async(
  input: WriteEnvironmentalSuitabilityStatsByCountryToMongoDbStepInput
): Promise<WriteEnvironmentalSuitabilityStatsByCountryToMongoDbStepOutput> => {
  console.log(`Running step: writeEnvironmentalSuitabilityStatsByCountryToMongoDbStep. Remaining estimates: ${input.allEstimates.length}`);

  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: "arbovirusEnviromentalSuitabilityStats",
    data: input.environmentalSuitabilityStatsByCountry,
    mongoClient: input.mongoClient
  });

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allCountries: input.allCountries,
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry,
    mongoClient: input.mongoClient
  }
}