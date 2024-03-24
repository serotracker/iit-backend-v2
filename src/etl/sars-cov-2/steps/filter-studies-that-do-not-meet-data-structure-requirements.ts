import {
  EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
  StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
  StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
} from "./remove-records-that-are-flagged-to-not-save-step.js";

export type EstimateFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep =
  Omit<
    EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
    "country" | "countryAlphaThreeCode"
  > & { country: string; countryAlphaThreeCode: string };
export type StructuredVaccinationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep =
  StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
export type StructuredPositiveCaseDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep =
  StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;

interface FilterStudiesThatDoNotMeetDataStructureRequirementsInput {
  allEstimates: EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep[];
  vaccinationData: StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
  positiveCaseData: StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
}

interface FilterStudiesThatDoNotMeetDataStructureRequirementsOutput {
  allEstimates: EstimateFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep[];
  vaccinationData: StructuredVaccinationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
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
        !!estimate.country && !!estimate.countryAlphaThreeCode
    ),
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
  };
};
