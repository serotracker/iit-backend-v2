import { MongoClient } from "mongodb";
import { UNRegion, getUNRegionFromAlphaTwoCode } from "../../../lib/un-regions.js";
import { WHORegion, getWHORegionFromAlphaTwoCode } from "../../../lib/who-regions.js";
import { GBDSubRegion, GBDSuperRegion, getGBDRegionFromAlphaTwoCode } from "../../../lib/gbd-regions.js";
import { TwoLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes.js";
import {
  CountryFieldsAfterCalculatingSeroprevalenceStep,
  EstimateFieldsAfterCalculatingSeroprevalenceStep,
  StructuredCountryPopulationDataAfterCalculatingSeroprevalenceStep,
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
export type CountryFieldsAfterAddingCountryAndRegionInformationStep = CountryFieldsAfterCalculatingSeroprevalenceStep;
export type StructuredVaccinationDataAfterAddingCountryAndRegionInformationStep = StructuredVaccinationDataAfterCalculatingSeroprevalenceStep;
export type StructuredPositiveCaseDataAfterAddingCountryAndRegionInformationStep = StructuredPositiveCaseDataAfterCalculatingSeroprevalenceStep;
export type StructuredCountryPopulationDataAfterAddingCountryAndRegionInformationStep = StructuredCountryPopulationDataAfterCalculatingSeroprevalenceStep;

interface AddCountryAndRegionInformationStepInput {
  allEstimates: EstimateFieldsAfterCalculatingSeroprevalenceStep[];
  allStudies: StudyFieldsAfterCalculatingSeroprevalenceStep[];
  allCountries: CountryFieldsAfterCalculatingSeroprevalenceStep[];
  vaccinationData: StructuredVaccinationDataAfterCalculatingSeroprevalenceStep;
  positiveCaseData: StructuredPositiveCaseDataAfterCalculatingSeroprevalenceStep;
  countryPopulationData: StructuredCountryPopulationDataAfterCalculatingSeroprevalenceStep,
  mongoClient: MongoClient;
}

interface AddCountryAndRegionInformationStepOutput {
  allEstimates: EstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  allStudies: StudyFieldsAfterAddingCountryAndRegionInformationStep[];
  allCountries: CountryFieldsAfterAddingCountryAndRegionInformationStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingCountryAndRegionInformationStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingCountryAndRegionInformationStep;
  countryPopulationData: StructuredCountryPopulationDataAfterAddingCountryAndRegionInformationStep,
  mongoClient: MongoClient;
}

export const addCountryAndRegionInformationStep = (input: AddCountryAndRegionInformationStepInput): AddCountryAndRegionInformationStepOutput => {
  console.log(
    `Running step: addCountryAndRegionInformationStep. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates
      .map((estimate) => {
        const fullCountryInformation = input.allCountries.find((element) => element.alphaThreeCode === estimate.countryAlphaThreeCode);

        if(!fullCountryInformation) {
          return undefined;
        }

        const countryAlphaTwoCode = fullCountryInformation.alphaTwoCode as TwoLetterIsoCountryCode;

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
    allCountries: input.allCountries,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
}