import { z } from "zod";
import { MongoClient } from "mongodb";
import { FieldSet } from "airtable";
import { AirtableMersEstimateFields } from "../types";

export type EstimateFieldsAfterValidatingFieldSetFromAirtableStep = AirtableMersEstimateFields;
export type FaoMersEventAfterValidatingFieldSetFromAirtableStep = never;
export type YearlyCamelPopulationDataAfterValidatingFieldSetFromAirtableStep = never;
export type CountryPopulationDataAfterValidatingFieldSetFromAirtableStep = never;

interface ValidateFieldSetFromAirtableStepInput {
  allEstimates: FieldSet[];
  allFaoMersEvents: never[];
  yearlyCamelPopulationByCountryData: never[];
  countryPopulationData: never[];
  mongoClient: MongoClient;
}

interface ValidateFieldSetFromAirtableStepOutput {
  allEstimates: EstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
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

  const zodSarsCov2EstimateFieldsObject = z.object({
    id: z.string()
  })

  const allEstimates = input.allEstimates.map((estimate) => zodSarsCov2EstimateFieldsObject.parse(estimate));

  return {
    allEstimates,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  }
}