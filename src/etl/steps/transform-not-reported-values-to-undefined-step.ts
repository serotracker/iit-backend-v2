import {
  AirtableEstimateFieldsAfterCleaningSingleElementArrayFieldsStep,
  AirtableSourceFieldsAfterCleaningSingleElementArrayFieldsStep,
} from "./clean-single-element-array-fields-step.js";

export type AirtableEstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep =
  AirtableEstimateFieldsAfterCleaningSingleElementArrayFieldsStep;

export type AirtableSourceFieldsAfterTransformingNotReportedValuesToUndefinedStep =
  AirtableSourceFieldsAfterCleaningSingleElementArrayFieldsStep;

interface TransformNotReportedValuesToUndefinedStepInput {
  allEstimates: AirtableEstimateFieldsAfterCleaningSingleElementArrayFieldsStep[];
  allSources: AirtableSourceFieldsAfterCleaningSingleElementArrayFieldsStep[];
}

interface TransformNotReportedValuesToUndefinedStepOutput {
  allEstimates: AirtableEstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
  allSources: AirtableSourceFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
}

export const transformNotReportedValuesToUndefinedStep = (
  input: TransformNotReportedValuesToUndefinedStepInput
): TransformNotReportedValuesToUndefinedStepOutput => {
  console.log(`Running step: transformNotReportedValuesToUndefinedStep. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources } = input;

  return {
    allEstimates: allEstimates.map(
      (estimate) =>
        Object.fromEntries(
          Object.entries(estimate).map(([key, value]) => {
            if (
              !!value &&
              typeof value === "string" &&
              [
                "NR",
                "nr",
                "Not Reported",
                "Not reported",
                "Not available",
                "NA",
                "N/A",
                "nan",
              ].includes(value)
            ) {
              return [key, undefined];
            }

            return [key, value];
          })
        ) as AirtableEstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep
    ),
    allSources: allSources,
  };
};
