import { writeFileSync } from "fs";
import { EstimateFieldsAfterParsingDatesStep } from "./parse-dates-step";
import { Point } from "../../../lib/geocoding-api/geocoding-api-client-types";
import { getCityLatLng } from "../../../lib/geocoding-api/geocoding-functions";
import { getLatitude, getLongitude } from "../../../lib/geocoding-api/coordinate-helpers";

export type EstimateFieldsAfterLatLngGenerationStep = EstimateFieldsAfterParsingDatesStep & {
  latitude: number;
  longitude: number;
};

interface LatLngGenerationStepInput {
  allEstimates: EstimateFieldsAfterParsingDatesStep[];
}

interface LatLngGenerationStepOutput {
  allEstimates: EstimateFieldsAfterLatLngGenerationStep[];
}

export const latLngGenerationStep = async(
  input: LatLngGenerationStepInput
): Promise<LatLngGenerationStepOutput> => {
  const geocodingApiRequestReportFileName = './sars-cov-2-lat-lng-generation-report.txt';
  const geocodingApiEnabled = process.env.GEOCODING_API_ENABLED === 'true';

  writeFileSync(geocodingApiRequestReportFileName, '');

  console.log(`Running step: latLngGenerationStep. Remaining estimates: ${input.allEstimates.length}. GEOCODING_API_ENABLED=${geocodingApiEnabled}`);

  const { allEstimates } = input;

  const intervalsToPrintProgressMessages = Array.from({length: 20}, (_, index) => Math.floor((allEstimates.length * (index + 1)) / 20));

  const estimatesWithLatitudesAndLongitudes: EstimateFieldsAfterLatLngGenerationStep[] = [];
  
  for(const estimate of allEstimates) {
    if(intervalsToPrintProgressMessages.includes(estimatesWithLatitudesAndLongitudes.length)) {
      console.log(`LatLng generation ${Math.ceil((100 * estimatesWithLatitudesAndLongitudes.length) / allEstimates.length)}% complete.`)
    }
    let cityLatLng: Point | undefined = [0, 0];

    if(geocodingApiEnabled) {
      cityLatLng = await getCityLatLng({
        city: estimate.city,
        state: estimate.state,
        country: estimate.country,
        geocodingApiRequestReportFileName
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
  };
}