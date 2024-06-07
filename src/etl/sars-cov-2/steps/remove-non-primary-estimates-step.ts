import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
  StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
  StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
  StudyFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
} from "./remove-records-that-are-flagged-to-not-save-step.js";

export type EstimateFieldsAfterRemovingNonPrimaryEstimatesStep = EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
export type StudyFieldsAfterRemovingNonPrimaryEstimatesStep = StudyFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
export type StructuredVaccinationDataAfterRemovingNonPrimaryEstimatesStep =
  StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
export type StructuredPositiveCaseDataAfterRemovingNonPrimaryEstimatesStep =
  StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;

interface RemoveNonPrimaryEstimatesStepInput {
  allEstimates: EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep[];
  allStudies: StudyFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep[];
  vaccinationData: StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
  positiveCaseData: StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
  mongoClient: MongoClient;
}

interface RemoveNonPrimaryEstimatesStepOutput {
  allEstimates: EstimateFieldsAfterRemovingNonPrimaryEstimatesStep[];
  allStudies: StudyFieldsAfterRemovingNonPrimaryEstimatesStep[];
  vaccinationData: StructuredVaccinationDataAfterRemovingNonPrimaryEstimatesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterRemovingNonPrimaryEstimatesStep;
  mongoClient: MongoClient;
}

export const removeNonPrimaryEstimatesStep = (
  input: RemoveNonPrimaryEstimatesStepInput
): RemoveNonPrimaryEstimatesStepOutput => {
  console.log(
    `Running step: removeNonPrimaryEstimatesStep. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates.filter((estimate) => estimate.isPrimaryEstimate),
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    mongoClient: input.mongoClient
  };
};
