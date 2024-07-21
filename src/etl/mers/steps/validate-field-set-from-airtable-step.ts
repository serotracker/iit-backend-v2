import { z } from "zod";
import { MongoClient } from "mongodb";
import { FieldSet } from "airtable";
import { AirtableMersEstimateFields, AirtableSourceFields, AirtableStudyFields } from "../types";

export type EstimateFieldsAfterValidatingFieldSetFromAirtableStep = AirtableMersEstimateFields;
export type SourceFieldsAfterValidatingFieldSetFromAirtableStep = AirtableSourceFields;
export type StudyFieldsAfterValidatingFieldSetFromAirtableStep = AirtableStudyFields;
export type FaoMersEventAfterValidatingFieldSetFromAirtableStep = never;
export type YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep = never;
export type CountryPopulationDataAfterValidatingFieldSetFromAirtableStep = never;

interface ValidateFieldSetFromAirtableStepInput {
  allEstimates: FieldSet[];
  allSources: FieldSet[];
  allStudies: FieldSet[];
  allFaoMersEvents: never[];
  yearlyCamelPopulationByCountryData: never[];
  countryPopulationData: never[];
  mongoClient: MongoClient;
}

interface ValidateFieldSetFromAirtableStepOutput {
  allEstimates: EstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
  allSources: SourceFieldsAfterValidatingFieldSetFromAirtableStep[];
  allStudies: StudyFieldsAfterValidatingFieldSetFromAirtableStep[];
  allFaoMersEvents: FaoMersEventAfterValidatingFieldSetFromAirtableStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep[];
  countryPopulationData: CountryPopulationDataAfterValidatingFieldSetFromAirtableStep[];
  mongoClient: MongoClient;
}

const parseEstimate = (estimate: FieldSet): AirtableMersEstimateFields => {
  const zodMersEstimateFieldsObject = z.object({
    id: z.string(),
  })

  return zodMersEstimateFieldsObject.parse(estimate);
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
    "Population type": z.string().array()
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
  })

  return zodMersStudyFieldsObject.parse(study);
}

export const validateFieldSetFromAirtableStep = (
  input: ValidateFieldSetFromAirtableStepInput
): ValidateFieldSetFromAirtableStepOutput => {
  console.log(
    `Running step: validateFieldSetFromAirtableStep. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates.map((estimate) => parseEstimate(estimate)),
    allSources: input.allSources
      .map((source) => parseSource(source))
      .filter((source): source is NonNullable<typeof source> => !!source),
    allStudies: input.allStudies.map((study) => parseStudy(study)),
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  }
}