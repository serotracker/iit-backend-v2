import { z } from "zod";
import { MongoClient } from "mongodb";
import { AirtableSarsCov2EstimateFields, AirtableSarsCov2StudyFields } from "../types.js";
import { EstimateFieldsAfterFetchingPositiveCaseDataStep, StructuredPositiveCaseDataAfterFetchingPositiveCaseDataStep, StructuredVaccinationDataAfterFetchingPositiveCaseDataStep, StudyFieldsAfterFetchingPositiveCaseDataStep } from "./fetch-positive-case-data-step.js";

export type EstimateFieldsAfterValidatingFieldSetFromAirtableStep =
  AirtableSarsCov2EstimateFields;
export type StudyFieldsAfterValidatingFieldSetFromAirtableStep =
  AirtableSarsCov2StudyFields;
export type StructuredVaccinationDataAfterValidatingFieldSetFromAirtableStep = StructuredVaccinationDataAfterFetchingPositiveCaseDataStep;
export type StructuredPositiveCaseDataAfterValidatingFieldSetFromAirtableStep = StructuredPositiveCaseDataAfterFetchingPositiveCaseDataStep;

interface ValidateFieldSetFromAirtableStepInput {
  allEstimates: EstimateFieldsAfterFetchingPositiveCaseDataStep[];
  allStudies: StudyFieldsAfterFetchingPositiveCaseDataStep[];
  vaccinationData: StructuredVaccinationDataAfterFetchingPositiveCaseDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFetchingPositiveCaseDataStep;
  mongoClient: MongoClient;
}

interface ValidateFieldSetFromAirtableStepOutput {
  allEstimates: EstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
  allStudies: StudyFieldsAfterValidatingFieldSetFromAirtableStep[];
  vaccinationData: StructuredVaccinationDataAfterValidatingFieldSetFromAirtableStep;
  positiveCaseData: StructuredPositiveCaseDataAfterValidatingFieldSetFromAirtableStep;
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
  })

  const allEstimates = input.allEstimates.map((estimate) => zodSarsCov2EstimateFieldsObject.parse(estimate));
  const allStudies = input.allStudies.map((study) => zodSarsCov2StudyFieldsObject.parse(study));

  return { 
    allEstimates,
    allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    mongoClient: input.mongoClient
  };
};