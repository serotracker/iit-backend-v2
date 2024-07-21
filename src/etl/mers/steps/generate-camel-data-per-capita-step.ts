import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterFetchingCountryPopulationStep,
  CountryPopulationDataAfterFetchingCountryPopulationStep,
  EstimateFieldsAfterFetchingCountryPopulationStep,
  FaoMersEventAfterFetchingCountryPopulationStep,
  SourceFieldsAfterFetchingCountryPopulationStep,
  StudyFieldsAfterFetchingCountryPopulationStep,
  YearlyCamelPopulationDataAfterFetchingCountryPopulationStep
} from "./fetch-country-population-data-step";

export type EstimateFieldsAfterGeneratingCamelDataPerCapitaStep = EstimateFieldsAfterFetchingCountryPopulationStep;
export type SourceFieldsAfterGeneratingCamelDataPerCapitaStep = SourceFieldsAfterFetchingCountryPopulationStep;
export type StudyFieldsAfterGeneratingCamelDataPerCapitaStep = StudyFieldsAfterFetchingCountryPopulationStep;
export type CountryFieldsAfterGeneratingCamelDataPerCapitaStep = CountryFieldsAfterFetchingCountryPopulationStep;
export type FaoMersEventAfterGeneratingCamelDataPerCapitaStep = FaoMersEventAfterFetchingCountryPopulationStep;
export type YearlyCamelPopulationDataAfterGeneratingCamelDataPerCapitaStep = YearlyCamelPopulationDataAfterFetchingCountryPopulationStep & {
  camelCountPerCapita: number | undefined;
};
export type CountryPopulationDataAfterGeneratingCamelDataPerCapitaStep = CountryPopulationDataAfterFetchingCountryPopulationStep;

interface GenerateCamelDataPerCapitaStepInput {
  allEstimates: EstimateFieldsAfterFetchingCountryPopulationStep[];
  allSources: SourceFieldsAfterFetchingCountryPopulationStep[];
  allStudies: StudyFieldsAfterFetchingCountryPopulationStep[];
  allCountries: CountryFieldsAfterFetchingCountryPopulationStep[];
  allFaoMersEvents: FaoMersEventAfterFetchingCountryPopulationStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterFetchingCountryPopulationStep[];
  countryPopulationData: CountryPopulationDataAfterFetchingCountryPopulationStep[];
  mongoClient: MongoClient;
}

interface GenerateCamelDataPerCapitaStepOutput {
  allEstimates: EstimateFieldsAfterGeneratingCamelDataPerCapitaStep[];
  allSources: SourceFieldsAfterGeneratingCamelDataPerCapitaStep[];
  allStudies: StudyFieldsAfterGeneratingCamelDataPerCapitaStep[];
  allCountries: CountryFieldsAfterGeneratingCamelDataPerCapitaStep[];
  allFaoMersEvents: FaoMersEventAfterGeneratingCamelDataPerCapitaStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterGeneratingCamelDataPerCapitaStep[];
  countryPopulationData: CountryPopulationDataAfterGeneratingCamelDataPerCapitaStep[];
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
    mongoClient: input.mongoClient
  };
};