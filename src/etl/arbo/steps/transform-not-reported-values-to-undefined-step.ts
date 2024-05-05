import { MongoClient } from "mongodb";
import { isArrayOfUnknownType } from "../../../lib/lib.js";
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
  mongoClient: MongoClient;
}

interface TransformNotReportedValuesToUndefinedStepOutput {
  allEstimates: AirtableEstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
  allSources: AirtableSourceFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
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

  const { allEstimates, allSources } = input;

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
        ) as AirtableEstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep
    ),
    allSources: allSources,
    mongoClient: input.mongoClient
  };
};
