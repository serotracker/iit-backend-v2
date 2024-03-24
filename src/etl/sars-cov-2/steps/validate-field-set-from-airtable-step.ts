import { FieldSet } from "airtable";
import { z } from "zod";
import { AirtableSarsCov2EstimateFields } from "../types.js";
import { StructuredPositiveCaseDataAfterFetchingPositiveCaseDataStep, StructuredVaccinationDataAfterFetchingPositiveCaseDataStep } from "./fetch-positive-case-data-step.js";

export type EstimateFieldsAfterValidatingFieldSetFromAirtableStep =
  AirtableSarsCov2EstimateFields;
export type StructuredVaccinationDataAfterValidatingFieldSetFromAirtableStep = StructuredVaccinationDataAfterFetchingPositiveCaseDataStep;
export type StructuredPositiveCaseDataAfterValidatingFieldSetFromAirtableStep = StructuredPositiveCaseDataAfterFetchingPositiveCaseDataStep;

interface ValidateFieldSetFromAirtableStepInput {
  allEstimates: FieldSet[];
  vaccinationData: StructuredVaccinationDataAfterFetchingPositiveCaseDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFetchingPositiveCaseDataStep;
}

interface ValidateFieldSetFromAirtableStepOutput {
  allEstimates: EstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
  vaccinationData: StructuredVaccinationDataAfterValidatingFieldSetFromAirtableStep;
  positiveCaseData: StructuredPositiveCaseDataAfterValidatingFieldSetFromAirtableStep;
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
    "Alpha3 Code": z.string().array(),
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
  });

  const allEstimates = input.allEstimates.map((estimate) => zodSarsCov2EstimateFieldsObject.parse(estimate));

  return { 
    allEstimates,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData
  };
};