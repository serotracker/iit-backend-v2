import { MongoClient } from "mongodb";
import { EstimateFieldsAfterCleaningFieldNamesStep, StructuredCountryPopulationDataAfterCleaningFieldNamesStep, StructuredPositiveCaseDataAfterCleaningFieldNamesStep, StructuredVaccinationDataAfterCleaningFieldNamesStep, StudyFieldsAfterCleaningFieldNamesStep } from "./clean-field-names-and-remove-unused-fields-step.js";

export type EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep =
  EstimateFieldsAfterCleaningFieldNamesStep;
export type StudyFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep =
  StudyFieldsAfterCleaningFieldNamesStep;
export type StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep = StructuredVaccinationDataAfterCleaningFieldNamesStep;
export type StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep = StructuredPositiveCaseDataAfterCleaningFieldNamesStep;
export type StructuredCountryPopulationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep = StructuredCountryPopulationDataAfterCleaningFieldNamesStep;

interface RemoveRecordsThatAreFlaggedNotToSaveInput {
  allEstimates: EstimateFieldsAfterCleaningFieldNamesStep[];
  allStudies: StudyFieldsAfterCleaningFieldNamesStep[];
  vaccinationData: StructuredVaccinationDataAfterCleaningFieldNamesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterCleaningFieldNamesStep;
  countryPopulationData: StructuredCountryPopulationDataAfterCleaningFieldNamesStep;
  mongoClient: MongoClient;
}

interface RemoveRecordsThatAreFlaggedNotToSaveOutput {
  allEstimates: EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep[];
  allStudies: StudyFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep[];
  vaccinationData: StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
  positiveCaseData: StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
  countryPopulationData: StructuredCountryPopulationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep;
  mongoClient: MongoClient;
}

export const removeRecordsThatAreFlaggedNotToSave = (
  input: RemoveRecordsThatAreFlaggedNotToSaveInput
): RemoveRecordsThatAreFlaggedNotToSaveOutput => {
  console.log(`Running step: removeRecordsThatAreFlaggedNotToSave. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates.filter(
      (estimate) => estimate.includedInETL !== 0
    ),
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
