import { MongoClient } from "mongodb";
import { isArrayOfUnknownType } from "../../../lib/lib.js";
import { CountryFieldsAfterValidatingFieldSetFromAirtableStep, EstimateFieldsAfterValidatingFieldSetFromAirtableStep, StructuredCountryPopulationDataAfterValidatingFieldSetFromAirtableStep, StructuredPositiveCaseDataAfterValidatingFieldSetFromAirtableStep, StructuredVaccinationDataAfterValidatingFieldSetFromAirtableStep, StudyFieldsAfterValidatingFieldSetFromAirtableStep } from "./validate-field-set-from-airtable-step.js";
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
  publicationDate: string | undefined;
  studyId: string | undefined;
  denominatorValue: number | undefined;
  numeratorValue: number | undefined;
  estimateName: string | undefined;
  url: string | undefined;
}
export interface StudyFieldsAfterCleaningFieldNamesStep {
  id: string;
  studyName: string | undefined;
}
export interface CountryFieldsAfterCleaningFieldNamesStep {
  id: string;
  countryName: string;
  alphaThreeCode: string | undefined;
  alphaTwoCode: string | undefined;
}
export type StructuredVaccinationDataAfterCleaningFieldNamesStep = StructuredVaccinationDataAfterValidatingFieldSetFromAirtableStep;
export type StructuredPositiveCaseDataAfterCleaningFieldNamesStep = StructuredPositiveCaseDataAfterValidatingFieldSetFromAirtableStep;
export type StructuredCountryPopulationDataAfterCleaningFieldNamesStep = StructuredCountryPopulationDataAfterValidatingFieldSetFromAirtableStep;

interface CleanFieldNamesAndRemoveUnusedFieldsStepInput {
  allEstimates: EstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
  allStudies: StudyFieldsAfterValidatingFieldSetFromAirtableStep[];
  allCountries: CountryFieldsAfterValidatingFieldSetFromAirtableStep[];
  vaccinationData: StructuredVaccinationDataAfterValidatingFieldSetFromAirtableStep;
  positiveCaseData: StructuredPositiveCaseDataAfterValidatingFieldSetFromAirtableStep;
  countryPopulationData: StructuredCountryPopulationDataAfterValidatingFieldSetFromAirtableStep;
  mongoClient: MongoClient;
}

interface CleanFieldNamesAndRemoveUnusedFieldsStepOutput {
  allEstimates: EstimateFieldsAfterCleaningFieldNamesStep[];
  allStudies: StudyFieldsAfterCleaningFieldNamesStep[];
  allCountries: CountryFieldsAfterCleaningFieldNamesStep[];
  vaccinationData: StructuredVaccinationDataAfterCleaningFieldNamesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterCleaningFieldNamesStep;
  countryPopulationData: StructuredCountryPopulationDataAfterCleaningFieldNamesStep;
  mongoClient: MongoClient;
}

interface CleanArrayFieldToSingleValueInput<
  TFieldName extends string,
  TObject extends Record<TFieldName, Array<string | null | AirtableError>> & {
    id: string;
  },
> {
  key: TFieldName;
  object: TObject;
}

interface CleanArrayFieldToSingleValueOutput {
  value: string | undefined;
}

const cleanArrayFieldToSingleValue = <
  TFieldName extends string,
  TObject extends Record<TFieldName, Array<string | null | AirtableError>> & {
    id: string;
  },
>(
  input: CleanArrayFieldToSingleValueInput<TFieldName, TObject>
): CleanArrayFieldToSingleValueOutput => {
  const inputValue = input.object[input.key].filter(
    <T>(element: T | AirtableError): element is T => !isAirtableError(element)
  );

  if (inputValue.length > 1) {
    console.error(
      `Unable to clean array field "${input.key}" with more than one element for object with id ${input.object.id}`
    );
  }

  return {
    value: inputValue.length > 0 ? inputValue[0] ?? undefined : undefined,
  };
};

interface ConvertSingleValueOrArrayToArrayInput<
  TFieldName extends string,
  TObject extends Record<TFieldName, string | null | Array<string | null>> & {
    id: string;
  },
> {
  key: TFieldName;
  object: TObject;
}

interface ConvertSingleValueOrArrayToArrayOutput {
  value: string[];
}

const convertSingleValueOrArrayToArray = <
  TFieldName extends string,
  TObject extends Record<TFieldName, string | null | Array<string | null>> & {
    id: string;
  },
>(
  input: ConvertSingleValueOrArrayToArrayInput<TFieldName, TObject>
): ConvertSingleValueOrArrayToArrayOutput => {
  const inputValue = input.object[input.key];

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
        object: estimate,
      }).value.flatMap((antibodyString) => {
        return [...new Set(antibodyString.split(',').map((element) => element.trim()).filter((element) => !!element))]
      }),
      isotypes: convertSingleValueOrArrayToArray({
        key: "Isotype(s) Reported",
        object: estimate,
      }).value.flatMap((isotypeString) => {
        return [...new Set(isotypeString.split(',').map((element) => element.trim()).filter((element) => !!element))]
      }),
      isWHOUnityAligned:
        cleanArrayFieldToSingleValue({
          key: "UNITY: Criteria",
          object: estimate,
        }).value === "Unity-Aligned"
          ? true
          : false,
      testType: estimate["Test Type"] ? [...new Set(estimate["Test Type"].split(',').map((element) => element.trim()).filter((element) => !!element))] : [],
      sourceType: cleanArrayFieldToSingleValue({
        key: "Source Type",
        object: estimate,
      }).value,
      riskOfBias: cleanArrayFieldToSingleValue({
        key: "Overall Risk of Bias (JBI)",
        object: estimate,
      }).value,
      countryAlphaThreeCode: cleanArrayFieldToSingleValue({
        key: 'Alpha3 Code',
        object: estimate,
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
      publicationDate: !isAirtableError(estimate["Publication Date (ISO)"]) && !!estimate["Publication Date (ISO)"] ? estimate["Publication Date (ISO)"] : undefined,
      studyId: cleanArrayFieldToSingleValue({
        key: "Rapid Review: Study",
        object: estimate,
      }).value,
      denominatorValue: estimate['Denominator Value'] ? Math.floor(estimate['Denominator Value']) : undefined,
      numeratorValue: estimate['Numerator Value'] ? Math.floor(estimate['Numerator Value']) : undefined,
      estimateName: estimate["Prevalence Estimate Name"] ?? undefined,
      url: cleanArrayFieldToSingleValue({
        key: "URL",
        object: estimate,
      }).value,
    })),
    allStudies: input.allStudies.map((study) => ({
      id: study.id,
      studyName: cleanArrayFieldToSingleValue({
        key: "Source Name (from Rapid Review: Source)",
        object: study,
      }).value
    })),
    allCountries: input.allCountries.map((country) => ({
      id: country.id,
      countryName: country["Country"],
      alphaThreeCode: country["Alpha3 Code"] ?? undefined,
      alphaTwoCode: country["Alpha2 Code"] ?? undefined
    })),
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
