import { MongoClient } from "mongodb";
import {
    CountryFieldsAfterTransformingFormatForDatabaseStep,
  CountryPopulationDataAfterTransformingFormatForDatabaseStep,
  EstimateFieldsAfterTransformingFormatForDatabaseStep,
  EstimateFilterOptionsAfterTransformingFormatForDatabaseStep,
  FaoMersEventAfterTransformingFormatForDatabaseStep,
  GroupedEstimateFieldsAfterTransformingFormatForDatabaseStep,
  SourceFieldsAfterTransformingFormatForDatabaseStep,
  StudyFieldsAfterTransformingFormatForDatabaseStep,
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
export type FaoMersEventAfterGeneratingEstimateGeoJSONFileStep =
  FaoMersEventAfterTransformingFormatForDatabaseStep;
export type YearlyCamelPopulationDataAfterGeneratingEstimateGeoJSONFileStep =
  YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep;
export type CountryPopulationDataAfterGeneratingEstimateGeoJSONFileStep =
  CountryPopulationDataAfterTransformingFormatForDatabaseStep;

interface GenerateEstimateGeoJSONFileStepInput {
  allEstimates: EstimateFieldsAfterTransformingFormatForDatabaseStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterTransformingFormatForDatabaseStep[];
  allSources: SourceFieldsAfterTransformingFormatForDatabaseStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterTransformingFormatForDatabaseStep;
  allStudies: StudyFieldsAfterTransformingFormatForDatabaseStep[];
  allCountries: CountryFieldsAfterTransformingFormatForDatabaseStep[];
  allFaoMersEvents: FaoMersEventAfterTransformingFormatForDatabaseStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep[];
  countryPopulationData: CountryPopulationDataAfterTransformingFormatForDatabaseStep[];
  mongoClient: MongoClient;
}

interface GenerateEstimateGeoJSONFileStepOutput {
  allEstimates: EstimateFieldsAfterGeneratingEstimateGeoJSONFileStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterGeneratingEstimateGeoJSONFileStep[];
  allSources: SourceFieldsAfterGeneratingEstimateGeoJSONFileStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterGeneratingEstimateGeoJSONFileStep;
  allStudies: StudyFieldsAfterGeneratingEstimateGeoJSONFileStep[];
  allCountries: CountryFieldsAfterGeneratingEstimateGeoJSONFileStep[];
  allFaoMersEvents: FaoMersEventAfterGeneratingEstimateGeoJSONFileStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterGeneratingEstimateGeoJSONFileStep[];
  countryPopulationData: CountryPopulationDataAfterGeneratingEstimateGeoJSONFileStep[];
  mongoClient: MongoClient;
}

interface GeoJSONOutput {
  type: "GeometryCollection",
  geometries: GroupedEstimateGeometryEntry[]
}

interface GroupedEstimateGeometryEntry {
  type: "Point",
  coordinates: [number, number],
  "properties": Omit<
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
}

export const generateEstimateGeoJSONFileStep = async(input: GenerateEstimateGeoJSONFileStepInput): Promise<GenerateEstimateGeoJSONFileStepOutput> => {
  const outputFilename = 'merstracker-grouped-estimates-geojson.json';

  console.log(`Running step: writeEstimateDataToMongoDbStep. Remaining estimates: ${input.allEstimates.length}.`);

  const geoJSON: GeoJSONOutput = {
    type: 'GeometryCollection',
    geometries: input.allGroupedEstimates.map((groupedEstimate) => {
      const { _id: _, createdAt: __, updatedAt: ___, ...cleanedGroupedEstimate } = groupedEstimate;

      const coordinates: [number, number] = [
        groupedEstimate.primaryEstimateInfo.longitude,
        groupedEstimate.primaryEstimateInfo.latitude
      ];

      return {
        type: "Point",
        coordinates,
        properties: {
          ...cleanedGroupedEstimate,
          primaryEstimateInfo: {
            ...groupedEstimate.primaryEstimateInfo,
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
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
}