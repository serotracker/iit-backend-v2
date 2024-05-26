import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterRemovingEstimatesWithLowSampleSizeStep,
  AirtableEstimateFieldsAfterRemovingEstimatesWithLowSampleSizeStep,
  AirtableSourceFieldsAfterRemovingEstimatesWithLowSampleSizeStep,
} from "./remove-estimates-with-low-sample-size-step.js";

export type AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep =
  Omit<AirtableEstimateFieldsAfterRemovingEstimatesWithLowSampleSizeStep, "includeInEtl"> & {
    includeInEtl: 1;
  };

export type AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep =
  AirtableSourceFieldsAfterRemovingEstimatesWithLowSampleSizeStep;

export type AirtableCountryFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep =
  AirtableCountryFieldsAfterRemovingEstimatesWithLowSampleSizeStep;

interface RemoveRecordsThatAreFlaggedToNotSaveStepInput {
  allEstimates: AirtableEstimateFieldsAfterRemovingEstimatesWithLowSampleSizeStep[];
  allSources: AirtableSourceFieldsAfterRemovingEstimatesWithLowSampleSizeStep[];
  allCountries: AirtableCountryFieldsAfterRemovingEstimatesWithLowSampleSizeStep[];
  mongoClient: MongoClient;
}

interface RemoveRecordsThatAreFlaggedToNotSaveStepOutput {
  allEstimates: AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  allSources: AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  allCountries: AirtableCountryFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  mongoClient: MongoClient;
}

export const removeRecordsThatAreFlaggedToNotSaveStep = (
  input: RemoveRecordsThatAreFlaggedToNotSaveStepInput
): RemoveRecordsThatAreFlaggedToNotSaveStepOutput => {
  console.log(`Running step: removeRecordsThatAreFlaggedToNotSaveStep. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources, allCountries } = input;

  return {
    allEstimates: allEstimates.filter((estimate): estimate is AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep =>
      estimate.includeInEtl === 1
    ),
    allSources: allSources,
    allCountries: allCountries,
    mongoClient: input.mongoClient
  };
};
