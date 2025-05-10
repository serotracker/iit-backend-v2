import { MongoClient, ObjectId } from "mongodb";
import {
  AirtableCountryFieldsAfterAssigningPartitionKeysToGroupedEstimatesStep,
  AirtableEstimateFieldsAfterAssigningPartitionKeysToGroupedEstimatesStep,
  AirtableSourceFieldsAfterAssigningPartitionKeysToGroupedEstimatesStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterAssigningPartitionKeysToGroupedEstimatesStep,
  GroupedEstimatesAfterAssigningPartitionKeysToGroupedEstimatesStep,
  UnravelledGroupedEstimatesAfterAssigningPartitionKeysToGroupedEstimatesStep
} from "./assign-partition-keys-to-grouped-estimates-step";
import { assignPartitionKeysToUnravelledGroupedEstimatesStep } from "./assign-partition-keys-to-unravelled-grouped-estimates-step";

export type AirtableEstimateFieldsAfterUnravellingGroupedEstimatesStep =
  AirtableEstimateFieldsAfterAssigningPartitionKeysToGroupedEstimatesStep;
export type AirtableSourceFieldsAfterUnravellingGroupedEstimatesStep =
  AirtableSourceFieldsAfterAssigningPartitionKeysToGroupedEstimatesStep;
export type AirtableCountryFieldsAfterUnravellingGroupedEstimatesStep =
  AirtableCountryFieldsAfterAssigningPartitionKeysToGroupedEstimatesStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterUnravellingGroupedEstimatesStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterAssigningPartitionKeysToGroupedEstimatesStep;
export type GroupedEstimatesAfterUnravellingGroupedEstimatesStep =
  GroupedEstimatesAfterAssigningPartitionKeysToGroupedEstimatesStep;
export type UnravelledGroupedEstimatesAfterUnravellingGroupedEstimatesStep =
  GroupedEstimatesAfterAssigningPartitionKeysToGroupedEstimatesStep['shownEstimates'][number] & {
    shown: boolean;
    groupId: ObjectId;
  };

interface UnravelGroupedEstimatesStepInput {
  allEstimates: AirtableEstimateFieldsAfterAssigningPartitionKeysToGroupedEstimatesStep[];
  allSources: AirtableSourceFieldsAfterAssigningPartitionKeysToGroupedEstimatesStep[];
  allCountries: AirtableCountryFieldsAfterAssigningPartitionKeysToGroupedEstimatesStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterAssigningPartitionKeysToGroupedEstimatesStep[];
  groupedEstimates: GroupedEstimatesAfterAssigningPartitionKeysToGroupedEstimatesStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterAssigningPartitionKeysToGroupedEstimatesStep[];
  mongoClient: MongoClient;
}

interface UnravelGroupedEstimatesStepOutput {
  allEstimates: AirtableEstimateFieldsAfterUnravellingGroupedEstimatesStep[];
  allSources: AirtableSourceFieldsAfterUnravellingGroupedEstimatesStep[];
  allCountries: AirtableCountryFieldsAfterUnravellingGroupedEstimatesStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterUnravellingGroupedEstimatesStep[];
  groupedEstimates: GroupedEstimatesAfterUnravellingGroupedEstimatesStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterUnravellingGroupedEstimatesStep[];
  mongoClient: MongoClient;
}

export const unravelGroupedEstimatesStep = (input: UnravelGroupedEstimatesStepInput): UnravelGroupedEstimatesStepOutput => {
  console.log(`Running step: unravelGroupedEstimatesStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allCountries: input.allCountries,
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry,
    groupedEstimates: input.groupedEstimates,
    unravelledGroupedEstimates: input.groupedEstimates.flatMap((groupedEstimate) => {
      const groupId = new ObjectId();

      return [
        ...groupedEstimate.shownEstimates.map((estimate) => ({ ...estimate, shown: true, groupId })),
        ...groupedEstimate.shownEstimates.map((estimate) => ({ ...estimate, shown: false, groupId })),
      ]
    }),
    mongoClient: input.mongoClient
  };
}