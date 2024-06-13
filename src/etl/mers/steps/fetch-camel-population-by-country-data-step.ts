import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterCleaningFaoMersEventFieldsStep,
  FaoMersEventAfterCleaningFaoMersEventFieldsStep
} from "./clean-fao-mers-event-fields-step";

export type EstimateFieldsAfterFetchingCamelPopulationByCountryDataStep = EstimateFieldsAfterCleaningFaoMersEventFieldsStep;
export type FaoMersEventAfterFetchingCamelPopulationByCountryDataStep = FaoMersEventAfterCleaningFaoMersEventFieldsStep;

interface FetchCamelPopulationByCountryDataStepInput {
  allEstimates: EstimateFieldsAfterCleaningFaoMersEventFieldsStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningFaoMersEventFieldsStep[];
  mongoClient: MongoClient;
}

interface FetchCamelPopulationByCountryDataStepOutput {
  allEstimates: EstimateFieldsAfterFetchingCamelPopulationByCountryDataStep[];
  allFaoMersEvents: FaoMersEventAfterFetchingCamelPopulationByCountryDataStep[];
  mongoClient: MongoClient;
}

export const fetchCamelPopulationByCountryDataStep = (
  input: FetchCamelPopulationByCountryDataStepInput
): FetchCamelPopulationByCountryDataStepOutput => {
  console.log(`Running step: fetchCamelPopulationByCountryDataStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates,
    allFaoMersEvents: input.allFaoMersEvents,
    mongoClient: input.mongoClient
  };
};
