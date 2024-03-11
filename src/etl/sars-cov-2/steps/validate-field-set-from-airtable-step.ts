import { FieldSet } from "airtable";
import { z } from "zod";
import { AirtableSarsCov2EstimateFields } from "../types.js";
import { isArrayOfUnknownType } from "../../../lib/lib.js";

export type EstimateFieldsAfterValidatingFieldSetFromAirtableStep =
  AirtableSarsCov2EstimateFields;

interface ValidateFieldSetFromAirtableStepInput {
  allEstimates: FieldSet[];
}

interface ValidateFieldSetFromAirtableStepOutput {
  allEstimates: EstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
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
    "Overall Risk of Bias (JBI)": z
      .optional(
        z.union([
          z.string().nullable(),
          z.object({ error: z.string() }),
        ]).array()
      )
      .transform((field) => {
        if (!field) {
          return [];
        }

        return field.map((element) => {
          if (typeof element === 'string') {
            return element;
          }

          return undefined
        }).filter(<T>(element: T | undefined): element is T => !!element)
      }),
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
  });

  const allEstimates = input.allEstimates.map((estimate) => {
    console.log(estimate);

    return zodSarsCov2EstimateFieldsObject.parse(estimate)
  });

  return { allEstimates };
};
