import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep,
  AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep,
  AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep,
} from "./remove-records-that-are-flagged-to-not-save-step.js";
import { ThreeLetterIsoCountryCode, TwoLetterIsoCountryCode, countryNameToThreeLetterIsoCountryCode, countryNameToTwoLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes.js";
import { getUNRegionFromAlphaTwoCode } from "../../../lib/un-regions.js";

export type AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep =
  AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep & {
    country: string;
    countryAlphaTwoCode: TwoLetterIsoCountryCode;
    countryAlphaThreeCode: ThreeLetterIsoCountryCode;
    unRegion: string | undefined;
  };

export type AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep =
  AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep;

export type AirtableCountryFieldsAfterAddingCountryAndRegionInformationStep =
  AirtableCountryFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep;

interface AddCountryAndRegionInformationStepInput {
  allEstimates: AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  allSources: AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  allCountries: AirtableCountryFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  mongoClient: MongoClient;
}

interface AddCountryAndRegionInformationStepOutput {
  allEstimates: AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  allSources: AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep[];
  allCountries: AirtableCountryFieldsAfterAddingCountryAndRegionInformationStep[];
  mongoClient: MongoClient;
}

export const addCountryAndRegionInformationStep = (
  input: AddCountryAndRegionInformationStepInput
): AddCountryAndRegionInformationStepOutput => {
  console.log(
    `Running step: addCountryAndRegionInformationStep. Remaining estimates: ${input.allEstimates.length}`
  );

  const { allEstimates, allSources, allCountries } = input;

  return {
    allEstimates: allEstimates
      .map((estimate) => {
        const { countryId } = estimate;

        if(!countryId) {
          return undefined;
        }

        const country = allCountries.find(({id}) => id === countryId);

        if(!country) {
          return undefined;
        }

        const countryAlphaThreeCode = country.alphaThreeCode;
        const countryAlphaTwoCode = country.alphaTwoCode;

        const unRegion = getUNRegionFromAlphaTwoCode(countryAlphaTwoCode)

        return {
          ...estimate,
          country: country.name,
          countryAlphaTwoCode,
          countryAlphaThreeCode,
          unRegion,
        };
      })
      .filter(<T>(estimate: T | undefined): estimate is T => !!estimate),
    allSources: allSources,
    allCountries: allCountries,
    mongoClient: input.mongoClient
  };
};
