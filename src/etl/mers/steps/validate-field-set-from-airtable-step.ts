import { z } from "zod";
import { MongoClient } from "mongodb";
import { FieldSet } from "airtable";
import { AirtableMersEstimateFields, AirtableSourceFields } from "../types";

export type EstimateFieldsAfterValidatingFieldSetFromAirtableStep = AirtableMersEstimateFields;
export type SourceFieldsAfterValidatingFieldSetFromAirtableStep = AirtableSourceFields;
export type FaoMersEventAfterValidatingFieldSetFromAirtableStep = never;
export type YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep = never;
export type CountryPopulationDataAfterValidatingFieldSetFromAirtableStep = never;

interface ValidateFieldSetFromAirtableStepInput {
  allEstimates: FieldSet[];
  allSources: FieldSet[];
  allFaoMersEvents: never[];
  yearlyCamelPopulationByCountryData: never[];
  countryPopulationData: never[];
  mongoClient: MongoClient;
}

interface ValidateFieldSetFromAirtableStepOutput {
  allEstimates: EstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
  allSources: SourceFieldsAfterValidatingFieldSetFromAirtableStep[];
  allFaoMersEvents: FaoMersEventAfterValidatingFieldSetFromAirtableStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep[];
  countryPopulationData: CountryPopulationDataAfterValidatingFieldSetFromAirtableStep[];
  mongoClient: MongoClient;
}

export const validateFieldSetFromAirtableStep = (
  input: ValidateFieldSetFromAirtableStepInput
): ValidateFieldSetFromAirtableStepOutput => {
  console.log(
    `Running step: validateFieldSetFromAirtableStep. Remaining estimates: ${input.allEstimates.length}`
  );

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
    "Institution": z.string(),
    "Country": z.string().array()
  });
  const allSources = input.allSources
    .map((source) => ({
      ...source,
      ...zodMersSourceFieldsObjectBase.parse(source)
    }))
    .filter((source) => source['seropositive (1/0)'] !== 'NA' && source['PCR positive (1/0)'] !== 'NA')
    .map((source) => ({
      ...zodMersSourceFieldsObject.parse(source),
      "seropositive (1/0)": source['seropositive (1/0)'],
      "PCR positive (1/0)": source['PCR positive (1/0)']
    }));

  const zodMersEstimateFieldsObject = z.object({
    id: z.string(),
  })
  const allEstimates = input.allEstimates.map((estimate) => zodMersEstimateFieldsObject.parse(estimate));

  return {
    allEstimates,
    allSources,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  }
}