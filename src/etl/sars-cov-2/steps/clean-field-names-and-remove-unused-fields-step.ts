import { isArrayOfUnknownType } from "../../../lib/lib.js";
import { EstimateFieldsAfterValidatingFieldSetFromAirtableStep, StructuredPositiveCaseDataAfterValidatingFieldSetFromAirtableStep, StructuredVaccinationDataAfterValidatingFieldSetFromAirtableStep } from "./validate-field-set-from-airtable-step.js";
import { isAirtableError, AirtableError } from "../types.js";

export interface EstimateFieldsAfterCleaningFieldNamesStep {
  id: string;
  antibodies: string[];
  isotypes: string[];
  isWHOUnityAligned: boolean;
  testType: string[];
  riskOfBias: string | undefined;
  ageGroup: string | undefined;
  sex: string | undefined;
  populationGroup: string | undefined;
  includedInETL: number;
  country: string | undefined;
  countryAlphaThreeCode: string | undefined;
  sourceType: string | undefined;
  state: string | undefined;
  county: string | undefined;
  city: string | undefined;
  scope: string | undefined;
  samplingEndDate: string | undefined;
  samplingStartDate: string | undefined;
}
export type StructuredVaccinationDataAfterCleaningFieldNamesStep = StructuredVaccinationDataAfterValidatingFieldSetFromAirtableStep;
export type StructuredPositiveCaseDataAfterCleaningFieldNamesStep = StructuredPositiveCaseDataAfterValidatingFieldSetFromAirtableStep;

interface CleanFieldNamesAndRemoveUnusedFieldsStepInput {
  allEstimates: EstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
  vaccinationData: StructuredVaccinationDataAfterValidatingFieldSetFromAirtableStep;
  positiveCaseData: StructuredPositiveCaseDataAfterValidatingFieldSetFromAirtableStep;
}

interface CleanFieldNamesAndRemoveUnusedFieldsStepOutput {
  allEstimates: EstimateFieldsAfterCleaningFieldNamesStep[];
  vaccinationData: StructuredVaccinationDataAfterCleaningFieldNamesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterCleaningFieldNamesStep;
}

interface CleanArrayFieldToSingleValueInput<
  TFieldName extends string,
  TEstimate extends Record<TFieldName, Array<string | null | AirtableError>> & {
    id: string;
  },
> {
  key: TFieldName;
  estimate: TEstimate;
}

interface CleanArrayFieldToSingleValueOutput {
  value: string | undefined;
}

const cleanArrayFieldToSingleValue = <
  TFieldName extends string,
  TEstimate extends Record<TFieldName, Array<string | null | AirtableError>> & {
    id: string;
  },
>(
  input: CleanArrayFieldToSingleValueInput<TFieldName, TEstimate>
): CleanArrayFieldToSingleValueOutput => {
  const inputValue = input.estimate[input.key].filter(
    <T>(element: T | AirtableError): element is T => !isAirtableError(element)
  );

  if (inputValue.length > 1) {
    console.error(
      `Unable to clean array field "${input.key}" with more than one element for estimate with id ${input.estimate.id}`
    );
  }

  return {
    value: inputValue.length > 0 ? inputValue[0] ?? undefined : undefined,
  };
};

interface ConvertSingleValueOrArrayToArrayInput<
  TFieldName extends string,
  TEstimate extends Record<TFieldName, string | null | Array<string | null>> & {
    id: string;
  },
> {
  key: TFieldName;
  estimate: TEstimate;
}

interface ConvertSingleValueOrArrayToArrayOutput {
  value: string[];
}

const convertSingleValueOrArrayToArray = <
  TFieldName extends string,
  TEstimate extends Record<TFieldName, string | null | Array<string | null>> & {
    id: string;
  },
>(
  input: ConvertSingleValueOrArrayToArrayInput<TFieldName, TEstimate>
): ConvertSingleValueOrArrayToArrayOutput => {
  const inputValue = input.estimate[input.key];

  if (!inputValue) {
    return { value: [] };
  }

  if (!isArrayOfUnknownType(inputValue)) {
    return { value: [inputValue] };
  }

  return {
    value: inputValue.filter(
      <T>(element: T | null): element is T => element !== null
    ),
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
      antibodies: convertSingleValueOrArrayToArray({
        key: "Antibody target",
        estimate,
      }).value.flatMap((antibodyString) => {
        return [...new Set(antibodyString.split(',').map((element) => element.trim()).filter((element) => !!element))]
      }),
      isotypes: convertSingleValueOrArrayToArray({
        key: "Isotype(s) Reported",
        estimate,
      }).value.flatMap((isotypeString) => {
        return [...new Set(isotypeString.split(',').map((element) => element.trim()).filter((element) => !!element))]
      }),
      isWHOUnityAligned:
        cleanArrayFieldToSingleValue({
          key: "UNITY: Criteria",
          estimate,
        }).value === "Unity-Aligned"
          ? true
          : false,
      testType: estimate["Test Type"] ? [...new Set(estimate["Test Type"].split(',').map((element) => element.trim()).filter((element) => !!element))] : [],
      sourceType: cleanArrayFieldToSingleValue({
        key: "Source Type",
        estimate,
      }).value,
      riskOfBias: cleanArrayFieldToSingleValue({
        key: "Overall Risk of Bias (JBI)",
        estimate,
      }).value,
      countryAlphaThreeCode: cleanArrayFieldToSingleValue({
        key: 'Alpha3 Code',
        estimate
      }).value,
      ageGroup: estimate["Sample Frame (age)"] ?? undefined,
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
      samplingStartDate: estimate["Sampling Start Date"] ?? undefined,
    })),
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
  };
};
