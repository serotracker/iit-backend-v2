import { writeFileSync } from "node:fs";
import { GeoJSONDataAfterAssigningColoursToProvincesStep, OropoucheCaseDataEntryAfterAssigningColoursToProvincesStep } from "./assign-colours-to-provinces-step.js";

export type OropoucheCaseDataEntryAfterWritingOutputGeoJSONFileStep = OropoucheCaseDataEntryAfterAssigningColoursToProvincesStep;
export type GeoJSONDataAfterWritingOutputGeoJSONFileStep = GeoJSONDataAfterAssigningColoursToProvincesStep;

interface WriteOutputGeoJSONFileStepInput {
  oropoucheCaseData: OropoucheCaseDataEntryAfterAssigningColoursToProvincesStep[];
  geoJsonData: GeoJSONDataAfterAssigningColoursToProvincesStep;
}

interface WriteOutputGeoJSONFileStepOutput {
  oropoucheCaseData: OropoucheCaseDataEntryAfterWritingOutputGeoJSONFileStep[];
  geoJsonData: GeoJSONDataAfterWritingOutputGeoJSONFileStep;
}

export const writeOutputGeoJSONFileStep = (
  input: WriteOutputGeoJSONFileStepInput
): WriteOutputGeoJSONFileStepOutput => {
  console.log('Running step: writeOutputGeoJSONFileStep.');

  const outputFilename = './oropouche-cases-geojson.json';

  writeFileSync(outputFilename, JSON.stringify(input.geoJsonData));

  return {
    oropoucheCaseData: input.oropoucheCaseData,
    geoJsonData: input.geoJsonData
  }
}