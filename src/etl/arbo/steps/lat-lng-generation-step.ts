import { MongoClient } from "mongodb";
import { writeFileSync } from 'fs';
import { getLatitude, getLongitude } from "../../../lib/geocoding-api/coordinate-helpers.js";
import { Point } from "../../../lib/geocoding-api/geocoding-api-client-types.js";
import { getCityLatLng } from "../../../lib/geocoding-api/geocoding-functions.js";
import {
  AirtableCountryFieldsAfterMergingEstimatesAndSourcesStep,
  AirtableEstimateFieldsAfterMergingEstimatesAndSourcesStep,
  AirtableSourceFieldsAfterMergingEstimatesAndSourcesStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterMergingEstimatesAndSourcesStep,
  GroupedEstimatesAfterMergingEstimatesAndSourcesStep,
} from "./merge-estimates-and-sources-step.js";

export type AirtableEstimateFieldsAfterLatLngGenerationStep =
  AirtableEstimateFieldsAfterMergingEstimatesAndSourcesStep & {
    latitude: number;
    longitude: number;
  };
export type AirtableSourceFieldsAfterLatLngGenerationStep =
  AirtableSourceFieldsAfterMergingEstimatesAndSourcesStep;
export type AirtableCountryFieldsAfterLatLngGenerationStep =
  AirtableCountryFieldsAfterMergingEstimatesAndSourcesStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterLatLngGenerationStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterMergingEstimatesAndSourcesStep;
export type GroupedEstimatesAfterLatLngGenerationStep =
  GroupedEstimatesAfterMergingEstimatesAndSourcesStep;

interface LatLngGenerationStepInput {
  allEstimates: AirtableEstimateFieldsAfterMergingEstimatesAndSourcesStep[];
  allSources: AirtableSourceFieldsAfterMergingEstimatesAndSourcesStep[];
  allCountries: AirtableCountryFieldsAfterMergingEstimatesAndSourcesStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterMergingEstimatesAndSourcesStep[];
  groupedEstimates: GroupedEstimatesAfterMergingEstimatesAndSourcesStep[];
  mongoClient: MongoClient;
}

interface LatLngGenerationStepOutput {
  allEstimates: AirtableEstimateFieldsAfterLatLngGenerationStep[];
  allSources: AirtableSourceFieldsAfterLatLngGenerationStep[];
  allCountries: AirtableCountryFieldsAfterLatLngGenerationStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterLatLngGenerationStep[];
  groupedEstimates: GroupedEstimatesAfterLatLngGenerationStep[];
  mongoClient: MongoClient;
}

export const latLngGenerationStep = async(
  input: LatLngGenerationStepInput
): Promise<LatLngGenerationStepOutput> => {
  const geocodingApiRequestReportFileName = './arbo-lat-lng-generation-report.txt';
  const geocodingApiEnabled = process.env.GEOCODING_API_ENABLED === 'true';

  writeFileSync(geocodingApiRequestReportFileName, '');

  console.log(`Running step: latLngGenerationStep. Remaining estimates: ${input.allEstimates.length}. GEOCODING_API_ENABLED=${geocodingApiEnabled}`);

  const { allEstimates, allSources, allCountries } = input;

  const intervalsToPrintProgressMessages = Array.from({length: 20}, (_, index) => Math.floor((allEstimates.length * (index + 1)) / 20));

  const estimatesWithLatitudesAndLongitudes: AirtableEstimateFieldsAfterLatLngGenerationStep[] = [];
  
  for(const estimate of allEstimates) {
    if(intervalsToPrintProgressMessages.includes(estimatesWithLatitudesAndLongitudes.length)) {
      console.log(`LatLng generation ${Math.ceil((100 * estimatesWithLatitudesAndLongitudes.length) / allEstimates.length)}% complete.`)
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
    allEstimates: estimatesWithLatitudesAndLongitudes,
    allSources: allSources,
    allCountries: allCountries,
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry,
    groupedEstimates: input.groupedEstimates,
    mongoClient: input.mongoClient
  };
};
