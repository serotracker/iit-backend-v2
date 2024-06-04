import { MongoClient } from "mongodb";
import {
  ConsolidatedCountryDataAfterTransformingFormatForDatabaseStep,
  EstimateFieldsAfterTransformingFormatForDatabaseStep,
  StructuredCountryPopulationDataAfterTransformingFormatForDatabaseStep,
  StructuredPositiveCaseDataAfterTransformingFormatForDatabaseStep,
  StructuredVaccinationDataAfterTransformingFormatForDatabaseStep,
  StudyFieldsAfterTransformingFormatForDatabaseStep,
} from "./transform-into-format-for-database-step";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";

export type EstimateFieldsAfterWritingCountryDataToMongoDbStep =
  EstimateFieldsAfterTransformingFormatForDatabaseStep;
export type StudyFieldsAfterWritingCountryDataToMongoDbStep =
  StudyFieldsAfterTransformingFormatForDatabaseStep;
export type StructuredVaccinationDataAfterWritingCountryDataToMongoDbStep =
  StructuredVaccinationDataAfterTransformingFormatForDatabaseStep;
export type StructuredPositiveCaseDataAfterWritingCountryDataToMongoDbStep =
  StructuredPositiveCaseDataAfterTransformingFormatForDatabaseStep;
export type StructuredCountryPopulationDataAfterWritingCountryDataToMongoDbStep =
  StructuredCountryPopulationDataAfterTransformingFormatForDatabaseStep;
export type ConsolidatedCountryDataAfterWritingCountryDataToMongoDbStep = 
  ConsolidatedCountryDataAfterTransformingFormatForDatabaseStep;

interface WriteCountryDataToMongoDbStepInput {
  allEstimates: EstimateFieldsAfterTransformingFormatForDatabaseStep[];
  allStudies: StudyFieldsAfterTransformingFormatForDatabaseStep[];
  vaccinationData: StructuredVaccinationDataAfterTransformingFormatForDatabaseStep;
  positiveCaseData: StructuredPositiveCaseDataAfterTransformingFormatForDatabaseStep;
  countryPopulationData: StructuredCountryPopulationDataAfterTransformingFormatForDatabaseStep;
  consolidatedCountryData: ConsolidatedCountryDataAfterTransformingFormatForDatabaseStep[];
  mongoClient: MongoClient;
}

interface WriteCountryDataToMongoDbStepOutput {
  allEstimates: EstimateFieldsAfterWritingCountryDataToMongoDbStep[];
  allStudies: StudyFieldsAfterWritingCountryDataToMongoDbStep[];
  vaccinationData: StructuredVaccinationDataAfterWritingCountryDataToMongoDbStep;
  positiveCaseData: StructuredPositiveCaseDataAfterWritingCountryDataToMongoDbStep;
  countryPopulationData: StructuredCountryPopulationDataAfterWritingCountryDataToMongoDbStep;
  consolidatedCountryData: ConsolidatedCountryDataAfterWritingCountryDataToMongoDbStep[];
  mongoClient: MongoClient;
}

export const writeCountryDataToMongoDbStep = async(
  input: WriteCountryDataToMongoDbStepInput
): Promise<WriteCountryDataToMongoDbStepOutput> => {
  console.log(`Running step: writeCountryDataToMongoDbStep. Remaining estimates: ${input.allEstimates.length}.`);

  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: "sarsCov2CountryData",
    data: input.consolidatedCountryData,
    mongoClient: input.mongoClient,
  });

  return {
    allEstimates: input.allEstimates,
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    consolidatedCountryData: input.consolidatedCountryData,
    mongoClient: input.mongoClient
  };
};
