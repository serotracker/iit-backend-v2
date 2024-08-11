import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep,
  AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep,
  AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterRemovingRecordsThatAreFlaggedToNotSaveStep,
} from "./remove-records-that-are-flagged-to-not-save-step.js";
import { ThreeLetterIsoCountryCode, TwoLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes.js";
import { UNRegion, getUNRegionFromAlphaTwoCode } from "../../../lib/un-regions.js";

export type AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep =
  AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep & {
    country: string;
    countryAlphaTwoCode: TwoLetterIsoCountryCode;
    countryAlphaThreeCode: ThreeLetterIsoCountryCode;
    unRegion: UNRegion | undefined;
  };
export type AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep =
  AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep;
export type AirtableCountryFieldsAfterAddingCountryAndRegionInformationStep =
  AirtableCountryFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterAddingCountryAndRegionInformationStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterRemovingRecordsThatAreFlaggedToNotSaveStep;

interface AddCountryAndRegionInformationStepInput {
  allEstimates: AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  allSources: AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  allCountries: AirtableCountryFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  mongoClient: MongoClient;
}

interface AddCountryAndRegionInformationStepOutput {
  allEstimates: AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  allSources: AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep[];
  allCountries: AirtableCountryFieldsAfterAddingCountryAndRegionInformationStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterAddingCountryAndRegionInformationStep[];
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
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry,
    mongoClient: input.mongoClient
  };
};
