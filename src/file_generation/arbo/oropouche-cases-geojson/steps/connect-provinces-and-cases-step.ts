import { GeoJSONDataAfterParsingAllProvincesIntoGeoJSONFileStep, OropoucheCaseDataEntryAfterParsingAllProvincesIntoGeoJSONFileStep } from "./parse-all-provinces-into-geojson-file-step.js";

export type OropoucheCaseDataEntryAfterConnectingProvincesAndCasesStep = OropoucheCaseDataEntryAfterParsingAllProvincesIntoGeoJSONFileStep;
export type GeoJSONDataAfterConnectingProvincesAndCasesStep = Omit<GeoJSONDataAfterParsingAllProvincesIntoGeoJSONFileStep, 'features'> & {
  features: Array<Omit<GeoJSONDataAfterParsingAllProvincesIntoGeoJSONFileStep['features'][number], 'properties'> & {
    properties: GeoJSONDataAfterParsingAllProvincesIntoGeoJSONFileStep['features'][number]['properties'] & {
      cases: number;
    }
  }>
};

interface ConnectProvincesAndCasesStepInput {
  oropoucheCaseData: OropoucheCaseDataEntryAfterParsingAllProvincesIntoGeoJSONFileStep[];
  geoJsonData: GeoJSONDataAfterParsingAllProvincesIntoGeoJSONFileStep;
}

interface ConnectProvincesAndCasesStepOutput {
  oropoucheCaseData: OropoucheCaseDataEntryAfterConnectingProvincesAndCasesStep[];
  geoJsonData: GeoJSONDataAfterConnectingProvincesAndCasesStep;
}

export const connectProvincesAndCasesStep = (
  input: ConnectProvincesAndCasesStepInput
): ConnectProvincesAndCasesStepOutput => {
  console.log('Running step: connectProvincesAndCasesStep.');

  return {
    oropoucheCaseData: input.oropoucheCaseData,
    geoJsonData: {
      type: input.geoJsonData.type,
      crs: {
        type: input.geoJsonData.crs.type,
        properties: input.geoJsonData.crs.properties
      },
      features: input.geoJsonData.features.map((feature) => ({
        type: feature.type,
        properties: {
          provinceISOId: feature.properties.provinceISOId,
          countryAlphaThreeCode: feature.properties.countryAlphaThreeCode,
          cases: input.oropoucheCaseData
            .find((element) => 
              element.provinceIsoId === feature.properties.provinceISOId &&
              element.countryAlphaThreeCode === feature.properties.countryAlphaThreeCode
            )?.reportedCases ?? 0
        },
        geometry: {
          type: feature.geometry.type,
          coordinates: feature.geometry.coordinates
        }
      }))
    }
  }
}