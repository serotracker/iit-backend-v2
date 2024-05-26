import { FieldSet } from "airtable";
import { MongoClient } from "mongodb";
import { StructuredVaccinationData } from "../types";
import { request } from "undici";
import { groupByArray } from "../../../lib/lib.js";

export type EstimateFieldsAfterFetchingVaccinationDataStep = FieldSet;
export type StudyFieldsAfterFetchingVaccinationDataStep = FieldSet;
export type StructuredVaccinationDataAfterFetchingVaccinationDataStep =
  StructuredVaccinationData;
export type StructuredPositiveCaseDataAfterFetchingVaccinationDataStep =
  undefined;

interface FetchVaccinationDataStepInput {
  allEstimates: FieldSet[];
  allStudies: FieldSet[];
  vaccinationData: undefined;
  positiveCaseData: undefined;
  mongoClient: MongoClient;
}

interface FetchVaccinationDataStepOutput {
  allEstimates: EstimateFieldsAfterFetchingVaccinationDataStep[];
  allStudies: StudyFieldsAfterFetchingVaccinationDataStep[];
  vaccinationData: StructuredVaccinationDataAfterFetchingVaccinationDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFetchingVaccinationDataStep;
  mongoClient: MongoClient;
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

  const csvColumns = rawCsvData.split("\n").at(0)?.split(',') ?? []
  const indexOfDateColumn = csvColumns.findIndex(columnValue => columnValue === 'date');
  const indexOfThreeLetterCountryCode = csvColumns.findIndex(columnValue => columnValue === 'iso_code');
  const indexOfCountryPeopleVaccinatedPerHundred = csvColumns.findIndex(columnValue => columnValue === 'people_vaccinated_per_hundred');
  const indexOfCountryPeopleFullyVaccinatedPerHundred = csvColumns.findIndex(columnValue => columnValue === 'people_fully_vaccinated_per_hundred');

  const unformattedVaccinationData = rawCsvData
    .split("\n")
    .map((element, index) => {
      if (index === 0 || !element) {
        return undefined;
      }

      const split_csv_line = element.split(",");

      return {
        threeLetterCountryCode: split_csv_line[indexOfThreeLetterCountryCode],
        year: split_csv_line[indexOfDateColumn].split("-")[0],
        month: split_csv_line[indexOfDateColumn].split("-")[1].replace(/^0+/, ''),
        day: split_csv_line[indexOfDateColumn].split("-")[2].replace(/^0+/, ''),
        countryPeopleVaccinatedPerHundred: split_csv_line[indexOfCountryPeopleVaccinatedPerHundred] !== '' ? parseFloat(split_csv_line[indexOfCountryPeopleVaccinatedPerHundred]) : undefined,
        countryPeopleFullyVaccinatedPerHundred: split_csv_line[indexOfCountryPeopleFullyVaccinatedPerHundred] !== '' ? parseFloat(split_csv_line[indexOfCountryPeopleFullyVaccinatedPerHundred]) : undefined,
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
    allStudies: input.allStudies,
    vaccinationData: formattedVaccinationData,
    positiveCaseData: input.positiveCaseData,
    mongoClient: input.mongoClient
  };
};
