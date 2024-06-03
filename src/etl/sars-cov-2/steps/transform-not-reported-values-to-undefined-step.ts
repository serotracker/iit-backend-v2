import { MongoClient } from "mongodb";
import { isArrayOfUnknownType } from "../../../lib/lib.js";
import { EstimateFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep, StructuredCountryPopulationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep, StructuredPositiveCaseDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep, StructuredVaccinationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep, StudyFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep } from "./filter-studies-that-do-not-meet-data-structure-requirements.js";

export type EstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep =
  EstimateFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
export type StudyFieldsAfterTransformingNotReportedValuesToUndefinedStep =
  StudyFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
export type StructuredVaccinationDataAfterTransformingNotReportedValuesToUndefinedStep = StructuredVaccinationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
export type StructuredPositiveCaseDataAfterTransformingNotReportedValuesToUndefinedStep = StructuredPositiveCaseDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
export type StructuredCountryPopulationDataAfterTransformingNotReportedValuesToUndefinedStep = StructuredCountryPopulationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;

interface TransformNotReportedValuesToUndefinedStepInput {
  allEstimates: EstimateFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep[];
  allStudies: StudyFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep[]
  vaccinationData: StructuredVaccinationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
  countryPopulationData: StructuredCountryPopulationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
  mongoClient: MongoClient;
}

interface TransformNotReportedValuesToUndefinedStepOutput {
  allEstimates: EstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
  allStudies: StudyFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
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
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
