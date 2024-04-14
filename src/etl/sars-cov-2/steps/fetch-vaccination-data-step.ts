import { FieldSet } from "airtable";
import { pipe } from "fp-ts/lib/function.js";
import { StructuredVaccinationData } from "../types";
import { request } from "undici";
import { groupByArray, typedGroupBy } from "../../../lib/lib";

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

  const unformattedVaccinationData = rawCsvData
    .split("\n")
    .map((element, index) => {
      if (index === 0) {
        return undefined;
      }

      const split_csv_line = element.split(",");

      return {
        threeLetterCountryCode: split_csv_line[1],
        year: split_csv_line[2].split("-")[0],
        month: split_csv_line[2].split("-")[1],
        day: split_csv_line[2].split("-")[2],
        totalVaccinationsPerHundred: parseFloat(split_csv_line[10]),
      };
    })
    .filter(<T>(element: T | undefined): element is T => !!element);

  const formattedVaccinationData = groupByArray(
    unformattedVaccinationData,
    "threeLetterCountryCode"
  ).map(({ threeLetterCountryCode, data }) => ({
    threeLetterCountryCode,
    data: groupByArray(data, "year").map(({ year, data }) => ({
      year,
      data: groupByArray(data, "month"),
    })),
  }));

  return {
    allEstimates: input.allEstimates,
    vaccinationData: formattedVaccinationData,
    positiveCaseData: input.positiveCaseData,
  };
};
