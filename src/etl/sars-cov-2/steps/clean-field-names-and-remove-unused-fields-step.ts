import { EstimateFieldsAfterValidatingFieldSetFromAirtableStep } from "./validate-field-set-from-airtable-step.js";

export interface EstimateFieldsAfterCleaningFieldNamesStep {
  id: string;
  riskOfBias: string | undefined;
  age: string | undefined;
  sex: string | undefined;
  populationGroup: string | undefined;
  includedInETL: number;
  country: string | undefined;
  sourceType: string | undefined;
  state: string | undefined;
  county: string | undefined;
  city: string | undefined;
  scope: string | undefined;
  samplingEndDate: string | undefined;
  samplingStartDate: string | undefined;
}

interface CleanFieldNamesAndRemoveUnusedFieldsStepInput {
  allEstimates: EstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
}

interface CleanFieldNamesAndRemoveUnusedFieldsStepOutput {
  allEstimates: EstimateFieldsAfterCleaningFieldNamesStep[];
}

interface CleanArrayFieldInput<
  TFieldName extends string,
  TEstimate extends Record<TFieldName, Array<string | null>> & { id: string },
> {
  key: TFieldName;
  estimate: TEstimate;
}

interface CleanArrayFieldOutput {
  value: string | undefined;
}

const cleanArrayField = <
  TFieldName extends string,
  TEstimate extends Record<TFieldName, Array<string | null>> & { id: string },
>(
  input: CleanArrayFieldInput<TFieldName, TEstimate>
): CleanArrayFieldOutput => {
  const inputValue = input.estimate[input.key];

  if (inputValue.length > 1) {
    console.error(
      `Unable to clean array field "${input.key}" with more than one element for estimate with id ${input.estimate.id}`
    );
  }

  return {
    value: inputValue.length > 0 ? inputValue[0] ?? undefined : undefined,
  };
};

export const cleanFieldNamesAndRemoveUnusedFieldsStep = (
  input: CleanFieldNamesAndRemoveUnusedFieldsStepInput
): CleanFieldNamesAndRemoveUnusedFieldsStepOutput => {
  console.log(
    `Running step: cleanFieldNamesAndRemoveUnusedFieldsStep. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates.map((estimate) => ({
      id: estimate.id,
      sourceType: cleanArrayField({
        key: "Source Type",
        estimate,
      }).value,
      riskOfBias: cleanArrayField({
        key: "Overall Risk of Bias (JBI)",
        estimate,
      }).value,
      age: estimate["Sample Frame (age)"] ?? undefined,
      sex: estimate["Sample Frame (sex)"] ?? undefined,
      populationGroup:
        estimate["Sample Frame (groups of interest)"] ?? undefined,
      includedInETL: estimate["ETL Included"],
      country: estimate.Country ?? undefined,
      state: estimate["State/Province"] ?? undefined,
      county: estimate.County ?? undefined,
      city: estimate.City ?? undefined,
      scope: estimate["Grade of Estimate Scope"] ?? undefined,
      samplingEndDate: estimate["Sampling End Date"] ?? undefined,
      samplingStartDate: estimate["Sampling End Date"] ?? undefined,
    })),
  };
};