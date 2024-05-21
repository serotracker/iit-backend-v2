import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterAddingCountryAndRegionInformationStep,
  AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep,
  AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep
} from "./add-country-and-region-information-step.js";

export type AirtableEstimateFieldsAfterMergingEstimatesAndSourcesStep =
  AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep & {
    sourceSheetName: string | undefined;
  };

export type AirtableSourceFieldsAfterMergingEstimatesAndSourcesStep =
  AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep;

export type AirtableCountryFieldsAfterMergingEstimatesAndSourcesStep =
  AirtableCountryFieldsAfterAddingCountryAndRegionInformationStep;

interface MergeEstimatesAndSourcesStepInput {
  allEstimates: AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  allSources: AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep[];
  allCountries: AirtableCountryFieldsAfterAddingCountryAndRegionInformationStep[];
  mongoClient: MongoClient;
}

interface MergeEstimatesAndSourcesStepOutput {
  allEstimates: AirtableEstimateFieldsAfterMergingEstimatesAndSourcesStep[];
  allSources: AirtableSourceFieldsAfterMergingEstimatesAndSourcesStep[];
  allCountries: AirtableCountryFieldsAfterMergingEstimatesAndSourcesStep[];
  mongoClient: MongoClient;
}

export const mergeEstimatesAndSourcesStep = (
  input: MergeEstimatesAndSourcesStepInput
): MergeEstimatesAndSourcesStepOutput => {
  console.log(`Running step: mergeEstimatesAndSourcesStep. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources, allCountries } = input;

  return {
    allEstimates: allEstimates.map((estimate) => {
      const associatedSource = allSources.find(
        (source) => source.id === estimate.sourceSheetId
      );

      return {
        ...estimate,
        sourceSheetName: associatedSource?.sourceSheetName,
      };
    }),
    allSources: allSources,
    allCountries: allCountries,
    mongoClient: input.mongoClient
  };
};
