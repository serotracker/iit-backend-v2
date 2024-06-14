import { MongoClient } from "mongodb";
import { readFileSync } from "fs";
import {
  EstimateFieldsAfterCleaningFaoMersEventFieldsStep,
  FaoMersEventAfterCleaningFaoMersEventFieldsStep,
  YearlyCamelPopulationDataAfterCleaningFaoMersEventFieldsStep
} from "./clean-fao-mers-event-fields-step";

export type EstimateFieldsAfterFetchingCamelPopulationByCountryDataStep = EstimateFieldsAfterCleaningFaoMersEventFieldsStep;
export type FaoMersEventAfterFetchingCamelPopulationByCountryDataStep = FaoMersEventAfterCleaningFaoMersEventFieldsStep;
export type YearlyCamelPopulationDataAfterFetchingCamelPopulationByCountryDataStep = Record<string, string | undefined>;

interface FetchCamelPopulationByCountryDataStepInput {
  allEstimates: EstimateFieldsAfterCleaningFaoMersEventFieldsStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningFaoMersEventFieldsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningFaoMersEventFieldsStep[];
  mongoClient: MongoClient;
}

interface FetchCamelPopulationByCountryDataStepOutput {
  allEstimates: EstimateFieldsAfterFetchingCamelPopulationByCountryDataStep[];
  allFaoMersEvents: FaoMersEventAfterFetchingCamelPopulationByCountryDataStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterFetchingCamelPopulationByCountryDataStep[];
  mongoClient: MongoClient;
}

export const fetchCamelPopulationByCountryDataStep = (
  input: FetchCamelPopulationByCountryDataStepInput
): FetchCamelPopulationByCountryDataStepOutput => {
  console.log(`Running step: fetchCamelPopulationByCountryDataStep. Remaining estimates: ${input.allEstimates.length}`);

  const rawFileData = readFileSync('./data/mers/fao/mers-events.csv').toString();
  const rowsInFile = rawFileData.split('\n');

  const rawFileDataHeaders = rowsInFile.slice(0,1).at(0);
  const rawFileDataRows = rowsInFile.slice(1);

  if(rawFileDataRows.length === 0 || rawFileDataHeaders === undefined) {
    return {
      allEstimates: input.allEstimates,
      allFaoMersEvents: input.allFaoMersEvents,
      yearlyCamelPopulationByCountryData: [],
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
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: data,
    mongoClient: input.mongoClient
  };
};
