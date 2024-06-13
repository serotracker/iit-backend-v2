import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterValidatingCamelPopulationByCountryDataStep,
  FaoMersEventAfterValidatingCamelPopulationByCountryDataStep
} from "./validate-camel-population-by-country-data-step";

export type EstimateFieldsAfterCleaningCamelPopulationByCountryDataStep = EstimateFieldsAfterValidatingCamelPopulationByCountryDataStep;
export type FaoMersEventAfterCleaningCamelPopulationByCountryDataStep = FaoMersEventAfterValidatingCamelPopulationByCountryDataStep;

interface CleanCamelPopulationByCountryDataStepInput {
  allEstimates: EstimateFieldsAfterValidatingCamelPopulationByCountryDataStep[];
  allFaoMersEvents: FaoMersEventAfterValidatingCamelPopulationByCountryDataStep[];
  mongoClient: MongoClient;
}

interface CleanCamelPopulationByCountryDataStepOutput {
  allEstimates: EstimateFieldsAfterCleaningCamelPopulationByCountryDataStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningCamelPopulationByCountryDataStep[];
  mongoClient: MongoClient;
}

export const cleanCamelPopulationByCountryDataStep = (
  input: CleanCamelPopulationByCountryDataStepInput
): CleanCamelPopulationByCountryDataStepOutput => {
  console.log(`Running step: cleanCamelPopulationByCountryDataStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates,
    allFaoMersEvents: input.allFaoMersEvents,
    mongoClient: input.mongoClient
  };
};
