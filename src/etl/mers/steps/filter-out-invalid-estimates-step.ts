import { MongoClient } from "mongodb";
import { CountryFieldsAfterAddingCountryAndRegionInformationStep, CountryPopulationDataAfterAddingCountryAndRegionInformationStep, EstimateFieldsAfterAddingCountryAndRegionInformationStep, FaoMersEventAfterAddingCountryAndRegionInformationStep, MacroSampleFrameFieldsAfterAddingCountryAndRegionInformationStep, SourceFieldsAfterAddingCountryAndRegionInformationStep, StudyFieldsAfterAddingCountryAndRegionInformationStep, WhoCaseDataAfterAddingCountryAndRegionInformationStep, YearlyCamelPopulationDataAfterAddingCountryAndRegionInformationStep } from "./add-country-and-region-information-step";

export type EstimateFieldsAfterFilteringOutInvalidEstimatesStep = 
  EstimateFieldsAfterAddingCountryAndRegionInformationStep;
export type SourceFieldsAfterFilteringOutInvalidEstimatesStep =
  SourceFieldsAfterAddingCountryAndRegionInformationStep;
export type StudyFieldsAfterFilteringOutInvalidEstimatesStep =
  StudyFieldsAfterAddingCountryAndRegionInformationStep;
export type CountryFieldsAfterFilteringOutInvalidEstimatesStep =
  CountryFieldsAfterAddingCountryAndRegionInformationStep;
export type MacroSampleFrameFieldsAfterFilteringOutInvalidEstimatesStep =
  MacroSampleFrameFieldsAfterAddingCountryAndRegionInformationStep;
export type FaoMersEventAfterFilteringOutInvalidEstimatesStep =
  FaoMersEventAfterAddingCountryAndRegionInformationStep;
export type YearlyCamelPopulationDataAfterFilteringOutInvalidEstimatesStep =
  YearlyCamelPopulationDataAfterAddingCountryAndRegionInformationStep;
export type CountryPopulationDataAfterFilteringOutInvalidEstimatesStep =
  CountryPopulationDataAfterAddingCountryAndRegionInformationStep;
export type WhoCaseDataAfterFilteringOutInvalidEstimatesStep =
  WhoCaseDataAfterAddingCountryAndRegionInformationStep;

interface FilterOutInvalidEstimatesStepInput {
  allEstimates: EstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  allSources: SourceFieldsAfterAddingCountryAndRegionInformationStep[];
  allStudies: StudyFieldsAfterAddingCountryAndRegionInformationStep[];
  allCountries: CountryFieldsAfterAddingCountryAndRegionInformationStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterAddingCountryAndRegionInformationStep[];
  allFaoMersEvents: FaoMersEventAfterAddingCountryAndRegionInformationStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterAddingCountryAndRegionInformationStep[];
  countryPopulationData: CountryPopulationDataAfterAddingCountryAndRegionInformationStep[];
  whoCaseData: WhoCaseDataAfterAddingCountryAndRegionInformationStep[];
  mongoClient: MongoClient;
}

interface FilterOutInvalidEstimatesStepOutput {
  allEstimates: EstimateFieldsAfterFilteringOutInvalidEstimatesStep[];
  allSources: SourceFieldsAfterFilteringOutInvalidEstimatesStep[];
  allStudies: StudyFieldsAfterFilteringOutInvalidEstimatesStep[];
  allCountries: CountryFieldsAfterFilteringOutInvalidEstimatesStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterFilteringOutInvalidEstimatesStep[];
  allFaoMersEvents: FaoMersEventAfterFilteringOutInvalidEstimatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterFilteringOutInvalidEstimatesStep[];
  countryPopulationData: CountryPopulationDataAfterFilteringOutInvalidEstimatesStep[];
  whoCaseData: WhoCaseDataAfterFilteringOutInvalidEstimatesStep[];
  mongoClient: MongoClient;
}

export const filterOutInvalidEstimatesStep = (
  input: FilterOutInvalidEstimatesStepInput
): FilterOutInvalidEstimatesStepOutput => {
  console.log(`Running step: filterOutInvalidEstimatesStep. Remaining estimates: ${input.allEstimates.length}.`);

  return {
    allEstimates: input.allEstimates
      // Western Sahara
      .filter((estimate) => estimate.countryAlphaTwoCode !== 'EH'),
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  };
}