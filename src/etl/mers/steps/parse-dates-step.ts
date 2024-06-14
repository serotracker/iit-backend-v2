import { MongoClient } from "mongodb";
import { parse } from "date-fns";
import {
  AnimalFaoMersEventAfterCleaningFaoMersEventFieldsStep,
  HumanFaoMersEventAfterCleaningFaoMersEventFieldsStep
} from "./clean-fao-mers-event-fields-step";
import {
  EstimateFieldsAfterCleaningCamelPopulationByCountryDataStep,
  FaoMersEventAfterCleaningCamelPopulationByCountryDataStep,
  YearlyCamelPopulationDataAfterCleaningCamelPopulationByCountryDataStep
} from "./clean-camel-population-by-country-data-step";

export type EstimateFieldsAfterParsingDatesStep = EstimateFieldsAfterCleaningCamelPopulationByCountryDataStep;
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

export type YearlyCamelPopulationDataAfterParsingDatesStep = YearlyCamelPopulationDataAfterCleaningCamelPopulationByCountryDataStep;

interface ParseDatesStepInput {
  allEstimates: EstimateFieldsAfterCleaningCamelPopulationByCountryDataStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningCamelPopulationByCountryDataStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningCamelPopulationByCountryDataStep[];
  mongoClient: MongoClient;
}

interface ParseDatesStepOutput {
  allEstimates: EstimateFieldsAfterParsingDatesStep[];
  allFaoMersEvents: FaoMersEventAfterParsingDatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterParsingDatesStep[];
  mongoClient: MongoClient;
}

export const parseDatesStep = (
  input: ParseDatesStepInput
): ParseDatesStepOutput => {
  console.log(`Running step: parseDatesStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates,
    allFaoMersEvents: input.allFaoMersEvents.map((event) => ({
      ...event,
      observationDate: event.observationDate ? parse(event.observationDate, "dd/MM/yyyy", new Date()) : undefined,
      reportDate: parse(event.reportDate, "dd/MM/yyyy", new Date())
    })),
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    mongoClient: input.mongoClient
  };
};
