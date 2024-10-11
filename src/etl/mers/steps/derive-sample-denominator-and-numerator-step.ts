import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterParsingDatesStep,
  CountryPopulationDataAfterParsingDatesStep,
  EstimateFieldsAfterParsingDatesStep,
  FaoMersEventAfterParsingDatesStep,
  MacroSampleFrameFieldsAfterParsingDatesStep,
  SourceFieldsAfterParsingDatesStep,
  StudyFieldsAfterParsingDatesStep,
  WhoCaseDataAfterParsingDatesStep,
  YearlyCamelPopulationDataAfterParsingDatesStep
} from "./parse-dates-step";

export type EstimateFieldsAfterDerivingSampleDenominatorAndNumeratorStep = EstimateFieldsAfterParsingDatesStep;
export type SourceFieldsAfterDerivingSampleDenominatorAndNumeratorStep = SourceFieldsAfterParsingDatesStep;
export type StudyFieldsAfterDerivingSampleDenominatorAndNumeratorStep = StudyFieldsAfterParsingDatesStep;
export type CountryFieldsAfterDerivingSampleDenominatorAndNumeratorStep = CountryFieldsAfterParsingDatesStep;
export type MacroSampleFrameFieldsAfterDerivingSampleDenominatorAndNumeratorStep = MacroSampleFrameFieldsAfterParsingDatesStep;
export type FaoMersEventAfterDerivingSampleDenominatorAndNumeratorStep = FaoMersEventAfterParsingDatesStep;
export type YearlyCamelPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep = YearlyCamelPopulationDataAfterParsingDatesStep;
export type CountryPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep = CountryPopulationDataAfterParsingDatesStep;
export type WhoCaseDataAfterDerivingSampleDenominatorAndNumeratorStep = WhoCaseDataAfterParsingDatesStep;

interface DeriveSampleDenominatorAndNumeratorStepInput {
  allEstimates: EstimateFieldsAfterParsingDatesStep[];
  allSources: SourceFieldsAfterParsingDatesStep[];
  allStudies: StudyFieldsAfterParsingDatesStep[];
  allCountries: CountryFieldsAfterParsingDatesStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterParsingDatesStep[],
  allFaoMersEvents: FaoMersEventAfterParsingDatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterParsingDatesStep[];
  countryPopulationData: CountryPopulationDataAfterParsingDatesStep[];
  whoCaseData: WhoCaseDataAfterParsingDatesStep[];
  mongoClient: MongoClient;
}

interface DeriveSampleDenominatorAndNumeratorStepOutput {
  allEstimates: EstimateFieldsAfterDerivingSampleDenominatorAndNumeratorStep[];
  allSources: SourceFieldsAfterDerivingSampleDenominatorAndNumeratorStep[];
  allStudies: StudyFieldsAfterDerivingSampleDenominatorAndNumeratorStep[];
  allCountries: CountryFieldsAfterDerivingSampleDenominatorAndNumeratorStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterDerivingSampleDenominatorAndNumeratorStep[],
  allFaoMersEvents: FaoMersEventAfterDerivingSampleDenominatorAndNumeratorStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep[];
  countryPopulationData: CountryPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep[];
  whoCaseData: WhoCaseDataAfterDerivingSampleDenominatorAndNumeratorStep[];
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
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    countryPopulationData: input.countryPopulationData,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  };
}