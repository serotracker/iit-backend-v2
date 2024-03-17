import { parse } from "date-fns";
import { EstimateFieldsAfterParsingDatesStep } from "./parse-dates-step.js";
import { UNRegion, getUNRegionFromAlphaTwoCode } from "../../../lib/un-regions.js";
import { WHORegion, getWHORegionFromAlphaTwoCode } from "../../../lib/who-regions.js";
import { TwoLetterIsoCountryCode, countryNameToTwoLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes.js";

export type EstimateFieldsAfterAddingCountryAndRegionInformationStep = EstimateFieldsAfterParsingDatesStep & {
  unRegion: UNRegion | undefined;
  whoRegion: WHORegion | undefined;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
};

interface AddCountryAndRegionInformationStepInput {
  allEstimates: EstimateFieldsAfterParsingDatesStep[];
}

interface AddCountryAndRegionInformationStepOutput {
  allEstimates: EstimateFieldsAfterAddingCountryAndRegionInformationStep[];
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

        return {
          ...estimate,
          countryAlphaTwoCode,
          whoRegion,
          unRegion,
        };
      }).filter(<T>(estimate: T | undefined): estimate is T => !!estimate)
  };
}