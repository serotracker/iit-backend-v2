import { EstimateFieldsAfterParsingDatesStep, StructuredPositiveCaseDataAfterParsingDatesStep, StructuredVaccinationDataAfterParsingDatesStep } from "./parse-dates-step.js";
import { UNRegion, getUNRegionFromAlphaTwoCode } from "../../../lib/un-regions.js";
import { WHORegion, getWHORegionFromAlphaTwoCode } from "../../../lib/who-regions.js";
import { GBDSubRegion, GBDSuperRegion, getGBDRegionFromAlphaTwoCode } from "../../../lib/gbd-regions.js";
import { TwoLetterIsoCountryCode, countryNameToTwoLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes.js";

export type EstimateFieldsAfterAddingCountryAndRegionInformationStep = EstimateFieldsAfterParsingDatesStep & {
  unRegion: UNRegion | undefined;
  whoRegion: WHORegion | undefined;
  gbdSuperRegion: GBDSuperRegion | undefined;
  gbdSubRegion: GBDSubRegion | undefined;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
};
export type StructuredVaccinationDataAfterAddingCountryAndRegionInformationStep = StructuredVaccinationDataAfterParsingDatesStep;
export type StructuredPositiveCaseDataAfterAddingCountryAndRegionInformationStep = StructuredPositiveCaseDataAfterParsingDatesStep;

interface AddCountryAndRegionInformationStepInput {
  allEstimates: EstimateFieldsAfterParsingDatesStep[];
  vaccinationData: StructuredVaccinationDataAfterParsingDatesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterParsingDatesStep;
}

interface AddCountryAndRegionInformationStepOutput {
  allEstimates: EstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingCountryAndRegionInformationStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingCountryAndRegionInformationStep;
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
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
  };
}