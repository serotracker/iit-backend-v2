import { MongoClient } from "mongodb";
import { readFileSync } from "fs";
import {
  CountryFieldsAfterCleaningFaoMersEventFieldsStep,
  CountryPopulationDataAfterCleaningFaoMersEventFieldsStep,
  EstimateFieldsAfterCleaningFaoMersEventFieldsStep,
  FaoMersEventAfterCleaningFaoMersEventFieldsStep,
  MacroSampleFrameFieldsAfterCleaningFaoMersEventFieldsStep,
  SourceFieldsAfterCleaningFaoMersEventFieldsStep,
  StudyFieldsAfterCleaningFaoMersEventFieldsStep,
  WhoCaseDataAfterCleaningFaoMersEventFieldsStep,
  YearlyCamelPopulationDataAfterCleaningFaoMersEventFieldsStep
} from "./clean-fao-mers-event-fields-step";

export type EstimateFieldsAfterFetchingCamelPopulationByCountryDataStep = EstimateFieldsAfterCleaningFaoMersEventFieldsStep;
export type SourceFieldsAfterFetchingCamelPopulationByCountryDataStep = SourceFieldsAfterCleaningFaoMersEventFieldsStep;
export type StudyFieldsAfterFetchingCamelPopulationByCountryDataStep = StudyFieldsAfterCleaningFaoMersEventFieldsStep;
export type CountryFieldsAfterFetchingCamelPopulationByCountryDataStep = CountryFieldsAfterCleaningFaoMersEventFieldsStep;
export type MacroSampleFrameFieldsAfterFetchingCamelPopulationByCountryDataStep = MacroSampleFrameFieldsAfterCleaningFaoMersEventFieldsStep;
export type FaoMersEventAfterFetchingCamelPopulationByCountryDataStep = FaoMersEventAfterCleaningFaoMersEventFieldsStep;
export type YearlyCamelPopulationDataAfterFetchingCamelPopulationByCountryDataStep = Record<string, string | undefined>;
export type CountryPopulationDataAfterFetchingCamelPopulationByCountryDataStep = CountryPopulationDataAfterCleaningFaoMersEventFieldsStep;
export type WhoCaseDataAfterFetchingCamelPopulationByCountryDataStep = WhoCaseDataAfterCleaningFaoMersEventFieldsStep;

interface FetchCamelPopulationByCountryDataStepInput {
  allEstimates: EstimateFieldsAfterCleaningFaoMersEventFieldsStep[];
  allSources: SourceFieldsAfterCleaningFaoMersEventFieldsStep[];
  allStudies: StudyFieldsAfterCleaningFaoMersEventFieldsStep[];
  allCountries: CountryFieldsAfterCleaningFaoMersEventFieldsStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterCleaningFaoMersEventFieldsStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningFaoMersEventFieldsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningFaoMersEventFieldsStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningFaoMersEventFieldsStep[];
  whoCaseData: WhoCaseDataAfterCleaningFaoMersEventFieldsStep[];
  mongoClient: MongoClient;
}

interface FetchCamelPopulationByCountryDataStepOutput {
  allEstimates: EstimateFieldsAfterFetchingCamelPopulationByCountryDataStep[];
  allSources: SourceFieldsAfterFetchingCamelPopulationByCountryDataStep[];
  allStudies: StudyFieldsAfterFetchingCamelPopulationByCountryDataStep[];
  allCountries: CountryFieldsAfterFetchingCamelPopulationByCountryDataStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterFetchingCamelPopulationByCountryDataStep[];
  allFaoMersEvents: FaoMersEventAfterFetchingCamelPopulationByCountryDataStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterFetchingCamelPopulationByCountryDataStep[];
  countryPopulationData: CountryPopulationDataAfterFetchingCamelPopulationByCountryDataStep[];
  whoCaseData: WhoCaseDataAfterFetchingCamelPopulationByCountryDataStep[];
  mongoClient: MongoClient;
}

export const fetchCamelPopulationByCountryDataStep = (
  input: FetchCamelPopulationByCountryDataStepInput
): FetchCamelPopulationByCountryDataStepOutput => {
  console.log(`Running step: fetchCamelPopulationByCountryDataStep. Remaining estimates: ${input.allEstimates.length}`);

  const rawFileData = readFileSync('./data/mers/fao/yearly-camel-population-by-country-data.csv').toString();
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

  // Important that this seperator appears nowhere in the data.
  // The logic with the seperator string is used instead of a simple ".split(",")" because there are 
  // values in the csv file whose format is "7,321,321" and we want to treat those as a single value
  // because the comma is delimited with a quotation mark.
  const seperatorString = 'SEPERATORЖ◷⚓✏✈'

  const indexToHeaderMap = rawFileDataHeaders
    .split('"')
    .map((element, index) => index % 2 === 0 ? element.replaceAll(",", seperatorString) : element)
    .join("")
    .split(seperatorString)
    .map((header, index) => ({ [index]: header }))
    .reduce((accumulator, value) => ({...accumulator, ...value }), {})

  const data = rawFileDataRows.map((row) => row
    .split('"')
    .map((element, index) => index % 2 === 0 ? element.replaceAll(",", seperatorString) : element)
    .join("")
    .split(seperatorString)
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
    yearlyCamelPopulationByCountryData: data,
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  };
};
