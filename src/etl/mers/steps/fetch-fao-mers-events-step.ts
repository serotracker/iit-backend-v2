import { MongoClient } from "mongodb";
import { readFileSync } from "fs";
import {
  CountryPopulationDataAfterCleaningEstimatesStep,
  EstimateFieldsAfterCleaningEstimatesStep,
  FaoMersEventAfterCleaningEstimatesStep,
  SourceFieldsAfterCleaningEstimatesStep,
  YearlyCamelPopulationDataAfterCleaningEstimatesStep
} from "./clean-estimates-step";

export type EstimateFieldsAfterFetchingFaoMersEventsStep = EstimateFieldsAfterCleaningEstimatesStep;
export type SourceFieldsAfterFetchingFaoMersEventsStep = SourceFieldsAfterCleaningEstimatesStep;
export type FaoMersEventAfterFetchingFaoMersEventsStep = Record<string, string | undefined>;
export type YearlyCamelPopulationDataAfterFetchingFaoMersEventsStep = YearlyCamelPopulationDataAfterCleaningEstimatesStep;
export type CountryPopulationDataAfterFetchingFaoMersEventsStep = CountryPopulationDataAfterCleaningEstimatesStep;

interface FetchFaoMersEventsStepInput {
  allEstimates: EstimateFieldsAfterCleaningEstimatesStep[];
  allSources: SourceFieldsAfterCleaningEstimatesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningEstimatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningEstimatesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningEstimatesStep[];
  mongoClient: MongoClient;
}

interface FetchFaoMersEventsStepOutput {
  allEstimates: EstimateFieldsAfterFetchingFaoMersEventsStep[];
  allSources: SourceFieldsAfterFetchingFaoMersEventsStep[];
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
    allFaoMersEvents: data,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
