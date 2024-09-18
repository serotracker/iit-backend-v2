import { mixColours } from "../../../../etl/helpers.js";
import { GeoJSONDataAfterFilteringProvincesWithNoCasesStep, OropoucheCaseDataEntryAfterFilteringProvincesWithNoCasesStep } from "./filter-provinces-with-no-cases-step.js";

export type OropoucheCaseDataEntryAfterAssigningColoursToProvincesStep = OropoucheCaseDataEntryAfterFilteringProvincesWithNoCasesStep;
export type GeoJSONDataAfterAssigningColoursToProvincesStep = Omit<GeoJSONDataAfterFilteringProvincesWithNoCasesStep, 'features'> & {
  features: Array<Omit<GeoJSONDataAfterFilteringProvincesWithNoCasesStep['features'][number], 'properties'> & {
    properties: GeoJSONDataAfterFilteringProvincesWithNoCasesStep['features'][number]['properties'] & {
      defaultColourHexCode: string;
      percentageOfMaximumValue: number;
    }
  }>
};

interface AssignColoursToProvincesStepInput {
  oropoucheCaseData: OropoucheCaseDataEntryAfterFilteringProvincesWithNoCasesStep[];
  geoJsonData: GeoJSONDataAfterFilteringProvincesWithNoCasesStep;
}

interface AssignColoursToProvincesStepOutput {
  oropoucheCaseData: OropoucheCaseDataEntryAfterAssigningColoursToProvincesStep[];
  geoJsonData: GeoJSONDataAfterAssigningColoursToProvincesStep;
}

export const assignColoursToProvincesStep = (
  input: AssignColoursToProvincesStepInput
): AssignColoursToProvincesStepOutput => {
  console.log('Running step: assignColoursToProvincesStep.');

  const maximumCases = Math.max(...input.geoJsonData.features.map((feature) => feature.properties.cases));
  const zeroValuedColourHexCode = '#E2CBF7';
  const oneValuedColourHexCode = '#FFFFFF';

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
          cases: feature.properties.cases,
          defaultColourHexCode: mixColours({
            zeroValuedColourHexCode,
            oneValuedColourHexCode,
            value: feature.properties.cases /  maximumCases
          }),
          percentageOfMaximumValue: feature.properties.cases /  maximumCases
        },
        geometry: {
          type: feature.geometry.type,
          coordinates: feature.geometry.coordinates
        }
      }))
    }
  }
}