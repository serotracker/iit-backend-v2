import { readFileSync } from "fs";
import { pipe } from "fp-ts/lib/function.js";
import { GeoJSONDataAfterFetchingOropoucheCaseData, OropoucheCaseDataEntryAfterFetchingOropoucheCaseData } from "./fetch-oropouche-case-data-step.js";

interface ParseProvincesGeoJsonFileInput {
  filePath: string;
}

const parseProvincesGeoJsonFile = (input: ParseProvincesGeoJsonFileInput): {
  type: "FeatureCollection",
  crs: {
    type: "name",
    properties: {
      name: "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  },
  features: Array<{
    type: "Feature",
    properties: {
      "shapeName": string;
      "shapeISO": string;
      "shapeID": string;
      "shapeGroup": string;
      "shapeType": string;
    },
    geometry: {
      type: "Polygon",
      coordinates: Array<Array<[ number, number ]>>
    }
  }>
} => {
  return pipe(
    input.filePath,
    readFileSync,
    (buffer) => buffer.toString(),
    (stringData) => JSON.parse(stringData)
  )
}

export type OropoucheCaseDataEntryAfterParsingAllProvincesIntoGeoJSONFileStep = OropoucheCaseDataEntryAfterFetchingOropoucheCaseData;
export type GeoJSONDataAfterParsingAllProvincesIntoGeoJSONFileStep = {
  type: "FeatureCollection",
  crs: {
    type: "name",
    properties: {
      name: "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  },
  features: Array<{
    type: "Feature",
    properties: {
      "provinceISOId": string;
      "countryAlphaThreeCode": string;
    },
    geometry: {
      type: "Polygon",
      coordinates: Array<Array<[ number, number ]>>
    }
  }>
}

interface ParseAllProvincesIntoGeoJSONFileStepInput {
  oropoucheCaseData: OropoucheCaseDataEntryAfterFetchingOropoucheCaseData[];
  geoJsonData: GeoJSONDataAfterFetchingOropoucheCaseData;
}

interface ParseAllProvincesIntoGeoJSONFileStepOutput {
  oropoucheCaseData: OropoucheCaseDataEntryAfterParsingAllProvincesIntoGeoJSONFileStep[];
  geoJsonData: GeoJSONDataAfterParsingAllProvincesIntoGeoJSONFileStep;
}

export const parseAllProvincesIntoGeoJSONFileStep = (
  input: ParseAllProvincesIntoGeoJSONFileStepInput
): ParseAllProvincesIntoGeoJSONFileStepOutput => {
  console.log('Running step: parseAllProvincesIntoGeoJSONFileStep.');

  const boliviaProvinces = parseProvincesGeoJsonFile({ filePath: './data/geography/bolivia/bolivia-provinces.geojson' });
  const brazilProvinces = parseProvincesGeoJsonFile({ filePath: './data/geography/brazil/brazil-provinces.geojson' });
  const colombiaProvinces = parseProvincesGeoJsonFile({ filePath: './data/geography/colombia/colombia-provinces.geojson' });
  const cubaProvinces = parseProvincesGeoJsonFile({ filePath: './data/geography/cuba/cuba-provinces.geojson' });
  const peruProvinces = parseProvincesGeoJsonFile({ filePath: './data/geography/peru/peru-provinces.geojson' });

  const allRawFeatures = [
    ...boliviaProvinces.features,
    ...brazilProvinces.features,
    ...colombiaProvinces.features,
    ...cubaProvinces.features,
    ...peruProvinces.features
  ];

  return {
    oropoucheCaseData: input.oropoucheCaseData,
    geoJsonData: {
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
      },
      features: allRawFeatures.map((feature) => ({
        type: feature.type,
        properties: {
          provinceISOId: feature.properties.shapeISO,
          countryAlphaThreeCode: feature.properties.shapeGroup
        },
        geometry: {
          type: feature.geometry.type,
          coordinates: feature.geometry.coordinates
        }
      }))
    }
  }
}