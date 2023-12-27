import { BoundingBox, Point } from "./geocoding-api-client-types.js";

interface isPointInBoundingBoxInput {
  point: Point;
  boundingBox: BoundingBox;
}

export const getLongitude = (point: Point): number => point[0];
export const getLatitude = (point: Point): number => point[1];

export const isPointInBoundingBox = (input: isPointInBoundingBoxInput): boolean => {
  const { point, boundingBox } = input;

  const pointLongitude = point[0];
  const pointLatitude = point[1];
  const boundingBoxLongitudeMinimum = boundingBox[0];
  const boundingBoxLatitudeMinimum = boundingBox[1];
  const boundingBoxLongitudeMaximum = boundingBox[2];
  const boundingBoxLatitudeMaximum = boundingBox[3];

  return (
    pointLongitude >= boundingBoxLongitudeMinimum &&
    pointLongitude <= boundingBoxLongitudeMaximum &&
    pointLatitude >= boundingBoxLatitudeMinimum &&
    pointLatitude <= boundingBoxLatitudeMaximum
  );
};

export const isPoint = (input: unknown): input is Point => {
  return Array.isArray(input) && input.length === 2 && input.every((element) => typeof element === 'number')
}

export const isBoundingBox = (input: unknown): input is BoundingBox => {
  return Array.isArray(input) && input.length === 4 && input.every((element) => typeof element === 'number')
}

