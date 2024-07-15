import { MongoClient, ObjectId } from "mongodb";
import {
  CountryPopulationDataAfterParsingDatesStep,
  EstimateFieldsAfterParsingDatesStep,
  FaoMersEventAfterParsingDatesStep,
  SourceFieldsAfterParsingDatesStep,
  YearlyCamelPopulationDataAfterParsingDatesStep
} from "./parse-dates-step";

export type EstimateFieldsAfterCombiningEstimatesWithSourcesStep = EstimateFieldsAfterParsingDatesStep & {
  firstAuthorFullName: string;
  sourceUrl: string;
  sourceType: string;
  sourceTitle: string;
  insitutution: string;
  country: string;
};
export type SourceFieldsAfterCombiningEstimatesWithSourcesStep = SourceFieldsAfterParsingDatesStep;
export type FaoMersEventAfterCombiningEstimatesWithSourcesStep = FaoMersEventAfterParsingDatesStep;
export type YearlyCamelPopulationDataAfterCombiningEstimatesWithSourcesStep = YearlyCamelPopulationDataAfterParsingDatesStep;
export type CountryPopulationDataAfterCombiningEstimatesWithSourcesStep = CountryPopulationDataAfterParsingDatesStep;

interface CombineEstimatesWithSourcesStepInput {
  allEstimates: EstimateFieldsAfterParsingDatesStep[];
  allSources: SourceFieldsAfterParsingDatesStep[];
  allFaoMersEvents: FaoMersEventAfterParsingDatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterParsingDatesStep[];
  countryPopulationData: CountryPopulationDataAfterParsingDatesStep[];
  mongoClient: MongoClient;
}

interface CombineEstimatesWithSourcesStepOutput {
  allEstimates: EstimateFieldsAfterCombiningEstimatesWithSourcesStep[];
  allSources: SourceFieldsAfterCombiningEstimatesWithSourcesStep[];
  allFaoMersEvents: FaoMersEventAfterCombiningEstimatesWithSourcesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCombiningEstimatesWithSourcesStep[];
  countryPopulationData: CountryPopulationDataAfterCombiningEstimatesWithSourcesStep[];
  mongoClient: MongoClient;
}

export const combineEstimatesWithSourcesStep = (input: CombineEstimatesWithSourcesStepInput): CombineEstimatesWithSourcesStepOutput => {
  return {
    allEstimates: input.allSources.flatMap((source) => source.country.map((country) => ({
      id: new ObjectId().toHexString(),
      seroprevalence: 0.1,
<<<<<<< HEAD
      city: undefined,
      state: undefined,
=======
>>>>>>> c31954ebfb3e01538d8f78bf63858f0387fcafc2
      estimateId: 'Test Data',
      firstAuthorFullName: source.firstAuthorFullName,
      sourceUrl: source.sourceUrl,
      sourceType: source.sourceType,
      sourceTitle: source.sourceTitle,
      insitutution: source.insitutution,
      country: country,
    }))),
    allSources: input.allSources,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient,
  }
}