import { AirtableEstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep, AirtableSourceFieldsAfterTransformingNotReportedValuesToUndefinedStep } from "./transform-not-reported-values-to-undefined-step.js";

export type AirtableEstimateFieldsAfterAssertingMandatoryFieldsArePresentStep =
  Omit<
    AirtableEstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep,
    "country" | "pathogen"
  > & {
    country: string;
    pathogen: string;
  };

export type AirtableSourceFieldsAfterAssertingMandatoryFieldsArePresentStep =
  AirtableSourceFieldsAfterTransformingNotReportedValuesToUndefinedStep;

interface AssertMandatoryFieldsArePresentStepInput {
  allEstimates: AirtableEstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
  allSources: AirtableSourceFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
}

interface AssertMandatoryFieldsAreStepOutput {
  allEstimates: AirtableEstimateFieldsAfterAssertingMandatoryFieldsArePresentStep[];
  allSources: AirtableSourceFieldsAfterAssertingMandatoryFieldsArePresentStep[];
}

export const assertMandatoryFieldsArePresentStep = (
  input: AssertMandatoryFieldsArePresentStepInput
): AssertMandatoryFieldsAreStepOutput => {
  console.log(`Running step: assertMandatoryFieldsArePresentStep. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources } = input;

  return {
    allEstimates: allEstimates.filter((estimate): estimate is AirtableEstimateFieldsAfterAssertingMandatoryFieldsArePresentStep => {
      return !!estimate.country && !!estimate.pathogen;
    }),
    allSources: allSources,
  };
};
