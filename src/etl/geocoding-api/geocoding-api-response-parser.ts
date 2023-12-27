import { Dispatcher } from "undici"
import { BoundingBox, GeocodingApiResponse, Point } from "./geocoding-api-client-types.js"
import { isArrayOfUnknownType } from "../../lib/lib.js";
import { isBoundingBox, isPoint } from "./coordinate-helpers.js";

const parseCenterCoordinatesFromFeature = (feature: object): Point | undefined => {
  if(!('center' in feature)) {
    return undefined;
  }

  if(!feature.center || !isPoint(feature.center)) {
    return undefined;
  }

  return feature.center;
}

const parseTextFromFeature  = (feature: object): string | undefined => {
  if(!('text' in feature)) {
    return undefined;
  }

  if(!feature.text || typeof feature.text !== 'string') {
    return undefined;
  }

  return feature.text;
}

const parseMatchingTextFromFeature  = (feature: object): string | undefined => {
  if(!('matching_text' in feature)) {
    return undefined;
  }

  if(!feature.matching_text || typeof feature.matching_text !== 'string') {
    return undefined;
  }

  return feature.matching_text;
}

const parseBoundingBoxFromFeature  = (feature: object): BoundingBox | undefined => {
  if(!('bbox' in feature)) {
    return undefined;
  }

  if(!feature.bbox || !isBoundingBox(feature.bbox)) {
    return undefined;
  }

  return feature.bbox;
}

const parseRegionNameFromFeature = (feature: object): string | undefined => {
  if(!('context' in feature)) {
    return undefined;
  }

  if(!feature.context || !isArrayOfUnknownType(feature.context)) {
    return undefined;
  }

  return feature.context.find((elementInContext): elementInContext is {id: string, text: string} => {
    if(!elementInContext || typeof elementInContext !== 'object') {
      return false;
    }

    if(!('text' in elementInContext) || !('id' in elementInContext)) {
      return false;
    }

    const { text, id } = elementInContext;

    if(!text || typeof text !== 'string' || !id || typeof id !== 'string') {
      return false;
    }

    const regionIdRegex = /^region.([0-9]+)$/;
    const regionIdRegexMatches = id.match(regionIdRegex);

    if(!regionIdRegexMatches || regionIdRegexMatches.length === 0) {
      return false;
    }

    return true;
  })?.text;
}

export const parseGeocodingApiResponse = async (response: Dispatcher.ResponseData): Promise<GeocodingApiResponse> => {
  const data = await response.body.json();

  if(typeof data !== 'object' || !data) {
    return "FAILED_RESPONSE";
  }

  if(!('features' in data)) {
    return 'FAILED_RESPONSE';
  }

  if(!isArrayOfUnknownType(data.features)) {
    return 'FAILED_RESPONSE'
  }

  if(data.features.length === 0) {
    return 'FAILED_RESPONSE';
  }

  const chosenFeature = data.features[0];

  if(typeof chosenFeature !== 'object' || !chosenFeature) {
    return 'FAILED_RESPONSE';
  }

  const centerCoordinates = parseCenterCoordinatesFromFeature(chosenFeature);

  if(!centerCoordinates) {
    return 'FAILED_RESPONSE';
  }

  const text = parseTextFromFeature(chosenFeature);
  const matchingText = parseMatchingTextFromFeature(chosenFeature);
  const boundingBox = parseBoundingBoxFromFeature(chosenFeature);
  const regionName = parseRegionNameFromFeature(chosenFeature);

  return {
    centerCoordinates,
    text,
    matchingText,
    boundingBox,
    regionName
  }
}