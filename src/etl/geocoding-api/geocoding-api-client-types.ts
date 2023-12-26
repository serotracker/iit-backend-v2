import { TwoLetterIsoCountryCode } from "./country-codes";

export interface MakeGeocodingApiRequestAndSaveRequestInput {
  city: string | undefined;
  state: string | undefined;
  country: string;
  geocodingApiRequestReportFileName: string;
  shouldSaveInGeocodingApiRequestReport: true;
  geocodingApiRequestParamOverride?: GeocodingApiRequestParameters;
}

export interface MakeGeocodingApiRequestWithoutSavingRequestInput {
  city: string | undefined;
  state: string | undefined;
  country: string;
  shouldSaveInGeocodingApiRequestReport: false;
  geocodingApiRequestParamOverride?: GeocodingApiRequestParameters;
}

export type MakeGeocodingApiRequestInput = MakeGeocodingApiRequestAndSaveRequestInput | MakeGeocodingApiRequestWithoutSavingRequestInput;

export type GeocodingApiRequestUrl =
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${string}.json?access_token=${string}&types=${
    | "place"
    | "country"
    | "district"
    | "region"}&country=${TwoLetterIsoCountryCode}`;

export enum GeocoderDataType {
  COUNTRY = "COUNTRY",
  REGION = "REGION",
  PLACE = "PLACE",
  DISTRICT = "DISTRICT",
}

export interface GenerateGeocodingApiRequestParametersInput {
  city: string | undefined;
  state: string | undefined;
  country: string;
}

export interface GeocodingApiRequestParameters {
  mapboxSearchText: string;
  countryCode: TwoLetterIsoCountryCode;
  geocoderDataType: GeocoderDataType;
}

export type GeocodingApiFailureResponse = "FAILED_RESPONSE";

export type Point = [number, number];
export type BoundingBox = [number, number, number, number];

export interface GeocodingApiSuccessResponse {
  centerCoordinates: Point;
  boundingBox: BoundingBox | undefined;
  text: string | undefined;
  matchingText: string | undefined;
  regionName: string | undefined;
}

export type GeocodingApiResponse = GeocodingApiFailureResponse | GeocodingApiSuccessResponse;

export const isGeocodingApiFailureResponse = (value: GeocodingApiResponse): value is GeocodingApiFailureResponse => {
  return value === "FAILED_RESPONSE";
};

export const isGeocodingApiSuccessResponse = (value: GeocodingApiResponse): value is GeocodingApiSuccessResponse => {
  return value !== "FAILED_RESPONSE";
};
