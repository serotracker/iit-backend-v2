import { MongoClient } from "mongodb";
import { writeFileSync } from "fs";
import {
  EstimateFieldsAfterAddingCountryAndRegionInformationStep,
  FaoMersEventAfterAddingCountryAndRegionInformationStep,
  YearlyCamelPopulationDataAfterAddingCountryAndRegionInformationStep
} from "./add-country-and-region-information-step";

export type EstimateFieldsAfterLatLngGenerationStep = EstimateFieldsAfterAddingCountryAndRegionInformationStep & {
  latitude: number;
  longitude: number;
};
export type FaoMersEventAfterLatLngGenerationStep = FaoMersEventAfterAddingCountryAndRegionInformationStep;
export type YearlyCamelPopulationDataAfterLatLngGenerationStep = YearlyCamelPopulationDataAfterAddingCountryAndRegionInformationStep;

interface LatLngGenerationStepInput {
  allEstimates: EstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  allFaoMersEvents: FaoMersEventAfterAddingCountryAndRegionInformationStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterAddingCountryAndRegionInformationStep[];
  mongoClient: MongoClient;
}

interface LatLngGenerationStepOutput {
  allEstimates: EstimateFieldsAfterLatLngGenerationStep[];
  allFaoMersEvents: FaoMersEventAfterLatLngGenerationStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterLatLngGenerationStep[];
  mongoClient: MongoClient;
}

export const latLngGenerationStep = async(
  input: LatLngGenerationStepInput
): Promise<LatLngGenerationStepOutput> => {
  const geocodingApiRequestReportFileName = './mers-lat-lng-generation-report.txt';
  const geocodingApiEnabled = process.env.GEOCODING_API_ENABLED === 'true';

  writeFileSync(geocodingApiRequestReportFileName, '');

  console.log(`Running step: latLngGenerationStep. Remaining estimates: ${input.allEstimates.length}. GEOCODING_API_ENABLED=${geocodingApiEnabled}`);

  return {
    allEstimates: input.allEstimates.map((estimate) => ({
      ...estimate,
      latitude: 51.0447,
      longitude: -114.0719
    })),
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    mongoClient: input.mongoClient
  };
}