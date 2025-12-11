import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterValidatingFieldSetFromAirtableStep,
  AirtableEstimateFieldsAfterValidatingFieldSetFromAirtableStep,
  AirtableSourceFieldsAfterValidatingFieldSetFromAirtableStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterValidatingFieldSetFromAirtableStep,
  GroupedEstimatesAfterValidatingFieldSetFromAirtableStep,
  UnravelledGroupedEstimatesAfterValidatingFieldSetFromAirtableStep
} from "./validate-field-set-from-airtable-step";
import { readFileSync } from "fs";

export type AirtableEstimateFieldsAfterFetchingEnvironmentalSuitabilityStatsByCountryStep =
  AirtableEstimateFieldsAfterValidatingFieldSetFromAirtableStep;
export type AirtableSourceFieldsAfterFetchingEnvironmentalSuitabilityStatsByCountryStep =
  AirtableSourceFieldsAfterValidatingFieldSetFromAirtableStep;
export type AirtableCountryFieldsAfterFetchingEnvironmentalSuitabilityStatsByCountryStep =
  AirtableCountryFieldsAfterValidatingFieldSetFromAirtableStep;
export interface EnvironmentalSuitabilityStatsByCountryEntryAfterFetchingEnvironmentalSuitabilityStatsByCountryStep {
  color_code: string;
  //ZIKA
  MIN_zika: number;
  MAX_zika: number;
  RANGE_zika: number;
  MEAN_zika: number;
  MEDIAN_zika: number;
  PCT90_zika: number;
  //DENGUE2015
  MIN_dengue2015: number;
  MAX_dengue2015: number;
  RANGE_dengue2015: number;
  MEAN_dengue2015: number;
  MEDIAN_dengue2015: number;
  PCT90_dengue2015: number;
  //DENGUE2050
  MIN_dengue2050: number;
  MAX_dengue2050: number;
  RANGE_dengue2050: number;
  MEAN_dengue2050: number;
  MEDIAN_dengue2050: number;
  PCT90_dengue2050: number;
}
export type GroupedEstimatesAfterFetchingEnvironmentalSuitabilityStatsByCountryStep =
  GroupedEstimatesAfterValidatingFieldSetFromAirtableStep;
export type UnravelledGroupedEstimatesAfterFetchingEnvironmentalSuitabilityStatsByCountryStep =
  UnravelledGroupedEstimatesAfterValidatingFieldSetFromAirtableStep;

interface FetchEnvironmentalSuitabilityStatsByCountryStepInput {
  allEstimates: AirtableEstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
  allSources: AirtableSourceFieldsAfterValidatingFieldSetFromAirtableStep[];
  allCountries: AirtableCountryFieldsAfterValidatingFieldSetFromAirtableStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterValidatingFieldSetFromAirtableStep[];
  groupedEstimates: GroupedEstimatesAfterValidatingFieldSetFromAirtableStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterValidatingFieldSetFromAirtableStep[];
  mongoClient: MongoClient;
}

interface FetchEnvironmentalSuitabilityStatsByCountryStepOutput {
  allEstimates: AirtableEstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
  allSources: AirtableSourceFieldsAfterValidatingFieldSetFromAirtableStep[];
  allCountries: AirtableCountryFieldsAfterValidatingFieldSetFromAirtableStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterFetchingEnvironmentalSuitabilityStatsByCountryStep[];
  groupedEstimates: GroupedEstimatesAfterFetchingEnvironmentalSuitabilityStatsByCountryStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterFetchingEnvironmentalSuitabilityStatsByCountryStep[];
  mongoClient: MongoClient;
}

export const fetchEnvironmentalSuitabilityStatsByCountryStep = (
  input: FetchEnvironmentalSuitabilityStatsByCountryStepInput
): FetchEnvironmentalSuitabilityStatsByCountryStepOutput => {
  console.log(`Running step: fetchEnvironmentalSuitabilityStatsByCountryStep. Remaining estimates: ${input.allEstimates.length}`);

  const rawFileData = readFileSync('./data/arbo/environmental-suitability-by-country.csv').toString();
  const rowsInFile = rawFileData.replaceAll('\r\n', '\n').split('\n');

  const rawFileDataHeaders = rowsInFile.slice(0,1).at(0);
  const rawFileDataRows = rowsInFile.slice(1);

  if(rawFileDataRows.length === 0 || rawFileDataHeaders === undefined) {
    return {
      allEstimates: input.allEstimates,
      allSources: input.allSources,
      allCountries: input.allCountries,
      environmentalSuitabilityStatsByCountry: [],
      groupedEstimates: input.groupedEstimates,
      unravelledGroupedEstimates: input.unravelledGroupedEstimates,
      mongoClient: input.mongoClient
    };
  }

  const indexToHeaderMap = rawFileDataHeaders
    .split(',')
    .map((header) => header.replaceAll('\r', ''))
    .map((header, index) => ({ [index]: header }))
    .reduce((accumulator, value) => ({...accumulator, ...value }), {});
  
  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allCountries: input.allCountries,
    environmentalSuitabilityStatsByCountry: rawFileDataRows.map((dataRow) => {
      const uncleanedDataObject = dataRow
        .split(',')
        .map((value, index) => ({[indexToHeaderMap[index]]: value}))
        .reduce((accumulator, value) => ({...accumulator, ...value }), {})

      return {
        color_code: uncleanedDataObject['color_code'],
        MIN_zika: parseFloat(uncleanedDataObject['MIN_zika']),
        MAX_zika: parseFloat(uncleanedDataObject['MAX_zika']),
        RANGE_zika: parseFloat(uncleanedDataObject['RANGE_zika']),
        MEAN_zika: parseFloat(uncleanedDataObject['MEAN_zika']),
        MEDIAN_zika: parseFloat(uncleanedDataObject['MEDIAN_zika']),
        PCT90_zika: parseFloat(uncleanedDataObject['PCT90_zika']),
        MIN_dengue2015: parseFloat(uncleanedDataObject['MIN_dengue2015']),
        MAX_dengue2015: parseFloat(uncleanedDataObject['MAX_dengue2015']),
        RANGE_dengue2015: parseFloat(uncleanedDataObject['RANGE_dengue2015']),
        MEAN_dengue2015: parseFloat(uncleanedDataObject['MEAN_dengue2015']),
        MEDIAN_dengue2015: parseFloat(uncleanedDataObject['MEDIAN_dengue2015']),
        PCT90_dengue2015: parseFloat(uncleanedDataObject['PCT90_dengue2015']),
        MIN_dengue2050: parseFloat(uncleanedDataObject['MIN_dengue2050']),
        MAX_dengue2050: parseFloat(uncleanedDataObject['MAX_dengue2050']),
        RANGE_dengue2050: parseFloat(uncleanedDataObject['RANGE_dengue2050']),
        MEAN_dengue2050: parseFloat(uncleanedDataObject['MEAN_dengue2050']),
        MEDIAN_dengue2050: parseFloat(uncleanedDataObject['MEDIAN_dengue2050']),
        PCT90_dengue2050: parseFloat(uncleanedDataObject['PCT90_dengue2050']),
      }
    }),
    groupedEstimates: input.groupedEstimates,
    unravelledGroupedEstimates: input.unravelledGroupedEstimates,
    mongoClient: input.mongoClient
  };
}