import { MongoClient } from "mongodb";
import {
    CountryFieldsAfterTransformingFormatForDatabaseStep,
  CountryPopulationDataAfterTransformingFormatForDatabaseStep,
  EstimateFieldsAfterTransformingFormatForDatabaseStep,
  EstimateFilterOptionsAfterTransformingFormatForDatabaseStep,
  FaoMersEventAfterTransformingFormatForDatabaseStep,
  GroupedEstimateFieldsAfterTransformingFormatForDatabaseStep,
  MacroSampleFrameFieldsAfterTransformingFormatForDatabaseStep,
  SourceFieldsAfterTransformingFormatForDatabaseStep,
  StudyFieldsAfterTransformingFormatForDatabaseStep,
  WhoCaseDataAfterTransformingFormatForDatabaseStep,
  YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep
} from "./transform-into-format-for-database-step";
import { writeFile } from "node:fs/promises";

export type EstimateFieldsAfterGeneratingEstimateGeoJSONFileStep =
  EstimateFieldsAfterTransformingFormatForDatabaseStep;
export type GroupedEstimateFieldsAfterGeneratingEstimateGeoJSONFileStep =
  GroupedEstimateFieldsAfterTransformingFormatForDatabaseStep;
export type SourceFieldsAfterGeneratingEstimateGeoJSONFileStep =
  SourceFieldsAfterTransformingFormatForDatabaseStep;
export type EstimateFilterOptionsAfterGeneratingEstimateGeoJSONFileStep =
  EstimateFilterOptionsAfterTransformingFormatForDatabaseStep;
export type StudyFieldsAfterGeneratingEstimateGeoJSONFileStep =
  StudyFieldsAfterTransformingFormatForDatabaseStep;
export type CountryFieldsAfterGeneratingEstimateGeoJSONFileStep =
  CountryFieldsAfterTransformingFormatForDatabaseStep;
export type MacroSampleFrameFieldsAfterGeneratingEstimateGeoJSONFileStep =
  MacroSampleFrameFieldsAfterTransformingFormatForDatabaseStep;
export type FaoMersEventAfterGeneratingEstimateGeoJSONFileStep =
  FaoMersEventAfterTransformingFormatForDatabaseStep;
export type YearlyCamelPopulationDataAfterGeneratingEstimateGeoJSONFileStep =
  YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep;
export type CountryPopulationDataAfterGeneratingEstimateGeoJSONFileStep =
  CountryPopulationDataAfterTransformingFormatForDatabaseStep;
export type WhoCaseDataAfterGeneratingEstimateGeoJSONFileStep =
  WhoCaseDataAfterTransformingFormatForDatabaseStep;

interface GenerateEstimateGeoJSONFileStepInput {
  allEstimates: EstimateFieldsAfterTransformingFormatForDatabaseStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterTransformingFormatForDatabaseStep[];
  allSources: SourceFieldsAfterTransformingFormatForDatabaseStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterTransformingFormatForDatabaseStep;
  allStudies: StudyFieldsAfterTransformingFormatForDatabaseStep[];
  allCountries: CountryFieldsAfterTransformingFormatForDatabaseStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterTransformingFormatForDatabaseStep[];
  allFaoMersEvents: FaoMersEventAfterTransformingFormatForDatabaseStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep[];
  countryPopulationData: CountryPopulationDataAfterTransformingFormatForDatabaseStep[];
  whoCaseData: WhoCaseDataAfterTransformingFormatForDatabaseStep[];
  mongoClient: MongoClient;
}

interface GenerateEstimateGeoJSONFileStepOutput {
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
  whoCaseData: WhoCaseDataAfterGeneratingEstimateGeoJSONFileStep[];
  mongoClient: MongoClient;
}

interface GeoJSONOutput {
  type: 'FeatureCollection',
  features: Array<{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [number, number]
    }
    properties: Omit<
      GroupedEstimateFieldsAfterTransformingFormatForDatabaseStep,
      '_id'|'createdAt'|'updatedAt'|'primaryEstimateInfo'|'timeFrameSubestimates'
    > & {
      primaryEstimateInfo: Omit<
        GroupedEstimateFieldsAfterTransformingFormatForDatabaseStep['primaryEstimateInfo'],
        '_id'|'createdAt'|'updatedAt'|'samplingStartDate'|'samplingEndDate'|'samplingMidDate'
      > & {
        samplingStartDate: string | undefined;
        samplingEndDate: string | undefined;
        samplingMidDate: string | undefined;
      }
      timeFrameSubestimates: Array<
        Omit<GroupedEstimateFieldsAfterTransformingFormatForDatabaseStep['timeFrameSubestimates'][number],
        'samplingStartDate'|'samplingEndDate'
      > & {
        samplingStartDate: string;
        samplingEndDate: string;
      }>
    }
    }>
}

export const generateEstimateGeoJSONFileStep = async(input: GenerateEstimateGeoJSONFileStepInput): Promise<GenerateEstimateGeoJSONFileStepOutput> => {
  const outputFilename = 'merstracker-grouped-estimates-geojson.json';

  console.log(`Running step: generateEstimateGeoJSONFileStep. Remaining estimates: ${input.allEstimates.length}.`);

  const geoJSON: GeoJSONOutput = {
    type: 'FeatureCollection',
    features: input.allGroupedEstimates.map((groupedEstimate) => {
      const { _id: _, createdAt: __, updatedAt: ___, ...cleanedGroupedEstimate } = groupedEstimate;
      const { _id: ____, ...cleanedPrimaryEstimateInfo } = groupedEstimate.primaryEstimateInfo;

      const coordinates: [number, number] = [
        groupedEstimate.primaryEstimateInfo.longitude,
        groupedEstimate.primaryEstimateInfo.latitude
      ];
      
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coordinates
        },
        properties: {
          ...cleanedGroupedEstimate,
          primaryEstimateInfo: {
            ...cleanedPrimaryEstimateInfo,
            samplingStartDate: groupedEstimate.primaryEstimateInfo.samplingStartDate?.toISOString(),
            samplingEndDate: groupedEstimate.primaryEstimateInfo.samplingEndDate?.toISOString(),
            samplingMidDate: groupedEstimate.primaryEstimateInfo.samplingMidDate?.toISOString(),
          },
          timeFrameSubestimates: groupedEstimate.timeFrameSubestimates.map((subestimate) => ({
            ...subestimate,
            samplingStartDate: subestimate.samplingStartDate.toISOString(),
            samplingEndDate: subestimate.samplingEndDate.toISOString(),
          }))
        }
      }
    })
  }

  const geoJSONString = JSON.stringify(geoJSON);

  await writeFile(`./${outputFilename}`, geoJSONString, 'utf-8');

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
}