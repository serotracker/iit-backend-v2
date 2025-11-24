import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterGeneratingGeographicScopeFieldStep,
  AirtableEstimateFieldsAfterGeneratingGeographicScopeFieldStep,
  AirtableSourceFieldsAfterGeneratingGeographicScopeFieldStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterGeneratingGeographicScopeFieldStep,
  GroupedEstimatesAfterGeneratingGeographicScopeFieldStep,
  UnravelledGroupedEstimatesAfterGeneratingGeographicScopeFieldStep
} from "./generate-geographic-scope-field-step.js";

export type AirtableEstimateFieldsAfterMergingEstimatesAndSourcesStep =
  AirtableEstimateFieldsAfterGeneratingGeographicScopeFieldStep & {
    sourceSheetName: string | undefined;
  };
export type AirtableSourceFieldsAfterMergingEstimatesAndSourcesStep =
  AirtableSourceFieldsAfterGeneratingGeographicScopeFieldStep;
export type AirtableCountryFieldsAfterMergingEstimatesAndSourcesStep =
  AirtableCountryFieldsAfterGeneratingGeographicScopeFieldStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterMergingEstimatesAndSourcesStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterGeneratingGeographicScopeFieldStep;
export type GroupedEstimatesAfterMergingEstimatesAndSourcesStep =
  GroupedEstimatesAfterGeneratingGeographicScopeFieldStep;
export type UnravelledGroupedEstimatesAfterMergingEstimatesAndSourcesStep =
  UnravelledGroupedEstimatesAfterGeneratingGeographicScopeFieldStep;

interface MergeEstimatesAndSourcesStepInput {
  allEstimates: AirtableEstimateFieldsAfterGeneratingGeographicScopeFieldStep[];
  allSources: AirtableSourceFieldsAfterGeneratingGeographicScopeFieldStep[];
  allCountries: AirtableCountryFieldsAfterGeneratingGeographicScopeFieldStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterGeneratingGeographicScopeFieldStep[];
  groupedEstimates: GroupedEstimatesAfterGeneratingGeographicScopeFieldStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterGeneratingGeographicScopeFieldStep[];
  mongoClient: MongoClient;
}

interface MergeEstimatesAndSourcesStepOutput {
  allEstimates: AirtableEstimateFieldsAfterMergingEstimatesAndSourcesStep[];
  allSources: AirtableSourceFieldsAfterMergingEstimatesAndSourcesStep[];
  allCountries: AirtableCountryFieldsAfterMergingEstimatesAndSourcesStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterMergingEstimatesAndSourcesStep[];
  groupedEstimates: GroupedEstimatesAfterMergingEstimatesAndSourcesStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterMergingEstimatesAndSourcesStep[];
  mongoClient: MongoClient;
}

export const mergeEstimatesAndSourcesStep = (
  input: MergeEstimatesAndSourcesStepInput
): MergeEstimatesAndSourcesStepOutput => {
  console.log(`Running step: mergeEstimatesAndSourcesStep. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources, allCountries } = input;

  return {
    allEstimates: allEstimates.map((estimate) => {
      const associatedSource = allSources.find(
        (source) => source.id === estimate.sourceSheetId
      );

      return {
        ...estimate,
        sourceSheetName: associatedSource?.sourceSheetName,
      };
    }),
    allSources: allSources,
    allCountries: allCountries,
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry,
    groupedEstimates: input.groupedEstimates,
    unravelledGroupedEstimates: input.unravelledGroupedEstimates,
    mongoClient: input.mongoClient
  };
};
