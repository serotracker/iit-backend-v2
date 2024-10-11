import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterCleaningCamelPopulationByCountryDataStep,
  CountryPopulationDataAfterCleaningCamelPopulationByCountryDataStep,
  EstimateFieldsAfterCleaningCamelPopulationByCountryDataStep,
  FaoMersEventAfterCleaningCamelPopulationByCountryDataStep,
  MacroSampleFrameFieldsAfterCleaningCamelPopulationByCountryDataStep,
  SourceFieldsAfterCleaningCamelPopulationByCountryDataStep,
  StudyFieldsAfterCleaningCamelPopulationByCountryDataStep,
  WhoCaseDataAfterCleaningCamelPopulationByCountryDataStep,
  YearlyCamelPopulationDataAfterCleaningCamelPopulationByCountryDataStep
} from "./clean-camel-population-by-country-data-step";
import { readFileSync } from "fs";

export type EstimateFieldsAfterFetchingWhoCaseDataStep = EstimateFieldsAfterCleaningCamelPopulationByCountryDataStep;
export type SourceFieldsAfterFetchingWhoCaseDataStep = SourceFieldsAfterCleaningCamelPopulationByCountryDataStep;
export type StudyFieldsAfterFetchingWhoCaseDataStep = StudyFieldsAfterCleaningCamelPopulationByCountryDataStep;
export type CountryFieldsAfterFetchingWhoCaseDataStep = CountryFieldsAfterCleaningCamelPopulationByCountryDataStep;
export type MacroSampleFrameFieldsAfterFetchingWhoCaseDataStep = MacroSampleFrameFieldsAfterCleaningCamelPopulationByCountryDataStep;
export type FaoMersEventAfterFetchingWhoCaseDataStep = FaoMersEventAfterCleaningCamelPopulationByCountryDataStep;
export type YearlyCamelPopulationDataAfterFetchingWhoCaseDataStep = YearlyCamelPopulationDataAfterCleaningCamelPopulationByCountryDataStep;
export type CountryPopulationDataAfterFetchingWhoCaseDataStep = CountryPopulationDataAfterCleaningCamelPopulationByCountryDataStep;
export type WhoCaseDataAfterFetchingWhoCaseDataStep = Record<string, string | undefined>;

interface FetchWhoCaseDataStepInput {
  allEstimates: EstimateFieldsAfterCleaningCamelPopulationByCountryDataStep[];
  allSources: SourceFieldsAfterCleaningCamelPopulationByCountryDataStep[];
  allStudies: StudyFieldsAfterCleaningCamelPopulationByCountryDataStep[];
  allCountries: CountryFieldsAfterCleaningCamelPopulationByCountryDataStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterCleaningCamelPopulationByCountryDataStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningCamelPopulationByCountryDataStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningCamelPopulationByCountryDataStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningCamelPopulationByCountryDataStep[];
  whoCaseData: WhoCaseDataAfterCleaningCamelPopulationByCountryDataStep[];
  mongoClient: MongoClient;
}

interface FetchWhoCaseDataStepOutput {
  allEstimates: EstimateFieldsAfterFetchingWhoCaseDataStep[];
  allSources: SourceFieldsAfterFetchingWhoCaseDataStep[];
  allStudies: StudyFieldsAfterFetchingWhoCaseDataStep[];
  allCountries: CountryFieldsAfterFetchingWhoCaseDataStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterFetchingWhoCaseDataStep[];
  allFaoMersEvents: FaoMersEventAfterFetchingWhoCaseDataStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterFetchingWhoCaseDataStep[];
  countryPopulationData: CountryPopulationDataAfterFetchingWhoCaseDataStep[];
  whoCaseData: WhoCaseDataAfterFetchingWhoCaseDataStep[];
  mongoClient: MongoClient;
}

export const fetchWhoCaseDataStep = (
  input: FetchWhoCaseDataStepInput
): FetchWhoCaseDataStepOutput => {
  console.log(`Running step: fetchWhoCaseData. Remaining estimates: ${input.allEstimates.length}`);

  const rawFileData = readFileSync('./data/mers/who/mers-case-data.csv').toString();
  const rowsInFile = rawFileData.split('\n');

  const rawFileDataHeaders = rowsInFile.slice(0,1).at(0);
  const rawFileDataRows = rowsInFile.slice(1);

  if(rawFileDataRows.length === 0 || rawFileDataHeaders === undefined) {
    return {
      allEstimates: input.allEstimates,
      allSources: input.allSources,
      allStudies: input.allStudies,
      allCountries: input.allCountries,
      allMacroSampleFrames: input.allMacroSampleFrames,
      allFaoMersEvents: input.allFaoMersEvents,
      yearlyCamelPopulationByCountryData: [],
      countryPopulationData: input.countryPopulationData,
      whoCaseData: input.whoCaseData,
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
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    whoCaseData: data,
    mongoClient: input.mongoClient
  };
}