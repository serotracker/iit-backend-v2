import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep,
  AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep,
  AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterRemovingRecordsThatAreFlaggedToNotSaveStep,
  GroupedEstimatesAfterRemovingRecordsThatAreFlaggedToNotSaveStep,
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
  EnvironmentalSuitabilityStatsByCountryEntryAfterRemovingRecordsThatAreFlaggedToNotSaveStep & {
    countryName: string;
    countryAlphaTwoCode: TwoLetterIsoCountryCode;
  };
export type GroupedEstimatesAfterAddingCountryAndRegionInformationStep =
  GroupedEstimatesAfterRemovingRecordsThatAreFlaggedToNotSaveStep;

interface AddCountryAndRegionInformationStepInput {
  allEstimates: AirtableEstimateFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  allSources: AirtableSourceFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  allCountries: AirtableCountryFieldsAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  groupedEstimates: GroupedEstimatesAfterRemovingRecordsThatAreFlaggedToNotSaveStep[];
  mongoClient: MongoClient;
}

interface AddCountryAndRegionInformationStepOutput {
  allEstimates: AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  allSources: AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep[];
  allCountries: AirtableCountryFieldsAfterAddingCountryAndRegionInformationStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterAddingCountryAndRegionInformationStep[];
  groupedEstimates: GroupedEstimatesAfterAddingCountryAndRegionInformationStep[];
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
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry
      .map((esmStats) => {
        const country = allCountries.find(({ alphaThreeCode }) => alphaThreeCode === esmStats.countryAlphaThreeCode);

        if(!country) {
          return undefined;
        }

        return {
          ...esmStats,
          countryName: country.name,
          countryAlphaTwoCode: country.alphaTwoCode
        }
      })
      .filter(<T>(estimate: T | undefined): estimate is T => !!estimate),
    groupedEstimates: input.groupedEstimates,
    mongoClient: input.mongoClient
  };
};
