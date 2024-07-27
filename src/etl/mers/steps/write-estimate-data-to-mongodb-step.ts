import { MongoClient } from "mongodb";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";
import { CountryFieldsAfterTransformingFormatForDatabaseStep, CountryPopulationDataAfterTransformingFormatForDatabaseStep, EstimateFieldsAfterTransformingFormatForDatabaseStep, FaoMersEventAfterTransformingFormatForDatabaseStep, GroupedEstimateFieldsAfterTransformingFormatForDatabaseStep, SourceFieldsAfterTransformingFormatForDatabaseStep, StudyFieldsAfterTransformingFormatForDatabaseStep, YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep } from "./transform-into-format-for-database-step";

export type EstimateFieldsAfterWritingEstimateToMongodbStep =
  EstimateFieldsAfterTransformingFormatForDatabaseStep;
export type GroupedEstimateFieldsAfterWritingEstimateToMongodbStep =
  GroupedEstimateFieldsAfterTransformingFormatForDatabaseStep;
export type SourceFieldsAfterWritingEstimateToMongodbStep =
  SourceFieldsAfterTransformingFormatForDatabaseStep;
export type StudyFieldsAfterWritingEstimateToMongodbStep =
  StudyFieldsAfterTransformingFormatForDatabaseStep;
export type CountryFieldsAfterWritingEstimateToMongodbStep =
  CountryFieldsAfterTransformingFormatForDatabaseStep;
export type FaoMersEventAfterWritingEstimateToMongodbStep =
  FaoMersEventAfterTransformingFormatForDatabaseStep;
export type YearlyCamelPopulationDataAfterWritingEstimateToMongodbStep =
  YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep;
export type CountryPopulationDataAfterWritingEstimateToMongodbStep =
  CountryPopulationDataAfterTransformingFormatForDatabaseStep;

interface WriteEstimateDataToMongoDbStepInput {
  allEstimates: EstimateFieldsAfterTransformingFormatForDatabaseStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterTransformingFormatForDatabaseStep[];
  allSources: SourceFieldsAfterTransformingFormatForDatabaseStep[];
  allStudies: StudyFieldsAfterTransformingFormatForDatabaseStep[];
  allCountries: CountryFieldsAfterTransformingFormatForDatabaseStep[];
  allFaoMersEvents: FaoMersEventAfterTransformingFormatForDatabaseStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep[];
  countryPopulationData: CountryPopulationDataAfterTransformingFormatForDatabaseStep[];
  mongoClient: MongoClient;
}

interface WriteEstimateDataToMongoDbStepOutput {
  allEstimates: EstimateFieldsAfterWritingEstimateToMongodbStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterWritingEstimateToMongodbStep[];
  allSources: SourceFieldsAfterWritingEstimateToMongodbStep[];
  allStudies: StudyFieldsAfterWritingEstimateToMongodbStep[];
  allCountries: CountryFieldsAfterWritingEstimateToMongodbStep[];
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
    allGroupedEstimates: input.allGroupedEstimates,
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};