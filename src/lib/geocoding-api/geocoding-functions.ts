import { makeGeocodingApiRequest } from "./geocoding-api-client.js";
import {
  Point,
  isGeocodingApiFailureResponse,
} from "./geocoding-api-client-types.js";
import { GetCityLatLngInput, GetCountryLatLngInput, GetStateLatLngInput } from "./geocoding-functions-types.js";

export const getCityLatLng = async (
  input: GetCityLatLngInput
): Promise<Point | undefined> => {
  const { city, state, countryName, countryAlphaTwoCode, geocodingApiRequestReportFileName, mongoClient } = input;

  if (!city) {
    return getStateLatLng({
      state,
      countryName,
      countryAlphaTwoCode,
      geocodingApiRequestReportFileName,
      mongoClient
    });
  }

  const geocodingApiResponse = await makeGeocodingApiRequest({
    city,
    state,
    countryName,
    countryAlphaTwoCode,
    geocodingApiRequestReportFileName,
    shouldSaveInGeocodingApiRequestReport: true,
    mongoClient
  });

  if (isGeocodingApiFailureResponse(geocodingApiResponse)) {
    return getStateLatLng({
      state,
      countryName,
      countryAlphaTwoCode,
      geocodingApiRequestReportFileName,
      mongoClient
    });
  }

  return geocodingApiResponse.centerCoordinates;
};

const getStateLatLng = async (
  input: GetStateLatLngInput
): Promise<Point | undefined> => {
  const { state, countryName, countryAlphaTwoCode, geocodingApiRequestReportFileName, mongoClient } = input;

  if (!state) {
    return getCountryLatLng({ countryName, countryAlphaTwoCode, geocodingApiRequestReportFileName, mongoClient });
  }

  const geocodingApiResponse = await makeGeocodingApiRequest({
    city: undefined,
    state,
    countryName,
    countryAlphaTwoCode,
    geocodingApiRequestReportFileName,
    shouldSaveInGeocodingApiRequestReport: true,
    mongoClient
  });

  if (isGeocodingApiFailureResponse(geocodingApiResponse)) {
    return getCountryLatLng({ countryName, countryAlphaTwoCode, geocodingApiRequestReportFileName, mongoClient });
  }

  return geocodingApiResponse.centerCoordinates;
};

const getCountryLatLng = async (
  input: GetCountryLatLngInput
): Promise<Point | undefined> => {
  const { countryName, countryAlphaTwoCode, geocodingApiRequestReportFileName, mongoClient } = input;

  const geocodingApiResponse = await makeGeocodingApiRequest({
    city: undefined,
    state: undefined,
    countryName,
    countryAlphaTwoCode,
    geocodingApiRequestReportFileName,
    shouldSaveInGeocodingApiRequestReport: true,
    mongoClient
  });

  if (isGeocodingApiFailureResponse(geocodingApiResponse)) {
    return undefined;
  }

  return geocodingApiResponse.centerCoordinates;
};
