import { MongoClient } from "mongodb";
import { writeFileSync } from "fs";
import {
  CountryPopulationDataAfterAddingCountryAndRegionInformationStep,
  EstimateFieldsAfterAddingCountryAndRegionInformationStep,
  FaoMersEventAfterAddingCountryAndRegionInformationStep,
  SourceFieldsAfterAddingCountryAndRegionInformationStep,
  YearlyCamelPopulationDataAfterAddingCountryAndRegionInformationStep
} from "./add-country-and-region-information-step";
import { Point } from "../../../lib/geocoding-api/geocoding-api-client-types";
import { getCityLatLng } from "../../../lib/geocoding-api/geocoding-functions.js";
import { getLatitude, getLongitude } from "../../../lib/geocoding-api/coordinate-helpers.js";

export type EstimateFieldsAfterLatLngGenerationStep = EstimateFieldsAfterAddingCountryAndRegionInformationStep & {
  latitude: number;
  longitude: number;
};
export type SourceFieldsAfterLatLngGenerationStep = SourceFieldsAfterAddingCountryAndRegionInformationStep;
export type FaoMersEventAfterLatLngGenerationStep = FaoMersEventAfterAddingCountryAndRegionInformationStep;
export type YearlyCamelPopulationDataAfterLatLngGenerationStep = YearlyCamelPopulationDataAfterAddingCountryAndRegionInformationStep;
export type CountryPopulationDataAfterLatLngGenerationStep = CountryPopulationDataAfterAddingCountryAndRegionInformationStep;

interface LatLngGenerationStepInput {
  allEstimates: EstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  allSources: SourceFieldsAfterAddingCountryAndRegionInformationStep[];
  allFaoMersEvents: FaoMersEventAfterAddingCountryAndRegionInformationStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterAddingCountryAndRegionInformationStep[];
  countryPopulationData: CountryPopulationDataAfterAddingCountryAndRegionInformationStep[];
  mongoClient: MongoClient;
}

interface LatLngGenerationStepOutput {
  allEstimates: EstimateFieldsAfterLatLngGenerationStep[];
  allSources: SourceFieldsAfterLatLngGenerationStep[];
  allFaoMersEvents: FaoMersEventAfterLatLngGenerationStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterLatLngGenerationStep[];
  countryPopulationData: CountryPopulationDataAfterLatLngGenerationStep[];
  mongoClient: MongoClient;
}

export const latLngGenerationStep = async(
  input: LatLngGenerationStepInput
): Promise<LatLngGenerationStepOutput> => {
  const geocodingApiRequestReportFileName = './mers-lat-lng-generation-report.txt';
  const geocodingApiEnabled = process.env.GEOCODING_API_ENABLED === 'true';

  writeFileSync(geocodingApiRequestReportFileName, '');

  console.log(`Running step: latLngGenerationStep. Remaining estimates: ${input.allEstimates.length}. GEOCODING_API_ENABLED=${geocodingApiEnabled}`);

  const intervalsToPrintProgressMessages = Array.from({length: 20}, (_, index) => Math.floor((input.allEstimates.length * (index + 1)) / 20));

  const estimatesWithLatitudesAndLongitudes: EstimateFieldsAfterLatLngGenerationStep[] = [];
  
  for(const estimate of input.allEstimates) {
    if(intervalsToPrintProgressMessages.includes(estimatesWithLatitudesAndLongitudes.length)) {
      console.log(`LatLng generation ${Math.ceil((100 * estimatesWithLatitudesAndLongitudes.length) / input.allEstimates.length)}% complete.`)
    }
    let cityLatLng: Point | undefined = [0, 0];

    if(geocodingApiEnabled) {
      cityLatLng = await getCityLatLng({
        city: estimate.city,
        state: estimate.state,
        countryName: estimate.country,
        countryAlphaTwoCode: estimate.countryAlphaTwoCode,
        geocodingApiRequestReportFileName,
        mongoClient: input.mongoClient
      })
    }

    if(cityLatLng) {
      estimatesWithLatitudesAndLongitudes.push({
        ...estimate,
        latitude: getLatitude(cityLatLng),
        longitude: getLongitude(cityLatLng)
      })
    }
  }

  return {
<<<<<<< HEAD
    allEstimates: estimatesWithLatitudesAndLongitudes,
=======
    allEstimates: input.allEstimates.map((estimate) => ({
      ...estimate,
      latitude: 51.0447,
      longitude: -114.0719
    })),
>>>>>>> c31954ebfb3e01538d8f78bf63858f0387fcafc2
    allSources: input.allSources,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
}