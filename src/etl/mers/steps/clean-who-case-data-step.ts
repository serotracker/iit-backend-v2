import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterValidatingWhoCaseDataStep,
  CountryPopulationDataAfterValidatingWhoCaseDataStep,
  EstimateFieldsAfterValidatingWhoCaseDataStep,
  FaoMersEventAfterValidatingWhoCaseDataStep,
  MacroSampleFrameFieldsAfterValidatingWhoCaseDataStep,
  SourceFieldsAfterValidatingWhoCaseDataStep,
  StudyFieldsAfterValidatingWhoCaseDataStep,
  WhoCaseDataAfterValidatingWhoCaseDataStep,
  YearlyCamelPopulationDataAfterValidatingWhoCaseDataStep
} from "./validate-who-case-data-step";
import { ThreeLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes";

export type EstimateFieldsAfterCleaningWhoCaseDataStep = EstimateFieldsAfterValidatingWhoCaseDataStep;
export type SourceFieldsAfterCleaningWhoCaseDataStep = SourceFieldsAfterValidatingWhoCaseDataStep;
export type StudyFieldsAfterCleaningWhoCaseDataStep = StudyFieldsAfterValidatingWhoCaseDataStep;
export type CountryFieldsAfterCleaningWhoCaseDataStep = CountryFieldsAfterValidatingWhoCaseDataStep;
export type MacroSampleFrameFieldsAfterCleaningWhoCaseDataStep = MacroSampleFrameFieldsAfterValidatingWhoCaseDataStep;
export type FaoMersEventAfterCleaningWhoCaseDataStep = FaoMersEventAfterValidatingWhoCaseDataStep;
export type YearlyCamelPopulationDataAfterCleaningWhoCaseDataStep = YearlyCamelPopulationDataAfterValidatingWhoCaseDataStep;
export type CountryPopulationDataAfterCleaningWhoCaseDataStep = CountryPopulationDataAfterValidatingWhoCaseDataStep;
export interface WhoCaseDataAfterCleaningWhoCaseDataStep {
  countryAlphaThreeCode: ThreeLetterIsoCountryCode;
  positiveCasesReported: number;
}

interface CleanWhoCaseDataStepInput {
  allEstimates: EstimateFieldsAfterValidatingWhoCaseDataStep[];
  allSources: SourceFieldsAfterValidatingWhoCaseDataStep[];
  allStudies: StudyFieldsAfterValidatingWhoCaseDataStep[];
  allCountries: CountryFieldsAfterValidatingWhoCaseDataStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterValidatingWhoCaseDataStep[];
  allFaoMersEvents: FaoMersEventAfterValidatingWhoCaseDataStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterValidatingWhoCaseDataStep[];
  countryPopulationData: CountryPopulationDataAfterValidatingWhoCaseDataStep[];
  whoCaseData: WhoCaseDataAfterValidatingWhoCaseDataStep[];
  mongoClient: MongoClient;
}

interface CleanWhoCaseDataStepOutput {
  allEstimates: EstimateFieldsAfterCleaningWhoCaseDataStep[];
  allSources: SourceFieldsAfterCleaningWhoCaseDataStep[];
  allStudies: StudyFieldsAfterCleaningWhoCaseDataStep[];
  allCountries: CountryFieldsAfterCleaningWhoCaseDataStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterCleaningWhoCaseDataStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningWhoCaseDataStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningWhoCaseDataStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningWhoCaseDataStep[];
  whoCaseData: WhoCaseDataAfterCleaningWhoCaseDataStep[];
  mongoClient: MongoClient;
}

export const cleanWhoCaseDataStep = (
  input: CleanWhoCaseDataStepInput
): CleanWhoCaseDataStepOutput => {
  console.log(`Running step: cleanWhoCaseDataStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData.map((element) => ({
      countryAlphaThreeCode: element.countryAlphaThreeCode as ThreeLetterIsoCountryCode,
      positiveCasesReported: element.positiveCasesReported
    })),
    mongoClient: input.mongoClient
  };
}