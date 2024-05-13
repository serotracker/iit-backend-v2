import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterJitteringPinLatLngStep,
  StructuredPositiveCaseDataAfterJitteringPinLatLngStep,
  StructuredVaccinationDataAfterJitteringPinLatLngStep,
  StudyFieldsAfterJitteringPinLatLngStep,
} from "./jitter-pin-lat-lng-step";

export type EstimateFieldsAfterAddingVaccinationDataStep =
  EstimateFieldsAfterJitteringPinLatLngStep & {
    countryPeopleVaccinatedPerHundred: number | undefined;
    countryPeopleFullyVaccinatedPerHundred: number | undefined;
  };
export type StudyFieldsAfterAddingVaccinationDataStep = StudyFieldsAfterJitteringPinLatLngStep;
export type StructuredVaccinationDataAfterAddingVaccinationDataStep =
  StructuredVaccinationDataAfterJitteringPinLatLngStep;
export type StructuredPositiveCaseDataAfterAddingVaccinationDataStep =
  StructuredPositiveCaseDataAfterJitteringPinLatLngStep;

interface AddVaccinationDataToEstimateStepInput {
  allEstimates: EstimateFieldsAfterJitteringPinLatLngStep[];
  allStudies: StudyFieldsAfterJitteringPinLatLngStep[];
  vaccinationData: StructuredVaccinationDataAfterJitteringPinLatLngStep;
  positiveCaseData: StructuredPositiveCaseDataAfterJitteringPinLatLngStep;
  mongoClient: MongoClient;
}

interface AddVaccinationDataToEstimateStepOutput {
  allEstimates: EstimateFieldsAfterAddingVaccinationDataStep[];
  allStudies: StudyFieldsAfterAddingVaccinationDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingVaccinationDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingVaccinationDataStep;
  mongoClient: MongoClient;
}

export const addVaccinationDataToEstimateStep = (
  input: AddVaccinationDataToEstimateStepInput
): AddVaccinationDataToEstimateStepOutput => {
  console.log(
    `Running step: addVaccinationDataToEstimateStep. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates.map((estimate) => {
      const {
        countryPeopleVaccinatedPerHundred,
        countryPeopleFullyVaccinatedPerHundred
      } = input.vaccinationData
        .find((element) => element.threeLetterCountryCode === estimate.countryAlphaThreeCode)?.data
        .find((element) => estimate.samplingMidDate && element.year === estimate.samplingMidDate.getUTCFullYear().toString())?.data
        .find((element) => estimate.samplingMidDate && element.month === (estimate.samplingMidDate.getUTCMonth() + 1).toString())?.data
        .find((element) => estimate.samplingMidDate && element.day === (estimate.samplingMidDate.getUTCDate()).toString()) ?? {
          countryPeopleVaccinatedPerHundred: undefined,
          countryPeopleFullyVaccinatedPerHundred: undefined
        }
      return {
        ...estimate,
        countryPeopleVaccinatedPerHundred,
        countryPeopleFullyVaccinatedPerHundred
      }
    }),
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    mongoClient: input.mongoClient
  };
};
