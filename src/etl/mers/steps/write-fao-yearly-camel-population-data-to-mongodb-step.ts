import { MongoClient } from "mongodb";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";
import {
  CountryFieldsAfterWritingFaoMersEventsToMongodbStep,
  CountryPopulationDataAfterWritingFaoMersEventsToMongodbStep,
  EstimateFieldsAfterWritingFaoMersEventsToMongodbStep,
  EstimateFilterOptionsAfterWritingFaoMersEventsToMongodbStep,
  FaoMersEventAfterWritingFaoMersEventsToMongodbStep,
  GroupedEstimateFieldsAfterWritingFaoMersEventsToMongodbStep,
  SourceFieldsAfterWritingFaoMersEventsToMongodbStep,
  StudyFieldsAfterWritingFaoMersEventsToMongodbStep,
  YearlyCamelPopulationDataAfterWritingFaoMersEventsToMongodbStep
} from "./write-fao-mers-event-data-to-mongodb-step.js";

export type EstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  EstimateFieldsAfterWritingFaoMersEventsToMongodbStep;
export type GroupedEstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  GroupedEstimateFieldsAfterWritingFaoMersEventsToMongodbStep;
export type SourceFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  SourceFieldsAfterWritingFaoMersEventsToMongodbStep;
export type EstimateFilterOptionsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  EstimateFilterOptionsAfterWritingFaoMersEventsToMongodbStep;
export type StudyFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  StudyFieldsAfterWritingFaoMersEventsToMongodbStep;
export type CountryFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  CountryFieldsAfterWritingFaoMersEventsToMongodbStep;
export type FaoMersEventAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  FaoMersEventAfterWritingFaoMersEventsToMongodbStep;
export type YearlyCamelPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  YearlyCamelPopulationDataAfterWritingFaoMersEventsToMongodbStep;
export type CountryPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  CountryPopulationDataAfterWritingFaoMersEventsToMongodbStep;

interface WriteFaoYearlyCamelPopulationDataToMongoDbStepInput {
  allEstimates: EstimateFieldsAfterWritingFaoMersEventsToMongodbStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterWritingFaoMersEventsToMongodbStep[];
  allSources: SourceFieldsAfterWritingFaoMersEventsToMongodbStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterWritingFaoMersEventsToMongodbStep;
  allStudies: StudyFieldsAfterWritingFaoMersEventsToMongodbStep[];
  allCountries: CountryFieldsAfterWritingFaoMersEventsToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingFaoMersEventsToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingFaoMersEventsToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingFaoMersEventsToMongodbStep[];
  mongoClient: MongoClient;
}

interface WriteFaoYearlyCamelPopulationDataToMongoDbStepOutput {
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

export const writeFaoYearlyCamelPopulationDataToMongoDbStep = async(
  input: WriteFaoYearlyCamelPopulationDataToMongoDbStepInput
): Promise<WriteFaoYearlyCamelPopulationDataToMongoDbStepOutput> => {
  console.log(`Running step: writeFaoYearlyCamelPopulationDataToMongoDbStep. Remaining estimates: ${input.allEstimates.length}.`);

  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: "mersFaoYearlyCamelPopulationData",
    data: input.yearlyCamelPopulationByCountryData,
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