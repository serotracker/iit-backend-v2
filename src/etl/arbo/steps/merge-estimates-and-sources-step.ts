import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterAddingCountryAndRegionInformationStep,
  AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep,
  AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterAddingCountryAndRegionInformationStep,
  GroupedEstimatesAfterAddingCountryAndRegionInformationStep,
  UnravelledGroupedEstimatesAfterAddingCountryAndRegionInformationStep
} from "./add-country-and-region-information-step.js";

export type AirtableEstimateFieldsAfterMergingEstimatesAndSourcesStep =
  AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep & {
    sourceSheetName: string | undefined;
  };
export type AirtableSourceFieldsAfterMergingEstimatesAndSourcesStep =
  AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep;
export type AirtableCountryFieldsAfterMergingEstimatesAndSourcesStep =
  AirtableCountryFieldsAfterAddingCountryAndRegionInformationStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterMergingEstimatesAndSourcesStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterAddingCountryAndRegionInformationStep;
export type GroupedEstimatesAfterMergingEstimatesAndSourcesStep =
  GroupedEstimatesAfterAddingCountryAndRegionInformationStep;
export type UnravelledGroupedEstimatesAfterMergingEstimatesAndSourcesStep =
  UnravelledGroupedEstimatesAfterAddingCountryAndRegionInformationStep;

interface MergeEstimatesAndSourcesStepInput {
  allEstimates: AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  allSources: AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep[];
  allCountries: AirtableCountryFieldsAfterAddingCountryAndRegionInformationStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterAddingCountryAndRegionInformationStep[];
  groupedEstimates: GroupedEstimatesAfterAddingCountryAndRegionInformationStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterAddingCountryAndRegionInformationStep[];
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
