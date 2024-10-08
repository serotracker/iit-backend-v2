import { GeocoderDataType, GeocodingApiRequestParameters, GeocodingApiSuccessResponse } from "./geocoding-api-client-types.js";

const geocodingApiResponseOverrides: Array<{
  parameters: GeocodingApiRequestParameters;
  response: GeocodingApiSuccessResponse;
}> = [{
  parameters: {
    mapboxSearchText : 'Western Province',
    countryAlphaTwoCode : 'SA' as const,
    geocoderDataType : GeocoderDataType.REGION
  },
  response: {
    centerCoordinates: [
      39.91790129671765,
      23.050049505120832
    ],
    boundingBox: undefined,
    text: 'Western Province',
    matchingText: 'Western Province',
    regionName: undefined
  }
}]

interface LookupInGeocodingApiResponseOverrideValuesInput {
  geocodingApiRequestParams: GeocodingApiRequestParameters;
}

export const lookupInGeocodingApiResponseOverrideValues = (
  input: LookupInGeocodingApiResponseOverrideValuesInput
): (GeocodingApiSuccessResponse | undefined) => {
  return geocodingApiResponseOverrides
    .find((element) => (
      element.parameters.countryAlphaTwoCode === input.geocodingApiRequestParams.countryAlphaTwoCode &&
      element.parameters.mapboxSearchText === input.geocodingApiRequestParams.mapboxSearchText &&
      element.parameters.geocoderDataType === input.geocodingApiRequestParams.geocoderDataType
    ))?.response
}