import { FieldSet } from "airtable";
import { z } from "zod";
import { AirtableSarsCov2EstimateFields } from "../types.js";

export type EstimateFieldsAfterValidatingFieldSetFromAirtableStep = AirtableSarsCov2EstimateFields;

interface ValidateFieldSetFromAirtableStepInput {
  allEstimates: FieldSet[];
}

interface ValidateFieldSetFromAirtableStepOutput {
  allEstimates: EstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
}

export const validateFieldSetFromAirtableStep = (input: ValidateFieldSetFromAirtableStepInput): ValidateFieldSetFromAirtableStepOutput => {
  console.log(
    `Running step: validateFieldSetFromAirtableStep. Remaining estimates: ${input.allEstimates.length}`
  );

  const zodSarsCov2EstimateFieldsObject = z.object({
    "id": z.string(),
    "Source Type": z.optional(z.string().nullable().array()).transform((field) => field ?? []),
    "Overall Risk of Bias (JBI)": z.optional(z.string().nullable().array()).transform((field) => field ?? []),
    "Sample Frame (age)": z.optional(z.string().nullable()).transform((field) => field ?? null),
    "Sample Frame (sex)": z.optional(z.string().nullable()).transform((field) => field ?? null),
    "Sample Frame (groups of interest)": z.optional(z.string().nullable()).transform((field) => field ?? null),
    "ETL Included": z.number(),
    "Country": z.optional(z.string().nullable()).transform((field) => field ?? null),
    "State/Province": z.optional(z.string().nullable()).transform((field) => field ?? null),
    "County": z.optional(z.string().nullable()).transform((field) => field ?? null),
    "City": z.optional(z.string().nullable()).transform((field) => field ?? null),
    "Grade of Estimate Scope": z.optional(z.string().nullable()).transform((field) => field ?? null),
    "Sampling End Date": z.optional(z.string().nullable()).transform((field) => field ?? null),
    "Sampling Start Date": z.optional(z.string().nullable()).transform((field) => field ?? null),
  })
  const allEstimates = input.allEstimates.map((estimate) => zodSarsCov2EstimateFieldsObject.parse(estimate));

  return { allEstimates };
}