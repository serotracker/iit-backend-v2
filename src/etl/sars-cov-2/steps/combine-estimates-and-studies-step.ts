import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
  StructuredCountryPopulationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
  StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
  StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
  StudyFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
} from "./remove-records-that-are-flagged-to-not-save-step.js";
import {
  EstimateFieldsAfterRemovingNonPrimaryEstimatesStep,
  StructuredCountryPopulationDataAfterRemovingNonPrimaryEstimatesStep,
  StructuredPositiveCaseDataAfterRemovingNonPrimaryEstimatesStep,
  StructuredVaccinationDataAfterRemovingNonPrimaryEstimatesStep,
  StudyFieldsAfterRemovingNonPrimaryEstimatesStep
} from "./remove-non-primary-estimates-step.js";

export type EstimateFieldsAfterCombiningEstimatesAndStudiesStep = EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep & {studyName: string | undefined};
export type StudyFieldsAfterCombiningEstimatesAndStudiesStep = StudyFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
export type StructuredVaccinationDataAfterCombiningEstimatesAndStudiesStep =
  StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
export type StructuredPositiveCaseDataAfterCombiningEstimatesAndStudiesStep =
  StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
export type StructuredCountryPopulationDataAfterCombiningEstimatesAndStudiesStep =
  StructuredCountryPopulationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;

interface CombineEstimatesAndStudiesInput {
  allEstimates: EstimateFieldsAfterRemovingNonPrimaryEstimatesStep[];
  allStudies: StudyFieldsAfterRemovingNonPrimaryEstimatesStep[];
  vaccinationData: StructuredVaccinationDataAfterRemovingNonPrimaryEstimatesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterRemovingNonPrimaryEstimatesStep;
  countryPopulationData: StructuredCountryPopulationDataAfterRemovingNonPrimaryEstimatesStep;
  mongoClient: MongoClient;
}

interface CombineEstimatesAndStudiesOutput {
  allEstimates: EstimateFieldsAfterCombiningEstimatesAndStudiesStep[];
  allStudies: StudyFieldsAfterCombiningEstimatesAndStudiesStep[];
  vaccinationData: StructuredVaccinationDataAfterCombiningEstimatesAndStudiesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterCombiningEstimatesAndStudiesStep;
  countryPopulationData: StructuredCountryPopulationDataAfterCombiningEstimatesAndStudiesStep;
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
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
