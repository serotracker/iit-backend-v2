import { z } from "zod";
import { MongoClient } from "mongodb";
import {
  CountryPopulationDataAfterFetchingCamelPopulationByCountryDataStep,
  EstimateFieldsAfterFetchingCamelPopulationByCountryDataStep,
  FaoMersEventAfterFetchingCamelPopulationByCountryDataStep,
  SourceFieldsAfterFetchingCamelPopulationByCountryDataStep,
  YearlyCamelPopulationDataAfterFetchingCamelPopulationByCountryDataStep
} from "./fetch-camel-population-by-country-data-step";

export type EstimateFieldsAfterValidatingCamelPopulationByCountryDataStep = EstimateFieldsAfterFetchingCamelPopulationByCountryDataStep;
export type SourceFieldsAfterValidatingCamelPopulationByCountryDataStep = SourceFieldsAfterFetchingCamelPopulationByCountryDataStep;
export type FaoMersEventAfterValidatingCamelPopulationByCountryDataStep = FaoMersEventAfterFetchingCamelPopulationByCountryDataStep;
export type YearlyCamelPopulationDataAfterValidatingCamelPopulationByCountryDataStep = {
  Item: string;
  Year: string;
  "Stocks (Head)": string;
  "Country": string;
  "Stocks (Head) flag": string;
};
export type CountryPopulationDataAfterValidatingCamelPopulationByCountryDataStep = CountryPopulationDataAfterFetchingCamelPopulationByCountryDataStep;

interface ValidateCamelPopulationByCountryDataStepInput {
  allEstimates: EstimateFieldsAfterFetchingCamelPopulationByCountryDataStep[];
  allSources: SourceFieldsAfterFetchingCamelPopulationByCountryDataStep[];
  allFaoMersEvents: FaoMersEventAfterFetchingCamelPopulationByCountryDataStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterFetchingCamelPopulationByCountryDataStep[];
  countryPopulationData: CountryPopulationDataAfterFetchingCamelPopulationByCountryDataStep[];
  mongoClient: MongoClient;
}

interface ValidateCamelPopulationByCountryDataStepOutput {
  allEstimates: EstimateFieldsAfterValidatingCamelPopulationByCountryDataStep[];
  allSources: SourceFieldsAfterValidatingCamelPopulationByCountryDataStep[];
  allFaoMersEvents: FaoMersEventAfterValidatingCamelPopulationByCountryDataStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterValidatingCamelPopulationByCountryDataStep[];
  countryPopulationData: CountryPopulationDataAfterValidatingCamelPopulationByCountryDataStep[];
  mongoClient: MongoClient;
}

export const validateCamelPopulationByCountryDataStep = (
  input: ValidateCamelPopulationByCountryDataStepInput
): ValidateCamelPopulationByCountryDataStepOutput => {
  console.log(`Running step: validateCamelPopulationByCountryDataStep. Remaining estimates: ${input.allEstimates.length}`);

  const zodCamelPopulationByCountryObject = z.object({
    "Item": z
      .string(),
    "Year": z
      .string(),
    "Stocks (Head)": z
      .string(),
    "Country": z
      .string(),
    "Stocks (Head) flag": z
      .string()
  });

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData.map((camelPopulationDataPoint) => 
      zodCamelPopulationByCountryObject.parse(camelPopulationDataPoint)
    ),
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
