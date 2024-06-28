import { MongoClient } from "mongodb";
import { isArrayOfUnknownType } from "../../../lib/lib.js";
import {
  CountryFieldsAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep,
  EstimateFieldsAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep,
  StructuredCountryPopulationDataAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep,
  StructuredPositiveCaseDataAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep,
  StructuredVaccinationDataAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep,
  StudyFieldsAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep
} from "./filter-entities-that-do-not-meet-data-structure-requirements.js";

export type EstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep =
  EstimateFieldsAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep;
export type StudyFieldsAfterTransformingNotReportedValuesToUndefinedStep =
  StudyFieldsAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep;
export type CountryFieldsAfterTransformingNotReportedValuesToUndefinedStep =
  CountryFieldsAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep
export type StructuredVaccinationDataAfterTransformingNotReportedValuesToUndefinedStep =
  StructuredVaccinationDataAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep;
export type StructuredPositiveCaseDataAfterTransformingNotReportedValuesToUndefinedStep =
  StructuredPositiveCaseDataAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep;
export type StructuredCountryPopulationDataAfterTransformingNotReportedValuesToUndefinedStep =
  StructuredCountryPopulationDataAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep;

interface TransformNotReportedValuesToUndefinedStepInput {
  allEstimates: EstimateFieldsAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep[];
  allStudies: StudyFieldsAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep[];
  allCountries: CountryFieldsAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep[];
  vaccinationData: StructuredVaccinationDataAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep;
  countryPopulationData: StructuredCountryPopulationDataAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep;
  mongoClient: MongoClient;
}

interface TransformNotReportedValuesToUndefinedStepOutput {
  allEstimates: EstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
  allStudies: StudyFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
  allCountries: CountryFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
  vaccinationData: StructuredVaccinationDataAfterTransformingNotReportedValuesToUndefinedStep;
  positiveCaseData: StructuredPositiveCaseDataAfterTransformingNotReportedValuesToUndefinedStep;
  countryPopulationData: StructuredCountryPopulationDataAfterTransformingNotReportedValuesToUndefinedStep;
  mongoClient: MongoClient;
}

enum NotReportedValue {
  NR = "NR",
  nr = "nr",
  NA = "NA",
  nan = "nan",
  "N/A" = "N/A",
  "Not Reported" = "Not Reported",
  "Not reported" = "Not reported",
  "Not available" = "Not available",
}

const isNotReportedValue = (value: unknown): value is NotReportedValue => {
  return typeof value === 'string' && Object.values(NotReportedValue).some((notReportedValue) => notReportedValue === value);
}

export const transformNotReportedValuesToUndefinedStep = (
  input: TransformNotReportedValuesToUndefinedStepInput
): TransformNotReportedValuesToUndefinedStepOutput => {
  console.log(`Running step: transformNotReportedValuesToUndefinedStep. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates } = input;

  return {
    allEstimates: allEstimates.map(
      (estimate) =>
        Object.fromEntries(
          Object.entries(estimate).map(([key, value]) => {
            if (isNotReportedValue(value)) {
              return [key, undefined];
            }

            if(isArrayOfUnknownType(value)) {
              return [key, value.filter((element) => !isNotReportedValue(element))]
            }

            return [key, value];
          })
        ) as EstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep
    ),
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
