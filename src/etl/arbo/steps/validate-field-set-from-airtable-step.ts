import { z } from "zod";
import { MongoClient } from "mongodb";
import { FieldSet } from "airtable";
import { AirtableEstimateFields, AirtableSourceFields, AirtableCountryFields } from "../types.js";

export type AirtableEstimateFieldsAfterValidatingFieldSetFromAirtableStep = AirtableEstimateFields;
export type AirtableSourceFieldsAfterValidatingFieldSetFromAirtableStep = AirtableSourceFields;
export type AirtableCountryFieldsAfterValidatingFieldSetFromAirtableStep = AirtableCountryFields;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterValidatingFieldSetFromAirtableStep = never;
export type GroupedEstimatesAfterValidatingFieldSetFromAirtableStep = never;

interface ValidateFieldSetFromAirtableStepInput {
  allEstimates: AirtableEstimateFields[];
  allSources: AirtableSourceFields[];
  allCountries: Array<FieldSet & {id: string}>;
  environmentalSuitabilityStatsByCountry: never[];
  groupedEstimates: never[];
  mongoClient: MongoClient;
}

interface ValidateFieldSetFromAirtableStepOutput {
  allEstimates: AirtableEstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
  allSources: AirtableSourceFieldsAfterValidatingFieldSetFromAirtableStep[];
  allCountries: AirtableCountryFieldsAfterValidatingFieldSetFromAirtableStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterValidatingFieldSetFromAirtableStep[];
  groupedEstimates: GroupedEstimatesAfterValidatingFieldSetFromAirtableStep[];
  mongoClient: MongoClient;
}

export const validateFieldSetFromAirtableStep = (
  input: ValidateFieldSetFromAirtableStepInput
): ValidateFieldSetFromAirtableStepOutput => {
  console.log(`Running step: validateFieldSetFromAirtableStep. Remaining estimates: ${input.allEstimates.length}.`);

  const zodCountryFieldsObject = z.object({
    id: z.string(),
    Country: z.string(),
    "Alpha3 Code": z.string(),
    "Alpha2 Code": z.string()
  })

  const allCountries = input.allCountries.map((country) => zodCountryFieldsObject.parse(country));

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allCountries: allCountries,
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry,
    groupedEstimates: input.groupedEstimates,
    mongoClient: input.mongoClient
  };
};
