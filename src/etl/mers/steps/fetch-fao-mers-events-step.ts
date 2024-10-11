import { MongoClient } from "mongodb";
import { readFileSync } from "fs";
import {
  CountryFieldsAfterCleaningMacroSampleFramesStep,
  CountryPopulationDataAfterCleaningMacroSampleFramesStep,
  EstimateFieldsAfterCleaningMacroSampleFramesStep,
  FaoMersEventAfterCleaningMacroSampleFramesStep,
  MacroSampleFrameFieldsAfterCleaningMacroSampleFramesStep,
  SourceFieldsAfterCleaningMacroSampleFramesStep,
  StudyFieldsAfterCleaningMacroSampleFramesStep,
  WhoCaseDataAfterCleaningMacroSampleFramesStep,
  YearlyCamelPopulationDataAfterCleaningMacroSampleFramesStep
} from "./clean-macro-sample-frames-step";

export type EstimateFieldsAfterFetchingFaoMersEventsStep = EstimateFieldsAfterCleaningMacroSampleFramesStep;
export type SourceFieldsAfterFetchingFaoMersEventsStep = SourceFieldsAfterCleaningMacroSampleFramesStep;
export type StudyFieldsAfterFetchingFaoMersEventsStep = StudyFieldsAfterCleaningMacroSampleFramesStep;
export type CountryFieldsAfterFetchingFaoMersEventsStep = CountryFieldsAfterCleaningMacroSampleFramesStep;
export type MacroSampleFrameFieldsAfterFetchingFaoMersEventsStep = MacroSampleFrameFieldsAfterCleaningMacroSampleFramesStep;
export type FaoMersEventAfterFetchingFaoMersEventsStep = Record<string, string | undefined>;
export type YearlyCamelPopulationDataAfterFetchingFaoMersEventsStep = YearlyCamelPopulationDataAfterCleaningMacroSampleFramesStep;
export type CountryPopulationDataAfterFetchingFaoMersEventsStep = CountryPopulationDataAfterCleaningMacroSampleFramesStep;
export type WhoCaseDataAfterFetchingFaoMersEventsStep = WhoCaseDataAfterCleaningMacroSampleFramesStep;

interface FetchFaoMersEventsStepInput {
  allEstimates: EstimateFieldsAfterCleaningMacroSampleFramesStep[];
  allSources: SourceFieldsAfterCleaningMacroSampleFramesStep[];
  allStudies: StudyFieldsAfterCleaningMacroSampleFramesStep[];
  allCountries: CountryFieldsAfterCleaningMacroSampleFramesStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterCleaningMacroSampleFramesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningMacroSampleFramesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningMacroSampleFramesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningMacroSampleFramesStep[];
  whoCaseData: WhoCaseDataAfterCleaningMacroSampleFramesStep[];
  mongoClient: MongoClient;
}

interface FetchFaoMersEventsStepOutput {
  allEstimates: EstimateFieldsAfterFetchingFaoMersEventsStep[];
  allSources: SourceFieldsAfterFetchingFaoMersEventsStep[];
  allStudies: StudyFieldsAfterFetchingFaoMersEventsStep[];
  allCountries: CountryFieldsAfterFetchingFaoMersEventsStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterFetchingFaoMersEventsStep[];
  allFaoMersEvents: FaoMersEventAfterFetchingFaoMersEventsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterFetchingFaoMersEventsStep[];
  countryPopulationData: CountryPopulationDataAfterFetchingFaoMersEventsStep[];
  whoCaseData: WhoCaseDataAfterFetchingFaoMersEventsStep[];
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
      allMacroSampleFrames: input.allMacroSampleFrames,
      allFaoMersEvents: [],
      yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
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
    allFaoMersEvents: data,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  };
};
