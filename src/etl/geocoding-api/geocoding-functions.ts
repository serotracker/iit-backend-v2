import { makeGeocodingApiRequest } from "./geocoding-api-client.js";
import {
  Point,
  isGeocodingApiFailureResponse,
} from "./geocoding-api-client-types.js";

export const getCityLatLng = async (
  input: GetCityLatLngInput
): Promise<Point | undefined> => {
  const { city, state, country, geocodingApiRequestReportFileName } = input;

  if (!city) {
    return getStateLatLng({
      state,
      country,
      geocodingApiRequestReportFileName,
    });
  }

  const geocodingApiResponse = await makeGeocodingApiRequest({
    city,
    state,
    country,
    geocodingApiRequestReportFileName,
    shouldSaveInGeocodingApiRequestReport: true,
  });

  if (isGeocodingApiFailureResponse(geocodingApiResponse)) {
    return getStateLatLng({
      state,
      country,
      geocodingApiRequestReportFileName,
    });
  }

  return geocodingApiResponse.centerCoordinates;
};

const getStateLatLng = async (
  input: GetStateLatLngInput
): Promise<Point | undefined> => {
  const { state, country, geocodingApiRequestReportFileName } = input;

  if (!state) {
    return getCountryLatLng({ country, geocodingApiRequestReportFileName });
  }

  const geocodingApiResponse = await makeGeocodingApiRequest({
    city: undefined,
    state,
    country,
    geocodingApiRequestReportFileName,
    shouldSaveInGeocodingApiRequestReport: true,
  });

  if (isGeocodingApiFailureResponse(geocodingApiResponse)) {
    return getCountryLatLng({ country, geocodingApiRequestReportFileName });
  }

  return geocodingApiResponse.centerCoordinates;
};

const getCountryLatLng = async (
  input: GetCountryLatLngInput
): Promise<Point | undefined> => {
  const { country, geocodingApiRequestReportFileName } = input;

  const geocodingApiResponse = await makeGeocodingApiRequest({
    city: undefined,
    state: undefined,
    country,
    geocodingApiRequestReportFileName,
    shouldSaveInGeocodingApiRequestReport: true,
  });

  if (isGeocodingApiFailureResponse(geocodingApiResponse)) {
    return undefined;
  }

  return geocodingApiResponse.centerCoordinates;
};
