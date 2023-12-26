import {
  GeocodingApiResponseCache,
  GeocodingApiResponseCacheKey,
  GeocodingApiResponseCacheKeyInput,
  GeocodingApiResponseCacheValue,
  LookupInGeocodingApiResponseCacheInput,
  SaveInGeocodingApiResponseCacheInput,
} from "./geocoding-api-response-cache-types";

let geocodingApiResponseCache: GeocodingApiResponseCache = {};

const generateGeocodingApiResponseCacheKey = (
  input: GeocodingApiResponseCacheKeyInput
): GeocodingApiResponseCacheKey => {
  const {mapboxSearchText, countryCode, geocoderDataType} = input.geocodingApiRequestParams;

  return `mapboxSearchText:${mapboxSearchText},countryCode:${countryCode},geocoderDataType:${geocoderDataType}`;
};

export const lookupInGeocodingApiResponseCache = (
  input: LookupInGeocodingApiResponseCacheInput
): GeocodingApiResponseCacheValue => {
  const { geocodingApiRequestParams } = input;
  const key = generateGeocodingApiResponseCacheKey({ geocodingApiRequestParams });

  return geocodingApiResponseCache[key];
};

export const saveInGeocodingApiResponseCache = (
  input: SaveInGeocodingApiResponseCacheInput
): void => {
  const { cacheValue } = input;
  const { geocodingApiRequestParams } = input.key
  const key = generateGeocodingApiResponseCacheKey({ geocodingApiRequestParams });

  geocodingApiResponseCache = { ...geocodingApiResponseCache, key: cacheValue };
};
