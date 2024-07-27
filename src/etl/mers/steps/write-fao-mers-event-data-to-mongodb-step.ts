import { MongoClient } from "mongodb";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";
import {
  CountryFieldsAfterWritingEstimateToMongodbStep,
  CountryPopulationDataAfterWritingEstimateToMongodbStep,
  EstimateFieldsAfterWritingEstimateToMongodbStep,
  FaoMersEventAfterWritingEstimateToMongodbStep,
  GroupedEstimateFieldsAfterWritingEstimateToMongodbStep,
  SourceFieldsAfterWritingEstimateToMongodbStep,
  StudyFieldsAfterWritingEstimateToMongodbStep,
  YearlyCamelPopulationDataAfterWritingEstimateToMongodbStep
} from "./write-estimate-data-to-mongodb-step.js";

export type EstimateFieldsAfterWritingFaoMersEventsToMongodbStep =
  EstimateFieldsAfterWritingEstimateToMongodbStep;
export type GroupedEstimateFieldsAfterWritingFaoMersEventsToMongodbStep =
  GroupedEstimateFieldsAfterWritingEstimateToMongodbStep;
export type SourceFieldsAfterWritingFaoMersEventsToMongodbStep =
  SourceFieldsAfterWritingEstimateToMongodbStep;
export type StudyFieldsAfterWritingFaoMersEventsToMongodbStep =
  StudyFieldsAfterWritingEstimateToMongodbStep;
export type CountryFieldsAfterWritingFaoMersEventsToMongodbStep =
  CountryFieldsAfterWritingEstimateToMongodbStep;
export type FaoMersEventAfterWritingFaoMersEventsToMongodbStep =
  FaoMersEventAfterWritingEstimateToMongodbStep;
export type YearlyCamelPopulationDataAfterWritingFaoMersEventsToMongodbStep =
  YearlyCamelPopulationDataAfterWritingEstimateToMongodbStep;
export type CountryPopulationDataAfterWritingFaoMersEventsToMongodbStep =
  CountryPopulationDataAfterWritingEstimateToMongodbStep;

interface WriteFaoMersEventDataToMongoDbStepInput {
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

interface WriteFaoMersEventDataToMongoDbStepOutput {
  allEstimates: EstimateFieldsAfterWritingFaoMersEventsToMongodbStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterWritingFaoMersEventsToMongodbStep[];
  allSources: SourceFieldsAfterWritingFaoMersEventsToMongodbStep[];
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
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};