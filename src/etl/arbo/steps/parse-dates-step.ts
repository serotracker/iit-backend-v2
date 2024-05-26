import { MongoClient } from "mongodb";
import { parse } from "date-fns";
import {
  AirtableCountryFieldsAfterAssertingMandatoryFieldsArePresentStep,
  AirtableEstimateFieldsAfterAssertingMandatoryFieldsArePresentStep,
  AirtableSourceFieldsAfterAssertingMandatoryFieldsArePresentStep
} from "./assert-mandatory-fields-are-present-step.js";

export type AirtableEstimateFieldsAfterParsingDatesStep = Omit<
  AirtableEstimateFieldsAfterAssertingMandatoryFieldsArePresentStep,
  "sampleStartDate" | "sampleEndDate"
> & {
  sampleStartDate: Date | undefined;
  sampleEndDate: Date | undefined;
};

export type AirtableSourceFieldsAfterParsingDatesStep =
  AirtableSourceFieldsAfterAssertingMandatoryFieldsArePresentStep;

export type AirtableCountryFieldsAfterParsingDatesStep =
  AirtableCountryFieldsAfterAssertingMandatoryFieldsArePresentStep;

interface ParseDatesStepInput {
  allEstimates: AirtableEstimateFieldsAfterAssertingMandatoryFieldsArePresentStep[];
  allSources: AirtableSourceFieldsAfterAssertingMandatoryFieldsArePresentStep[];
  allCountries: AirtableCountryFieldsAfterAssertingMandatoryFieldsArePresentStep[];
  mongoClient: MongoClient;
}

interface ParseDatesStepOutput {
  allEstimates: AirtableEstimateFieldsAfterParsingDatesStep[];
  allSources: AirtableSourceFieldsAfterParsingDatesStep[];
  allCountries: AirtableCountryFieldsAfterParsingDatesStep[];
  mongoClient: MongoClient;
}

export const parseDatesStep = (
  input: ParseDatesStepInput
): ParseDatesStepOutput => {
  console.log(`Running step: parseDatesStep. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources, allCountries } = input;

  return {
    allEstimates: allEstimates.map((estimate) => {
      return {
        ...estimate,
        sampleStartDate: estimate.sampleStartDate ? parse(estimate.sampleStartDate, "yyyy-MM-dd", new Date()) : undefined,
        sampleEndDate: estimate.sampleEndDate ? parse(estimate.sampleEndDate, "yyyy-MM-dd", new Date()) : undefined,
      };
    }),
    allSources: allSources,
    allCountries: allCountries,
    mongoClient: input.mongoClient
  };
};
