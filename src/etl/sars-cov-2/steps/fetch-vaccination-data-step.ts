import { FieldSet } from "airtable";
import { StructuredVaccinationData } from "../types";
import { request } from "undici";

export type EstimateFieldsAfterFetchingVaccinationDataStep = FieldSet;
export type StructuredVaccinationDataAfterFetchingVaccinationDataStep =
  StructuredVaccinationData;
export type StructuredPositiveCaseDataAfterFetchingVaccinationDataStep =
  undefined;

interface FetchVaccinationDataStepInput {
  allEstimates: FieldSet[];
  vaccinationData: undefined;
  positiveCaseData: undefined;
}

interface FetchVaccinationDataStepOutput {
  allEstimates: EstimateFieldsAfterFetchingVaccinationDataStep[];
  vaccinationData: StructuredVaccinationDataAfterFetchingVaccinationDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFetchingVaccinationDataStep;
}

export const fetchVaccinationDataStep = async (
  input: FetchVaccinationDataStepInput
): Promise<FetchVaccinationDataStepOutput> => {
  console.log(
    `Running step: fetchVaccinationDataStep. Remaining estimates: ${input.allEstimates.length}`
  );

  const { body } = await request(
    "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv",
    { method: "GET" }
  );

  const rawCsvData = await body.text();

  return {
    allEstimates: input.allEstimates,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
  };
};
