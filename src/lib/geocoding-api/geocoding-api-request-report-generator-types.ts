import { MongoClient } from 'mongodb';
import { GeocodingApiRequestUrl, GeocodingApiResponse } from "./geocoding-api-client-types.js";
import { TwoLetterIsoCountryCode } from './country-codes.js';

export enum GeocodingApiRequestLogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

export interface GenerateGeocodingApiRequestLogPrefixInput {
  city: string | undefined;
  state: string | undefined;
  countryName: string;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  logLevel: GeocodingApiRequestLogLevel;
}

export interface FormatTextAndMatchingTextForDisplayInput {
  text: string | undefined;
  matchingText: string | undefined;
}

export interface GenerateLineForRequestAndResponseInput {
  city: string | undefined;
  state: string | undefined;
  countryName: string;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  geocodingApiRequestUrl: GeocodingApiRequestUrl;
  geocodingApiResponse: GeocodingApiResponse;
}

export interface GenerateLineForTextConsistencyCheckInput {
  city: string | undefined;
  state: string | undefined;
  countryName: string;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  geocodingApiResponse: GeocodingApiResponse;
}

export interface GenerateLineForCityStateBoundingBoxConsistencyCheckInput {
  city: string | undefined;
  state: string | undefined;
  countryName: string;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  geocodingApiResponse: GeocodingApiResponse;
  mongoClient: MongoClient;
}

export interface GenerateLineForInvalidCityButValidStateCheckInput {
  city: string | undefined;
  state: string | undefined;
  countryName: string;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  geocodingApiResponse: GeocodingApiResponse;
  mongoClient: MongoClient;
}

export interface GenerateLineForInvalidCityButValidDistrictCheckInput {
  city: string | undefined;
  state: string | undefined;
  countryName: string;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  geocodingApiResponse: GeocodingApiResponse;
  mongoClient: MongoClient;
}

export interface RecordGeocodingApiRequestInGeocodingReportInput {
  city: string | undefined,
  state: string | undefined,
  countryName: string;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  geocodingApiRequestUrl: GeocodingApiRequestUrl;
  geocodingApiResponse: GeocodingApiResponse;
  geocodingApiRequestReportFileName: string;
  mongoClient: MongoClient;
}