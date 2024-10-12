import { MongoClient } from "mongodb";
import { parse } from "date-fns";
import {
  AnimalFaoMersEventAfterCleaningFaoMersEventFieldsStep,
  HumanFaoMersEventAfterCleaningFaoMersEventFieldsStep
} from "./clean-fao-mers-event-fields-step";
import {
  CountryFieldsAfterGeneratingCamelDataPerCapitaStep,
  CountryPopulationDataAfterGeneratingCamelDataPerCapitaStep,
  EstimateFieldsAfterGeneratingCamelDataPerCapitaStep,
  FaoMersEventAfterGeneratingCamelDataPerCapitaStep,
  MacroSampleFrameFieldsAfterGeneratingCamelDataPerCapitaStep,
  SourceFieldsAfterGeneratingCamelDataPerCapitaStep,
  StudyFieldsAfterGeneratingCamelDataPerCapitaStep,
  WhoCaseDataAfterGeneratingCamelDataPerCapitaStep,
  YearlyCamelPopulationDataAfterGeneratingCamelDataPerCapitaStep
} from "./generate-camel-data-per-capita-step";

export type EstimateFieldsAfterParsingDatesStep = Omit<
  EstimateFieldsAfterGeneratingCamelDataPerCapitaStep, 'samplingStartDate'|'samplingEndDate'
> & {
  samplingStartDate: Date | undefined;
  samplingEndDate: Date | undefined;
  samplingMidDate: Date | undefined;
};
export type SourceFieldsAfterParsingDatesStep = SourceFieldsAfterGeneratingCamelDataPerCapitaStep;
export type StudyFieldsAfterParsingDatesStep = StudyFieldsAfterGeneratingCamelDataPerCapitaStep;
export type CountryFieldsAfterParsingDatesStep = CountryFieldsAfterGeneratingCamelDataPerCapitaStep;
export type MacroSampleFrameFieldsAfterParsingDatesStep = MacroSampleFrameFieldsAfterGeneratingCamelDataPerCapitaStep;
// Intentionally from a type a few steps back. This is because the individual parts of the union type are not carried through the steps,
// just the union type itself. You could fix this by carrying the individual parts of the union type through the steps.
export type FaoMersEventAfterParsingDatesStep = (Omit<
  AnimalFaoMersEventAfterCleaningFaoMersEventFieldsStep,'observationDate'|'reportDate'
> | Omit <
  HumanFaoMersEventAfterCleaningFaoMersEventFieldsStep,'observationDate'|'reportDate'
>) & {
  observationDate: Date | undefined;
  reportDate: Date;
};

export type YearlyCamelPopulationDataAfterParsingDatesStep = YearlyCamelPopulationDataAfterGeneratingCamelDataPerCapitaStep;
export type CountryPopulationDataAfterParsingDatesStep = CountryPopulationDataAfterGeneratingCamelDataPerCapitaStep;
export type WhoCaseDataAfterParsingDatesStep = WhoCaseDataAfterGeneratingCamelDataPerCapitaStep;

interface ParseDatesStepInput {
  allEstimates: EstimateFieldsAfterGeneratingCamelDataPerCapitaStep[];
  allSources: SourceFieldsAfterGeneratingCamelDataPerCapitaStep[];
  allStudies: StudyFieldsAfterGeneratingCamelDataPerCapitaStep[];
  allCountries: CountryFieldsAfterGeneratingCamelDataPerCapitaStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterGeneratingCamelDataPerCapitaStep[],
  allFaoMersEvents: FaoMersEventAfterGeneratingCamelDataPerCapitaStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterGeneratingCamelDataPerCapitaStep[];
  countryPopulationData: CountryPopulationDataAfterGeneratingCamelDataPerCapitaStep[];
  whoCaseData: WhoCaseDataAfterGeneratingCamelDataPerCapitaStep[];
  mongoClient: MongoClient;
}

interface ParseDatesStepOutput {
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

export const parseDatesStep = (
  input: ParseDatesStepInput
): ParseDatesStepOutput => {
  console.log(`Running step: parseDatesStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates.map((estimate) => {
      const samplingStartDate = estimate.samplingStartDate ? parse(estimate.samplingStartDate, 'yyyy-MM-dd', new Date()) : undefined;
      const samplingEndDate = estimate.samplingEndDate ? parse(estimate.samplingEndDate, 'yyyy-MM-dd', new Date()) : undefined;
      const samplingMidDate = samplingEndDate && samplingStartDate ? new Date((samplingStartDate.getTime() + samplingEndDate.getTime()) / 2) : undefined;

      return {
        ...estimate,
        samplingStartDate,
        samplingEndDate,
        samplingMidDate
      }
    }),
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents.map((event) => ({
      ...event,
      observationDate: event.observationDate ? parse(event.observationDate, "dd/MM/yyyy", new Date()) : undefined,
      reportDate: parse(event.reportDate, "dd/MM/yyyy", new Date())
    })),
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  };
};
