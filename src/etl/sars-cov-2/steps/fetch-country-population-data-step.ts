import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterFetchingPositiveCaseDataStep,
  StructuredCountryPopulationDataAfterFetchingPositiveCaseDataStep,
  StructuredPositiveCaseDataAfterFetchingPositiveCaseDataStep,
  StructuredVaccinationDataAfterFetchingPositiveCaseDataStep,
  StudyFieldsAfterFetchingPositiveCaseDataStep
} from "./fetch-positive-case-data-step";
import { StructuredCountryPopulationData } from "../types";

export type EstimateFieldsAfterFetchingCountryPopulationStep =
  EstimateFieldsAfterFetchingPositiveCaseDataStep;
export type StudyFieldsAfterFetchingCountryPopulationStep =
  StudyFieldsAfterFetchingPositiveCaseDataStep;
export type StructuredVaccinationDataAfterFetchingCountryPopulationStep = StructuredVaccinationDataAfterFetchingPositiveCaseDataStep;
export type StructuredPositiveCaseDataAfterFetchingCountryPopulationStep = StructuredPositiveCaseDataAfterFetchingPositiveCaseDataStep;
export type StructuredCountryPopulationDataAfterFetchingCountryPopulationStep = StructuredCountryPopulationData;

interface FetchCountryPopulationDataStepInput {
  allEstimates: EstimateFieldsAfterFetchingPositiveCaseDataStep[];
  allStudies: StudyFieldsAfterFetchingPositiveCaseDataStep[];
  vaccinationData: StructuredVaccinationDataAfterFetchingPositiveCaseDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFetchingPositiveCaseDataStep;
  countryPopulationData: StructuredCountryPopulationDataAfterFetchingPositiveCaseDataStep;
  mongoClient: MongoClient;
}

interface FetchCountryPopulationDataStepOutput {
  allEstimates: EstimateFieldsAfterFetchingCountryPopulationStep[];
  allStudies: StudyFieldsAfterFetchingCountryPopulationStep[];
  vaccinationData: StructuredVaccinationDataAfterFetchingCountryPopulationStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFetchingCountryPopulationStep;
  countryPopulationData: StructuredCountryPopulationDataAfterFetchingCountryPopulationStep;
  mongoClient: MongoClient;
}

export const fetchCountryPopulationDataStep = (
  input: FetchCountryPopulationDataStepInput
): FetchCountryPopulationDataStepOutput => {
  console.log(
    `Running step: fetchCountryPopulationDataStep. Remaining estimates: ${input.allEstimates.length}.`
  );

  return {
    allEstimates: input.allEstimates,
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: [],
    mongoClient: input.mongoClient
  };
};