import { MongoClient } from "mongodb";
import { CountryPopulationDataAfterValidatingFieldSetFromAirtableStep, EstimateFieldsAfterValidatingFieldSetFromAirtableStep, FaoMersEventAfterValidatingFieldSetFromAirtableStep, SourceFieldsAfterValidatingFieldSetFromAirtableStep, YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep } from "./validate-field-set-from-airtable-step";
import { readFileSync } from "fs";
import { SourceFieldsAfterCleaningSourcesStep } from "./clean-sources-step";

export type EstimateFieldsAfterFetchingFaoMersEventsStep = EstimateFieldsAfterValidatingFieldSetFromAirtableStep;
export type SourceFieldsAfterFetchingFaoMersEventsStep = SourceFieldsAfterValidatingFieldSetFromAirtableStep;
export type FaoMersEventAfterFetchingFaoMersEventsStep = Record<string, string | undefined>;
export type YearlyCamelPopulationDataAfterFetchingFaoMersEventsStep = YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep;
export type CountryPopulationDataAfterFetchingFaoMersEventsStep = CountryPopulationDataAfterValidatingFieldSetFromAirtableStep;

interface FetchFaoMersEventsStepInput {
  allEstimates: EstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
  allSources: SourceFieldsAfterCleaningSourcesStep[];
  allFaoMersEvents: FaoMersEventAfterValidatingFieldSetFromAirtableStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep[];
  countryPopulationData: CountryPopulationDataAfterValidatingFieldSetFromAirtableStep[];
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
