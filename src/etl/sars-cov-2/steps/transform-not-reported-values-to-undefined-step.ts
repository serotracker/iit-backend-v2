import { isArrayOfUnknownType } from "../../../lib/lib.js";
import { EstimateFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep, StructuredPositiveCaseDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep, StructuredVaccinationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep } from "./filter-studies-that-do-not-meet-data-structure-requirements.js";

export type EstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep =
  EstimateFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
export type StructuredVaccinationDataAfterTransformingNotReportedValuesToUndefinedStep = StructuredVaccinationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
export type StructuredPositiveCaseDataAfterTransformingNotReportedValuesToUndefinedStep = StructuredPositiveCaseDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;

interface TransformNotReportedValuesToUndefinedStepInput {
  allEstimates: EstimateFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep[];
  vaccinationData: StructuredVaccinationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
}

interface TransformNotReportedValuesToUndefinedStepOutput {
  allEstimates: EstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
  vaccinationData: StructuredVaccinationDataAfterTransformingNotReportedValuesToUndefinedStep;
  positiveCaseData: StructuredPositiveCaseDataAfterTransformingNotReportedValuesToUndefinedStep;
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
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
  };
};
