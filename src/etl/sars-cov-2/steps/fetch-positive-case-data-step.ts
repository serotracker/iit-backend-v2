
import { request } from "undici";
import { StructuredPositiveCaseData } from "../types";
import { EstimateFieldsAfterFetchingVaccinationDataStep, StructuredPositiveCaseDataAfterFetchingVaccinationDataStep, StructuredVaccinationDataAfterFetchingVaccinationDataStep } from "./fetch-vaccination-data-step";

export type EstimateFieldsAfterFetchingPositiveCaseDataStep = EstimateFieldsAfterFetchingVaccinationDataStep;
export type StructuredVaccinationDataAfterFetchingPositiveCaseDataStep = StructuredVaccinationDataAfterFetchingVaccinationDataStep;
export type StructuredPositiveCaseDataAfterFetchingPositiveCaseDataStep = StructuredPositiveCaseData;

interface FetchPositiveCaseDataStepInput {
  allEstimates: EstimateFieldsAfterFetchingVaccinationDataStep[];
  vaccinationData: StructuredVaccinationDataAfterFetchingVaccinationDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFetchingVaccinationDataStep;
}

interface FetchPositiveCaseDataStepOutput {
  allEstimates: EstimateFieldsAfterFetchingPositiveCaseDataStep[];
  vaccinationData: StructuredVaccinationDataAfterFetchingPositiveCaseDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFetchingPositiveCaseDataStep;
}

export const fetchPositiveCaseDataStep = async(
  input: FetchPositiveCaseDataStepInput
): Promise<FetchPositiveCaseDataStepOutput> => {
  console.log(`Running step: fetchPositiveCaseDataStep. Remaining estimates: ${input.allEstimates.length}`);

  const { body } = await request(
    "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/jhu/total_cases_per_million.csv",
    { method: "GET" }
  );

  const rawCsvData = await body.text();

  return {
    allEstimates: input.allEstimates,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
  };
};
