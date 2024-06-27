import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
  EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
  StructuredCountryPopulationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
  StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
  StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
  StudyFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep,
} from "./remove-records-that-are-flagged-to-not-save-step.js";

export type EstimateFieldsAfterRemovingNonPrimaryEstimatesStep = EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
export type StudyFieldsAfterRemovingNonPrimaryEstimatesStep = StudyFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
export type CountryFieldsAfterRemovingNonPrimaryEstimatesStep =
  CountryFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
export type StructuredVaccinationDataAfterRemovingNonPrimaryEstimatesStep =
  StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
export type StructuredPositiveCaseDataAfterRemovingNonPrimaryEstimatesStep =
  StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
export type StructuredCountryPopulationDataAfterRemovingNonPrimaryEstimatesStep =
  StructuredCountryPopulationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;

interface RemoveNonPrimaryEstimatesStepInput {
  allEstimates: EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep[];
  allStudies: StudyFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep[];
  allCountries: CountryFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep[];
  vaccinationData: StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
  positiveCaseData: StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
  countryPopulationData: StructuredCountryPopulationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
  mongoClient: MongoClient;
}

interface RemoveNonPrimaryEstimatesStepOutput {
  allEstimates: EstimateFieldsAfterRemovingNonPrimaryEstimatesStep[];
  allStudies: StudyFieldsAfterRemovingNonPrimaryEstimatesStep[];
  allCountries: CountryFieldsAfterRemovingNonPrimaryEstimatesStep[];
  vaccinationData: StructuredVaccinationDataAfterRemovingNonPrimaryEstimatesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterRemovingNonPrimaryEstimatesStep;
  countryPopulationData: StructuredCountryPopulationDataAfterRemovingNonPrimaryEstimatesStep;
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
    allCountries: input.allCountries,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
