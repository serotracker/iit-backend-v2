import { makeGeocodingApiRequest } from "./geocoding-api-client.js";
import {
  Point,
  isGeocodingApiFailureResponse,
} from "./geocoding-api-client-types.js";
import { GetCityLatLngInput, GetCountryLatLngInput, GetStateLatLngInput } from "./geocoding-functions-types.js";

export const getCityLatLng = async (
  input: GetCityLatLngInput
): Promise<Point | undefined> => {
  const { city, state, country, geocodingApiRequestReportFileName, mongoClient } = input;

  if (!city) {
    return getStateLatLng({
      state,
      country,
      geocodingApiRequestReportFileName,
      mongoClient
    });
  }

  const geocodingApiResponse = await makeGeocodingApiRequest({
    city,
    state,
    country,
    geocodingApiRequestReportFileName,
    shouldSaveInGeocodingApiRequestReport: true,
    mongoClient
  });

  if (isGeocodingApiFailureResponse(geocodingApiResponse)) {
    return getStateLatLng({
      state,
      country,
      geocodingApiRequestReportFileName,
      mongoClient
    });
  }

  return geocodingApiResponse.centerCoordinates;
};

const getStateLatLng = async (
  input: GetStateLatLngInput
): Promise<Point | undefined> => {
  const { state, country, geocodingApiRequestReportFileName, mongoClient } = input;

  if (!state) {
    return getCountryLatLng({ country, geocodingApiRequestReportFileName, mongoClient });
  }

  const geocodingApiResponse = await makeGeocodingApiRequest({
    city: undefined,
    state,
    country,
    geocodingApiRequestReportFileName,
    shouldSaveInGeocodingApiRequestReport: true,
    mongoClient
  });

  if (isGeocodingApiFailureResponse(geocodingApiResponse)) {
    return getCountryLatLng({ country, geocodingApiRequestReportFileName, mongoClient });
  }

  return geocodingApiResponse.centerCoordinates;
};

const getCountryLatLng = async (
  input: GetCountryLatLngInput
): Promise<Point | undefined> => {
  const { country, geocodingApiRequestReportFileName, mongoClient } = input;

  const geocodingApiResponse = await makeGeocodingApiRequest({
    city: undefined,
    state: undefined,
    country,
    geocodingApiRequestReportFileName,
    shouldSaveInGeocodingApiRequestReport: true,
    mongoClient
  });

  if (isGeocodingApiFailureResponse(geocodingApiResponse)) {
    return undefined;
  }

  return geocodingApiResponse.centerCoordinates;
};
