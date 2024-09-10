import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterDerivingSampleDenominatorAndNumeratorStep,
  CountryPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep,
  EstimateFieldsAfterDerivingSampleDenominatorAndNumeratorStep,
  FaoMersEventAfterDerivingSampleDenominatorAndNumeratorStep,
  SourceFieldsAfterDerivingSampleDenominatorAndNumeratorStep,
  StudyFieldsAfterDerivingSampleDenominatorAndNumeratorStep,
  YearlyCamelPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep
} from "./derive-sample-denominator-and-numerator-step";

export type EstimateFieldsAfterCombiningStudiesWithSourcesStep = EstimateFieldsAfterDerivingSampleDenominatorAndNumeratorStep;
export type SourceFieldsAfterCombiningStudiesWithSourcesStep = SourceFieldsAfterDerivingSampleDenominatorAndNumeratorStep;
export type StudyFieldsAfterCombiningStudiesWithSourcesStep = StudyFieldsAfterDerivingSampleDenominatorAndNumeratorStep & {
  source: SourceFieldsAfterDerivingSampleDenominatorAndNumeratorStep;
};
export type CountryFieldsAfterCombiningStudiesWithSourcesStep = CountryFieldsAfterDerivingSampleDenominatorAndNumeratorStep;
export type FaoMersEventAfterCombiningStudiesWithSourcesStep = FaoMersEventAfterDerivingSampleDenominatorAndNumeratorStep;
export type YearlyCamelPopulationDataAfterCombiningStudiesWithSourcesStep = YearlyCamelPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep;
export type CountryPopulationDataAfterCombiningStudiesWithSourcesStep = CountryPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep;

interface CombineStudiesWithSourcesStepInput {
  allEstimates: EstimateFieldsAfterDerivingSampleDenominatorAndNumeratorStep[];
  allSources: SourceFieldsAfterDerivingSampleDenominatorAndNumeratorStep[];
  allStudies: StudyFieldsAfterDerivingSampleDenominatorAndNumeratorStep[];
  allCountries: CountryFieldsAfterDerivingSampleDenominatorAndNumeratorStep[];
  allFaoMersEvents: FaoMersEventAfterDerivingSampleDenominatorAndNumeratorStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep[];
  countryPopulationData: CountryPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep[];
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
