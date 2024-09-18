import { pipe } from "fp-ts/lib/function.js";
import { fetchOropoucheCaseData } from "./steps/fetch-oropouche-case-data-step.js";
import { etlStep } from "../../../etl/helpers.js";
import { parseAllProvincesIntoGeoJSONFileStep } from "./steps/parse-all-provinces-into-geojson-file-step.js";
import { assignColoursToProvincesStep } from "./steps/assign-colours-to-provinces-step.js";
import { connectProvincesAndCasesStep } from "./steps/connect-provinces-and-cases-step.js";
import { filterProvincesWithNoCasesStep } from "./steps/filter-provinces-with-no-cases-step.js";
import { writeOutputGeoJSONFileStep } from "./steps/write-output-geojson-file-step.js";

const generateOropoucheCasesCsv = async () => {
  console.log("Generating Oropouche Cases CSV");

  await pipe(
    {
      oropoucheCaseData: [],
      geoJsonData: {}
    },
    etlStep(fetchOropoucheCaseData),
    etlStep(parseAllProvincesIntoGeoJSONFileStep),
    etlStep(connectProvincesAndCasesStep),
    etlStep(filterProvincesWithNoCasesStep),
    etlStep(assignColoursToProvincesStep),
    etlStep(writeOutputGeoJSONFileStep)
  );

  console.log("Exiting");
  process.exit(1);
}

await generateOropoucheCasesCsv().catch((error) => console.error(error));