import { MongoClient } from "mongodb";
import {
    ConsolidatedCountryDataAfterAddingCountryPopulationDataStep,
  CountryFieldsAfterAddingCountryPopulationDataStep,
  EstimateFieldsAfterAddingCountryPopulationDataStep,
  StructuredCountryPopulationDataAfterAddingCountryPopulationDataStep,
  StructuredPositiveCaseDataAfterAddingCountryPopulationDataStep,
  StructuredVaccinationDataAfterAddingCountryPopulationDataStep,
  StudyFieldsAfterAddingCountryPopulationDataStep
} from "./add-country-population-data-to-estimate-step";

export type EstimateFieldsAfterAssigningPartitionStep = EstimateFieldsAfterAddingCountryPopulationDataStep & {
  partitionKey: number;
};
export type StudyFieldsAfterAssigningPartitionStep = StudyFieldsAfterAddingCountryPopulationDataStep;
export type CountryFieldsAfterAssigningPartitionStep = CountryFieldsAfterAddingCountryPopulationDataStep;
export type StructuredVaccinationDataAfterAssigningPartitionStep = StructuredVaccinationDataAfterAddingCountryPopulationDataStep;
export type StructuredPositiveCaseDataAfterAssigningPartitionStep = StructuredPositiveCaseDataAfterAddingCountryPopulationDataStep;
export type StructuredCountryPopulationDataAfterAssigningPartitionStep = StructuredCountryPopulationDataAfterAddingCountryPopulationDataStep;
export type ConsolidatedCountryDataAfterAssigningPartitionStep = ConsolidatedCountryDataAfterAddingCountryPopulationDataStep & {
  partitionKey: number;
};

interface AssignPartitionsStepInput {
  allEstimates: EstimateFieldsAfterAddingCountryPopulationDataStep[];
  allStudies: StudyFieldsAfterAddingCountryPopulationDataStep[];
  allCountries: CountryFieldsAfterAddingCountryPopulationDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingCountryPopulationDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingCountryPopulationDataStep;
  countryPopulationData: StructuredCountryPopulationDataAfterAddingCountryPopulationDataStep;
  consolidatedCountryData: ConsolidatedCountryDataAfterAddingCountryPopulationDataStep[];
  mongoClient: MongoClient;
}

interface AssignPartitionsStepOutput {
  allEstimates: EstimateFieldsAfterAssigningPartitionStep[];
  allStudies: StudyFieldsAfterAssigningPartitionStep[];
  allCountries: CountryFieldsAfterAssigningPartitionStep[];
  vaccinationData: StructuredVaccinationDataAfterAssigningPartitionStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAssigningPartitionStep;
  countryPopulationData: StructuredCountryPopulationDataAfterAssigningPartitionStep;
  consolidatedCountryData: ConsolidatedCountryDataAfterAssigningPartitionStep[];
  mongoClient: MongoClient;
}

export const assignPartitionsStep = (input: AssignPartitionsStepInput): AssignPartitionsStepOutput => {
  const estimatePartitionSize = 1000;
  const consolidatedCountryDataPartitionSize = 5000;
  console.log(`Running step: assignPartitionsStep. Remaining estimates: ${input.allEstimates.length}. estimatePartitionSize: ${estimatePartitionSize}. consolidatedCountryDataPartitionSize: ${consolidatedCountryDataPartitionSize}`);

  return {
    allEstimates: input.allEstimates.map((estimate, index) => ({
      ...estimate,
      partitionKey: index % estimatePartitionSize
    })),
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    consolidatedCountryData: input.consolidatedCountryData.map((countryDataPoint, index) => ({
      ...countryDataPoint,
      partitionKey: index % consolidatedCountryDataPartitionSize
    })),
    mongoClient: input.mongoClient
  };
}