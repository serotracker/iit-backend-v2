import { z } from "zod";
import { MongoClient } from "mongodb";
import { AirtableSarsCov2CountryFields, AirtableSarsCov2EstimateFields, AirtableSarsCov2StudyFields } from "../types.js";
import {
  CountryFieldsAfterFetchingCountryPopulationStep,
  EstimateFieldsAfterFetchingCountryPopulationStep,
  StructuredCountryPopulationDataAfterFetchingCountryPopulationStep,
  StructuredPositiveCaseDataAfterFetchingCountryPopulationStep,
  StructuredVaccinationDataAfterFetchingCountryPopulationStep,
  StudyFieldsAfterFetchingCountryPopulationStep
} from "./fetch-country-population-data-step.js";

export type EstimateFieldsAfterValidatingFieldSetFromAirtableStep =
  AirtableSarsCov2EstimateFields;
export type StudyFieldsAfterValidatingFieldSetFromAirtableStep =
  AirtableSarsCov2StudyFields;
export type CountryFieldsAfterValidatingFieldSetFromAirtableStep =
  AirtableSarsCov2CountryFields;
export type StructuredVaccinationDataAfterValidatingFieldSetFromAirtableStep = StructuredVaccinationDataAfterFetchingCountryPopulationStep;
export type StructuredPositiveCaseDataAfterValidatingFieldSetFromAirtableStep = StructuredPositiveCaseDataAfterFetchingCountryPopulationStep;
export type StructuredCountryPopulationDataAfterValidatingFieldSetFromAirtableStep = StructuredCountryPopulationDataAfterFetchingCountryPopulationStep;

interface ValidateFieldSetFromAirtableStepInput {
  allEstimates: EstimateFieldsAfterFetchingCountryPopulationStep[];
  allStudies: StudyFieldsAfterFetchingCountryPopulationStep[];
  allCountries: CountryFieldsAfterFetchingCountryPopulationStep[];
  vaccinationData: StructuredVaccinationDataAfterFetchingCountryPopulationStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFetchingCountryPopulationStep;
  countryPopulationData: StructuredCountryPopulationDataAfterFetchingCountryPopulationStep;
  mongoClient: MongoClient;
}

interface ValidateFieldSetFromAirtableStepOutput {
  allEstimates: EstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
  allStudies: StudyFieldsAfterValidatingFieldSetFromAirtableStep[];
  allCountries: CountryFieldsAfterValidatingFieldSetFromAirtableStep[];
  vaccinationData: StructuredVaccinationDataAfterValidatingFieldSetFromAirtableStep;
  positiveCaseData: StructuredPositiveCaseDataAfterValidatingFieldSetFromAirtableStep;
  countryPopulationData: StructuredCountryPopulationDataAfterValidatingFieldSetFromAirtableStep;
  mongoClient: MongoClient;
}

export const validateFieldSetFromAirtableStep = (
  input: ValidateFieldSetFromAirtableStepInput
): ValidateFieldSetFromAirtableStepOutput => {
  console.log(
    `Running step: validateFieldSetFromAirtableStep. Remaining estimates: ${input.allEstimates.length}`
  );

  const zodSarsCov2EstimateFieldsObject = z.object({
    id: z.string(),
    "Source Type": z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    "Alpha3 Code": z
      .optional(
        z.union([
          z.string().nullable(),
          z.object({ error: z.string() }),
        ]).array()
      )
      .transform((field) => field ?? []),
    "Overall Risk of Bias (JBI)": z
      .optional(
        z.union([
          z.string().nullable(),
          z.object({ error: z.string() }),
        ]).array()
      )
      .transform((field) => field ?? []),
    "Sample Frame (age)": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Sample Frame (sex)": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Sample Frame (groups of interest)": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "ETL Included": z.number(),
    Country: z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "State/Province": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    County: z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    City: z.optional(z.string().nullable()).transform((field) => field ?? null),
    "Grade of Estimate Scope": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Sampling End Date": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Publication Date (ISO)": z.union([
      z.optional(z.string().nullable()).transform((field) => field ?? null),
      z.object({ error: z.string() }),
    ]),
    "Sampling Start Date": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Test Type": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Isotype(s) Reported": z
      .optional(z.union([
        z.string().nullable(),
        z.string().nullable().array()
      ]))
      .transform((field) => field ?? null),
    "UNITY: Criteria": z
      .optional(
        z.union([
          z.string().nullable(),
          z.object({ error: z.string() }),
        ]).array()
      )
      .transform((field) => field ?? []),
    "Antibody target": z
      .optional(z.union([
        z.string().nullable(),
        z.string().nullable().array()
      ]))
      .transform((field) => field ?? null),
    "Rapid Review: Study": z
      .optional(
        z.union([
          z.string().nullable(),
          z.object({ error: z.string() }),
        ]).array()
      )
      .transform((field) => field ?? []),
    "Denominator Value": z.optional(z.number()).transform((field) => field ?? null),
    "Numerator Value": z.optional(z.number()).transform((field) => field ?? null),
    "Prevalence Estimate Name": z.optional(z.string()).transform((field) => field ?? null),
    "URL": z
      .optional(
        z.union([
          z.string().nullable(),
          z.object({ error: z.string() }),
        ]).array()
      )
      .transform((field) => field ?? []),
    "SeroTracker Analysis Primary Estimate": z
      .optional(z.boolean())
      .transform((field) => field ?? false),
    "Serum positive prevalence (%)": z
      .optional(z.number())
      .transform((field) => field ?? null),
  });

  const zodSarsCov2StudyFieldsObject = z.object({
    id: z.string(),
    "Source Name (from Rapid Review: Source)": z
      .optional(
        z.union([
          z.string().nullable(),
          z.object({ error: z.string() }),
        ]).array()
      )
      .transform((field) => field ?? []),
    "Study Type": z
      .optional(z.string())
      .transform((field) => field ?? null),
  })

  const zodSarsCov2CountryFieldsObject = z.object({
    id: z.string(),
    "Country": z.string(),
    "Alpha3 Code": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Alpha2 Code": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null)
  })

  const allEstimates = input.allEstimates.map((estimate) => zodSarsCov2EstimateFieldsObject.parse(estimate));
  const allStudies = input.allStudies.map((study) => zodSarsCov2StudyFieldsObject.parse(study));
  const allCountries = input.allCountries.map((country) => zodSarsCov2CountryFieldsObject.parse(country));

  return { 
    allEstimates,
    allStudies,
    allCountries,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};