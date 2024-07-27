import { MongoClient } from "mongodb";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";
import {
  CountryFieldsAfterWritingGroupedEstimateDataToMongodbStep,
  CountryPopulationDataAfterWritingGroupedEstimateDataToMongodbStep,
  EstimateFieldsAfterWritingGroupedEstimateDataToMongodbStep,
  EstimateFilterOptionsAfterWritingGroupedEstimateDataToMongodbStep,
  FaoMersEventAfterWritingGroupedEstimateDataToMongodbStep,
  GroupedEstimateFieldsAfterWritingGroupedEstimateDataToMongodbStep,
  SourceFieldsAfterWritingGroupedEstimateDataToMongodbStep,
  StudyFieldsAfterWritingGroupedEstimateDataToMongodbStep,
  YearlyCamelPopulationDataAfterWritingGroupedEstimateDataToMongodbStep
} from "./write-grouped-estimate-data-to-mongodb-step.js";

export type EstimateFieldsAfterWritingFaoMersEventsToMongodbStep =
  EstimateFieldsAfterWritingGroupedEstimateDataToMongodbStep;
export type GroupedEstimateFieldsAfterWritingFaoMersEventsToMongodbStep =
  GroupedEstimateFieldsAfterWritingGroupedEstimateDataToMongodbStep;
export type SourceFieldsAfterWritingFaoMersEventsToMongodbStep =
  SourceFieldsAfterWritingGroupedEstimateDataToMongodbStep;
export type EstimateFilterOptionsAfterWritingFaoMersEventsToMongodbStep =
  EstimateFilterOptionsAfterWritingGroupedEstimateDataToMongodbStep;
export type StudyFieldsAfterWritingFaoMersEventsToMongodbStep =
  StudyFieldsAfterWritingGroupedEstimateDataToMongodbStep;
export type CountryFieldsAfterWritingFaoMersEventsToMongodbStep =
  CountryFieldsAfterWritingGroupedEstimateDataToMongodbStep;
export type FaoMersEventAfterWritingFaoMersEventsToMongodbStep =
  FaoMersEventAfterWritingGroupedEstimateDataToMongodbStep;
export type YearlyCamelPopulationDataAfterWritingFaoMersEventsToMongodbStep =
  YearlyCamelPopulationDataAfterWritingGroupedEstimateDataToMongodbStep;
export type CountryPopulationDataAfterWritingFaoMersEventsToMongodbStep =
  CountryPopulationDataAfterWritingGroupedEstimateDataToMongodbStep;

interface WriteFaoMersEventDataToMongoDbStepInput {
  allEstimates: EstimateFieldsAfterWritingGroupedEstimateDataToMongodbStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterWritingGroupedEstimateDataToMongodbStep[];
  allSources: SourceFieldsAfterWritingGroupedEstimateDataToMongodbStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterWritingGroupedEstimateDataToMongodbStep;
  allStudies: StudyFieldsAfterWritingGroupedEstimateDataToMongodbStep[];
  allCountries: CountryFieldsAfterWritingGroupedEstimateDataToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingGroupedEstimateDataToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingGroupedEstimateDataToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingGroupedEstimateDataToMongodbStep[];
  mongoClient: MongoClient;
}

interface WriteFaoMersEventDataToMongoDbStepOutput {
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

export const writeFaoMersEventDataToMongoDbStep = async(
  input: WriteFaoMersEventDataToMongoDbStepInput
): Promise<WriteFaoMersEventDataToMongoDbStepOutput> => {
  console.log(`Running step: writeFaoMersEventDataToMongoDbStep. Remaining estimates: ${input.allEstimates.length}.`);

  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: "mersFaoEventData",
    data: input.allFaoMersEvents,
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