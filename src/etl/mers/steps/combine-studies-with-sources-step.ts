import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterParsingDatesStep,
    CountryPopulationDataAfterParsingDatesStep,
  EstimateFieldsAfterParsingDatesStep,
  FaoMersEventAfterParsingDatesStep,
  SourceFieldsAfterParsingDatesStep,
  StudyFieldsAfterParsingDatesStep,
  YearlyCamelPopulationDataAfterParsingDatesStep
} from "./parse-dates-step";

export type EstimateFieldsAfterCombiningStudiesWithSourcesStep = EstimateFieldsAfterParsingDatesStep;
export type SourceFieldsAfterCombiningStudiesWithSourcesStep = SourceFieldsAfterParsingDatesStep;
export type StudyFieldsAfterCombiningStudiesWithSourcesStep = StudyFieldsAfterParsingDatesStep & {
  source: SourceFieldsAfterParsingDatesStep;
};
export type CountryFieldsAfterCombiningStudiesWithSourcesStep = CountryFieldsAfterParsingDatesStep;
export type FaoMersEventAfterCombiningStudiesWithSourcesStep = FaoMersEventAfterParsingDatesStep;
export type YearlyCamelPopulationDataAfterCombiningStudiesWithSourcesStep = YearlyCamelPopulationDataAfterParsingDatesStep;
export type CountryPopulationDataAfterCombiningStudiesWithSourcesStep = CountryPopulationDataAfterParsingDatesStep;

interface CombineStudiesWithSourcesStepInput {
  allEstimates: EstimateFieldsAfterParsingDatesStep[];
  allSources: SourceFieldsAfterParsingDatesStep[];
  allStudies: StudyFieldsAfterParsingDatesStep[];
  allCountries: CountryFieldsAfterParsingDatesStep[];
  allFaoMersEvents: FaoMersEventAfterParsingDatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterParsingDatesStep[];
  countryPopulationData: CountryPopulationDataAfterParsingDatesStep[];
  mongoClient: MongoClient;
}

interface CombineStudiesWithSourcesStepOutput {
  allEstimates: EstimateFieldsAfterCombiningStudiesWithSourcesStep[];
  allSources: SourceFieldsAfterCombiningStudiesWithSourcesStep[];
  allStudies: StudyFieldsAfterCombiningStudiesWithSourcesStep[];
  allCountries: CountryFieldsAfterCombiningStudiesWithSourcesStep[];
  allFaoMersEvents: FaoMersEventAfterCombiningStudiesWithSourcesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCombiningStudiesWithSourcesStep[];
  countryPopulationData: CountryPopulationDataAfterCombiningStudiesWithSourcesStep[];
  mongoClient: MongoClient;
}

export const combineStudiesWithSourcesStep = (
  input: CombineStudiesWithSourcesStepInput
): CombineStudiesWithSourcesStepOutput => {
  console.log(`Running step: combineStudiesWithSourcesStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allStudies: input.allStudies.map((study) => {
      const source = input.allSources.find((source) => source.id === study.sourceId);

      if(!source) {
        return undefined
      }

      return {
        ...study,
        source,
      }
    }).filter((study): study is NonNullable<typeof study> => !!study),
    allCountries: input.allCountries,
    allFaoMersEvents: input.allFaoMersEvents,
    countryPopulationData: input.countryPopulationData,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    mongoClient: input.mongoClient
  };
};
