import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterRemovingEstimatesWithLowSampleSizeStep,
  AirtableEstimateFieldsAfterRemovingEstimatesWithLowSampleSizeStep,
  AirtableSourceFieldsAfterRemovingEstimatesWithLowSampleSizeStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterRemovingEstimatesWithLowSampleSizeStep,
  GroupedEstimatesAfterRemovingEstimatesWithLowSampleSizeStep,
  UnravelledGroupedEstimatesAfterRemovingEstimatesWithLowSampleSizeStep,
} from "./remove-estimates-with-low-sample-size-step.js";

export type AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep =
  Omit<AirtableEstimateFieldsAfterRemovingEstimatesWithLowSampleSizeStep, "includeInEtl"> & {
    includeInEtl: 1;
  };
export type AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep =
  AirtableSourceFieldsAfterRemovingEstimatesWithLowSampleSizeStep;
export type AirtableCountryFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep =
  AirtableCountryFieldsAfterRemovingEstimatesWithLowSampleSizeStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterRemovingRecordsThatAreFlaggedToNotSaveStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterRemovingEstimatesWithLowSampleSizeStep;
export type GroupedEstimatesAfterRemovingRecordsThatAreFlaggedToNotSaveStep =
  GroupedEstimatesAfterRemovingEstimatesWithLowSampleSizeStep;
export type UnravelledGroupedEstimatesAfterRemovingRecordsThatAreFlaggedToNotSaveStep =
  UnravelledGroupedEstimatesAfterRemovingEstimatesWithLowSampleSizeStep;

interface RemoveRecordsThatAreFlaggedToNotSaveStepInput {
  allEstimates: AirtableEstimateFieldsAfterRemovingEstimatesWithLowSampleSizeStep[];
  allSources: AirtableSourceFieldsAfterRemovingEstimatesWithLowSampleSizeStep[];
  allCountries: AirtableCountryFieldsAfterRemovingEstimatesWithLowSampleSizeStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterRemovingEstimatesWithLowSampleSizeStep[];
  groupedEstimates: GroupedEstimatesAfterRemovingEstimatesWithLowSampleSizeStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterRemovingEstimatesWithLowSampleSizeStep[];
  mongoClient: MongoClient;
}

interface RemoveRecordsThatAreFlaggedToNotSaveStepOutput {
  allEstimates: AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  allSources: AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  allCountries: AirtableCountryFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  groupedEstimates: GroupedEstimatesAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
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
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry,
    groupedEstimates: input.groupedEstimates,
    unravelledGroupedEstimates: input.unravelledGroupedEstimates,
    mongoClient: input.mongoClient
  };
};
