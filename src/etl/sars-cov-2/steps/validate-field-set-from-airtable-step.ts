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
    "Source Type": z.string().nullable().array(),
    "Overall Risk of Bias (JBI)": z.string().nullable().array(),
    "Sample Frame (age)": z.string().nullable(),
    "Sample Frame (sex)": z.string().nullable(),
    "Sample Frame (groups of interest)": z.string().nullable(),
    "ETL Included": z.number(),
    "Country": z.string(),
    "State/Province": z.string().nullable(),
    "County": z.string().nullable(),
    "City": z.string().nullable(),
    "Grade of Estimate Scope": z.string(),
    "Sampling End Date": z.string(),
    "Sampling Start Date": z.string()
  })
  const allEstimates = input.allEstimates.map((estimate) => zodSarsCov2EstimateFieldsObject.parse(estimate));

  return { allEstimates };
}