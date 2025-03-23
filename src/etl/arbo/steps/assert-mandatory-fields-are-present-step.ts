import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterTransformingNotReportedValuesToUndefinedStep,
  AirtableEstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep,
  AirtableSourceFieldsAfterTransformingNotReportedValuesToUndefinedStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterTransformingNotReportedValuesToUndefinedStep,
  GroupedEstimatesAfterTransformingNotReportedValuesToUndefinedStep
} from "./transform-not-reported-values-to-undefined-step.js";
import { Arbovirus, ArbovirusGroupingVariable, isArbovirus } from "../../../storage/types.js";

export type AirtableEstimateFieldsAfterAssertingMandatoryFieldsArePresentStep =
  Omit<
    AirtableEstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep,
    | "pathogen"
    | "seroprevalence"
  > & {
    pathogen: Arbovirus;
    seroprevalence: number;
  };
export type AirtableSourceFieldsAfterAssertingMandatoryFieldsArePresentStep =
  AirtableSourceFieldsAfterTransformingNotReportedValuesToUndefinedStep;
export type AirtableCountryFieldsAfterAssertingMandatoryFieldsArePresentStep =
  AirtableCountryFieldsAfterTransformingNotReportedValuesToUndefinedStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterAssertingMandatoryFieldsArePresentStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterTransformingNotReportedValuesToUndefinedStep;
export type GroupedEstimatesAfterAssertingMandatoryFieldsArePresentStep =
  GroupedEstimatesAfterTransformingNotReportedValuesToUndefinedStep;

interface AssertMandatoryFieldsArePresentStepInput {
  allEstimates: AirtableEstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
  allSources: AirtableSourceFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
  allCountries: AirtableCountryFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterTransformingNotReportedValuesToUndefinedStep[];
  groupedEstimates: GroupedEstimatesAfterTransformingNotReportedValuesToUndefinedStep[];
  mongoClient: MongoClient;
}

interface AssertMandatoryFieldsAreStepOutput {
  allEstimates: AirtableEstimateFieldsAfterAssertingMandatoryFieldsArePresentStep[];
  allSources: AirtableSourceFieldsAfterAssertingMandatoryFieldsArePresentStep[];
  allCountries: AirtableCountryFieldsAfterAssertingMandatoryFieldsArePresentStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterAssertingMandatoryFieldsArePresentStep[];
  groupedEstimates: GroupedEstimatesAfterAssertingMandatoryFieldsArePresentStep[];
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
        isArbovirus(estimate.pathogen) &&
        (estimate.seroprevalence !== undefined && estimate.seroprevalence !== null) 
      );
    }),
    allSources: allSources,
    allCountries: allCountries,
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry.filter((dataPoint) => 
      !Number.isNaN(dataPoint.zikaData.minimumValue) &&
      !Number.isNaN(dataPoint.zikaData.maximumValue) &&
      !Number.isNaN(dataPoint.zikaData.valueRange) &&
      !Number.isNaN(dataPoint.zikaData.meanValue) &&
      !Number.isNaN(dataPoint.zikaData.medianValue) &&
      !Number.isNaN(dataPoint.zikaData.ninetyPercentOfValuesAreBelowThisValue) &&
      !Number.isNaN(dataPoint.dengue2015Data.minimumValue) &&
      !Number.isNaN(dataPoint.dengue2015Data.maximumValue) &&
      !Number.isNaN(dataPoint.dengue2015Data.valueRange) &&
      !Number.isNaN(dataPoint.dengue2015Data.meanValue) &&
      !Number.isNaN(dataPoint.dengue2015Data.medianValue) &&
      !Number.isNaN(dataPoint.dengue2015Data.ninetyPercentOfValuesAreBelowThisValue) &&
      !Number.isNaN(dataPoint.dengue2050Data.minimumValue) &&
      !Number.isNaN(dataPoint.dengue2050Data.maximumValue) &&
      !Number.isNaN(dataPoint.dengue2050Data.valueRange) &&
      !Number.isNaN(dataPoint.dengue2050Data.meanValue) &&
      !Number.isNaN(dataPoint.dengue2050Data.medianValue) &&
      !Number.isNaN(dataPoint.dengue2050Data.ninetyPercentOfValuesAreBelowThisValue)
    ),
    groupedEstimates: input.groupedEstimates,
    mongoClient: input.mongoClient
  };
};
