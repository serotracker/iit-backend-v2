import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterAssertingMandatoryFieldsArePresentStep,
  AirtableEstimateFieldsAfterAssertingMandatoryFieldsArePresentStep,
  AirtableSourceFieldsAfterAssertingMandatoryFieldsArePresentStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterAssertingMandatoryFieldsArePresentStep
} from "./assert-mandatory-fields-are-present-step.js";
import { ArbovirusEstimateType } from "../../../storage/types.js";

export type AirtableEstimateFieldsAfterAssigningEstimateTypesStep = Omit<
  AirtableEstimateFieldsAfterAssertingMandatoryFieldsArePresentStep,
  "estimateType"
> & {
  estimateType: ArbovirusEstimateType;
};
export type AirtableSourceFieldsAfterAssigningEstimateTypesStep =
  AirtableSourceFieldsAfterAssertingMandatoryFieldsArePresentStep;
export type AirtableCountryFieldsAfterAssigningEstimateTypesStep =
  AirtableCountryFieldsAfterAssertingMandatoryFieldsArePresentStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterAssigningEstimateTypesStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterAssertingMandatoryFieldsArePresentStep;

interface AssignEstimateTypesStepInput {
  allEstimates: AirtableEstimateFieldsAfterAssertingMandatoryFieldsArePresentStep[];
  allSources: AirtableSourceFieldsAfterAssertingMandatoryFieldsArePresentStep[];
  allCountries: AirtableCountryFieldsAfterAssertingMandatoryFieldsArePresentStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterAssertingMandatoryFieldsArePresentStep[];
  mongoClient: MongoClient;
}

interface AssignEstimateTypesStepOutput {
  allEstimates: AirtableEstimateFieldsAfterAssigningEstimateTypesStep[];
  allSources: AirtableSourceFieldsAfterAssigningEstimateTypesStep[];
  allCountries: AirtableCountryFieldsAfterAssigningEstimateTypesStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterAssigningEstimateTypesStep[];
  mongoClient: MongoClient;
}

export const assignEstimateTypesStep = (
  input: AssignEstimateTypesStepInput
): AssignEstimateTypesStepOutput => {
  console.log(`Running step: assignEstimateTypesStep. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources, allCountries } = input;

  return {
    allEstimates: allEstimates
      .map((rawEstimate) => {
        const { estimateType, ...estimate } = rawEstimate;

        if(estimateType === 'Seroprevalence') {
          return {
            ...estimate,
            estimateType: ArbovirusEstimateType.SEROPREVALENCE
          }
        }
        if(estimateType === 'Viral Prevalence') {
          return {
            ...estimate,
            estimateType: ArbovirusEstimateType.VIRAL_PREVALENCE
          }
        }

        return undefined;
      })
      .filter((estimate) => !!estimate),
    allSources: allSources,
    allCountries: allCountries,
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry,
    mongoClient: input.mongoClient
  };
};