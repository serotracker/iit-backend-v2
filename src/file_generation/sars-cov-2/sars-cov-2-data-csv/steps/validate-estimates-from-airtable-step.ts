import { z } from "zod";
import { FieldSet } from "airtable";

export interface EstimateFieldsAfterValidatingEstimatesFromAirtableStep {
  id: string;
  "Prevalence Estimate Name": string | null;
  "Rapid Review Study Name (Text)": string | null;
  "Source Name": Array<string | null>;
  "Publication Date": Array<string | null>;
  "Source Type": Array<string | null>;
  "Grade of Estimate Scope": string | null;
  "Study Type": Array<string | null>;
  "Country": string | null;
  "State/Province": string | null;
  "City": string | null;
  "Study Inclusion Criteria": Array<string | null>;
  "Study Exclusion Criteria": Array<string | null>;
  "Sampling Start Date (ISO)": string | null;
  "Sampling End Date (ISO)": string | null;
  "Sample Frame (groups of interest)": string | null;
  "Sample Frame (sex)": string | null;
  "Sample Frame (age)": string | null;
  "Age Minimum": number | null;
  "Age Maximum": number | null;
  "Sub-grouping Variable": string | null;
  "Sub-group specific category (clean)": string | null;
  "Denominator Value": number | null;
};

interface ValidateEstimatesFromAirtableStepInput {
  allEstimates: FieldSet[];
}

interface ValidateEstimatesFromAirtableStepOutput {
  allEstimates: EstimateFieldsAfterValidatingEstimatesFromAirtableStep[];
}

export const validateEstimatesFromAirtableStep = (input: ValidateEstimatesFromAirtableStepInput): ValidateEstimatesFromAirtableStepOutput => {
  console.log(`Running step: validateEstimatesFromAirtableStep. Remaining estimates: ${input.allEstimates.length}`);

  const zodSarsCov2EstimateFieldsObject = z.object({
    id: z.string(),
    "Prevalence Estimate Name": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Rapid Review Study Name (Text)": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Source Name": z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    "Publication Date": z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    "Source Type": z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    "Grade of Estimate Scope": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Study Type": z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    "Country": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "State/Province": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "City": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Study Inclusion Criteria": z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    "Study Exclusion Criteria": z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    "Sampling Start Date (ISO)": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Sampling End Date (ISO)": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Sample Frame (groups of interest)": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Sample Frame (sex)": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Sample Frame (age)": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Age Minimum": z
      .optional(z.number().nullable())
      .transform((field) => field ?? null),
    "Age Maximum": z
      .optional(z.number().nullable())
      .transform((field) => field ?? null),
    "Sub-grouping Variable": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Sub-group specific category (clean)": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Denominator Value": z
      .optional(z.number().nullable())
      .transform((field) => field ?? null),
  })

  return {
    allEstimates: input.allEstimates.map((estimate) => zodSarsCov2EstimateFieldsObject.parse(estimate))
  };
}