import { MongoClient } from "mongodb";
import {
    CountryFieldsAfterCleaningEstimatesStep,
  CountryPopulationDataAfterCleaningEstimatesStep,
  EstimateFieldsAfterCleaningEstimatesStep,
  FaoMersEventAfterCleaningEstimatesStep,
  MacroSampleFrameFieldsAfterCleaningEstimatesStep,
  SourceFieldsAfterCleaningEstimatesStep,
  StudyFieldsAfterCleaningEstimatesStep,
  WhoCaseDataAfterCleaningEstimatesStep,
  YearlyCamelPopulationDataAfterCleaningEstimatesStep
} from "./clean-estimates-step";

export type EstimateFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep = Omit<EstimateFieldsAfterCleaningEstimatesStep,
  'positivePrevalence'|'positivePrevalenceCalculated95CILower'|'positivePrevalenceCalculated95CIUpper'|'populationType'
> & {
  positivePrevalence: NonNullable<EstimateFieldsAfterCleaningEstimatesStep['positivePrevalence']>;
  positivePrevalenceCalculated95CILower: NonNullable<EstimateFieldsAfterCleaningEstimatesStep['positivePrevalenceCalculated95CILower']>;
  positivePrevalenceCalculated95CIUpper: NonNullable<EstimateFieldsAfterCleaningEstimatesStep['positivePrevalenceCalculated95CIUpper']>;
  populationType: NonNullable<EstimateFieldsAfterCleaningEstimatesStep['populationType']>;
  estimateId: NonNullable<EstimateFieldsAfterCleaningEstimatesStep['estimateId']>;
};
export type SourceFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep = Omit<SourceFieldsAfterCleaningEstimatesStep,
  'url'|'type'
> & {
  url: NonNullable<SourceFieldsAfterCleaningEstimatesStep['url']>;
  type: NonNullable<SourceFieldsAfterCleaningEstimatesStep['type']>;
};
export type StudyFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep = StudyFieldsAfterCleaningEstimatesStep;
export type CountryFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep = CountryFieldsAfterCleaningEstimatesStep;
export type MacroSampleFrameFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep = MacroSampleFrameFieldsAfterCleaningEstimatesStep;
export type FaoMersEventAfterFilteringEstimatesWithoutRequiredFieldsStep = FaoMersEventAfterCleaningEstimatesStep;
export type YearlyCamelPopulationDataAfterFilteringEstimatesWithoutRequiredFieldsStep = YearlyCamelPopulationDataAfterCleaningEstimatesStep;
export type CountryPopulationDataAfterFilteringEstimatesWithoutRequiredFieldsStep = CountryPopulationDataAfterCleaningEstimatesStep;
export type WhoCaseDataAfterFilteringEstimatesWithoutRequiredFieldsStep = WhoCaseDataAfterCleaningEstimatesStep;

interface FilterEstimatesWithoutRequiredFieldsInput {
  allEstimates: EstimateFieldsAfterCleaningEstimatesStep[];
  allSources: SourceFieldsAfterCleaningEstimatesStep[];
  allStudies: StudyFieldsAfterCleaningEstimatesStep[];
  allCountries: CountryFieldsAfterCleaningEstimatesStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterCleaningEstimatesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningEstimatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningEstimatesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningEstimatesStep[];
  whoCaseData: WhoCaseDataAfterCleaningEstimatesStep[];
  mongoClient: MongoClient;
}

interface FilterEstimatesWithoutRequiredFieldsOutput {
  allEstimates: EstimateFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  allSources: SourceFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  allStudies: StudyFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  allCountries: CountryFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  allFaoMersEvents: FaoMersEventAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  countryPopulationData: CountryPopulationDataAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  whoCaseData: WhoCaseDataAfterFilteringEstimatesWithoutRequiredFieldsStep[];
  mongoClient: MongoClient;
}

export const filterEstimatesWithoutRequiredFields = (
  input: FilterEstimatesWithoutRequiredFieldsInput
): FilterEstimatesWithoutRequiredFieldsOutput => {
  return {
    allEstimates: input.allEstimates
      .filter((estimate): estimate is Omit<typeof estimate, 'positivePrevalence'|'positivePrevalenceCalculated95CILower'|'positivePrevalenceCalculated95CIUpper'|'populationType'> & {
        positivePrevalence: NonNullable<typeof estimate['positivePrevalence']>;
        positivePrevalenceCalculated95CILower: NonNullable<typeof estimate['positivePrevalenceCalculated95CILower']>;
        positivePrevalenceCalculated95CIUpper: NonNullable<typeof estimate['positivePrevalenceCalculated95CIUpper']>;
        populationType: NonNullable<typeof estimate['populationType']>;
        estimateId: NonNullable<typeof estimate['estimateId']>;
      } => (
        (estimate.positivePrevalence !== null && estimate.positivePrevalence !== undefined) &&
        (estimate.positivePrevalenceCalculated95CILower !== null && estimate.positivePrevalenceCalculated95CILower !== undefined) &&
        (estimate.positivePrevalenceCalculated95CIUpper !== null && estimate.positivePrevalenceCalculated95CIUpper !== undefined) &&
        (estimate.populationType !== null && estimate.populationType !== undefined) &&
        (estimate.estimateId !== null && estimate.estimateId !== undefined)
      )),
    allSources: input.allSources.filter((source): source is Omit<typeof source, 'url'> & {
      url : NonNullable<typeof source['url']>
      type: NonNullable<typeof source['type']>
    } => (
      (source.url !== null && source.url !== undefined) &&
      (source.type !== null && source.type !== undefined)
    )).filter((source) => (
      (source.country.length > 0) &&
      (source.populationType.length > 0)
    )),
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  }
}