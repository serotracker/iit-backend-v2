import { MongoClient } from "mongodb";
import { UNRegion, getUNRegionFromAlphaTwoCode } from "../../../lib/un-regions.js";
import { WHORegion, getWHORegionFromAlphaTwoCode } from "../../../lib/who-regions.js";
import { GBDSubRegion, GBDSuperRegion, getGBDRegionFromAlphaTwoCode } from "../../../lib/gbd-regions.js";
import { TwoLetterIsoCountryCode, countryNameToTwoLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes.js";
import {
  EstimateFieldsAfterCalculatingSeroprevalenceStep,
  StructuredPositiveCaseDataAfterCalculatingSeroprevalenceStep,
  StructuredVaccinationDataAfterCalculatingSeroprevalenceStep,
  StudyFieldsAfterCalculatingSeroprevalenceStep
} from "./calculate-seroprevalence-step.js";

export type EstimateFieldsAfterAddingCountryAndRegionInformationStep = EstimateFieldsAfterCalculatingSeroprevalenceStep & {
  unRegion: UNRegion | undefined;
  whoRegion: WHORegion | undefined;
  gbdSuperRegion: GBDSuperRegion | undefined;
  gbdSubRegion: GBDSubRegion | undefined;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
};
export type StudyFieldsAfterAddingCountryAndRegionInformationStep = StudyFieldsAfterCalculatingSeroprevalenceStep;
export type StructuredVaccinationDataAfterAddingCountryAndRegionInformationStep = StructuredVaccinationDataAfterCalculatingSeroprevalenceStep;
export type StructuredPositiveCaseDataAfterAddingCountryAndRegionInformationStep = StructuredPositiveCaseDataAfterCalculatingSeroprevalenceStep;

interface AddCountryAndRegionInformationStepInput {
  allEstimates: EstimateFieldsAfterCalculatingSeroprevalenceStep[];
  allStudies: StudyFieldsAfterCalculatingSeroprevalenceStep[];
  vaccinationData: StructuredVaccinationDataAfterCalculatingSeroprevalenceStep;
  positiveCaseData: StructuredPositiveCaseDataAfterCalculatingSeroprevalenceStep;
  mongoClient: MongoClient;
}

interface AddCountryAndRegionInformationStepOutput {
  allEstimates: EstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  allStudies: StudyFieldsAfterAddingCountryAndRegionInformationStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingCountryAndRegionInformationStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingCountryAndRegionInformationStep;
  mongoClient: MongoClient;
}

export const addCountryAndRegionInformationStep = (input: AddCountryAndRegionInformationStepInput): AddCountryAndRegionInformationStepOutput => {
  console.log(
    `Running step: addCountryAndRegionInformationStep. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates
      .map((estimate) => {
        const countryAlphaTwoCode = countryNameToTwoLetterIsoCountryCode(
          estimate.country
        );
        if (!countryAlphaTwoCode) {
          return undefined;
        }

        const unRegion = getUNRegionFromAlphaTwoCode(countryAlphaTwoCode)
        const whoRegion = getWHORegionFromAlphaTwoCode(countryAlphaTwoCode)
        const {
          superRegion: gbdSuperRegion,
          subRegion: gbdSubRegion
        } = getGBDRegionFromAlphaTwoCode(countryAlphaTwoCode)

        return {
          ...estimate,
          countryAlphaTwoCode,
          whoRegion,
          unRegion,
          gbdSuperRegion,
          gbdSubRegion
        };
      }).filter(<T>(estimate: T | undefined): estimate is T => !!estimate),
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    mongoClient: input.mongoClient
  };
}