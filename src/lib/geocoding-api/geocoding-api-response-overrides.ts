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
  },
}, {
  parameters: {
    mapboxSearchText : 'Western Province',
    countryAlphaTwoCode : 'KE' as const,
    geocoderDataType : GeocoderDataType.REGION
  },
  response: {
    centerCoordinates: [
      0.5701902531214326,
      34.55679540107335
    ],
    boundingBox: undefined,
    text: 'Western Province',
    matchingText: 'Western Province',
    regionName: undefined
  },
}, {
  parameters: {
    mapboxSearchText : 'Coast Province',
    countryAlphaTwoCode : 'KE' as const,
    geocoderDataType : GeocoderDataType.REGION
  },
  response: {
    centerCoordinates: [
      -2.854661737979964,
      39.614598719130335
    ],
    boundingBox: undefined,
    text: 'Coast Province',
    matchingText: 'Coast Province',
    regionName: undefined
  },
}, {
  parameters: {
    mapboxSearchText : 'North Eastern Province',
    countryAlphaTwoCode : 'KE' as const,
    geocoderDataType : GeocoderDataType.REGION
  },
  response: {
    centerCoordinates: [
      1.1005450767981824,
      40.25974818773868
    ],
    boundingBox: undefined,
    text: 'North Eastern Province',
    matchingText: 'North Eastern Province',
    regionName: undefined
  },
}, {
  parameters: {
    mapboxSearchText : 'Central Province',
    countryAlphaTwoCode : 'KE' as const,
    geocoderDataType : GeocoderDataType.REGION
  },
  response: {
    centerCoordinates: [
      -0.7862729322527452,
      36.987418171096714
    ],
    boundingBox: undefined,
    text: 'Central Province',
    matchingText: 'Central Province',
    regionName: undefined
  },
}, {
  parameters: {
    mapboxSearchText : 'Eastern Province',
    countryAlphaTwoCode : 'KE' as const,
    geocoderDataType : GeocoderDataType.REGION
  },
  response: {
    centerCoordinates: [
      1.3903319833457937,
      38.18368696228271
    ],
    boundingBox: undefined,
    text: 'Eastern Province',
    matchingText: 'Eastern Province',
    regionName: undefined
  },
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