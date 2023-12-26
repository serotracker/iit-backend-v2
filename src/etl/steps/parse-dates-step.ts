import { parse } from "date-fns";
import {
  AirtableEstimateFieldsAfterCleaningSingleElementArrayFieldsStep,
  AirtableSourceFieldsAfterCleaningSingleElementArrayFieldsStep,
} from "./clean-single-element-array-fields-step";

export type AirtableEstimateFieldsAfterParsingDatesStep = Omit<
  AirtableEstimateFieldsAfterCleaningSingleElementArrayFieldsStep,
  "sampleStartDate" | "sampleEndDate"
> & {
  sampleStartDate: Date;
  sampleEndDate: Date;
};

export type AirtableSourceFieldsAfterParsingDatesStep =
  AirtableSourceFieldsAfterCleaningSingleElementArrayFieldsStep;

interface ParseDatesStepInput {
  allEstimates: AirtableEstimateFieldsAfterCleaningSingleElementArrayFieldsStep[];
  allSources: AirtableSourceFieldsAfterCleaningSingleElementArrayFieldsStep[];
}

interface ParseDatesStepOutput {
  allEstimates: AirtableEstimateFieldsAfterParsingDatesStep[];
  allSources: AirtableSourceFieldsAfterParsingDatesStep[];
}

export const parseDatesStep = (
  input: ParseDatesStepInput
): ParseDatesStepOutput => {
  console.log("Running step: parseDatesStep");

  const { allEstimates, allSources } = input;

  return {
    allEstimates: allEstimates.map((estimate) => {
      return {
        ...estimate,
        sampleStartDate: parse("yyyy-MM-dd", estimate.sampleStartDate, new Date()),
        sampleEndDate: parse("yyyy-MM-dd", estimate.sampleEndDate, new Date()),
      };
    }),
    allSources: allSources,
  };
};
