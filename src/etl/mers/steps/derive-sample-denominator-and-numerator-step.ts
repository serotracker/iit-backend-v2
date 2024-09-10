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

export type EstimateFieldsAfterDerivingSampleDenominatorAndNumeratorStep = EstimateFieldsAfterParsingDatesStep;
export type SourceFieldsAfterDerivingSampleDenominatorAndNumeratorStep = SourceFieldsAfterParsingDatesStep;
export type StudyFieldsAfterDerivingSampleDenominatorAndNumeratorStep = StudyFieldsAfterParsingDatesStep;
export type CountryFieldsAfterDerivingSampleDenominatorAndNumeratorStep = CountryFieldsAfterParsingDatesStep;
export type FaoMersEventAfterDerivingSampleDenominatorAndNumeratorStep = FaoMersEventAfterParsingDatesStep;
export type YearlyCamelPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep = YearlyCamelPopulationDataAfterParsingDatesStep;
export type CountryPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep = CountryPopulationDataAfterParsingDatesStep;

interface DeriveSampleDenominatorAndNumeratorStepInput {
  allEstimates: EstimateFieldsAfterParsingDatesStep[];
  allSources: SourceFieldsAfterParsingDatesStep[];
  allStudies: StudyFieldsAfterParsingDatesStep[];
  allCountries: CountryFieldsAfterParsingDatesStep[];
  allFaoMersEvents: FaoMersEventAfterParsingDatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterParsingDatesStep[];
  countryPopulationData: CountryPopulationDataAfterParsingDatesStep[];
  mongoClient: MongoClient;
}

interface DeriveSampleDenominatorAndNumeratorStepOutput {
  allEstimates: EstimateFieldsAfterDerivingSampleDenominatorAndNumeratorStep[];
  allSources: SourceFieldsAfterDerivingSampleDenominatorAndNumeratorStep[];
  allStudies: StudyFieldsAfterDerivingSampleDenominatorAndNumeratorStep[];
  allCountries: CountryFieldsAfterDerivingSampleDenominatorAndNumeratorStep[];
  allFaoMersEvents: FaoMersEventAfterDerivingSampleDenominatorAndNumeratorStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep[];
  countryPopulationData: CountryPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep[];
  mongoClient: MongoClient;
}

export const deriveSampleDenominatorAndNumeratorStep = (
  input: DeriveSampleDenominatorAndNumeratorStepInput
): DeriveSampleDenominatorAndNumeratorStepOutput => {
  console.log(`Running step: deriveSampleDenominatorAndNumeratorStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates.map((estimate) => {
      if(estimate.sampleDenominator === undefined && estimate.sampleNumerator !== undefined) {
        return {
           ...estimate,
           sampleDenominator: Math.round(estimate.sampleNumerator / estimate.positivePrevalence)
        }
      }
      if(estimate.sampleNumerator === undefined && estimate.sampleDenominator !== undefined) {
        return {
           ...estimate,
           sampleNumerator: Math.round(estimate.sampleDenominator * estimate.positivePrevalence)
        }
      }

      return estimate
    }),
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allFaoMersEvents: input.allFaoMersEvents,
    countryPopulationData: input.countryPopulationData,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    mongoClient: input.mongoClient
  };
}