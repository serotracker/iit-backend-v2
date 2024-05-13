import { MongoClient } from "mongodb";
import {
  AirtableEstimateFieldsAfterParsingDatesStep,
  AirtableSourceFieldsAfterParsingDatesStep,
} from "./parse-dates-step.js";

export type AirtableEstimateFieldsAfterRemovingEstimatesWithLowSampleSizeStep =
  Omit<AirtableEstimateFieldsAfterParsingDatesStep, 'sampleSize'> & {sampleSize: number};

export type AirtableSourceFieldsAfterRemovingEstimatesWithLowSampleSizeStep =
  AirtableSourceFieldsAfterParsingDatesStep;

interface RemoveEstimatesWithLowSampleSizeStepInput {
  allEstimates: AirtableEstimateFieldsAfterParsingDatesStep[];
  allSources: AirtableSourceFieldsAfterParsingDatesStep[];
  mongoClient: MongoClient;
}

interface RemoveEstimatesWithLowSampleSizeStepOutput {
  allEstimates: AirtableEstimateFieldsAfterRemovingEstimatesWithLowSampleSizeStep[];
  allSources: AirtableSourceFieldsAfterRemovingEstimatesWithLowSampleSizeStep[];
  mongoClient: MongoClient;
}

export const removeEstimatesWithLowSampleSizeStep = (
  input: RemoveEstimatesWithLowSampleSizeStepInput
): RemoveEstimatesWithLowSampleSizeStepOutput => {
  const minimumSampleSize = 5;

  console.log(`Running step: removeEstimatesWithLowSampleSizeStep. minimumSampleSize=${minimumSampleSize}. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources } = input;

  return {
    allEstimates: allEstimates.filter((estimate): estimate is AirtableEstimateFieldsAfterRemovingEstimatesWithLowSampleSizeStep => {
      if (!estimate.sampleSize) {
        return false;
      }

      if (estimate.sampleSize < minimumSampleSize) {
        return false;
      }

      return true;
    }),
    allSources: allSources,
    mongoClient: input.mongoClient
  };
};
