import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterFetchingCountryPopulationStep,
  CountryPopulationDataAfterFetchingCountryPopulationStep,
  EstimateFieldsAfterFetchingCountryPopulationStep,
  FaoMersEventAfterFetchingCountryPopulationStep,
  MacroSampleFrameFieldsAfterFetchingCountryPopulationStep,
  SourceFieldsAfterFetchingCountryPopulationStep,
  StudyFieldsAfterFetchingCountryPopulationStep,
  WhoCaseDataAfterFetchingCountryPopulationStep,
  YearlyCamelPopulationDataAfterFetchingCountryPopulationStep
} from "./fetch-country-population-data-step";

export type EstimateFieldsAfterGeneratingCamelDataPerCapitaStep = EstimateFieldsAfterFetchingCountryPopulationStep;
export type SourceFieldsAfterGeneratingCamelDataPerCapitaStep = SourceFieldsAfterFetchingCountryPopulationStep;
export type StudyFieldsAfterGeneratingCamelDataPerCapitaStep = StudyFieldsAfterFetchingCountryPopulationStep;
export type CountryFieldsAfterGeneratingCamelDataPerCapitaStep = CountryFieldsAfterFetchingCountryPopulationStep;
export type MacroSampleFrameFieldsAfterGeneratingCamelDataPerCapitaStep = MacroSampleFrameFieldsAfterFetchingCountryPopulationStep;
export type FaoMersEventAfterGeneratingCamelDataPerCapitaStep = FaoMersEventAfterFetchingCountryPopulationStep;
export type YearlyCamelPopulationDataAfterGeneratingCamelDataPerCapitaStep = YearlyCamelPopulationDataAfterFetchingCountryPopulationStep & {
  camelCountPerCapita: number | undefined;
};
export type CountryPopulationDataAfterGeneratingCamelDataPerCapitaStep = CountryPopulationDataAfterFetchingCountryPopulationStep;
export type WhoCaseDataAfterGeneratingCamelDataPerCapitaStep = WhoCaseDataAfterFetchingCountryPopulationStep;

interface GenerateCamelDataPerCapitaStepInput {
  allEstimates: EstimateFieldsAfterFetchingCountryPopulationStep[];
  allSources: SourceFieldsAfterFetchingCountryPopulationStep[];
  allStudies: StudyFieldsAfterFetchingCountryPopulationStep[];
  allCountries: CountryFieldsAfterFetchingCountryPopulationStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterFetchingCountryPopulationStep[];
  allFaoMersEvents: FaoMersEventAfterFetchingCountryPopulationStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterFetchingCountryPopulationStep[];
  countryPopulationData: CountryPopulationDataAfterFetchingCountryPopulationStep[];
  whoCaseData: WhoCaseDataAfterFetchingCountryPopulationStep[];
  mongoClient: MongoClient;
}

interface GenerateCamelDataPerCapitaStepOutput {
  allEstimates: EstimateFieldsAfterGeneratingCamelDataPerCapitaStep[];
  allSources: SourceFieldsAfterGeneratingCamelDataPerCapitaStep[];
  allStudies: StudyFieldsAfterGeneratingCamelDataPerCapitaStep[];
  allCountries: CountryFieldsAfterGeneratingCamelDataPerCapitaStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterGeneratingCamelDataPerCapitaStep[];
  allFaoMersEvents: FaoMersEventAfterGeneratingCamelDataPerCapitaStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterGeneratingCamelDataPerCapitaStep[];
  countryPopulationData: CountryPopulationDataAfterGeneratingCamelDataPerCapitaStep[];
  whoCaseData: WhoCaseDataAfterGeneratingCamelDataPerCapitaStep[];
  mongoClient: MongoClient;
}

export const generateCamelDataPerCapitaStep = (
  input: GenerateCamelDataPerCapitaStepInput
): GenerateCamelDataPerCapitaStepOutput => {
  console.log(`Running step: generateCamelDataPerCapitaStep. Remaining estimates: ${input.allEstimates.length}.`);

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData.map((camelPopulationDataPoint) => {
      const countryPopulationDataForYear = input.countryPopulationData
        .find((countryPopulationDataPoint) => countryPopulationDataPoint.threeLetterCountryCode === camelPopulationDataPoint.threeLetterCountryCode)?.data
        .find((countryPopulationDataPointForYear) => countryPopulationDataPointForYear.year === camelPopulationDataPoint.year);

      return {
        ...camelPopulationDataPoint,
        camelCountPerCapita: countryPopulationDataForYear
          ? ( camelPopulationDataPoint.camelCount / countryPopulationDataForYear.populationEstimate )
          : undefined
      }
    }),
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  };
};