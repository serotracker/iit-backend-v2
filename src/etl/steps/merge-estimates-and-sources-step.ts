import { AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep, AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep } from "./remove-records-that-are-flagged-to-not-save-step.js";

export type AirtableEstimateFieldsAfterMergingEstimatesAndSourcesStep =
  AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep & {
    sourceSheetName: string | undefined;
  };

export type AirtableSourceFieldsAfterMergingEstimatesAndSourcesStep =
  AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep;

interface MergeEstimatesAndSourcesStepInput {
  allEstimates: AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  allSources: AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
}

interface MergeEstimatesAndSourcesStepOutput {
  allEstimates: AirtableEstimateFieldsAfterMergingEstimatesAndSourcesStep[];
  allSources: AirtableSourceFieldsAfterMergingEstimatesAndSourcesStep[];
}

export const mergeEstimatesAndSourcesStep = (
  input: MergeEstimatesAndSourcesStepInput
): MergeEstimatesAndSourcesStepOutput => {
  console.log("Running step: mergeEstimatesAndSourcesStep");

  const { allEstimates, allSources } = input;

  return {
    allEstimates: allEstimates.map((estimate) => {
      const associatedSource = allSources.find(
        (source) => source.id === estimate.sourceSheetId
      );

      return {
        ...estimate,
        sourceSheetName: associatedSource?.sourceSheetName,
      };
    }),
    allSources: allSources,
  };
};
