import Undici from "undici";
import { countryNameToTwoLetterIsoCountryCode } from "./country-codes";
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
} from "./geocoding-api-client-types";
import {
  lookupInGeocodingApiResponseCache,
  saveInGeocodingApiResponseCache,
} from "./geocoding-api-response-cache";
import { parseGeocodingApiResponse } from "./geocoding-api-response-parser";
import { recordGeocodingApiRequestInGeocodingReport } from "./geocoding-api-request-report-generator";

const shouldSaveInGeocodingApiRequestReport = (input: MakeGeocodingApiRequestInput): input is MakeGeocodingApiRequestAndSaveRequestInput => {
  return input.shouldSaveInGeocodingApiRequestReport;
}

const generateGeocodingApiQueryUrl = (
  input: GeocodingApiRequestParameters & { mapboxAccessToken: string }
): GeocodingApiRequestUrl => {
  const { mapboxSearchText, countryCode, geocoderDataType, mapboxAccessToken } =
    input;
  const geocoderDataTypeToMapboxGeocoderDataType = {
    [GeocoderDataType.COUNTRY]: "country",
    [GeocoderDataType.DISTRICT]: "district",
    [GeocoderDataType.REGION]: "region",
    [GeocoderDataType.PLACE]: "place",
  } as const;

  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${mapboxSearchText}.json?access_token=${mapboxAccessToken}&types=${geocoderDataTypeToMapboxGeocoderDataType[geocoderDataType]}&country=${countryCode}`;
};

const generateGeocodingApiRequestParameters = (
  input: GenerateGeocodingApiRequestParametersInput
): GeocodingApiRequestParameters | undefined => {
  const { city, state, country } = input;

  const countryCode = countryNameToTwoLetterIsoCountryCode(country);

  if (countryCode === undefined) {
    return undefined;
  }

  if (!city && !state) {
    return {
      mapboxSearchText: country,
      countryCode,
      geocoderDataType: GeocoderDataType.COUNTRY,
    };
  }

  if (!city && state) {
    return {
      mapboxSearchText: state,
      countryCode,
      geocoderDataType: GeocoderDataType.REGION,
    };
  }

  if (city && !state) {
    return {
      mapboxSearchText: city,
      countryCode,
      geocoderDataType: GeocoderDataType.PLACE,
    };
  }

  return {
    mapboxSearchText: `${city},${state}`,
    countryCode,
    geocoderDataType: GeocoderDataType.PLACE,
  };
};

export const makeGeocodingApiRequest = async (
  input: MakeGeocodingApiRequestInput
): Promise<GeocodingApiResponse> => {
  const {
    city,
    state,
    country,
    geocodingApiRequestParamOverride,
  } = input;

  const geocodingApiRequestParams =
    geocodingApiRequestParamOverride ??
    generateGeocodingApiRequestParameters({
      city,
      state,
      country,
    });
  
  if(!geocodingApiRequestParams) {
    console.error('Unable to make request to mapbox API, could not generate API request parameters.');

    return "FAILED_RESPONSE";
  }

  const cachedQueryValue = lookupInGeocodingApiResponseCache({
    geocodingApiRequestParams,
  });

  if (!!cachedQueryValue && isGeocodingApiFailureResponse(cachedQueryValue)) {
    return "FAILED_RESPONSE";
  }

  if (!!cachedQueryValue && isGeocodingApiSuccessResponse(cachedQueryValue)) {
    return cachedQueryValue;
  }

  const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;

  if(!mapboxAccessToken) {
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
  });

  if(shouldSaveInGeocodingApiRequestReport(input)) {
    recordGeocodingApiRequestInGeocodingReport({
      city: city,
      state: state,
      country: country,
      geocodingApiRequestUrl: queryUrl,
      geocodingApiResponse: parsedApiResponse,
      geocodingApiRequestReportFileName: input.geocodingApiRequestReportFileName
    })
  }

  if(isGeocodingApiFailureResponse(parsedApiResponse)) {
    return "FAILED_RESPONSE";
  }

  return parsedApiResponse;
};
