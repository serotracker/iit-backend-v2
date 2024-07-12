import { isArrayOfUnknownType } from "../../../../lib/lib.js";
import { EstimateFieldsAfterCleaningEstimatesFromAirtableStep } from "./clean-estimates-from-airtable-step";

export type EstimateFieldsAfterCleaningBadValuesFromEstimatesStep = Omit<EstimateFieldsAfterCleaningEstimatesFromAirtableStep,
  | 'confidenceInterval95PercentLowerBound'
  | 'confidenceInterval95PercentUpperBound'
> & {
  confidenceInterval95PercentLowerBound: number | null;
  confidenceInterval95PercentUpperBound: number | null;
};

interface CleanBadValuesFromEstimatesStepInput {
  allEstimates: EstimateFieldsAfterCleaningEstimatesFromAirtableStep[];
}

interface CleanBadValuesFromEstimatesStepOutput {
  allEstimates: EstimateFieldsAfterCleaningBadValuesFromEstimatesStep[];
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

const isAirtableError = (value: unknown): value is { error: "#ERROR!" } => {
  return typeof value === 'object' && !!value && 'error' in value && value['error'] === '#ERROR';
}

export const cleanBadValuesFromEstimatesStep = (input: CleanBadValuesFromEstimatesStepInput): CleanBadValuesFromEstimatesStepOutput => {
  console.log(`Running step: cleanBadValuesFromEstimatesStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates.map((estimate) => {
      const confidenceInterval95PercentLowerBound = typeof estimate.confidenceInterval95PercentLowerBound !== 'string'
        ? estimate.confidenceInterval95PercentLowerBound
        : null;
      const confidenceInterval95PercentUpperBound = typeof estimate.confidenceInterval95PercentUpperBound !== 'string'
        ? estimate.confidenceInterval95PercentUpperBound
        : null;

      const estimateWithNotReportedValuesFiltered = Object.fromEntries(
        Object.entries(estimate).map(([key, value]) => {
          if (isNotReportedValue(value) || isAirtableError(value)) {
            return [key, null];
          }

          if(isArrayOfUnknownType(value)) {
            return [key, value
              .filter((element) => !isNotReportedValue(element))
              .filter((element) => !isAirtableError(element))
            ]
          }

          return [key, value];
        })
      ) as typeof input.allEstimates[number]

      return {
        ...estimateWithNotReportedValuesFiltered,
        confidenceInterval95PercentLowerBound,
        confidenceInterval95PercentUpperBound,
      }
    })
  }
}
