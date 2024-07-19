import { MongoClient, ObjectId } from "mongodb";
import {
  CountryPopulationDataAfterParsingDatesStep,
  EstimateFieldsAfterParsingDatesStep,
  FaoMersEventAfterParsingDatesStep,
  SourceFieldsAfterParsingDatesStep,
  StudyFieldsAfterParsingDatesStep,
  YearlyCamelPopulationDataAfterParsingDatesStep
} from "./parse-dates-step";
import { MersEstimateType } from "../../../storage/types.js";

export type EstimateFieldsAfterCombiningEstimatesWithSourcesStep = EstimateFieldsAfterParsingDatesStep & {
  firstAuthorFullName: string;
  sourceUrl: string;
  sourceType: string;
  sourceTitle: string;
  insitutution: string;
  country: string;
};
export type SourceFieldsAfterCombiningEstimatesWithSourcesStep = SourceFieldsAfterParsingDatesStep;
export type StudyFieldsAfterCombiningEstimatesWithSourcesStep = StudyFieldsAfterParsingDatesStep;
export type FaoMersEventAfterCombiningEstimatesWithSourcesStep = FaoMersEventAfterParsingDatesStep;
export type YearlyCamelPopulationDataAfterCombiningEstimatesWithSourcesStep = YearlyCamelPopulationDataAfterParsingDatesStep;
export type CountryPopulationDataAfterCombiningEstimatesWithSourcesStep = CountryPopulationDataAfterParsingDatesStep;

interface CombineEstimatesWithSourcesStepInput {
  allEstimates: EstimateFieldsAfterParsingDatesStep[];
  allSources: SourceFieldsAfterParsingDatesStep[];
  allStudies: StudyFieldsAfterParsingDatesStep[];
  allFaoMersEvents: FaoMersEventAfterParsingDatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterParsingDatesStep[];
  countryPopulationData: CountryPopulationDataAfterParsingDatesStep[];
  mongoClient: MongoClient;
}

interface CombineEstimatesWithSourcesStepOutput {
  allEstimates: EstimateFieldsAfterCombiningEstimatesWithSourcesStep[];
  allSources: SourceFieldsAfterCombiningEstimatesWithSourcesStep[];
  allStudies: StudyFieldsAfterCombiningEstimatesWithSourcesStep[];
  allFaoMersEvents: FaoMersEventAfterCombiningEstimatesWithSourcesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCombiningEstimatesWithSourcesStep[];
  countryPopulationData: CountryPopulationDataAfterCombiningEstimatesWithSourcesStep[];
  mongoClient: MongoClient;
}

export const combineEstimatesWithSourcesStep = (input: CombineEstimatesWithSourcesStepInput): CombineEstimatesWithSourcesStepOutput => {
  return {
    allEstimates: input.allSources.flatMap((source) => source.country.map((country) => ({
      id: new ObjectId().toHexString(),
      type: source.populationType.includes('Animal') ? MersEstimateType.ANIMAL_SEROPREVALENCE : MersEstimateType.HUMAN_SEROPREVALENCE,
      seroprevalence: 0.1,
      city: undefined,
      state: undefined,
      estimateId: 'Test Data',
      firstAuthorFullName: source.firstAuthorFullName,
      sourceUrl: source.sourceUrl,
      sourceType: source.sourceType,
      sourceTitle: source.sourceTitle,
      insitutution: source.insitutution,
      studyInclusionCriteria: 'Test Inclusion Criteria',
      studyExclusionCriteria: 'Test Exclusion Criteria',
      country: country,
    }))),
    allSources: input.allSources,
    allStudies: input.allStudies,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient,
  }
}