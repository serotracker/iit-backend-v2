import { MongoClient } from "mongodb";
import { UNRegion, getUNRegionFromAlphaTwoCode } from "../../../lib/un-regions.js";
import { WHORegion, getWHORegionFromAlphaTwoCode } from "../../../lib/who-regions.js";
import { GBDSubRegion, GBDSuperRegion, getGBDRegionFromAlphaTwoCode } from "../../../lib/gbd-regions.js";
import { TwoLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes.js";
import {
  ConsolidatedCountryDataAfterGeneratingConsolidatedCountryDataStep,
  CountryFieldsAfterGeneratingConsolidatedCountryDataStep,
  EstimateFieldsAfterGeneratingConsolidatedCountryDataStep,
  StructuredCountryPopulationDataAfterGeneratingConsolidatedCountryDataStep,
  StructuredPositiveCaseDataAfterGeneratingConsolidatedCountryDataStep,
  StructuredVaccinationDataAfterGeneratingConsolidatedCountryDataStep,
  StudyFieldsAfterGeneratingConsolidatedCountryDataStep
} from "./generate-consolidated-country-data-step.js";

export type EstimateFieldsAfterAddingCountryAndRegionInformationStep = EstimateFieldsAfterGeneratingConsolidatedCountryDataStep & {
  unRegion: UNRegion | undefined;
  whoRegion: WHORegion | undefined;
  gbdSuperRegion: GBDSuperRegion | undefined;
  gbdSubRegion: GBDSubRegion | undefined;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
};
export type StudyFieldsAfterAddingCountryAndRegionInformationStep = StudyFieldsAfterGeneratingConsolidatedCountryDataStep;
export type CountryFieldsAfterAddingCountryAndRegionInformationStep = CountryFieldsAfterGeneratingConsolidatedCountryDataStep;
export type StructuredVaccinationDataAfterAddingCountryAndRegionInformationStep = StructuredVaccinationDataAfterGeneratingConsolidatedCountryDataStep;
export type StructuredPositiveCaseDataAfterAddingCountryAndRegionInformationStep = StructuredPositiveCaseDataAfterGeneratingConsolidatedCountryDataStep;
export type StructuredCountryPopulationDataAfterAddingCountryAndRegionInformationStep = StructuredCountryPopulationDataAfterGeneratingConsolidatedCountryDataStep;
export type ConsolidatedCountryDataAfterAddingCountryAndRegionInformationStep = ConsolidatedCountryDataAfterGeneratingConsolidatedCountryDataStep & {
  unRegion: UNRegion | undefined;
  whoRegion: WHORegion | undefined;
  gbdSuperRegion: GBDSuperRegion | undefined;
  gbdSubRegion: GBDSubRegion | undefined;
};

interface AddCountryAndRegionInformationStepInput {
  allEstimates: EstimateFieldsAfterGeneratingConsolidatedCountryDataStep[];
  allStudies: StudyFieldsAfterGeneratingConsolidatedCountryDataStep[];
  allCountries: CountryFieldsAfterGeneratingConsolidatedCountryDataStep[];
  vaccinationData: StructuredVaccinationDataAfterGeneratingConsolidatedCountryDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterGeneratingConsolidatedCountryDataStep;
  countryPopulationData: StructuredCountryPopulationDataAfterGeneratingConsolidatedCountryDataStep,
  consolidatedCountryData: ConsolidatedCountryDataAfterGeneratingConsolidatedCountryDataStep[];
  mongoClient: MongoClient;
}

interface AddCountryAndRegionInformationStepOutput {
  allEstimates: EstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  allStudies: StudyFieldsAfterAddingCountryAndRegionInformationStep[];
  allCountries: CountryFieldsAfterAddingCountryAndRegionInformationStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingCountryAndRegionInformationStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingCountryAndRegionInformationStep;
  countryPopulationData: StructuredCountryPopulationDataAfterAddingCountryAndRegionInformationStep,
  consolidatedCountryData: ConsolidatedCountryDataAfterAddingCountryAndRegionInformationStep[];
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
    consolidatedCountryData: input.consolidatedCountryData.map((consolidatedCountryDataPoint) => {
      const { alphaTwoCode } = consolidatedCountryDataPoint;

      const unRegion = getUNRegionFromAlphaTwoCode(alphaTwoCode as TwoLetterIsoCountryCode)
      const whoRegion = getWHORegionFromAlphaTwoCode(alphaTwoCode as TwoLetterIsoCountryCode)
      const {
        superRegion: gbdSuperRegion,
        subRegion: gbdSubRegion
      } = getGBDRegionFromAlphaTwoCode(alphaTwoCode as TwoLetterIsoCountryCode)

      return {
        ...consolidatedCountryDataPoint,
        whoRegion,
        unRegion,
        gbdSuperRegion,
        gbdSubRegion
      };
    }),
    mongoClient: input.mongoClient
  };
}