import { MongoClient, ObjectId } from "mongodb";
import {
  CountryPopulationDataAfterParsingDatesStep,
  EstimateFieldsAfterParsingDatesStep,
  FaoMersEventAfterParsingDatesStep,
  SourceFieldsAfterParsingDatesStep,
  StudyFieldsAfterParsingDatesStep,
  YearlyCamelPopulationDataAfterParsingDatesStep
} from "./parse-dates-step";
import { MersAnimalSpecies, MersAnimalType, MersEstimateType } from "../../../storage/types.js";

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
    allEstimates: input.allSources
      .flatMap((source) =>
        source.country.flatMap((country) => [1,2].flatMap((num) => {
          const base = {
            id: new ObjectId().toHexString(),
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
          }

          if(source.populationType.includes('Animal')) {
            if( num === 1 ) {
              return {
                ...base,
                type: MersEstimateType.ANIMAL_SEROPREVALENCE as const,
                animalSpecies: MersAnimalSpecies.CAMEL,
                animalType: MersAnimalType.DOMESTIC,
                positivePrevalence: 0.1,
                ageGroup: undefined,
              };
            }
            if( num === 2 ) {
              return {
                ...base,
                type: MersEstimateType.ANIMAL_VIRAL as const,
                animalSpecies: MersAnimalSpecies.CAMEL,
                animalType: MersAnimalType.DOMESTIC,
                positivePrevalence: 0.1,
                ageGroup: undefined,
              };
            }
          }

            if( num === 1 ) {
              return {
                ...base,
                type: MersEstimateType.HUMAN_SEROPREVALENCE as const,
                animalSpecies: undefined,
                animalType: undefined,
                ageGroup: 'Test Age Group',
                positivePrevalence: 0.1,
              };
            }

            return {
              ...base,
              type: MersEstimateType.HUMAN_VIRAL as const,
              animalSpecies: undefined,
              animalType: undefined,
              ageGroup: 'Test Age Group',
              positivePrevalence: 0.1,
            };
        }))
    ),
    allSources: input.allSources,
    allStudies: input.allStudies,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient,
  }
}