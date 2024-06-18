import { appendFileSync } from "fs";
import { makeGeocodingApiRequest } from "./geocoding-api-client.js";
import {
    GeocoderDataType,
  GeocodingApiRequestUrl,
  GeocodingApiResponse,
  isGeocodingApiFailureResponse,
  isGeocodingApiSuccessResponse,
} from "./geocoding-api-client-types.js";
import {
  FormatTextAndMatchingTextForDisplayInput,
  GenerateGeocodingApiRequestLogPrefixInput,
  GenerateLineForCityStateBoundingBoxConsistencyCheckInput,
  GenerateLineForInvalidCityButValidDistrictCheckInput,
  GenerateLineForInvalidCityButValidStateCheckInput,
  GenerateLineForRequestAndResponseInput,
  GenerateLineForTextConsistencyCheckInput,
  GeocodingApiRequestLogLevel,
  RecordGeocodingApiRequestInGeocodingReportInput,
} from "./geocoding-api-request-report-generator-types.js";
import { countryNameToTwoLetterIsoCountryCode } from "./country-codes.js"
import { isPointInBoundingBox } from "./coordinate-helpers.js";

const redactMapboxApiKeyFromGeocodingApiQueryUrl = (
  url: GeocodingApiRequestUrl
): string => {
  const accessTokenRegex = /access_token=([^&]+)/;

  return url.replaceAll(accessTokenRegex, "[REDACTED]");
};

const generateGeocodingApiRequestLogPrefix = (
  input: GenerateGeocodingApiRequestLogPrefixInput
): string => {
  const { city, state, countryName, logLevel } = input;

  return `[${logLevel}] - [${city ?? "N/A"}, ${state ?? "N/A"}, ${countryName}]`;
};

const formatTextAndMatchingTextForDisplay = (
  input: FormatTextAndMatchingTextForDisplayInput
): string => {
  if (input.text && input.matchingText) {
    return `${input.text}/${input.matchingText}`;
  }

  if (input.text) {
    return `${input.text}`;
  }

  return `${input.matchingText ?? "N/A"}`;
};

const formatGeocodingApiResponseAsString = (
  input: GeocodingApiResponse
): string => {
  if (isGeocodingApiFailureResponse(input)) {
    return "[NO RESPONSE]";
  }

  const centerCoordinatesAsString = !!input.centerCoordinates ? `[${input.centerCoordinates.join(",")}]` : "N/A";
  const boundingBoxAsString = !!input.boundingBox ? `[${input.boundingBox.join(",")}]` : "N/A";
  const textAsString = input.text ?? "N/A";
  const matchingTextAsString = input.matchingText ?? "N/A";
  const regionNameAsString = input.regionName ?? "N/A";

  return `[centerCoordinates: ${centerCoordinatesAsString},boundingBox: ${boundingBoxAsString}, text: ${textAsString}, matchingText: ${matchingTextAsString}, regionName: ${regionNameAsString}]`
};

const generateLineForResponseAndRequest = (input: GenerateLineForRequestAndResponseInput): string => {
  const { city, state, countryName, countryAlphaTwoCode, geocodingApiRequestUrl, geocodingApiResponse } = input;

  const prefix = generateGeocodingApiRequestLogPrefix({city, state, countryName, countryAlphaTwoCode, logLevel: GeocodingApiRequestLogLevel.INFO})
  const redactedRequestUrl = redactMapboxApiKeyFromGeocodingApiQueryUrl(geocodingApiRequestUrl);
  const formattedApiResponse = formatGeocodingApiResponseAsString(geocodingApiResponse);

  return `${prefix} - [${redactedRequestUrl}] - ${formattedApiResponse}`;
}

const generateLineForTextConsistencyCheck = (input: GenerateLineForTextConsistencyCheckInput): string | undefined => {
  const { city, state, countryName, countryAlphaTwoCode, geocodingApiResponse } = input;

  if(isGeocodingApiFailureResponse(geocodingApiResponse)) {
    return;
  }
  
  const expectedText = city ?? state ?? countryName;

  if(expectedText === geocodingApiResponse.matchingText || expectedText === geocodingApiResponse.text) {
    return;
  }

  const geocodingApiResponseTextFormatted = formatTextAndMatchingTextForDisplay({text: geocodingApiResponse.text, matchingText: geocodingApiResponse.matchingText});

  const prefix = generateGeocodingApiRequestLogPrefix({city, state, countryName, countryAlphaTwoCode, logLevel: GeocodingApiRequestLogLevel.WARN})
  const infoStatement = "[Text returned from the mapbox API did not match expected text]"
  const details = `[Expected text: "${expectedText}", Actual: "${geocodingApiResponseTextFormatted}"]`
  const suggestion = "[If one of the actual text values listed is the correct name of the city/state/country and no other errors or warnings are present, It might be appropriate to change the name of this location in Airtable to the actual name listed. Otherwise, please look to the other warnings and errors for this location for more guidance, the texts not matching might be indicative that mapbox has identified the wrong city based on the text it was given.]"

  return `${prefix} - ${infoStatement} - ${details} - ${suggestion}`;
}

const generateLineForCityStateBoundingBoxConsistencyCheck = async (input: GenerateLineForCityStateBoundingBoxConsistencyCheckInput): Promise<string | undefined> => {
  const { city, state, countryName, countryAlphaTwoCode, geocodingApiResponse, mongoClient } = input;

  if(!city || !state || isGeocodingApiFailureResponse(geocodingApiResponse)) {
    return;
  }

  const apiResponseForCity = await makeGeocodingApiRequest({city, state, countryName, countryAlphaTwoCode, shouldSaveInGeocodingApiRequestReport: false, mongoClient});
  const apiResponseForState = await makeGeocodingApiRequest({city: undefined, state, countryName, countryAlphaTwoCode, shouldSaveInGeocodingApiRequestReport: false, mongoClient});

  if(isGeocodingApiFailureResponse(apiResponseForCity) || isGeocodingApiFailureResponse(apiResponseForState) || !apiResponseForState.boundingBox) {
    return;
  }

  if(isPointInBoundingBox({point: apiResponseForCity.centerCoordinates, boundingBox: apiResponseForState.boundingBox})) {
    return;
  }

  const prefix = generateGeocodingApiRequestLogPrefix({city, state, countryName, countryAlphaTwoCode, logLevel: GeocodingApiRequestLogLevel.ERROR})
  const infoStatement = "[City listed and state listed are incompatible with one another]";
  const details = `[City name: "${city ?? 'N/A'}", State name: "${state ?? 'N/A'}"]`
  const suggestion = `[According to mapbox, the state this city belongs to is "${geocodingApiResponse.regionName ?? 'N/A'}". If there are no other errors and you agree with this state placement, consider moving the city to that state. If that state name sounds wrong, please feel free to omit the city name since it might be resulting in the pin being in the incorrect state. Please also check the other errors to see if they provide any more context here.]`;

  return `${prefix} - ${infoStatement} - ${details} - ${suggestion}`;
}

const generateLineForInvalidCityButValidStateCheck = async (input: GenerateLineForInvalidCityButValidStateCheckInput): Promise<string | undefined> => {
  const { city, state, countryName, countryAlphaTwoCode, geocodingApiResponse, mongoClient } = input;

  if(!city) {
    return;
  }

  if(isGeocodingApiSuccessResponse(geocodingApiResponse) && (geocodingApiResponse.text === city || geocodingApiResponse.matchingText === city )) {
    return;
  }

  const apiResponseForState = await makeGeocodingApiRequest({
    city: undefined,
    state,
    countryName,
    countryAlphaTwoCode,
    shouldSaveInGeocodingApiRequestReport: false,
    mongoClient
  });

  if(isGeocodingApiFailureResponse(apiResponseForState)) {
    return;
  }

  const originalRequestTextAsString = isGeocodingApiSuccessResponse(geocodingApiResponse) ? formatTextAndMatchingTextForDisplay({text: geocodingApiResponse.text, matchingText: geocodingApiResponse.matchingText}) : 'N/A'
  const stateNameFromStateRequest = formatTextAndMatchingTextForDisplay({text: apiResponseForState.text, matchingText: apiResponseForState.matchingText});

  const prefix = generateGeocodingApiRequestLogPrefix({city, state, countryName, countryAlphaTwoCode, logLevel: GeocodingApiRequestLogLevel.WARN})
  const infoStatement = isGeocodingApiSuccessResponse(geocodingApiResponse) ? "[City listed is recognized as both a valid city and a valid state.]" :  "[City listed is not a valid city, but is a valid state]"
  const details = `[City name given: "${city ?? 'N/A'}", State name given: "${state ?? 'N/A'}"]`
  const suggestion = `[According to mapbox, the city you've given is the name of a valid state called "${stateNameFromStateRequest}". This might be resulting in the pin being in the wrong location because it might be using a city whose name is similar instead of using the state. The city name mapbox lists for this city is "${originalRequestTextAsString}" so if that sounds wrong I would recommend moving the current city name to the state column in Airtable if that seems appropriate and makes sense given the other error messages.]`

  return `${prefix} - ${infoStatement} - ${details} - ${suggestion}`;
}

const generateLineForInvalidCityButValidDistrictCheck = async (input: GenerateLineForInvalidCityButValidDistrictCheckInput): Promise<string | undefined> => {
  const { city, state, countryName, countryAlphaTwoCode, geocodingApiResponse, mongoClient } = input;

  if(!city) {
    return;
  }

  if(isGeocodingApiSuccessResponse(geocodingApiResponse) && (geocodingApiResponse.text === city || geocodingApiResponse.matchingText === city )) {
    return;
  }

  const apiResponseForState = await makeGeocodingApiRequest({
    city: undefined,
    state,
    countryName,
    countryAlphaTwoCode,
    shouldSaveInGeocodingApiRequestReport: false,
    geocodingApiRequestParamOverride: {
      countryAlphaTwoCode,
      geocoderDataType: GeocoderDataType.DISTRICT,
      mapboxSearchText: city
    },
    mongoClient
  });

  if(isGeocodingApiFailureResponse(apiResponseForState)) {
    return;
  }

  const originalRequestTextAsString = isGeocodingApiSuccessResponse(geocodingApiResponse) ? formatTextAndMatchingTextForDisplay({text: geocodingApiResponse.text, matchingText: geocodingApiResponse.matchingText}) : 'N/A'
  const districtNameFromDistrictRequest = formatTextAndMatchingTextForDisplay({text: apiResponseForState.text, matchingText: apiResponseForState.matchingText});

  const prefix = generateGeocodingApiRequestLogPrefix({city, state, countryName, countryAlphaTwoCode, logLevel: GeocodingApiRequestLogLevel.WARN})
  const infoStatement = isGeocodingApiSuccessResponse(geocodingApiResponse) ? "[City listed is recognized as both a valid city and a valid district.]" :  "[City listed is not a valid city, but is a valid district]"
  const details = `[City name given: "${city ?? 'N/A'}", State name given: "${state ?? 'N/A'}"]`
  const suggestion = `[According to mapbox, the city you've given is the name of a valid district called "${districtNameFromDistrictRequest}". This might be resulting in the pin being in the wrong location because it might be using a city whose name is similar instead of using the district. The city name mapbox lists for this city is "${originalRequestTextAsString}" so if that sounds wrong I would recommend moving the current city name to the state column in Airtable if that seems appropriate and makes sense given the other error messages.]`

  return `${prefix} - ${infoStatement} - ${details} - ${suggestion}`;
}

export const recordGeocodingApiRequestInGeocodingReport = async(input: RecordGeocodingApiRequestInGeocodingReportInput): Promise<void> => {
  const { city, state, countryName, countryAlphaTwoCode, geocodingApiRequestUrl, geocodingApiResponse, geocodingApiRequestReportFileName, mongoClient } = input;

  const linesToWrite = await Promise.all([
      generateLineForResponseAndRequest({city, state, countryName, countryAlphaTwoCode, geocodingApiRequestUrl, geocodingApiResponse}),
      generateLineForTextConsistencyCheck({city, state, countryName, countryAlphaTwoCode, geocodingApiResponse}),
      generateLineForCityStateBoundingBoxConsistencyCheck({city, state, countryName, countryAlphaTwoCode, geocodingApiResponse, mongoClient}),
      generateLineForInvalidCityButValidStateCheck({city, state, countryName, countryAlphaTwoCode, geocodingApiResponse, mongoClient}),
      generateLineForInvalidCityButValidDistrictCheck({city, state, countryName, countryAlphaTwoCode, geocodingApiResponse, mongoClient}),
  ]);

  linesToWrite.forEach((line) => {
    if(!!line) {
      appendFileSync(geocodingApiRequestReportFileName, `${line}\n`);
    }
  })
}