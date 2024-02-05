import { parse } from "date-fns";
import { AirtableEstimateFieldsAfterAssertingMandatoryFieldsArePresentStep, AirtableSourceFieldsAfterAssertingMandatoryFieldsArePresentStep } from "./assert-mandatory-fields-are-present-step.js";

export type AirtableEstimateFieldsAfterParsingDatesStep = Omit<
  AirtableEstimateFieldsAfterAssertingMandatoryFieldsArePresentStep,
  "sampleStartDate" | "sampleEndDate"
> & {
  sampleStartDate: Date | undefined;
  sampleEndDate: Date | undefined;
};

export type AirtableSourceFieldsAfterParsingDatesStep =
  AirtableSourceFieldsAfterAssertingMandatoryFieldsArePresentStep;

interface ParseDatesStepInput {
  allEstimates: AirtableEstimateFieldsAfterAssertingMandatoryFieldsArePresentStep[];
  allSources: AirtableSourceFieldsAfterParsingDatesStep[];
}

interface ParseDatesStepOutput {
  allEstimates: AirtableEstimateFieldsAfterParsingDatesStep[];
  allSources: AirtableSourceFieldsAfterParsingDatesStep[];
}

export const parseDatesStep = (
  input: ParseDatesStepInput
): ParseDatesStepOutput => {
  console.log(`Running step: parseDatesStep. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources } = input;

  return {
    allEstimates: allEstimates.map((estimate) => {
      return {
        ...estimate,
        sampleStartDate: estimate.sampleStartDate ? parse(estimate.sampleStartDate, "yyyy-MM-dd", new Date()) : undefined,
        sampleEndDate: estimate.sampleEndDate ? parse(estimate.sampleEndDate, "yyyy-MM-dd", new Date()) : undefined,
      };
    }),
    allSources: allSources,
  };
};
