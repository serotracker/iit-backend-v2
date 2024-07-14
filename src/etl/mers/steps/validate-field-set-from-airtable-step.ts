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

  const zodMersSourceFieldsObject = z.object({
    id: z.string(),
    "First author name": z.string(),
    "DOI/url": z.string(),
    "Source type": z.string(),
    "Source title": z.string(),
    "Institution": z.string(),
    "Country": z.string().array()
  });
  const allSources = input.allSources.map((source) => zodMersSourceFieldsObject.parse(source));

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