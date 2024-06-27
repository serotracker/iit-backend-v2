import { MongoClient } from "mongodb";
import {
  ConsolidatedCountryDataAfterAddingVaccinationDataStep,
  CountryFieldsAfterAddingVaccinationDataStep,
  EstimateFieldsAfterAddingVaccinationDataStep,
  StructuredCountryPopulationDataAfterAddingVaccinationDataStep,
  StructuredPositiveCaseDataAfterAddingVaccinationDataStep,
  StructuredVaccinationDataAfterAddingVaccinationDataStep,
  StudyFieldsAfterAddingVaccinationDataStep
} from "./add-vaccination-data-to-estimate-step";

export type EstimateFieldsAfterAddingPositiveCaseDataStep =
  EstimateFieldsAfterAddingVaccinationDataStep & { 
    countryPositiveCasesPerMillionPeople: number | undefined;
  };
export type StudyFieldsAfterAddingPositiveCaseDataStep =
  StudyFieldsAfterAddingVaccinationDataStep;
export type CountryFieldsAfterAddingPositiveCaseDataStep =
  CountryFieldsAfterAddingVaccinationDataStep;
export type StructuredVaccinationDataAfterAddingPositiveCaseDataStep =
  StructuredVaccinationDataAfterAddingVaccinationDataStep;
export type StructuredPositiveCaseDataAfterAddingPositiveCaseDataStep =
  StructuredPositiveCaseDataAfterAddingVaccinationDataStep;
export type StructuredCountryPopulationDataAfterAddingPositiveCaseDataStep =
  StructuredCountryPopulationDataAfterAddingVaccinationDataStep;
export type ConsolidatedCountryDataAfterAddingPositiveCaseDataStep =
  ConsolidatedCountryDataAfterAddingVaccinationDataStep & {
    countryPositiveCasesPerMillionPeople: number | undefined;
  };

interface AddPositiveCaseDataToEstimateStepInput {
  allEstimates: EstimateFieldsAfterAddingVaccinationDataStep[];
  allStudies: StudyFieldsAfterAddingVaccinationDataStep[];
  allCountries: CountryFieldsAfterAddingVaccinationDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingVaccinationDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingVaccinationDataStep;
  countryPopulationData: StructuredCountryPopulationDataAfterAddingVaccinationDataStep;
  consolidatedCountryData: ConsolidatedCountryDataAfterAddingVaccinationDataStep[];
  mongoClient: MongoClient;
}

interface AddPositiveCaseDataToEstimateStepOutput {
  allEstimates: EstimateFieldsAfterAddingPositiveCaseDataStep[];
  allStudies: StudyFieldsAfterAddingPositiveCaseDataStep[];
  allCountries: CountryFieldsAfterAddingPositiveCaseDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingPositiveCaseDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingPositiveCaseDataStep;
  countryPopulationData: StructuredCountryPopulationDataAfterAddingPositiveCaseDataStep;
  consolidatedCountryData: ConsolidatedCountryDataAfterAddingPositiveCaseDataStep[];
  mongoClient: MongoClient;
}

export const addPositiveCaseDataToEstimateStep = (
  input: AddPositiveCaseDataToEstimateStepInput
): AddPositiveCaseDataToEstimateStepOutput => {
  console.log(
    `Running step: addPositiveCaseDataToEstimateStep. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates.map((estimate) => ({
      ...estimate,
      countryPositiveCasesPerMillionPeople: input.positiveCaseData
        .find((element) => element.twoLetterCountryCode === estimate.countryAlphaTwoCode)?.data
        .find((element) => estimate.samplingMidDate && element.year === estimate.samplingMidDate.getUTCFullYear().toString())?.data
        .find((element) => estimate.samplingMidDate && element.month === (estimate.samplingMidDate.getUTCMonth() + 1).toString())?.data
        .find((element) => estimate.samplingMidDate && element.day === (estimate.samplingMidDate.getUTCDate()).toString())?.countryPositiveCasesPerMillionPeople
    })),
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    consolidatedCountryData: input.consolidatedCountryData.map((countryDataPoint) => ({
      ...countryDataPoint,
      countryPositiveCasesPerMillionPeople: input.positiveCaseData
        .find((element) => element.twoLetterCountryCode === countryDataPoint.alphaTwoCode)?.data
        .find((element) => element.year === countryDataPoint.year.toString())?.data
        .find((element) => element.month === countryDataPoint.month.toString())?.data
        .map((element) => ({
          differenceFromMiddleOfMonth: Math.abs(parseInt(element.day) - 14),
          countryPositiveCasesPerMillionPeople: element.countryPositiveCasesPerMillionPeople
        }))
        .sort((a, b) => a.differenceFromMiddleOfMonth - b.differenceFromMiddleOfMonth)
        .at(0)?.countryPositiveCasesPerMillionPeople
    })),
    mongoClient: input.mongoClient
  };
};
