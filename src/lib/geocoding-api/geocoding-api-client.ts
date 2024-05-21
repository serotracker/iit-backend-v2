import Undici from "undici";
import { countryNameToTwoLetterIsoCountryCode } from "./country-codes.js";
import {
  GenerateGeocodingApiRequestParametersInput,
  GeocoderDataType,
  GeocodingApiRequestParameters,
  GeocodingApiRequestUrl,
  GeocodingApiResponse,
  MakeGeocodingApiRequestAndSaveRequestInput,
  MakeGeocodingApiRequestInput,
  isGeocodingApiFailureResponse,
  isGeocodingApiSuccessResponse,
} from "./geocoding-api-client-types.js";
import {
  lookupInGeocodingApiResponseCache,
  saveInGeocodingApiResponseCache,
} from "./geocoding-api-response-cache.js";
import { parseGeocodingApiResponse } from "./geocoding-api-response-parser.js";
import { recordGeocodingApiRequestInGeocodingReport } from "./geocoding-api-request-report-generator.js";

const shouldSaveInGeocodingApiRequestReport = (input: MakeGeocodingApiRequestInput): input is MakeGeocodingApiRequestAndSaveRequestInput => {
  return input.shouldSaveInGeocodingApiRequestReport;
}

const generateGeocodingApiQueryUrl = (
  input: GeocodingApiRequestParameters & { mapboxAccessToken: string }
): GeocodingApiRequestUrl => {
  const { mapboxSearchText, countryAlphaTwoCode, geocoderDataType, mapboxAccessToken } = input;

  const geocoderDataTypeToMapboxGeocoderDataType = {
    [GeocoderDataType.COUNTRY]: "country",
    [GeocoderDataType.DISTRICT]: "district",
    [GeocoderDataType.REGION]: "region",
    [GeocoderDataType.PLACE]: "place",
  } as const;

  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${mapboxSearchText}.json?access_token=${mapboxAccessToken}&types=${geocoderDataTypeToMapboxGeocoderDataType[geocoderDataType]}&country=${countryAlphaTwoCode}`;
};

const generateGeocodingApiRequestParameters = (
  input: GenerateGeocodingApiRequestParametersInput
): GeocodingApiRequestParameters | undefined => {
  const { city, state, countryAlphaTwoCode, countryName } = input;

  if (!city && !state) {
    return {
      mapboxSearchText: countryName,
      countryAlphaTwoCode,
      geocoderDataType: GeocoderDataType.COUNTRY,
    };
  }

  if (!city && state) {
    return {
      mapboxSearchText: state,
      countryAlphaTwoCode,
      geocoderDataType: GeocoderDataType.REGION,
    };
  }

  if (city && !state) {
    return {
      mapboxSearchText: city,
      countryAlphaTwoCode,
      geocoderDataType: GeocoderDataType.PLACE,
    };
  }

  return {
    mapboxSearchText: `${city},${state}`,
    countryAlphaTwoCode,
    geocoderDataType: GeocoderDataType.PLACE,
  };
};

export const makeGeocodingApiRequest = async (
  input: MakeGeocodingApiRequestInput
): Promise<GeocodingApiResponse> => {
  const {
    city,
    state,
    countryName,
    countryAlphaTwoCode,
    geocodingApiRequestParamOverride,
    mongoClient
  } = input;

  const geocodingApiRequestParams =
    geocodingApiRequestParamOverride ??
    generateGeocodingApiRequestParameters({
      city,
      state,
      countryName,
      countryAlphaTwoCode,
    });
  
  if(!geocodingApiRequestParams) {
    console.error('Unable to make request to mapbox API, could not generate API request parameters.');

    return "FAILED_RESPONSE";
  }

  const cachedQueryValue = await lookupInGeocodingApiResponseCache({
    geocodingApiRequestParams,
    mongoClient
  });

  if (!!cachedQueryValue && isGeocodingApiFailureResponse(cachedQueryValue)) {
    return "FAILED_RESPONSE";
  }

  if (!!cachedQueryValue && isGeocodingApiSuccessResponse(cachedQueryValue)) {
    return cachedQueryValue;
  }

  const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;

  if(!mapboxAccessToken || mapboxAccessToken === "PLEASE_SPECIFY") {
    console.error('Unable to make request to mapbox API, access token not present.');

    return "FAILED_RESPONSE";
  }

  const queryUrl = generateGeocodingApiQueryUrl({
    ...geocodingApiRequestParams,
    mapboxAccessToken,
  });

  const rawApiResponse = await Undici.request(queryUrl, { method: "GET" });
  const parsedApiResponse = await parseGeocodingApiResponse(rawApiResponse);

  saveInGeocodingApiResponseCache({
    key: { geocodingApiRequestParams },
    cacheValue: parsedApiResponse,
    mongoClient
  });

  if(shouldSaveInGeocodingApiRequestReport(input)) {
    recordGeocodingApiRequestInGeocodingReport({
      city: city,
      state: state,
      countryName: countryName,
      countryAlphaTwoCode: countryAlphaTwoCode,
      geocodingApiRequestUrl: queryUrl,
      geocodingApiResponse: parsedApiResponse,
      geocodingApiRequestReportFileName: input.geocodingApiRequestReportFileName,
      mongoClient
    })
  }

  if(isGeocodingApiFailureResponse(parsedApiResponse)) {
    return "FAILED_RESPONSE";
  }

  return parsedApiResponse;
};
