import {
  EstimateFieldsAfterCombiningEstimatesAndStudiesStep,
  StructuredPositiveCaseDataAfterAfterCombiningEstimatesAndStudiesStep,
  StructuredVaccinationDataAfterAfterCombiningEstimatesAndStudiesStep,
  StudyFieldsAfterCombiningEstimatesAndStudiesStep
} from "./combine-estimates-and-studies-step.js";

export type EstimateFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep =
  Omit<
    EstimateFieldsAfterCombiningEstimatesAndStudiesStep,
    "country" | "countryAlphaThreeCode" | "studyName"
  > & { country: string; countryAlphaThreeCode: string, studyName: string };
export type StudyFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep =
  StudyFieldsAfterCombiningEstimatesAndStudiesStep;
export type StructuredVaccinationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep =
  StructuredVaccinationDataAfterAfterCombiningEstimatesAndStudiesStep;
export type StructuredPositiveCaseDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep =
  StructuredPositiveCaseDataAfterAfterCombiningEstimatesAndStudiesStep;

interface FilterStudiesThatDoNotMeetDataStructureRequirementsInput {
  allEstimates: EstimateFieldsAfterCombiningEstimatesAndStudiesStep[];
  allStudies: StudyFieldsAfterCombiningEstimatesAndStudiesStep[];
  vaccinationData: StructuredVaccinationDataAfterAfterCombiningEstimatesAndStudiesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAfterCombiningEstimatesAndStudiesStep;
}

interface FilterStudiesThatDoNotMeetDataStructureRequirementsOutput {
  allEstimates: EstimateFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep[];
  allStudies: StudyFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep[];
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
        !!estimate.country && !!estimate.countryAlphaThreeCode && !!estimate.studyName
    ),
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
  };
};
