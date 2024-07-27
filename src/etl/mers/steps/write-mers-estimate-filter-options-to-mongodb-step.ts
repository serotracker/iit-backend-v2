import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  CountryPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  EstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  EstimateFilterOptionsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  FaoMersEventAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  GroupedEstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  SourceFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  StudyFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep,
  YearlyCamelPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep
} from "./write-fao-yearly-camel-population-data-to-mongodb-step";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";

export type EstimateFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep =
  EstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type GroupedEstimateFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep =
  GroupedEstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type SourceFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep =
  SourceFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type EstimateFilterOptionsAfterWritingMersEstimateFilterOptionsToMongodbStep =
  EstimateFilterOptionsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type StudyFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep =
  StudyFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type CountryFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep =
  CountryFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type FaoMersEventAfterWritingMersEstimateFilterOptionsToMongodbStep =
  FaoMersEventAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type YearlyCamelPopulationDataAfterWritingMersEstimateFilterOptionsToMongodbStep =
  YearlyCamelPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
export type CountryPopulationDataAfterWritingMersEstimateFilterOptionsToMongodbStep =
  CountryPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;

interface WriteMersEstimateFilterOptionsToMongoDbStepInput {
  allEstimates: EstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  allSources: SourceFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
  allStudies: StudyFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  allCountries: CountryFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  mongoClient: MongoClient;
}

interface WriteMersEstimateFilterOptionsToMongoDbStepOutput {
  allEstimates: EstimateFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  allSources: SourceFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterWritingMersEstimateFilterOptionsToMongodbStep;
  allStudies: StudyFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  allCountries: CountryFieldsAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingMersEstimateFilterOptionsToMongodbStep[];
  mongoClient: MongoClient;
}

export const writeMersEstimateFilterOptionsToMongoDbStep = async(
  input: WriteMersEstimateFilterOptionsToMongoDbStepInput
): Promise<WriteMersEstimateFilterOptionsToMongoDbStepOutput> => {
  console.log(`Running step: writeMersEstimateFilterOptionsToMongoDbStep. Remaining estimates: ${input.allEstimates.length}.`);

  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: "mersEstimateFilterOptions",
    data: [ input.estimateFilterOptions ],
    mongoClient: input.mongoClient,
  });

  return {
    allEstimates: input.allEstimates,
    allGroupedEstimates: input.allGroupedEstimates,
    allSources: input.allSources,
    estimateFilterOptions: input.estimateFilterOptions,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};