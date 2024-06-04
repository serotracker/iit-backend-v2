import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterAddingPositiveCaseDataStep,
  StudyFieldsAfterAddingPositiveCaseDataStep,
  StructuredVaccinationDataAfterAddingPositiveCaseDataStep,
  StructuredPositiveCaseDataAfterAddingPositiveCaseDataStep,
  StructuredCountryPopulationDataAfterAddingPositiveCaseDataStep,
  ConsolidatedCountryDataAfterAddingPositiveCaseDataStep
} from "./add-positive-case-data-to-estimate-step";

export type EstimateFieldsAfterAddingCountryPopulationDataStep =
  EstimateFieldsAfterAddingPositiveCaseDataStep & { 
    countryPopulation: number | undefined;
  };
export type StudyFieldsAfterAddingCountryPopulationDataStep =
  StudyFieldsAfterAddingPositiveCaseDataStep;
export type StructuredVaccinationDataAfterAddingCountryPopulationDataStep =
  StructuredVaccinationDataAfterAddingPositiveCaseDataStep;
export type StructuredPositiveCaseDataAfterAddingCountryPopulationDataStep =
  StructuredPositiveCaseDataAfterAddingPositiveCaseDataStep;
export type StructuredCountryPopulationDataAfterAddingCountryPopulationDataStep =
  StructuredCountryPopulationDataAfterAddingPositiveCaseDataStep;
export type ConsolidatedCountryDataAfterAddingCountryPopulationDataStep =
  ConsolidatedCountryDataAfterAddingPositiveCaseDataStep & {
    countryPopulation: number | undefined;
  };

interface AddCountryPopulationDataToEstimateStepInput {
  allEstimates: EstimateFieldsAfterAddingPositiveCaseDataStep[];
  allStudies: StudyFieldsAfterAddingPositiveCaseDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingPositiveCaseDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingPositiveCaseDataStep;
  countryPopulationData: StructuredCountryPopulationDataAfterAddingPositiveCaseDataStep;
  consolidatedCountryData: ConsolidatedCountryDataAfterAddingPositiveCaseDataStep[];
  mongoClient: MongoClient;
}

interface AddCountryPopulationDataToEstimateStepOutput {
  allEstimates: EstimateFieldsAfterAddingCountryPopulationDataStep[];
  allStudies: StudyFieldsAfterAddingCountryPopulationDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingCountryPopulationDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingCountryPopulationDataStep;
  countryPopulationData: StructuredCountryPopulationDataAfterAddingCountryPopulationDataStep;
  consolidatedCountryData: ConsolidatedCountryDataAfterAddingCountryPopulationDataStep[];
  mongoClient: MongoClient;
}

export const addCountryPopulationDataToEstimateStep = (
  input: AddCountryPopulationDataToEstimateStepInput
): AddCountryPopulationDataToEstimateStepOutput => {
  console.log(`Running step: addCountryPopulationDataToEstimateStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates.map((estimate) => ({
      ...estimate,
      countryPopulation: input.countryPopulationData
        .find((element) => element.threeLetterCountryCode === estimate.countryAlphaThreeCode)?.data
        .find((element) => estimate.samplingMidDate && element.year === estimate.samplingMidDate.getUTCFullYear())?.populationEstimate
    })),
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    consolidatedCountryData: input.consolidatedCountryData.map((countryDataPoint) => ({
      ...countryDataPoint,
      countryPopulation: input.countryPopulationData
        .find((element) => element.threeLetterCountryCode === countryDataPoint.alphaThreeCode)?.data
        .find((element) => element.year === countryDataPoint.year)?.populationEstimate
    })),
    mongoClient: input.mongoClient
  };
};
