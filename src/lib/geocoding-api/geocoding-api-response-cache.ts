import { ObjectId } from "mongodb";
import { CachedMapboxApiResponseDocument, CachedMapboxApiResponseStatus } from "../../storage/types.js";
import {
  GeocodingApiResponseCacheValue,
  LookupInGeocodingApiResponseCacheInput,
  SaveInGeocodingApiResponseCacheInput,
} from "./geocoding-api-response-cache-types.js";
import { isGeocodingApiFailureResponse } from "./geocoding-api-client-types.js";

export const lookupInGeocodingApiResponseCache = async(
  input: LookupInGeocodingApiResponseCacheInput
): Promise<GeocodingApiResponseCacheValue> => {
  const { geocodingApiRequestParams, mongoClient } = input;

  const databaseName = process.env.DATABASE_NAME;

  const cachedApiResponses = await mongoClient
    .db(databaseName)
    .collection<CachedMapboxApiResponseDocument>('mapboxGeocodingApiCachedResponses')
    .find({
      mapboxSearchText: geocodingApiRequestParams.mapboxSearchText,
      countryCode: geocodingApiRequestParams.countryAlphaTwoCode,
      geocoderDataType: geocodingApiRequestParams.geocoderDataType
    })
    .sort({createdAt: -1, _id: 1})
    .limit(1)
    .toArray()
  
  if(cachedApiResponses.length === 0) {
    return undefined;
  }
  
  const cachedApiResponse = cachedApiResponses[0];

  if(cachedApiResponse.status === CachedMapboxApiResponseStatus.FAILED_RESPONSE) {
    return "FAILED_RESPONSE";
  }

  return {
    centerCoordinates: [
      cachedApiResponse.centerCoordinates.longitude,
      cachedApiResponse.centerCoordinates.latitude
    ],
    boundingBox: cachedApiResponse.boundingBox ? [
      cachedApiResponse.boundingBox.longitudeMinimum,
      cachedApiResponse.boundingBox.latitudeMinimum,
      cachedApiResponse.boundingBox.longitudeMaximum,
      cachedApiResponse.boundingBox.latitudeMaximum
    ] : undefined,
    text: cachedApiResponse.text,
    matchingText: cachedApiResponse.matchingText,
    regionName: cachedApiResponse.regionName
  }
};

export const saveInGeocodingApiResponseCache = async(
  input: SaveInGeocodingApiResponseCacheInput
): Promise<void> => {
  const { cacheValue, mongoClient } = input;
  const { geocodingApiRequestParams } = input.key

  const cacheEntryCreationDate = new Date();

  const databaseName = process.env.DATABASE_NAME;

  if(isGeocodingApiFailureResponse(cacheValue)) {
    await mongoClient
      .db(databaseName)
      .collection<CachedMapboxApiResponseDocument>('mapboxGeocodingApiCachedResponses')
      .insertOne({
        _id: new ObjectId(),
        status: CachedMapboxApiResponseStatus.FAILED_RESPONSE,
        mapboxSearchText: geocodingApiRequestParams.mapboxSearchText,
        countryCode: geocodingApiRequestParams.countryAlphaTwoCode,
        geocoderDataType: geocodingApiRequestParams.geocoderDataType,
        createdAt: cacheEntryCreationDate,
        updatedAt: cacheEntryCreationDate,
      })
    
    return;
  }

  await mongoClient
    .db(databaseName)
    .collection<CachedMapboxApiResponseDocument>('mapboxGeocodingApiCachedResponses')
    .insertOne({
      _id: new ObjectId(),
      status: CachedMapboxApiResponseStatus.SUCCESSFUL_RESPONSE,
      mapboxSearchText: geocodingApiRequestParams.mapboxSearchText,
      countryCode: geocodingApiRequestParams.countryAlphaTwoCode,
      geocoderDataType: geocodingApiRequestParams.geocoderDataType,
      centerCoordinates: {
        longitude: cacheValue.centerCoordinates[0],
        latitude: cacheValue.centerCoordinates[1]
      },
      boundingBox: cacheValue.boundingBox ? {
        longitudeMinimum: cacheValue.boundingBox[0],
        latitudeMinimum: cacheValue.boundingBox[1],
        longitudeMaximum: cacheValue.boundingBox[2],
        latitudeMaximum: cacheValue.boundingBox[3],
      } : undefined,
      text: cacheValue.text,
      matchingText: cacheValue.matchingText,
      regionName: cacheValue.regionName,
      createdAt: cacheEntryCreationDate,
      updatedAt: cacheEntryCreationDate,
    });
  
  return;
};
