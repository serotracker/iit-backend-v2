import {
  AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep,
  AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep
} from "./add-country-and-region-information-step.js";

export type AirtableEstimateFieldsAfterMergingEstimatesAndSourcesStep =
  AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep & {
    sourceSheetName: string | undefined;
  };

export type AirtableSourceFieldsAfterMergingEstimatesAndSourcesStep =
  AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep;

interface MergeEstimatesAndSourcesStepInput {
  allEstimates: AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  allSources: AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep[];
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
