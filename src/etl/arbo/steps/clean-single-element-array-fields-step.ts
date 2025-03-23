import { MongoClient } from "mongodb";
import {
  AirtableEstimateFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep,
  AirtableSourceFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep,
  AirtableCountryFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterCleaningFieldNamesAndRemoveUnusedFieldsStep,
  GroupedEstimatesAfterCleaningFieldNamesAndRemoveUnusedFieldsStep,
} from "./clean-field-names-and-remove-unused-fields-step.js";

export type AirtableEstimateFieldsAfterCleaningSingleElementArrayFieldsStep = Omit<
  AirtableEstimateFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep,
  "url" | "sourceSheetId" | "whoRegion" | "countryId"
> & {
  url: string | undefined;
  sourceSheetId: string | undefined;
  whoRegion: string | undefined;
  countryId: string | undefined;
};

export type AirtableSourceFieldsAfterCleaningSingleElementArrayFieldsStep =
  AirtableSourceFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep;

export type AirtableCountryFieldsAfterCleaningSingleElementArrayFieldsStep =
  AirtableCountryFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep;

export type EnvironmentalSuitabilityStatsByCountryEntryAfterCleaningSingleElementArrayFieldsStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterCleaningFieldNamesAndRemoveUnusedFieldsStep;
export type GroupedEstimatesAfterCleaningSingleElementArrayFieldsStep =
  GroupedEstimatesAfterCleaningFieldNamesAndRemoveUnusedFieldsStep;

interface CleanSingleElementArrayFieldsStepInput {
  allEstimates: AirtableEstimateFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep[];
  allSources: AirtableSourceFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep[];
  allCountries: AirtableCountryFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterCleaningFieldNamesAndRemoveUnusedFieldsStep[];
  groupedEstimates: GroupedEstimatesAfterCleaningFieldNamesAndRemoveUnusedFieldsStep[];
  mongoClient: MongoClient;
}

interface CleanSingleElementArrayFieldsStepOutput {
  allEstimates: AirtableEstimateFieldsAfterCleaningSingleElementArrayFieldsStep[];
  allSources: AirtableSourceFieldsAfterCleaningSingleElementArrayFieldsStep[];
  allCountries: AirtableCountryFieldsAfterCleaningSingleElementArrayFieldsStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterCleaningSingleElementArrayFieldsStep[];
  groupedEstimates: GroupedEstimatesAfterCleaningSingleElementArrayFieldsStep[];
  mongoClient: MongoClient;
}

export const cleanSingleElementArrayFieldsStep = (
  input: CleanSingleElementArrayFieldsStepInput
): CleanSingleElementArrayFieldsStepOutput => {
  console.log(`Running step: cleanSingleElementArrayFieldsStep. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources, allCountries } = input;

  return {
    allEstimates: allEstimates.map((estimate) => {
      return {
        ...estimate,
        url: estimate.url?.[0],
        sourceSheetId: estimate.sourceSheetId?.[0],
        whoRegion: estimate.whoRegion?.[0],
        countryId: estimate.countryId?.[0],
      };
    }),
    allSources: allSources,
    allCountries: allCountries,
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry,
    groupedEstimates: input.groupedEstimates,
    mongoClient: input.mongoClient
  };
};
