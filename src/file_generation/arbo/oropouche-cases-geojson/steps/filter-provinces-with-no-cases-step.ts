import { GeoJSONDataAfterConnectingProvincesAndCasesStep, OropoucheCaseDataEntryAfterConnectingProvincesAndCasesStep } from "./connect-provinces-and-cases-step.js";

export type OropoucheCaseDataEntryAfterFilteringProvincesWithNoCasesStep = OropoucheCaseDataEntryAfterConnectingProvincesAndCasesStep;
export type GeoJSONDataAfterFilteringProvincesWithNoCasesStep = GeoJSONDataAfterConnectingProvincesAndCasesStep;

interface FilterProvincesWithNoCasesStepInput {
  oropoucheCaseData: OropoucheCaseDataEntryAfterConnectingProvincesAndCasesStep[];
  geoJsonData: GeoJSONDataAfterConnectingProvincesAndCasesStep;
}

interface FilterProvincesWithNoCasesStepOutput {
  oropoucheCaseData: OropoucheCaseDataEntryAfterFilteringProvincesWithNoCasesStep[];
  geoJsonData: GeoJSONDataAfterFilteringProvincesWithNoCasesStep;
}

export const filterProvincesWithNoCasesStep = (
  input: FilterProvincesWithNoCasesStepInput
): FilterProvincesWithNoCasesStepOutput => {
  console.log('Running step: filterProvincesWithNoCasesStep.');

  return {
    oropoucheCaseData: input.oropoucheCaseData,
    geoJsonData: {
      type: input.geoJsonData.type,
      crs: {
        type: input.geoJsonData.crs.type,
        properties: input.geoJsonData.crs.properties
      },
      features: input.geoJsonData.features
        .filter((feature) => feature.properties.cases > 0)
    }
  }
}