import {
  EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
  StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
  StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
  StudyFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
} from "./remove-records-that-are-flagged-to-not-save-step.js";

export type EstimateFieldsAfterCombiningEstimatesAndStudiesStep = EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep & {studyName: string | undefined};
export type StudyFieldsAfterCombiningEstimatesAndStudiesStep = StudyFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
export type StructuredVaccinationDataAfterAfterCombiningEstimatesAndStudiesStep =
  StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
export type StructuredPositiveCaseDataAfterAfterCombiningEstimatesAndStudiesStep =
  StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;

interface CombineEstimatesAndStudiesInput {
  allEstimates: EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep[];
  allStudies: StudyFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep[];
  vaccinationData: StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
  positiveCaseData: StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
}

interface CombineEstimatesAndStudiesOutput {
  allEstimates: EstimateFieldsAfterCombiningEstimatesAndStudiesStep[];
  allStudies: StudyFieldsAfterCombiningEstimatesAndStudiesStep[];
  vaccinationData: StructuredVaccinationDataAfterAfterCombiningEstimatesAndStudiesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAfterCombiningEstimatesAndStudiesStep;
}

export const combineEstimatesAndStudies = (
  input: CombineEstimatesAndStudiesInput
): CombineEstimatesAndStudiesOutput => {
  console.log(
    `Running step: combineEstimatesAndStudies. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates.map((estimate) => {
      const associatedStudy = input.allStudies.find((study) => study.id === estimate.studyId);

      if(!associatedStudy) {
        return {
          ...estimate,
          studyName: undefined
        }
      }

      return {
        ...estimate,
        studyName: associatedStudy.studyName
      }
    }),
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
  };
};