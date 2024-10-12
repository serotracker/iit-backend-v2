import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterCombiningStudiesWithSourcesStep,
  SourceFieldsAfterCombiningStudiesWithSourcesStep,
  StudyFieldsAfterCombiningStudiesWithSourcesStep,
  FaoMersEventAfterCombiningStudiesWithSourcesStep,
  YearlyCamelPopulationDataAfterCombiningStudiesWithSourcesStep,
  CountryPopulationDataAfterCombiningStudiesWithSourcesStep,
  CountryFieldsAfterCombiningStudiesWithSourcesStep,
  MacroSampleFrameFieldsAfterCombiningStudiesWithSourcesStep,
  WhoCaseDataAfterCombiningStudiesWithSourcesStep
} from "./combine-studies-with-sources-step";

export type EstimateFieldsAfterCombiningEstimatesWithStudiesStep = EstimateFieldsAfterCombiningStudiesWithSourcesStep & {
  study: StudyFieldsAfterCombiningStudiesWithSourcesStep;
};
export type SourceFieldsAfterCombiningEstimatesWithStudiesStep = SourceFieldsAfterCombiningStudiesWithSourcesStep;
export type StudyFieldsAfterCombiningEstimatesWithStudiesStep = StudyFieldsAfterCombiningStudiesWithSourcesStep;
export type CountryFieldsAfterCombiningEstimatesWithStudiesStep = CountryFieldsAfterCombiningStudiesWithSourcesStep;
export type MacroSampleFrameFieldsAfterCombiningEstimatesWithStudiesStep = MacroSampleFrameFieldsAfterCombiningStudiesWithSourcesStep;
export type FaoMersEventAfterCombiningEstimatesWithStudiesStep = FaoMersEventAfterCombiningStudiesWithSourcesStep;
export type YearlyCamelPopulationDataAfterCombiningEstimatesWithStudiesStep = YearlyCamelPopulationDataAfterCombiningStudiesWithSourcesStep;
export type CountryPopulationDataAfterCombiningEstimatesWithStudiesStep = CountryPopulationDataAfterCombiningStudiesWithSourcesStep;
export type WhoCaseDataAfterCombiningEstimatesWithStudiesStep = WhoCaseDataAfterCombiningStudiesWithSourcesStep;

interface CombineEstimatesWithStudiesStepInput {
  allEstimates: EstimateFieldsAfterCombiningStudiesWithSourcesStep[];
  allSources: SourceFieldsAfterCombiningStudiesWithSourcesStep[];
  allStudies: StudyFieldsAfterCombiningStudiesWithSourcesStep[];
  allCountries: CountryFieldsAfterCombiningStudiesWithSourcesStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterCombiningStudiesWithSourcesStep[];
  allFaoMersEvents: FaoMersEventAfterCombiningStudiesWithSourcesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCombiningStudiesWithSourcesStep[];
  countryPopulationData: CountryPopulationDataAfterCombiningStudiesWithSourcesStep[];
  whoCaseData: WhoCaseDataAfterCombiningStudiesWithSourcesStep[];
  mongoClient: MongoClient;
}

interface CombineEstimatesWithStudiesStepOutput {
  allEstimates: EstimateFieldsAfterCombiningEstimatesWithStudiesStep[];
  allSources: SourceFieldsAfterCombiningEstimatesWithStudiesStep[];
  allStudies: StudyFieldsAfterCombiningEstimatesWithStudiesStep[];
  allCountries: CountryFieldsAfterCombiningEstimatesWithStudiesStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterCombiningEstimatesWithStudiesStep[];
  allFaoMersEvents: FaoMersEventAfterCombiningEstimatesWithStudiesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCombiningEstimatesWithStudiesStep[];
  countryPopulationData: CountryPopulationDataAfterCombiningEstimatesWithStudiesStep[];
  whoCaseData: WhoCaseDataAfterCombiningEstimatesWithStudiesStep[];
  mongoClient: MongoClient;
}

export const combineEstimatesWithStudiesStep = (
  input: CombineEstimatesWithStudiesStepInput
): CombineEstimatesWithStudiesStepOutput => {
  console.log(`Running step: combineEstimatesWithStudiesStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates.map((estimate) => {
      const study = input.allStudies.find((study) => study.id === estimate.studyId);

      if(!study) {
        return undefined
      }

      return {
        ...estimate,
        study,
      }
    }).filter((study): study is NonNullable<typeof study> => !!study),
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
};
