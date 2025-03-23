import { MongoClient } from "mongodb";
import { parse } from "date-fns";
import {
  AirtableCountryFieldsAfterAssigningEstimateTypesStep,
  AirtableEstimateFieldsAfterAssigningEstimateTypesStep,
  AirtableSourceFieldsAfterAssigningEstimateTypesStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterAssigningEstimateTypesStep,
  GroupedEstimatesAfterAssigningEstimateTypesStep
} from "./assign-estimate-types-step.js";

export type AirtableEstimateFieldsAfterParsingDatesStep = Omit<
  AirtableEstimateFieldsAfterAssigningEstimateTypesStep,
  "sampleStartDate" | "sampleEndDate"
> & {
  sampleStartDate: Date | undefined;
  sampleEndDate: Date | undefined;
};
export type AirtableSourceFieldsAfterParsingDatesStep =
  AirtableSourceFieldsAfterAssigningEstimateTypesStep;
export type AirtableCountryFieldsAfterParsingDatesStep =
  AirtableCountryFieldsAfterAssigningEstimateTypesStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterParsingDatesStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterAssigningEstimateTypesStep;
export type GroupedEstimatesAfterParsingDatesStep =
  GroupedEstimatesAfterAssigningEstimateTypesStep;

interface ParseDatesStepInput {
  allEstimates: AirtableEstimateFieldsAfterAssigningEstimateTypesStep[];
  allSources: AirtableSourceFieldsAfterAssigningEstimateTypesStep[];
  allCountries: AirtableCountryFieldsAfterAssigningEstimateTypesStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterAssigningEstimateTypesStep[];
  groupedEstimates: GroupedEstimatesAfterAssigningEstimateTypesStep[];
  mongoClient: MongoClient;
}

interface ParseDatesStepOutput {
  allEstimates: AirtableEstimateFieldsAfterParsingDatesStep[];
  allSources: AirtableSourceFieldsAfterParsingDatesStep[];
  allCountries: AirtableCountryFieldsAfterParsingDatesStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterParsingDatesStep[];
  groupedEstimates: GroupedEstimatesAfterParsingDatesStep[];
  mongoClient: MongoClient;
}

export const parseDatesStep = (
  input: ParseDatesStepInput
): ParseDatesStepOutput => {
  console.log(`Running step: parseDatesStep. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources, allCountries } = input;

  return {
    allEstimates: allEstimates.map((estimate) => {
      return {
        ...estimate,
        sampleStartDate: estimate.sampleStartDate ? parse(estimate.sampleStartDate, "yyyy-MM-dd", new Date()) : undefined,
        sampleEndDate: estimate.sampleEndDate ? parse(estimate.sampleEndDate, "yyyy-MM-dd", new Date()) : undefined,
      };
    }),
    allSources: allSources,
    allCountries: allCountries,
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry,
    groupedEstimates: input.groupedEstimates,
    mongoClient: input.mongoClient
  };
};
