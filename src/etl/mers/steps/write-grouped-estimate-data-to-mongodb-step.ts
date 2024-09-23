import { MongoClient } from "mongodb";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";
import {
  CountryFieldsAfterWritingEstimateToMongodbStep,
  CountryPopulationDataAfterWritingEstimateToMongodbStep,
  EstimateFieldsAfterWritingEstimateToMongodbStep,
  EstimateFilterOptionsAfterWritingEstimateToMongodbStep,
  FaoMersEventAfterWritingEstimateToMongodbStep,
  GroupedEstimateFieldsAfterWritingEstimateToMongodbStep,
  MacroSampleFrameFieldsAfterWritingEstimateToMongodbStep,
  SourceFieldsAfterWritingEstimateToMongodbStep,
  StudyFieldsAfterWritingEstimateToMongodbStep,
  YearlyCamelPopulationDataAfterWritingEstimateToMongodbStep
} from "./write-estimate-data-to-mongodb-step.js";

export type EstimateFieldsAfterWritingGroupedEstimateDataToMongodbStep =
  EstimateFieldsAfterWritingEstimateToMongodbStep;
export type GroupedEstimateFieldsAfterWritingGroupedEstimateDataToMongodbStep =
  GroupedEstimateFieldsAfterWritingEstimateToMongodbStep;
export type SourceFieldsAfterWritingGroupedEstimateDataToMongodbStep =
  SourceFieldsAfterWritingEstimateToMongodbStep;
export type EstimateFilterOptionsAfterWritingGroupedEstimateDataToMongodbStep =
  EstimateFilterOptionsAfterWritingEstimateToMongodbStep;
export type StudyFieldsAfterWritingGroupedEstimateDataToMongodbStep =
  StudyFieldsAfterWritingEstimateToMongodbStep;
export type CountryFieldsAfterWritingGroupedEstimateDataToMongodbStep =
  CountryFieldsAfterWritingEstimateToMongodbStep;
export type MacroSampleFrameFieldsAfterWritingGroupedEstimateDataToMongodbStep =
  MacroSampleFrameFieldsAfterWritingEstimateToMongodbStep;
export type FaoMersEventAfterWritingGroupedEstimateDataToMongodbStep =
  FaoMersEventAfterWritingEstimateToMongodbStep;
export type YearlyCamelPopulationDataAfterWritingGroupedEstimateDataToMongodbStep =
  YearlyCamelPopulationDataAfterWritingEstimateToMongodbStep;
export type CountryPopulationDataAfterWritingGroupedEstimateDataToMongodbStep =
  CountryPopulationDataAfterWritingEstimateToMongodbStep;

interface WriteGroupedEstimateDataToMongodbStepInput {
  allEstimates: EstimateFieldsAfterWritingEstimateToMongodbStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterWritingEstimateToMongodbStep[];
  allSources: SourceFieldsAfterWritingEstimateToMongodbStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterWritingEstimateToMongodbStep;
  allStudies: StudyFieldsAfterWritingEstimateToMongodbStep[];
  allCountries: CountryFieldsAfterWritingEstimateToMongodbStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterWritingEstimateToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingEstimateToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingEstimateToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingEstimateToMongodbStep[];
  mongoClient: MongoClient;
}

interface WriteGroupedEstimateDataToMongodbStepOutput {
  allEstimates: EstimateFieldsAfterWritingGroupedEstimateDataToMongodbStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterWritingGroupedEstimateDataToMongodbStep[];
  allSources: SourceFieldsAfterWritingGroupedEstimateDataToMongodbStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterWritingGroupedEstimateDataToMongodbStep;
  allStudies: StudyFieldsAfterWritingGroupedEstimateDataToMongodbStep[];
  allCountries: CountryFieldsAfterWritingGroupedEstimateDataToMongodbStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterWritingGroupedEstimateDataToMongodbStep[];
  allFaoMersEvents: FaoMersEventAfterWritingGroupedEstimateDataToMongodbStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterWritingGroupedEstimateDataToMongodbStep[];
  countryPopulationData: CountryPopulationDataAfterWritingGroupedEstimateDataToMongodbStep[];
  mongoClient: MongoClient;
}

export const writeGroupedEstimateDataToMongodbStep = async(
  input: WriteGroupedEstimateDataToMongodbStepInput
): Promise<WriteGroupedEstimateDataToMongodbStepOutput> => {
  console.log(`Running step: writeGroupedEstimateDataToMongodbStep. Remaining estimates: ${input.allEstimates.length}.`);

  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: "mersPrimaryEstimates",
    data: input.allGroupedEstimates,
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
    mongoClient: input.mongoClient
  };
}