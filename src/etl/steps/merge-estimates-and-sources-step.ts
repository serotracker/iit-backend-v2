import { 
  AirtableEstimateFieldsAfterAddingAlphaTwoCountryCodesStep,
  AirtableSourceFieldsAfterAddingAlphaTwoCountryCodesStep
} from "./add-alpha-two-country-code-step.js";

export type AirtableEstimateFieldsAfterMergingEstimatesAndSourcesStep =
  AirtableEstimateFieldsAfterAddingAlphaTwoCountryCodesStep & {
    sourceSheetName: string | undefined;
  };

export type AirtableSourceFieldsAfterMergingEstimatesAndSourcesStep =
  AirtableSourceFieldsAfterAddingAlphaTwoCountryCodesStep;

interface MergeEstimatesAndSourcesStepInput {
  allEstimates: AirtableEstimateFieldsAfterAddingAlphaTwoCountryCodesStep[];
  allSources: AirtableSourceFieldsAfterAddingAlphaTwoCountryCodesStep[];
}

interface MergeEstimatesAndSourcesStepOutput {
  allEstimates: AirtableEstimateFieldsAfterMergingEstimatesAndSourcesStep[];
  allSources: AirtableSourceFieldsAfterMergingEstimatesAndSourcesStep[];
}

export const mergeEstimatesAndSourcesStep = (
  input: MergeEstimatesAndSourcesStepInput
): MergeEstimatesAndSourcesStepOutput => {
  console.log(`Running step: mergeEstimatesAndSourcesStep. Remaining estimates: ${input.allEstimates.length}`);

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
