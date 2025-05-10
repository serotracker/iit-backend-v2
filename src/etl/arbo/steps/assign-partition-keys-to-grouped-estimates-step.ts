import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep,
  AirtableEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep,
  AirtableSourceFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterGroupingEstimatesUnderPrimaryEstimateStep, 
  GroupedEstimatesAfterGroupingEstimatesUnderPrimaryEstimateStep,
  UnravelledGroupedEstimatesAfterGroupingEstimatesUnderPrimaryEstimateStep
} from "./group-estimates-under-primary-estimate-step";

export type AirtableEstimateFieldsAfterAssigningPartitionKeysToGroupedEstimatesStep =
  AirtableEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep;
export type AirtableSourceFieldsAfterAssigningPartitionKeysToGroupedEstimatesStep =
  AirtableSourceFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep;
export type AirtableCountryFieldsAfterAssigningPartitionKeysToGroupedEstimatesStep =
  AirtableCountryFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterAssigningPartitionKeysToGroupedEstimatesStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterGroupingEstimatesUnderPrimaryEstimateStep;
export type GroupedEstimatesAfterAssigningPartitionKeysToGroupedEstimatesStep = GroupedEstimatesAfterGroupingEstimatesUnderPrimaryEstimateStep & {
  partitionKey: number;
};
export type UnravelledGroupedEstimatesAfterAssigningPartitionKeysToGroupedEstimatesStep = 
  UnravelledGroupedEstimatesAfterGroupingEstimatesUnderPrimaryEstimateStep;


interface AssignPartitionKeysToGroupedEstimatesStepInput {
  allEstimates: AirtableEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep[];
  allSources: AirtableSourceFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep[];
  allCountries: AirtableCountryFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterGroupingEstimatesUnderPrimaryEstimateStep[];
  groupedEstimates: GroupedEstimatesAfterGroupingEstimatesUnderPrimaryEstimateStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterGroupingEstimatesUnderPrimaryEstimateStep[];
  mongoClient: MongoClient;
}

interface AssignPartitionKeysToGroupedEstimatesStepOutput {
  allEstimates: AirtableEstimateFieldsAfterAssigningPartitionKeysToGroupedEstimatesStep[];
  allSources: AirtableSourceFieldsAfterAssigningPartitionKeysToGroupedEstimatesStep[];
  allCountries: AirtableCountryFieldsAfterAssigningPartitionKeysToGroupedEstimatesStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterAssigningPartitionKeysToGroupedEstimatesStep[];
  groupedEstimates: GroupedEstimatesAfterAssigningPartitionKeysToGroupedEstimatesStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterAssigningPartitionKeysToGroupedEstimatesStep[];
  mongoClient: MongoClient;
}

export const assignPartitionKeysToGroupedEstimatesStep = (
    input: AssignPartitionKeysToGroupedEstimatesStepInput
): AssignPartitionKeysToGroupedEstimatesStepOutput => {
  console.log(`Running step: assignPartitionKeysToGroupedEstimatesStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allCountries: input.allCountries,
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry,
    groupedEstimates: input.groupedEstimates.map((groupedEstimate, index) => ({
      ...groupedEstimate,
      partitionKey: Math.floor(index / 200)
    })),
    unravelledGroupedEstimates: input.unravelledGroupedEstimates,
    mongoClient: input.mongoClient
  };
}