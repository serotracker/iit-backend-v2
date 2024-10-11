import { MongoClient } from "mongodb";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";
import {
  CountryFieldsAfterWritingFaoMersEventsToMongodbStep,
  CountryPopulationDataAfterWritingFaoMersEventsToMongodbStep,
  EstimateFieldsAfterWritingFaoMersEventsToMongodbStep,
  EstimateFilterOptionsAfterWritingFaoMersEventsToMongodbStep,
  FaoMersEventAfterWritingFaoMersEventsToMongodbStep,
  GroupedEstimateFieldsAfterWritingFaoMersEventsToMongodbStep,
  MacroSampleFrameFieldsAfterWritingFaoMersEventsToMongodbStep,
  SourceFieldsAfterWritingFaoMersEventsToMongodbStep,
  StudyFieldsAfterWritingFaoMersEventsToMongodbStep,
  WhoCaseDataAfterWritingFaoMersEventsToMongodbStep,
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
export type MacroSampleFrameFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  MacroSampleFrameFieldsAfterWritingFaoMersEventsToMongodbStep;
export type FaoMersEventAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  FaoMersEventAfterWritingFaoMersEventsToMongodbStep;
export type YearlyCamelPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  YearlyCamelPopulationDataAfterWritingFaoMersEventsToMongodbStep;
export type CountryPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  CountryPopulationDataAfterWritingFaoMersEventsToMongodbStep;
export type WhoCaseDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep =
  WhoCaseDataAfterWritingFaoMersEventsToMongodbStep;

interface WriteFaoYearlyCamelPopulationDataToMongoDbStepInput {
  allEstimates: EstimateFieldsAfterWritingFaoMersEventsToMongodbStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterWritingFaoMersEventsToMongodbStep[];
  allSources: SourceFieldsAfterWritingFaoMersEventsToMongodbStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterWritingFaoMersEventsToMongodbStep;
  allStudies: StudyFieldsAfterWritingFaoMersEventsToMongodbStep[];
  allCountries: CountryFieldsAfterWritingFaoMersEventsToMongodbStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterWritingFaoMersEventsToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingFaoMersEventsToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingFaoMersEventsToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingFaoMersEventsToMongodbStep[];
  whoCaseData: WhoCaseDataAfterWritingFaoMersEventsToMongodbStep[];
  mongoClient: MongoClient;
}

interface WriteFaoYearlyCamelPopulationDataToMongoDbStepOutput {
  allEstimates: EstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  allSources: SourceFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep;
  allStudies: StudyFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  allCountries: CountryFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
  whoCaseData: WhoCaseDataAfterWritingFaoYearlyCamelPopulationDataToMongodbStep[];
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
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  };
};