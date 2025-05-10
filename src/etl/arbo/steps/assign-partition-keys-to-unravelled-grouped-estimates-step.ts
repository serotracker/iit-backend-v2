import { MongoClient } from "mongodb";
import {
    AirtableCountryFieldsAfterUnravellingGroupedEstimatesStep,
  AirtableEstimateFieldsAfterUnravellingGroupedEstimatesStep,
  AirtableSourceFieldsAfterUnravellingGroupedEstimatesStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterUnravellingGroupedEstimatesStep,
  GroupedEstimatesAfterUnravellingGroupedEstimatesStep,
  UnravelledGroupedEstimatesAfterUnravellingGroupedEstimatesStep
} from "./unravel-grouped-estimates-step";

export type AirtableEstimateFieldsAfterAssigningPartitionKeysToUnravelledGroupedEstimatesStep =
  AirtableEstimateFieldsAfterUnravellingGroupedEstimatesStep;
export type AirtableSourceFieldsAfterAssigningPartitionKeysToUnravelledGroupedEstimatesStep =
  AirtableSourceFieldsAfterUnravellingGroupedEstimatesStep;
export type AirtableCountryFieldsAfterAssigningPartitionKeysToUnravelledGroupedEstimatesStep =
  AirtableCountryFieldsAfterUnravellingGroupedEstimatesStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterAssigningPartitionKeysToUnravelledGroupedEstimatesStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterUnravellingGroupedEstimatesStep;
export type GroupedEstimatesAfterAssigningPartitionKeysToUnravelledGroupedEstimatesStep = 
  GroupedEstimatesAfterUnravellingGroupedEstimatesStep;
export type UnravelledGroupedEstimatesAfterAssigningPartitionKeysToUnravelledGroupedEstimatesStep = 
  UnravelledGroupedEstimatesAfterUnravellingGroupedEstimatesStep & {
    partitionKey: number;
  };

interface AssignPartitionKeysToUnravelledGroupedEstimatesStepInput {
  allEstimates: AirtableEstimateFieldsAfterUnravellingGroupedEstimatesStep[];
  allSources: AirtableSourceFieldsAfterUnravellingGroupedEstimatesStep[];
  allCountries: AirtableCountryFieldsAfterUnravellingGroupedEstimatesStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterUnravellingGroupedEstimatesStep[];
  groupedEstimates: GroupedEstimatesAfterUnravellingGroupedEstimatesStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterUnravellingGroupedEstimatesStep[];
  mongoClient: MongoClient;
}

interface AssignPartitionKeysToUnravelledGroupedEstimatesStepOutput {
  allEstimates: AirtableEstimateFieldsAfterAssigningPartitionKeysToUnravelledGroupedEstimatesStep[];
  allSources: AirtableSourceFieldsAfterAssigningPartitionKeysToUnravelledGroupedEstimatesStep[];
  allCountries: AirtableCountryFieldsAfterAssigningPartitionKeysToUnravelledGroupedEstimatesStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterAssigningPartitionKeysToUnravelledGroupedEstimatesStep[];
  groupedEstimates: GroupedEstimatesAfterAssigningPartitionKeysToUnravelledGroupedEstimatesStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterAssigningPartitionKeysToUnravelledGroupedEstimatesStep[];
  mongoClient: MongoClient;
}

export const assignPartitionKeysToUnravelledGroupedEstimatesStep = (
  input: AssignPartitionKeysToUnravelledGroupedEstimatesStepInput
): AssignPartitionKeysToUnravelledGroupedEstimatesStepOutput => {
  console.log(`Running step: assignPartitionKeysToUnravelledGroupedEstimatesStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allCountries: input.allCountries,
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry,
    groupedEstimates: input.groupedEstimates,
    unravelledGroupedEstimates: input.unravelledGroupedEstimates.map((groupedEstimate, index) => ({
      ...groupedEstimate,
      partitionKey: Math.floor(index / 200)
    })),
    mongoClient: input.mongoClient
  };
}