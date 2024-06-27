import { MongoClient, ObjectId } from "mongodb";
import { EstimateFieldsAfterValidatingFieldSetFromAirtableStep } from "./validate-field-set-from-airtable-step";
import { TwoLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes";
import { WHORegion } from "../../../lib/who-regions.js";

export type EstimateFieldsAfterAddingCountryAndRegionInformationStep = EstimateFieldsAfterValidatingFieldSetFromAirtableStep & {
  country: string;
  countryAlphaTwoCode: string;
  countryAlphaThreeCode: string;
  whoRegion: WHORegion | undefined;
};

interface AddCountryAndRegionInformationStepInput {
  allEstimates: EstimateFieldsAfterValidatingFieldSetFromAirtableStep[];
  mongoClient: MongoClient;
}

interface AddCountryAndRegionInformationStepOutput {
  allEstimates: EstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  mongoClient: MongoClient;
}

export const addCountryAndRegionInformationStep = (
  input: AddCountryAndRegionInformationStepInput
): AddCountryAndRegionInformationStepOutput => {
  console.log(`Running step: addCountryAndRegionInformationStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates.map((estimate) => ({
      ...estimate,
      country: 'Canada',
      countryAlphaTwoCode: 'CA',
      countryAlphaThreeCode: 'CAN',
      whoRegion: WHORegion.AMR
    })),
    mongoClient: input.mongoClient
  };
};
