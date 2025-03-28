import { MongoClient } from "mongodb";
import { writeFileSync } from "fs";
import {
  CountryFieldsAfterAddingCountryAndRegionInformationStep,
  CountryPopulationDataAfterAddingCountryAndRegionInformationStep,
  EstimateFieldsAfterAddingCountryAndRegionInformationStep,
  FaoMersEventAfterAddingCountryAndRegionInformationStep,
  MacroSampleFrameFieldsAfterAddingCountryAndRegionInformationStep,
  SourceFieldsAfterAddingCountryAndRegionInformationStep,
  StudyFieldsAfterAddingCountryAndRegionInformationStep,
  WhoCaseDataAfterAddingCountryAndRegionInformationStep,
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
export type StudyFieldsAfterLatLngGenerationStep = StudyFieldsAfterAddingCountryAndRegionInformationStep;
export type CountryFieldsAfterLatLngGenerationStep = CountryFieldsAfterAddingCountryAndRegionInformationStep;
export type MacroSampleFrameFieldsAfterLatLngGenerationStep = MacroSampleFrameFieldsAfterAddingCountryAndRegionInformationStep;
export type FaoMersEventAfterLatLngGenerationStep = FaoMersEventAfterAddingCountryAndRegionInformationStep;
export type YearlyCamelPopulationDataAfterLatLngGenerationStep = YearlyCamelPopulationDataAfterAddingCountryAndRegionInformationStep;
export type CountryPopulationDataAfterLatLngGenerationStep = CountryPopulationDataAfterAddingCountryAndRegionInformationStep;
export type WhoCaseDataAfterLatLngGenerationStep = WhoCaseDataAfterAddingCountryAndRegionInformationStep;

interface LatLngGenerationStepInput {
  allEstimates: EstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  allSources: SourceFieldsAfterAddingCountryAndRegionInformationStep[];
  allStudies: StudyFieldsAfterAddingCountryAndRegionInformationStep[];
  allCountries: CountryFieldsAfterAddingCountryAndRegionInformationStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterAddingCountryAndRegionInformationStep[];
  allFaoMersEvents: FaoMersEventAfterAddingCountryAndRegionInformationStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterAddingCountryAndRegionInformationStep[];
  countryPopulationData: CountryPopulationDataAfterAddingCountryAndRegionInformationStep[];
  whoCaseData: WhoCaseDataAfterAddingCountryAndRegionInformationStep[];
  mongoClient: MongoClient;
}

interface LatLngGenerationStepOutput {
  allEstimates: EstimateFieldsAfterLatLngGenerationStep[];
  allSources: SourceFieldsAfterLatLngGenerationStep[];
  allStudies: StudyFieldsAfterLatLngGenerationStep[];
  allCountries: CountryFieldsAfterLatLngGenerationStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterLatLngGenerationStep[];
  allFaoMersEvents: FaoMersEventAfterLatLngGenerationStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterLatLngGenerationStep[];
  countryPopulationData: CountryPopulationDataAfterLatLngGenerationStep[];
  whoCaseData: WhoCaseDataAfterLatLngGenerationStep[];
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
    allEstimates: estimatesWithLatitudesAndLongitudes,
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  };
}