import { writeFileSync } from "fs";
import { EstimateFieldsAfterAddingCountryAndRegionInformationStep, StructuredPositiveCaseDataAfterAddingCountryAndRegionInformationStep, StructuredVaccinationDataAfterAddingCountryAndRegionInformationStep } from "./add-country-and-region-information-step";
import { Point } from "../../../lib/geocoding-api/geocoding-api-client-types.js";
import { getCityLatLng } from "../../../lib/geocoding-api/geocoding-functions.js";
import { getLatitude, getLongitude } from "../../../lib/geocoding-api/coordinate-helpers.js";

export type EstimateFieldsAfterLatLngGenerationStep = EstimateFieldsAfterAddingCountryAndRegionInformationStep & {
  latitude: number;
  longitude: number;
};
export type StructuredVaccinationDataAfterLatLngGenerationStep = StructuredVaccinationDataAfterAddingCountryAndRegionInformationStep;
export type StructuredPositiveCaseDataAfterLatLngGenerationStep = StructuredPositiveCaseDataAfterAddingCountryAndRegionInformationStep;

interface LatLngGenerationStepInput {
  allEstimates: EstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingCountryAndRegionInformationStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingCountryAndRegionInformationStep;
}

interface LatLngGenerationStepOutput {
  allEstimates: EstimateFieldsAfterLatLngGenerationStep[];
  vaccinationData: StructuredVaccinationDataAfterLatLngGenerationStep;
  positiveCaseData: StructuredPositiveCaseDataAfterLatLngGenerationStep;
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
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
  };
}