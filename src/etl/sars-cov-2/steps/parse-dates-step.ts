import { parse } from "date-fns";
import { EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep } from "./remove-records-that-are-flagged-to-not-save-step";

export type EstimateFieldsAfterParsingDatesStep = Omit<EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep, 'samplingEndDate' | 'samplingStartDate'> & {
  samplingStartDate: Date | undefined;
  samplingEndDate: Date | undefined;
};

interface ParseDatesStepInput {
  allEstimates: EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep[];
}

interface ParseDatesStepOutput {
  allEstimates: EstimateFieldsAfterParsingDatesStep[];
}

export const parseDatesStep = (input: ParseDatesStepInput): ParseDatesStepOutput => {
  console.log(
    `Running step: parseDatesStep. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates.map((estimate) => {
      return {
        ...estimate,
        samplingStartDate: estimate.samplingStartDate ? parse(estimate.samplingStartDate, "yyyy-MM-dd", new Date()) : undefined,
        samplingEndDate: estimate.samplingEndDate ? parse(estimate.samplingEndDate, "yyyy-MM-dd", new Date()) : undefined,
      };
    }),
  };
}