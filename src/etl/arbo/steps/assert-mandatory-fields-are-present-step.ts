import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterTransformingNotReportedValuesToUndefinedStep,
  AirtableEstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep,
  AirtableSourceFieldsAfterTransformingNotReportedValuesToUndefinedStep
} from "./transform-not-reported-values-to-undefined-step.js";

export type AirtableEstimateFieldsAfterAssertingMandatoryFieldsArePresentStep =
  Omit<
    AirtableEstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep,
    | "pathogen"
    | "seroprevalence"
  > & {
    pathogen: string;
    seroprevalence: number;
  };

export type AirtableSourceFieldsAfterAssertingMandatoryFieldsArePresentStep =
  AirtableSourceFieldsAfterTransformingNotReportedValuesToUndefinedStep;

export type AirtableCountryFieldsAfterAssertingMandatoryFieldsArePresentStep =
  AirtableCountryFieldsAfterTransformingNotReportedValuesToUndefinedStep;

interface AssertMandatoryFieldsArePresentStepInput {
  allEstimates: AirtableEstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
  allSources: AirtableSourceFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
  allCountries: AirtableCountryFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
  mongoClient: MongoClient;
}

interface AssertMandatoryFieldsAreStepOutput {
  allEstimates: AirtableEstimateFieldsAfterAssertingMandatoryFieldsArePresentStep[];
  allSources: AirtableSourceFieldsAfterAssertingMandatoryFieldsArePresentStep[];
  allCountries: AirtableCountryFieldsAfterAssertingMandatoryFieldsArePresentStep[];
  mongoClient: MongoClient;
}

export const assertMandatoryFieldsArePresentStep = (
  input: AssertMandatoryFieldsArePresentStepInput
): AssertMandatoryFieldsAreStepOutput => {
  console.log(`Running step: assertMandatoryFieldsArePresentStep. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources, allCountries } = input;

  return {
    allEstimates: allEstimates.filter((estimate): estimate is AirtableEstimateFieldsAfterAssertingMandatoryFieldsArePresentStep => {
      return (
        !!estimate.pathogen &&
        (estimate.seroprevalence !== undefined && estimate.seroprevalence !== null) 
      );
    }),
    allSources: allSources,
    allCountries: allCountries,
    mongoClient: input.mongoClient
  };
};
