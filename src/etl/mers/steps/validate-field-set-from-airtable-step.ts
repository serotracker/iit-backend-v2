import { z } from "zod";
import { MongoClient } from "mongodb";
import { FieldSet } from "airtable";
import { AirtableCountryFields, AirtableMersEstimateFields, AirtableSourceFields, AirtableStudyFields } from "../types";

export type EstimateFieldsAfterValidatingFieldSetFromAirtableStep = AirtableMersEstimateFields;
export type SourceFieldsAfterValidatingFieldSetFromAirtableStep = AirtableSourceFields;
export type StudyFieldsAfterValidatingFieldSetFromAirtableStep = AirtableStudyFields;
export type CountryFieldsAfterValidatingFieldSetFromAirtableStep = AirtableCountryFields;
export type FaoMersEventAfterValidatingFieldSetFromAirtableStep = never;
export type YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep = never;
export type CountryPopulationDataAfterValidatingFieldSetFromAirtableStep = never;

interface ValidateFieldSetFromAirtableStepInput {
  allEstimates: FieldSet[];
  allSources: FieldSet[];
  allStudies: FieldSet[];
  allCountries: FieldSet[];
  allFaoMersEvents: never[];
  yearlyCamelPopulationByCountryData: never[];
  countryPopulationData: never[];
  mongoClient: MongoClient;
}

interface ValidateFieldSetFromAirtableStepOutput {
  allEstimates: EstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
  allSources: SourceFieldsAfterValidatingFieldSetFromAirtableStep[];
  allStudies: StudyFieldsAfterValidatingFieldSetFromAirtableStep[];
  allCountries: CountryFieldsAfterValidatingFieldSetFromAirtableStep[];
  allFaoMersEvents: FaoMersEventAfterValidatingFieldSetFromAirtableStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep[];
  countryPopulationData: CountryPopulationDataAfterValidatingFieldSetFromAirtableStep[];
  mongoClient: MongoClient;
}

const parseEstimate = (estimate: FieldSet): AirtableMersEstimateFields | undefined => {
  const zodMersEstimateFieldsObject = z.object({
    id: z.string(),
    'Prevalence Estimate Name': z
      .string(),
    'Population Type': z
      .string(),
    'Estimate Type': z
      .string(),
    'Age Group (Human)': z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    'Age Group (Animal)': z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    'State/Province': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'District': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'City': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'Country': z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    'Sub-grouping variable': z
      .string(),
    'Sub-group specific category': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'Study': z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    'Specimen Type': z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    'Sex': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'Socioeconomic status': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'Exposure to camels': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'Prevalence': z
      .number(),
    'Denominator': z
      .optional(z.number().nullable())
      .transform((value => value ?? null)),
    'Numerator': z
      .optional(z.number().nullable())
      .transform((value => value ?? null)),
    'Prevalence 95% CI Lower': z
      .optional(z.number().nullable())
      .transform((value => value ?? null)),
    'Prevalence 95% CI Lower (calculated)': z
      .number(),
    'Prevalence 95% CI Upper': z
      .optional(z.number().nullable())
      .transform((value => value ?? null)),
    'Prevalence 95% CI Upper (calculated)': z
      .number(),
    'Sensitivity': z
      .optional(z.number().nullable())
      .transform((value => value ?? null)),
    'Sensitivity, 95% CI Lower': z
      .optional(z.number().nullable())
      .transform((value => value ?? null)),
    'Sensitivity, 95% CI Upper': z
      .optional(z.number().nullable())
      .transform((value => value ?? null)),
    'Sensitivity Denominator': z
      .optional(z.number().nullable())
      .transform((value => value ?? null)),
    'Specificity': z
      .optional(z.number().nullable())
      .transform((value => value ?? null)),
    'Specificity, 95% CI Lower': z
      .optional(z.number().nullable())
      .transform((value => value ?? null)),
    'Specificity, 95% CI Upper': z
      .optional(z.number().nullable())
      .transform((value => value ?? null)),
    'Specificity Denominator': z
      .optional(z.number().nullable())
      .transform((value => value ?? null)),
    'Age Minimum': z
      .optional(z.number().nullable())
      .transform((value => value ?? null)),
    'Age Maximum': z
      .optional(z.number().nullable())
      .transform((value => value ?? null)),
    'Isotype(s)': z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    'Antigen or gene': z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    'Assay Type': z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    'Animal type': z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    'Sample Frame (Animal)': z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    'Animal purpose': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'Imported or Local': z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    'Country of Import': z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    'Sample Frame (Human)': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'Producer': z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    'Producer - Other': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'Test Validation': z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
    'Species Test Validated On': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'Positive Cut-off': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'Geographic scope': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'Sampling Method': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'Sample End Date': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'Sample Start Date': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'Symptom Prevalence of Positives': z
      .optional(z.number().nullable())
      .transform((value => value ?? null)),
    'Symptom definition': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'Species': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'Sequencing done': z
      .optional(z.boolean())
      .transform((value) => value ?? false),
    'Clade': z
      .optional(z.string().nullable().array())
      .transform((value) => value ?? []),
    'Accession numbers': z
      .optional(z.string().nullable())
      .transform((value => value ?? null)),
    'Genome coverage': z
      .optional(z.string().nullable().array())
      .transform((value) => value ?? []),
  })

  try {
    return zodMersEstimateFieldsObject.parse(estimate);
  } catch (error) {
    console.error(error);

    return undefined;
  }
}

const parseSource = (source: FieldSet): AirtableSourceFields | undefined => {
  const zodMersSourceFieldsObjectBase = z.object({
    "seropositive (1/0)": z.optional(z.string().nullable()).transform((value => value ?? null)),
    "PCR positive (1/0)": z.optional(z.string().nullable()).transform((value => value ?? null)),
  })
  const zodMersSourceFieldsObject = z.object({
    id: z.string(),
    "First author name": z.string(),
    "DOI/url": z.string(),
    "Source type": z.string(),
    "Source title": z.string(),
    "Institution": z.optional(z.string().nullable()).transform((value => value ?? null)),
    "Country": z.string().array(),
    "Population type": z.string().array(),
    "Publication year": z.number()
  });

  const sourceWithBaseParsed = {
    ...source,
    ...zodMersSourceFieldsObjectBase.parse(source)
  }

  return {
    ...zodMersSourceFieldsObject.parse(sourceWithBaseParsed),
    "seropositive (1/0)": sourceWithBaseParsed['seropositive (1/0)'],
    "PCR positive (1/0)": sourceWithBaseParsed['PCR positive (1/0)']
  }
}

const parseStudy = (study: FieldSet): AirtableStudyFields => {
  const zodMersStudyFieldsObject = z.object({
    id: z.string(),
    'Inclusion Criteria': z.optional(z.string().nullable()).transform((value => value ?? null)),
    'Exclusion Criteria': z.optional(z.string().nullable()).transform((value => value ?? null)),
    'Source Sheet': z
      .optional(z.string().nullable().array())
      .transform((field) => field ?? []),
  })

  return zodMersStudyFieldsObject.parse(study);
}

const parseCountry = (country: FieldSet): AirtableCountryFields => {
  const zodMersCountryFieldsObject = z.object({
    id: z.string(),
    'Country':  z.string(),
    'Alpha3 Code':  z.string(),
    'Alpha2 Code':  z.string()
  })

  return zodMersCountryFieldsObject.parse(country);
}

export const validateFieldSetFromAirtableStep = (
  input: ValidateFieldSetFromAirtableStepInput
): ValidateFieldSetFromAirtableStepOutput => {
  console.log(
    `Running step: validateFieldSetFromAirtableStep. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates
      .map((estimate) => parseEstimate(estimate))
      .filter((estimate): estimate is NonNullable<typeof estimate> => !!estimate),
    allSources: input.allSources
      .map((source) => parseSource(source))
      .filter((source): source is NonNullable<typeof source> => !!source),
    allStudies: input.allStudies.map((study) => parseStudy(study)),
    allCountries: input.allCountries.map((country) => parseCountry(country)),
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  }
}