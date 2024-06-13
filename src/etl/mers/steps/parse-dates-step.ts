import { MongoClient } from "mongodb";
import { parse } from "date-fns";
import {
    AnimalFaoMersEventAfterCleaningFaoMersEventFieldsStep,
  EstimateFieldsAfterCleaningFaoMersEventFieldsStep,
  FaoMersEventAfterCleaningFaoMersEventFieldsStep,
  HumanFaoMersEventAfterCleaningFaoMersEventFieldsStep
} from "./clean-fao-mers-event-fields-step";

export type EstimateFieldsAfterParsingDatesStep = EstimateFieldsAfterCleaningFaoMersEventFieldsStep;
export type FaoMersEventAfterParsingDatesStep = (Omit<
  AnimalFaoMersEventAfterCleaningFaoMersEventFieldsStep,'observationDate'|'reportDate'
> | Omit <
  HumanFaoMersEventAfterCleaningFaoMersEventFieldsStep,'observationDate'|'reportDate'
>) & {
  observationDate: Date | undefined;
  reportDate: Date;
};

interface ParseDatesStepInput {
  allEstimates: EstimateFieldsAfterCleaningFaoMersEventFieldsStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningFaoMersEventFieldsStep[];
  mongoClient: MongoClient;
}

interface ParseDatesStepOutput {
  allEstimates: EstimateFieldsAfterParsingDatesStep[];
  allFaoMersEvents: FaoMersEventAfterParsingDatesStep[];
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
    mongoClient: input.mongoClient
  };
};
