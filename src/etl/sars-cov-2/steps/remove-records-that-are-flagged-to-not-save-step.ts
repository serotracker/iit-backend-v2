import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterCleaningFieldNamesStep,
  EstimateFieldsAfterCleaningFieldNamesStep,
  StructuredCountryPopulationDataAfterCleaningFieldNamesStep,
  StructuredPositiveCaseDataAfterCleaningFieldNamesStep,
  StructuredVaccinationDataAfterCleaningFieldNamesStep,
  StudyFieldsAfterCleaningFieldNamesStep
} from "./clean-field-names-and-remove-unused-fields-step.js";

export type EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep =
  EstimateFieldsAfterCleaningFieldNamesStep;
export type StudyFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep =
  StudyFieldsAfterCleaningFieldNamesStep;
export type CountryFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep =
  CountryFieldsAfterCleaningFieldNamesStep;
export type StructuredVaccinationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep = StructuredVaccinationDataAfterCleaningFieldNamesStep;
export type StructuredPositiveCaseDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep = StructuredPositiveCaseDataAfterCleaningFieldNamesStep;
export type StructuredCountryPopulationDataAfterRemovingRecordsThatAreFlaggedNotToSaveStep = StructuredCountryPopulationDataAfterCleaningFieldNamesStep;

interface RemoveRecordsThatAreFlaggedNotToSaveInput {
  allEstimates: EstimateFieldsAfterCleaningFieldNamesStep[];
  allStudies: StudyFieldsAfterCleaningFieldNamesStep[];
  allCountries: CountryFieldsAfterCleaningFieldNamesStep[];
  vaccinationData: StructuredVaccinationDataAfterCleaningFieldNamesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterCleaningFieldNamesStep;
  countryPopulationData: StructuredCountryPopulationDataAfterCleaningFieldNamesStep;
  mongoClient: MongoClient;
}

interface RemoveRecordsThatAreFlaggedNotToSaveOutput {
  allEstimates: EstimateFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep[];
  allStudies: StudyFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep[];
  allCountries: CountryFieldsAfterRemovingRecordsThatAreFlaggedNotToSaveStep[];
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
    allCountries: input.allCountries,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
