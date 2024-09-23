import { MongoClient } from "mongodb";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";
import {
  CountryFieldsAfterGeneratingEstimateGeoJSONFileStep,
  CountryPopulationDataAfterGeneratingEstimateGeoJSONFileStep,
  EstimateFieldsAfterGeneratingEstimateGeoJSONFileStep,
  EstimateFilterOptionsAfterGeneratingEstimateGeoJSONFileStep,
  FaoMersEventAfterGeneratingEstimateGeoJSONFileStep,
  GroupedEstimateFieldsAfterGeneratingEstimateGeoJSONFileStep,
  MacroSampleFrameFieldsAfterGeneratingEstimateGeoJSONFileStep,
  SourceFieldsAfterGeneratingEstimateGeoJSONFileStep,
  StudyFieldsAfterGeneratingEstimateGeoJSONFileStep,
  YearlyCamelPopulationDataAfterGeneratingEstimateGeoJSONFileStep
} from "./generate-estimate-geojson-file-step.js";

export type EstimateFieldsAfterWritingEstimateToMongodbStep =
  EstimateFieldsAfterGeneratingEstimateGeoJSONFileStep;
export type GroupedEstimateFieldsAfterWritingEstimateToMongodbStep =
  GroupedEstimateFieldsAfterGeneratingEstimateGeoJSONFileStep;
export type SourceFieldsAfterWritingEstimateToMongodbStep =
  SourceFieldsAfterGeneratingEstimateGeoJSONFileStep;
export type EstimateFilterOptionsAfterWritingEstimateToMongodbStep =
  EstimateFilterOptionsAfterGeneratingEstimateGeoJSONFileStep;
export type StudyFieldsAfterWritingEstimateToMongodbStep =
  StudyFieldsAfterGeneratingEstimateGeoJSONFileStep;
export type CountryFieldsAfterWritingEstimateToMongodbStep =
  CountryFieldsAfterGeneratingEstimateGeoJSONFileStep;
export type MacroSampleFrameFieldsAfterWritingEstimateToMongodbStep =
  MacroSampleFrameFieldsAfterGeneratingEstimateGeoJSONFileStep;
export type FaoMersEventAfterWritingEstimateToMongodbStep =
  FaoMersEventAfterGeneratingEstimateGeoJSONFileStep;
export type YearlyCamelPopulationDataAfterWritingEstimateToMongodbStep =
  YearlyCamelPopulationDataAfterGeneratingEstimateGeoJSONFileStep;
export type CountryPopulationDataAfterWritingEstimateToMongodbStep =
  CountryPopulationDataAfterGeneratingEstimateGeoJSONFileStep;

interface WriteEstimateDataToMongoDbStepInput {
  allEstimates: EstimateFieldsAfterGeneratingEstimateGeoJSONFileStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterGeneratingEstimateGeoJSONFileStep[];
  allSources: SourceFieldsAfterGeneratingEstimateGeoJSONFileStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterGeneratingEstimateGeoJSONFileStep;
  allStudies: StudyFieldsAfterGeneratingEstimateGeoJSONFileStep[];
  allCountries: CountryFieldsAfterGeneratingEstimateGeoJSONFileStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterGeneratingEstimateGeoJSONFileStep[];
  allFaoMersEvents: FaoMersEventAfterGeneratingEstimateGeoJSONFileStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterGeneratingEstimateGeoJSONFileStep[];
  countryPopulationData: CountryPopulationDataAfterGeneratingEstimateGeoJSONFileStep[];
  mongoClient: MongoClient;
}

interface WriteEstimateDataToMongoDbStepOutput {
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
    estimateFilterOptions: input.estimateFilterOptions,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};