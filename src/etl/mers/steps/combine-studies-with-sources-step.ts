import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterDerivingSampleDenominatorAndNumeratorStep,
  CountryPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep,
  EstimateFieldsAfterDerivingSampleDenominatorAndNumeratorStep,
  FaoMersEventAfterDerivingSampleDenominatorAndNumeratorStep,
  MacroSampleFrameFieldsAfterDerivingSampleDenominatorAndNumeratorStep,
  SourceFieldsAfterDerivingSampleDenominatorAndNumeratorStep,
  StudyFieldsAfterDerivingSampleDenominatorAndNumeratorStep,
  WhoCaseDataAfterDerivingSampleDenominatorAndNumeratorStep,
  YearlyCamelPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep
} from "./derive-sample-denominator-and-numerator-step";

export type EstimateFieldsAfterCombiningStudiesWithSourcesStep = EstimateFieldsAfterDerivingSampleDenominatorAndNumeratorStep;
export type SourceFieldsAfterCombiningStudiesWithSourcesStep = SourceFieldsAfterDerivingSampleDenominatorAndNumeratorStep;
export type StudyFieldsAfterCombiningStudiesWithSourcesStep = StudyFieldsAfterDerivingSampleDenominatorAndNumeratorStep & {
  source: SourceFieldsAfterDerivingSampleDenominatorAndNumeratorStep;
};
export type CountryFieldsAfterCombiningStudiesWithSourcesStep = CountryFieldsAfterDerivingSampleDenominatorAndNumeratorStep;
export type MacroSampleFrameFieldsAfterCombiningStudiesWithSourcesStep = MacroSampleFrameFieldsAfterDerivingSampleDenominatorAndNumeratorStep;
export type FaoMersEventAfterCombiningStudiesWithSourcesStep = FaoMersEventAfterDerivingSampleDenominatorAndNumeratorStep;
export type YearlyCamelPopulationDataAfterCombiningStudiesWithSourcesStep = YearlyCamelPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep;
export type CountryPopulationDataAfterCombiningStudiesWithSourcesStep = CountryPopulationDataAfterDerivingSampleDenominatorAndNumeratorStep;
export type WhoCaseDataAfterCombiningStudiesWithSourcesStep = WhoCaseDataAfterDerivingSampleDenominatorAndNumeratorStep;

interface CombineStudiesWithSourcesStepInput {
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

interface CombineStudiesWithSourcesStepOutput {
  allEstimates: EstimateFieldsAfterCombiningStudiesWithSourcesStep[];
  allSources: SourceFieldsAfterCombiningStudiesWithSourcesStep[];
  allStudies: StudyFieldsAfterCombiningStudiesWithSourcesStep[];
  allCountries: CountryFieldsAfterCombiningStudiesWithSourcesStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterCombiningStudiesWithSourcesStep[],
  allFaoMersEvents: FaoMersEventAfterCombiningStudiesWithSourcesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCombiningStudiesWithSourcesStep[];
  countryPopulationData: CountryPopulationDataAfterCombiningStudiesWithSourcesStep[];
  whoCaseData: WhoCaseDataAfterCombiningStudiesWithSourcesStep[];
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
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    countryPopulationData: input.countryPopulationData,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  };
};
