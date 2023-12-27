import { GeocodingApiRequestUrl, GeocodingApiResponse } from "./geocoding-api-client-types.js";

export enum GeocodingApiRequestLogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

export interface GenerateGeocodingApiRequestLogPrefixInput {
  city: string | undefined;
  state: string | undefined;
  country: string;
  logLevel: GeocodingApiRequestLogLevel;
}

export interface FormatTextAndMatchingTextForDisplayInput {
  text: string | undefined;
  matchingText: string | undefined;
}

export interface GenerateLineForRequestAndResponseInput {
  city: string | undefined;
  state: string | undefined;
  country: string;
  geocodingApiRequestUrl: GeocodingApiRequestUrl;
  geocodingApiResponse: GeocodingApiResponse;
}

export interface GenerateLineForTextConsistencyCheckInput {
  city: string | undefined;
  state: string | undefined;
  country: string;
  geocodingApiResponse: GeocodingApiResponse;
}

export interface GenerateLineForCityStateBoundingBoxConsistencyCheckInput {
  city: string | undefined;
  state: string | undefined;
  country: string;
  geocodingApiResponse: GeocodingApiResponse;
}

export interface GenerateLineForInvalidCityButValidStateCheckInput {
  city: string | undefined;
  state: string | undefined;
  country: string;
  geocodingApiResponse: GeocodingApiResponse;
}

export interface GenerateLineForInvalidCityButValidDistrictCheckInput {
  city: string | undefined;
  state: string | undefined;
  country: string;
  geocodingApiResponse: GeocodingApiResponse;
}

export interface RecordGeocodingApiRequestInGeocodingReportInput {
  city: string | undefined,
  state: string | undefined,
  country: string,
  geocodingApiRequestUrl: GeocodingApiRequestUrl;
  geocodingApiResponse: GeocodingApiResponse;
  geocodingApiRequestReportFileName: string;
}