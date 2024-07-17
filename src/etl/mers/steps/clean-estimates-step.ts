import { MongoClient } from "mongodb";
import {
  CountryPopulationDataAfterCleaningSourcesStep,
  EstimateFieldsAfterCleaningSourcesStep,
  FaoMersEventAfterCleaningSourcesStep,
  SourceFieldsAfterCleaningSourcesStep,
  YearlyCamelPopulationDataAfterCleaningSourcesStep
} from "./clean-sources-step";
import { MersEstimateType } from "../../../storage/types.js";

export type EstimateFieldsAfterCleaningEstimatesStep = {
  id: string;
  type: MersEstimateType;
  seroprevalence: number;
  estimateId: string;
  city: string | undefined;
  state: string | undefined;
}
export type SourceFieldsAfterCleaningEstimatesStep = SourceFieldsAfterCleaningSourcesStep;
export type FaoMersEventAfterCleaningEstimatesStep = FaoMersEventAfterCleaningSourcesStep;
export type YearlyCamelPopulationDataAfterCleaningEstimatesStep = YearlyCamelPopulationDataAfterCleaningSourcesStep;
export type CountryPopulationDataAfterCleaningEstimatesStep = CountryPopulationDataAfterCleaningSourcesStep;

interface CleanEstimatesStepInput {
  allEstimates: EstimateFieldsAfterCleaningSourcesStep[];
  allSources: SourceFieldsAfterCleaningSourcesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningSourcesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningSourcesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningSourcesStep[];
  mongoClient: MongoClient;
}

interface CleanEstimatesStepOutput {
  allEstimates: EstimateFieldsAfterCleaningEstimatesStep[];
  allSources: SourceFieldsAfterCleaningEstimatesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningEstimatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningEstimatesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningEstimatesStep[];
  mongoClient: MongoClient;
}

export const cleanEstimatesStep = (input: CleanEstimatesStepInput): CleanEstimatesStepOutput => {
  return {
    allEstimates: input.allEstimates.map((estimate) => ({
      id: estimate.id,
      type: MersEstimateType.HUMAN,
      seroprevalence: 0.1,
      estimateId: 'Test Data',
      city: undefined,
      state: undefined,
    })),
    allSources: input.allSources,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  }
}