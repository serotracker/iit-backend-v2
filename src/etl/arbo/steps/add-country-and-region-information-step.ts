import { MongoClient } from "mongodb";
import {
  AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep,
  AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep,
} from "./remove-records-that-are-flagged-to-not-save-step.js";
import { countryNameToTwoLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes.js";
import { getUNRegionFromAlphaTwoCode } from "../../../lib/un-regions.js";

export type AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep =
  AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep & {
    countryAlphaTwoCode: string;
    unRegion: string | undefined;
  };

export type AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep =
  AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep;

interface AddCountryAndRegionInformationStepInput {
  allEstimates: AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  allSources: AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  mongoClient: MongoClient;
}

interface AddCountryAndRegionInformationStepOutput {
  allEstimates: AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  allSources: AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep[];
  mongoClient: MongoClient;
}

export const addCountryAndRegionInformationStep = (
  input: AddCountryAndRegionInformationStepInput
): AddCountryAndRegionInformationStepOutput => {
  console.log(
    `Running step: addCountryAndRegionInformationStep. Remaining estimates: ${input.allEstimates.length}`
  );

  const { allEstimates, allSources } = input;

  return {
    allEstimates: allEstimates
      .map((estimate) => {
        const countryAlphaTwoCode = countryNameToTwoLetterIsoCountryCode(
          estimate.country
        );
        if (!countryAlphaTwoCode) {
          return undefined;
        }

        const unRegion = getUNRegionFromAlphaTwoCode(countryAlphaTwoCode)

        return {
          ...estimate,
          countryAlphaTwoCode,
          unRegion,
        };
      })
      .filter(<T>(estimate: T | undefined): estimate is T => !!estimate),
    allSources: allSources,
    mongoClient: input.mongoClient
  };
};
