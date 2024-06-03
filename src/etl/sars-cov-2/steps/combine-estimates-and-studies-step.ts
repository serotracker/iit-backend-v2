import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterRemovingNonPrimaryEstimatesStep,
  StructuredPositiveCaseDataAfterRemovingNonPrimaryEstimatesStep,
  StructuredVaccinationDataAfterRemovingNonPrimaryEstimatesStep,
  StudyFieldsAfterRemovingNonPrimaryEstimatesStep,
} from "./remove-non-primary-estimates-step.js";

export type EstimateFieldsAfterCombiningEstimatesAndStudiesStep = EstimateFieldsAfterRemovingNonPrimaryEstimatesStep & {studyName: string | undefined};
export type StudyFieldsAfterCombiningEstimatesAndStudiesStep = StudyFieldsAfterRemovingNonPrimaryEstimatesStep;
export type StructuredVaccinationDataAfterCombiningEstimatesAndStudiesStep =
  StructuredVaccinationDataAfterRemovingNonPrimaryEstimatesStep;
export type StructuredPositiveCaseDataAfterCombiningEstimatesAndStudiesStep =
  StructuredPositiveCaseDataAfterRemovingNonPrimaryEstimatesStep;

interface CombineEstimatesAndStudiesInput {
  allEstimates: EstimateFieldsAfterRemovingNonPrimaryEstimatesStep[];
  allStudies: StudyFieldsAfterRemovingNonPrimaryEstimatesStep[];
  vaccinationData: StructuredVaccinationDataAfterRemovingNonPrimaryEstimatesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterRemovingNonPrimaryEstimatesStep;
  mongoClient: MongoClient;
}

interface CombineEstimatesAndStudiesOutput {
  allEstimates: EstimateFieldsAfterCombiningEstimatesAndStudiesStep[];
  allStudies: StudyFieldsAfterCombiningEstimatesAndStudiesStep[];
  vaccinationData: StructuredVaccinationDataAfterCombiningEstimatesAndStudiesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterCombiningEstimatesAndStudiesStep;
  mongoClient: MongoClient;
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
    mongoClient: input.mongoClient
  };
};
