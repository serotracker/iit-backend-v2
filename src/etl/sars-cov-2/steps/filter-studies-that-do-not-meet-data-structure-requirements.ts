import { EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep } from "./remove-records-that-are-flagged-to-not-save-step.js";

export type EstimateFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep =
  Omit<
    EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
    "country"
  > & { country: string };

interface FilterStudiesThatDoNotMeetDataStructureRequirementsInput {
  allEstimates: EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep[];
}

interface FilterStudiesThatDoNotMeetDataStructureRequirementsOutput {
  allEstimates: EstimateFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep[];
}

export const filterStudiesThatDoNotMeetDataStructureRequirement = (
  input: FilterStudiesThatDoNotMeetDataStructureRequirementsInput
): FilterStudiesThatDoNotMeetDataStructureRequirementsOutput => {
  console.log(
    `Running step: filterStudiesThatDoNotMeetDataStructureRequirement. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates.filter(
      (
        estimate
      ): estimate is EstimateFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep =>
        !!estimate.country
    ),
  };
};
