import { MongoClient } from "mongodb";
import { AirtableEstimateFields, AirtableSourceFields } from "../types.js";
import { AirtableCountryFieldsAfterValidatingFieldSetFromAirtableStep, AirtableEstimateFieldsAfterValidatingFieldSetFromAirtableStep, AirtableSourceFieldsAfterValidatingFieldSetFromAirtableStep } from "./validate-field-set-from-airtable-step.js";
import { ThreeLetterIsoCountryCode, TwoLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes.js";

export interface AirtableEstimateFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep {
  sourceSheetId: string[] | undefined;
  estimateId: string | undefined;
  inclusionCriteria: string | undefined;
  sampleStartDate: `${number}-${number}-${number}` | undefined;
  sampleEndDate: `${number}-${number}-${number}` | undefined;
  sex: string | undefined;
  pathogen: string | undefined;
  pediatricAgeGroup: string | undefined;
  antibodies: string[] | undefined;
  antigen: string | undefined;
  assay: string | undefined;
  assayOther: string | undefined;
  sampleSize: number | undefined;
  serotype: string[] | undefined;
  sampleNumerator: number | undefined;
  sampleFrame: string | undefined;
  sampleFrameTargetGroup: string | undefined;
  seroprevalence: number | undefined;
  seroprevalenceStudy95CILower: number | undefined;
  seroprevalenceStudy95CIUpper: number | undefined;
  seroprevalenceCalculated95CILower: number | undefined;
  seroprevalenceCalculated95CIUpper: number | undefined;
  state: string | undefined;
  city: string | undefined;
  url: string[] | undefined;
  ageGroup: string | undefined;
  ageMinimum: number | undefined;
  ageMaximum: number | undefined;
  includeInEtl: 0 | 1 | undefined;
  producer: string | undefined;
  producerOther: string | undefined;
  whoRegion: string[] | undefined;
  countryId: string[] | undefined;
}

export interface AirtableSourceFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep {
  id: string;
  sourceSheetName: string | undefined;
}

export interface AirtableCountryFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep {
  id: string;
  name: string;
  alphaThreeCode: ThreeLetterIsoCountryCode;
  alphaTwoCode: TwoLetterIsoCountryCode;
}

interface CleanFieldNamesAndRemoveUnusedFieldsStepInput {
  allEstimates: AirtableEstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
  allSources: AirtableSourceFieldsAfterValidatingFieldSetFromAirtableStep[];
  allCountries: AirtableCountryFieldsAfterValidatingFieldSetFromAirtableStep[];
  mongoClient: MongoClient;
}

interface CleanFieldNamesAndRemoveUnusedFieldsStepOutput {
  allEstimates: AirtableEstimateFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep[];
  allSources: AirtableSourceFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep[];
  allCountries: AirtableCountryFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep[];
  mongoClient: MongoClient;
}

export const cleanFieldNamesAndRemoveUnusedFieldsStep = (
  input: CleanFieldNamesAndRemoveUnusedFieldsStepInput
): CleanFieldNamesAndRemoveUnusedFieldsStepOutput => {
  console.log(`Running step: cleanFieldNamesAndRemoveUnusedFields. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources, allCountries } = input;

  return {
    allEstimates: allEstimates.map((estimate) => ({
      sourceSheetId: estimate["Source Sheet"],
      estimateId: estimate["Unique ID"],
      inclusionCriteria: estimate["Inclusion Criteria"],
      sampleStartDate: estimate["Sample Start Date"],
      sampleEndDate: estimate["Sample End Date"],
      serotype: estimate["Serotype"],
      sex: estimate["Sex"],
      pathogen: estimate["Pathogen"],
      pediatricAgeGroup: estimate["Pediatric age group"],
      antibodies: estimate["Antibody"],
      antigen: estimate["Antigen"],
      assay: estimate["Assay"],
      assayOther: estimate["Assay - Other"],
      sampleSize: estimate["Sample Size"],
      sampleNumerator: estimate["Sample Numerator"],
      sampleFrame: estimate["Sample Frame"],
      sampleFrameTargetGroup: estimate["Sample Frame - Target Group"],
      seroprevalence: estimate["Seroprevalence"],
      seroprevalenceStudy95CILower: estimate["Seroprevalence 95% CI Lower"],
      seroprevalenceStudy95CIUpper: estimate["Seroprevalence 95% CI Upper"],
      seroprevalenceCalculated95CILower: estimate["Seroprevalence 95% CI Lower (formula)"],
      seroprevalenceCalculated95CIUpper: estimate["Seroprevalence 95% CI Upper (formula)"],
      state: estimate["State"],
      city: estimate["City"],
      url: estimate["URL"],
      ageGroup: estimate["Age group"],
      ageMaximum: estimate["Age Maximum"],
      ageMinimum: estimate["Age Minimum"],
      whoRegion: estimate["WHO Region"],
      producer: estimate["Producer"],
      producerOther: estimate["Producer - Other"],
      includeInEtl: estimate["ETL Included"],
      countryId: estimate["Country"]
    })),
    allSources: allSources.map((source) => ({
      id: source["id"],
      sourceSheetName: source["Source Title"],
    })),
    allCountries: allCountries.map((country) => ({
      id: country["id"],
      name: country["Country"],
      alphaThreeCode: country["Alpha3 Code"] as ThreeLetterIsoCountryCode,
      alphaTwoCode: country["Alpha2 Code"] as TwoLetterIsoCountryCode
    })),
    mongoClient: input.mongoClient
  };
};
