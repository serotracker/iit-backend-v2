import { MongoClient } from "mongodb";
import { readFileSync } from "fs";
import {
  CountryFieldsAfterCleaningCountriesStep,
  CountryPopulationDataAfterCleaningCountriesStep,
  EstimateFieldsAfterCleaningCountriesStep,
  FaoMersEventAfterCleaningCountriesStep,
  SourceFieldsAfterCleaningCountriesStep,
  StudyFieldsAfterCleaningCountriesStep,
  YearlyCamelPopulationDataAfterCleaningCountriesStep
} from "./clean-countries-step";

export type EstimateFieldsAfterFetchingFaoMersEventsStep = EstimateFieldsAfterCleaningCountriesStep;
export type SourceFieldsAfterFetchingFaoMersEventsStep = SourceFieldsAfterCleaningCountriesStep;
export type StudyFieldsAfterFetchingFaoMersEventsStep = StudyFieldsAfterCleaningCountriesStep;
export type CountryFieldsAfterFetchingFaoMersEventsStep = CountryFieldsAfterCleaningCountriesStep;
export type FaoMersEventAfterFetchingFaoMersEventsStep = Record<string, string | undefined>;
export type YearlyCamelPopulationDataAfterFetchingFaoMersEventsStep = YearlyCamelPopulationDataAfterCleaningCountriesStep;
export type CountryPopulationDataAfterFetchingFaoMersEventsStep = CountryPopulationDataAfterCleaningCountriesStep;

interface FetchFaoMersEventsStepInput {
  allEstimates: EstimateFieldsAfterCleaningCountriesStep[];
  allSources: SourceFieldsAfterCleaningCountriesStep[];
  allStudies: StudyFieldsAfterCleaningCountriesStep[];
  allCountries: CountryFieldsAfterCleaningCountriesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningCountriesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningCountriesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningCountriesStep[];
  mongoClient: MongoClient;
}

interface FetchFaoMersEventsStepOutput {
  allEstimates: EstimateFieldsAfterFetchingFaoMersEventsStep[];
  allSources: SourceFieldsAfterFetchingFaoMersEventsStep[];
  allStudies: StudyFieldsAfterFetchingFaoMersEventsStep[];
  allCountries: CountryFieldsAfterFetchingFaoMersEventsStep[];
  allFaoMersEvents: FaoMersEventAfterFetchingFaoMersEventsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterFetchingFaoMersEventsStep[];
  countryPopulationData: CountryPopulationDataAfterFetchingFaoMersEventsStep[];
  mongoClient: MongoClient;
}

export const fetchFaoMersEventsStep = (input: FetchFaoMersEventsStepInput): FetchFaoMersEventsStepOutput => {
  console.log(`Running step: fetchFaoMersEventsStep. Remaining estimates: ${input.allEstimates.length}`);

  const rawFileData = readFileSync('./data/mers/fao/mers-events.csv').toString();
  const rowsInFile = rawFileData.split('\n');

  const rawFileDataMetadata = rowsInFile.slice(0,10);
  const rawFileDataHeaders = rowsInFile.slice(10,11).at(0);
  const rawFileDataRows = rowsInFile.slice(11);

  if(rawFileDataRows.length === 0 || rawFileDataHeaders === undefined) {
    return {
      allEstimates: input.allEstimates,
      allSources: input.allSources,
      allStudies: input.allStudies,
      allCountries: input.allCountries,
      allFaoMersEvents: [],
      yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
      countryPopulationData: input.countryPopulationData,
      mongoClient: input.mongoClient
    };
  }

  const indexToHeaderMap = rawFileDataHeaders
    .split(',')
    .map((header, index) => ({ [index]: header }))
    .reduce((accumulator, value) => ({...accumulator, ...value }), {})

  const data = rawFileDataRows.map((row) => row
    .split(',')
    .map((value, index): Record<string, string | undefined> => ({[indexToHeaderMap[index]]: value}))
    .reduce<Record<string, string | undefined>>((accumulator, value) => ({...accumulator, ...value }), {})
  )

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allFaoMersEvents: data,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
