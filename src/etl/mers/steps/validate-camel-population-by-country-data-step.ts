import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterFetchingCamelPopulationByCountryDataStep,
  FaoMersEventAfterFetchingCamelPopulationByCountryDataStep
} from "./fetch-camel-population-by-country-data-step";

export type EstimateFieldsAfterValidatingCamelPopulationByCountryDataStep = EstimateFieldsAfterFetchingCamelPopulationByCountryDataStep;
export type FaoMersEventAfterValidatingCamelPopulationByCountryDataStep = FaoMersEventAfterFetchingCamelPopulationByCountryDataStep;

interface ValidateCamelPopulationByCountryDataStepInput {
  allEstimates: EstimateFieldsAfterFetchingCamelPopulationByCountryDataStep[];
  allFaoMersEvents: FaoMersEventAfterFetchingCamelPopulationByCountryDataStep[];
  mongoClient: MongoClient;
}

interface ValidateCamelPopulationByCountryDataStepOutput {
  allEstimates: EstimateFieldsAfterValidatingCamelPopulationByCountryDataStep[];
  allFaoMersEvents: FaoMersEventAfterValidatingCamelPopulationByCountryDataStep[];
  mongoClient: MongoClient;
}

export const validateCamelPopulationByCountryDataStep = (
  input: ValidateCamelPopulationByCountryDataStepInput
): ValidateCamelPopulationByCountryDataStepOutput => {
  console.log(`Running step: validateCamelPopulationByCountryDataStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates,
    allFaoMersEvents: input.allFaoMersEvents,
    mongoClient: input.mongoClient
  };
};
