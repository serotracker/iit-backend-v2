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
  "Serum positive prevalence": number | null;
  "estimate check 95% lower bound": number | string | null;
  "estimate check 95% upper bound": number | string | null;
  "SeroTracker Analysis Primary Estimate": boolean | null;
  "Test Adjustment": boolean | null;
  "Population Adjustment": boolean | null;
  "Clustering Adjustment": boolean | null;
  "Academic Primary Estimate": boolean | null;
  "Sampling Method": string | null;
  "Test Name": string | null;
  "Test Manufacturer": string | null;
  "Test Type": string | null;
  "Specimen Type": string | null;
  "Isotype(s) Reported (Reviewer)": Array<string | null>;
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
    "Serum positive prevalence": z
      .optional(z.number().nullable())
      .transform((field) => field ?? null),
    "estimate check 95% lower bound": z
      .optional(z.union([
        z.number(),
        z.string(),
      ]).nullable())
      .transform((field) => field ?? null),
    "estimate check 95% upper bound": z
      .optional(z.union([
        z.number(),
        z.string(),
      ]).nullable())
      .transform((field) => field ?? null),
    "SeroTracker Analysis Primary Estimate": z
      .optional(z.boolean())
      .transform((field) => field ?? null),
    "Test Adjustment": z
      .optional(z.boolean())
      .transform((field) => field ?? null),
    "Population Adjustment": z
      .optional(z.boolean())
      .transform((field) => field ?? null),
    "Clustering Adjustment": z
      .optional(z.boolean())
      .transform((field) => field ?? null),
    "Academic Primary Estimate": z
      .optional(z.boolean())
      .transform((field) => field ?? null),
    "Sampling Method": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Test Name": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Test Manufacturer": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Test Type": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Specimen Type": z
      .optional(z.string().nullable())
      .transform((field) => field ?? null),
    "Isotype(s) Reported (Reviewer)": z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
  })

  return {
    allEstimates: input.allEstimates.map((estimate) => zodSarsCov2EstimateFieldsObject.parse(estimate))
  };
}