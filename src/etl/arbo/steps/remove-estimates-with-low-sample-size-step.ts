import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterParsingDatesStep,
  AirtableEstimateFieldsAfterParsingDatesStep,
  AirtableSourceFieldsAfterParsingDatesStep,
} from "./parse-dates-step.js";

export type AirtableEstimateFieldsAfterRemovingEstimatesWithLowSampleSizeStep =
  Omit<AirtableEstimateFieldsAfterParsingDatesStep, 'sampleSize'> & {sampleSize: number};

export type AirtableSourceFieldsAfterRemovingEstimatesWithLowSampleSizeStep =
  AirtableSourceFieldsAfterParsingDatesStep;

export type AirtableCountryFieldsAfterRemovingEstimatesWithLowSampleSizeStep =
  AirtableCountryFieldsAfterParsingDatesStep;

interface RemoveEstimatesWithLowSampleSizeStepInput {
  allEstimates: AirtableEstimateFieldsAfterParsingDatesStep[];
  allSources: AirtableSourceFieldsAfterParsingDatesStep[];
  allCountries: AirtableCountryFieldsAfterParsingDatesStep[];
  mongoClient: MongoClient;
}

interface RemoveEstimatesWithLowSampleSizeStepOutput {
  allEstimates: AirtableEstimateFieldsAfterRemovingEstimatesWithLowSampleSizeStep[];
  allSources: AirtableSourceFieldsAfterRemovingEstimatesWithLowSampleSizeStep[];
  allCountries: AirtableCountryFieldsAfterRemovingEstimatesWithLowSampleSizeStep[];
  mongoClient: MongoClient;
}

export const removeEstimatesWithLowSampleSizeStep = (
  input: RemoveEstimatesWithLowSampleSizeStepInput
): RemoveEstimatesWithLowSampleSizeStepOutput => {
  const minimumSampleSize = 5;

  console.log(`Running step: removeEstimatesWithLowSampleSizeStep. minimumSampleSize=${minimumSampleSize}. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources, allCountries } = input;

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
    allCountries: allCountries,
    mongoClient: input.mongoClient
  };
};
