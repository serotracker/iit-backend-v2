import { MongoClient } from 'mongodb';
import { GeocodingApiFailureResponse, GeocodingApiRequestParameters, GeocodingApiResponse, GeocodingApiSuccessResponse } from "./geocoding-api-client-types.js";

export interface LookupInGeocodingApiResponseCacheInput {
  geocodingApiRequestParams: GeocodingApiRequestParameters;
  mongoClient: MongoClient;
}

export interface SaveInGeocodingApiResponseCacheInput {
  key: {
    geocodingApiRequestParams: GeocodingApiRequestParameters
  };
  cacheValue: GeocodingApiResponse;
  mongoClient: MongoClient;
}

export type GeocodingApiResponseCacheValue =
  | GeocodingApiSuccessResponse
  | GeocodingApiFailureResponse
  | undefined;