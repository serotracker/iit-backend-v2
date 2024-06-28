import { MongoClient } from "mongodb";
import { readFileSync } from "fs";
import {
  CountryFieldsAfterFetchingPositiveCaseDataStep,
  EstimateFieldsAfterFetchingPositiveCaseDataStep,
  StructuredCountryPopulationDataAfterFetchingPositiveCaseDataStep,
  StructuredPositiveCaseDataAfterFetchingPositiveCaseDataStep,
  StructuredVaccinationDataAfterFetchingPositiveCaseDataStep,
  StudyFieldsAfterFetchingPositiveCaseDataStep
} from "./fetch-positive-case-data-step";
import { StructuredCountryPopulationData } from "../types";
import { groupByArray } from "../../../lib/lib.js";

export type EstimateFieldsAfterFetchingCountryPopulationStep =
  EstimateFieldsAfterFetchingPositiveCaseDataStep;
export type StudyFieldsAfterFetchingCountryPopulationStep =
  StudyFieldsAfterFetchingPositiveCaseDataStep;
export type CountryFieldsAfterFetchingCountryPopulationStep =
  CountryFieldsAfterFetchingPositiveCaseDataStep;
export type StructuredVaccinationDataAfterFetchingCountryPopulationStep = StructuredVaccinationDataAfterFetchingPositiveCaseDataStep;
export type StructuredPositiveCaseDataAfterFetchingCountryPopulationStep = StructuredPositiveCaseDataAfterFetchingPositiveCaseDataStep;
export type StructuredCountryPopulationDataAfterFetchingCountryPopulationStep = StructuredCountryPopulationData;

interface FetchCountryPopulationDataStepInput {
  allEstimates: EstimateFieldsAfterFetchingPositiveCaseDataStep[];
  allStudies: StudyFieldsAfterFetchingPositiveCaseDataStep[];
  allCountries: CountryFieldsAfterFetchingPositiveCaseDataStep[];
  vaccinationData: StructuredVaccinationDataAfterFetchingPositiveCaseDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFetchingPositiveCaseDataStep;
  countryPopulationData: StructuredCountryPopulationDataAfterFetchingPositiveCaseDataStep;
  mongoClient: MongoClient;
}

interface FetchCountryPopulationDataStepOutput {
  allEstimates: EstimateFieldsAfterFetchingCountryPopulationStep[];
  allStudies: StudyFieldsAfterFetchingCountryPopulationStep[];
  allCountries: CountryFieldsAfterFetchingCountryPopulationStep[];
  vaccinationData: StructuredVaccinationDataAfterFetchingCountryPopulationStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFetchingCountryPopulationStep;
  countryPopulationData: StructuredCountryPopulationDataAfterFetchingCountryPopulationStep;
  mongoClient: MongoClient;
}

export const fetchCountryPopulationDataStep = (
  input: FetchCountryPopulationDataStepInput
): FetchCountryPopulationDataStepOutput => {
  console.log(`Running step: fetchCountryPopulationDataStep. Remaining estimates: ${input.allEstimates.length}.`);

  const rawFileData = readFileSync('./data/population.csv').toString();
  const rowsInFile = rawFileData.split('\n')

  if(rowsInFile.length === 0) {
    return {
      allEstimates: input.allEstimates,
      allStudies: input.allStudies,
      allCountries: input.allCountries,
      vaccinationData: input.vaccinationData,
      positiveCaseData: input.positiveCaseData,
      countryPopulationData: [],
      mongoClient: input.mongoClient
    };
  }

  const indexToHeaderMap = (rowsInFile[0]
    .split(',')
    .map((header, index) => ({ [index]: header }))
    .reduce((accumulator, value) => ({...accumulator, ...value }), {})
  )
  const dataRows = rowsInFile
    .slice(1)
    .map((dataRow) => dataRow.split(',')
      .map((value, index) => ({[indexToHeaderMap[index]]: value}))
      .reduce((accumulator, value) => ({...accumulator, ...value }), {})
    )
    .map((dataRowJson) => ({
      year: dataRowJson['Year'] ?? undefined,
      threeLetterCountryCode: dataRowJson['Code'] ?? undefined,
      populationEstimate: dataRowJson['Population (historical estimates)'] ?? undefined
    }))
    .filter((dataRowJson) => (
      dataRowJson.year !== undefined &&
      dataRowJson.threeLetterCountryCode !== undefined &&
      dataRowJson.populationEstimate !== undefined
    ))
    .map((dataRowJson) => ({
      year: parseInt(dataRowJson.year),
      threeLetterCountryCode: dataRowJson.threeLetterCountryCode,
      populationEstimate: parseInt(dataRowJson.populationEstimate),
    }))
    .filter((dataRowJson) => (
      !isNaN(dataRowJson.year) &&
      dataRowJson.threeLetterCountryCode.length === 3 &&
      !isNaN(dataRowJson.populationEstimate)
    ))
    // This step here is because our data ends in 2021 but we have estimates further in time
    // A bit hacky but to fix this, we just say that if we have data for 2021 to extend it to
    // I'm doing it here instead of the front end or something because I want to make sure this
    // bandaid extends to everything and don't want inconsistencies because some places applied
    // the bandaid and others didn't. We can also turn it off in one place if we find a data source
    // that suits our needs better. No other places should need to make this "extrapolate from 2021"
    // assumption. If you want to use a linear function or something to approximate that might work
    // but seems overkill to me given how little quite a lot of countries' populations have
    // budged from 2021 to 2024
    .flatMap((dataRowJson) => {
      if(dataRowJson.year !== 2021) {
        return [ dataRowJson ];
      }

      return [
        dataRowJson,
        {...dataRowJson, year: 2022 },
        {...dataRowJson, year: 2023 },
        {...dataRowJson, year: 2024 },
        {...dataRowJson, year: 2025 }
      ]
    })

  return {
    allEstimates: input.allEstimates,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: groupByArray(dataRows, 'threeLetterCountryCode'),
    mongoClient: input.mongoClient
  };
};
