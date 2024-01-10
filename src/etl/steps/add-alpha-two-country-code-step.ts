import { 
  AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep, AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep } from "./remove-records-that-are-flagged-to-not-save-step";
import { countryNameToTwoLetterIsoCountryCode } from "../geocoding-api/country-codes";

export type AirtableEstimateFieldsAfterAddingAlphaTwoCountryCodesStep = AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep & { countryAlphaTwoCode: string}

export type AirtableSourceFieldsAfterAddingAlphaTwoCountryCodesStep =
  AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep;

interface AddAlphaTwoCountryCodeStepInput {
  allEstimates: AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  allSources: AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
}

interface AddAlphaTwoCountryCodeStepOutput {
  allEstimates: AirtableEstimateFieldsAfterAddingAlphaTwoCountryCodesStep[];
  allSources: AirtableSourceFieldsAfterAddingAlphaTwoCountryCodesStep[];
}

export const addAlphaTwoCountryCodeStep = (
  input: AddAlphaTwoCountryCodeStepInput
): AddAlphaTwoCountryCodeStepOutput => {
  console.log(`Running step: addAlphaTwoCountryCodeStep. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources } = input;

  return {
    allEstimates: allEstimates.map((estimate) => {
      const countryAlphaTwoCode = countryNameToTwoLetterIsoCountryCode(estimate.country);

      if(!countryAlphaTwoCode) {
        return undefined
      }

      return {
        ...estimate,
        countryAlphaTwoCode 
      };
    }).filter(<T>(estimate: T | undefined): estimate is T => !!estimate),
    allSources: allSources,
  };
};
