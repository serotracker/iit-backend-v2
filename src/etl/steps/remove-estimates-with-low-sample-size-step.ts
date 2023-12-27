import { AirtableEstimateFieldsAfterParsingDatesStep, AirtableSourceFieldsAfterParsingDatesStep } from "./parse-dates-step.js";

export type AirtableEstimateFieldsAfterRemovingEstimatesWithLowSampleSizeStep = AirtableEstimateFieldsAfterParsingDatesStep;

export type AirtableSourceFieldsAfterRemovingEstimatesWithLowSampleSizeStep = AirtableSourceFieldsAfterParsingDatesStep;

interface RemoveEstimatesWithLowSampleSizeStepInput {
  allEstimates: AirtableEstimateFieldsAfterParsingDatesStep[];
  allSources: AirtableSourceFieldsAfterParsingDatesStep[];
}

interface RemoveEstimatesWithLowSampleSizeStepOutput {
  allEstimates: AirtableEstimateFieldsAfterRemovingEstimatesWithLowSampleSizeStep[];
  allSources: AirtableSourceFieldsAfterRemovingEstimatesWithLowSampleSizeStep[];
}

export const removeEstimatesWithLowSampleSizeStep = (
  input: RemoveEstimatesWithLowSampleSizeStepInput
): RemoveEstimatesWithLowSampleSizeStepOutput => {
  const minimumSampleSize = 5;

  console.log(`Running step: removeEstimatesWithLowSampleSizeStep. minimumSampleSize=${minimumSampleSize}`);

  const { allEstimates, allSources } = input;

  return {
    allEstimates: allEstimates.filter((estimate) => {estimate.sampleSize >= minimumSampleSize}),
    allSources: allSources,
  };
};
