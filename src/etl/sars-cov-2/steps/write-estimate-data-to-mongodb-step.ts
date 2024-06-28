import { MongoClient } from "mongodb";
import {
  ConsolidatedCountryDataAfterWritingCountryDataToMongoDbStep,
  CountryFieldsAfterWritingCountryDataToMongoDbStep,
  EstimateFieldsAfterWritingCountryDataToMongoDbStep,
  StructuredCountryPopulationDataAfterWritingCountryDataToMongoDbStep,
  StructuredPositiveCaseDataAfterWritingCountryDataToMongoDbStep,
  StructuredVaccinationDataAfterWritingCountryDataToMongoDbStep,
  StudyFieldsAfterWritingCountryDataToMongoDbStep
} from "./write-country-data-to-mongodb-step";
import { getEnvironmentVariableOrThrow, writeDataToMongoEtlStep } from "../../helpers.js";

export type EstimateFieldsAfterWritingEstimateDataToMongoDbStep =
  EstimateFieldsAfterWritingCountryDataToMongoDbStep;
export type StudyFieldsAfterWritingEstimateDataToMongoDbStep =
  StudyFieldsAfterWritingCountryDataToMongoDbStep;
export type CountryFieldsAfterWritingEstimateDataToMongoDbStep =
  CountryFieldsAfterWritingCountryDataToMongoDbStep;
export type StructuredVaccinationDataAfterWritingEstimateDataToMongoDbStep =
  StructuredVaccinationDataAfterWritingCountryDataToMongoDbStep;
export type StructuredPositiveCaseDataAfterWritingEstimateDataToMongoDbStep =
  StructuredPositiveCaseDataAfterWritingCountryDataToMongoDbStep;
export type StructuredCountryPopulationDataAfterWritingEstimateDataToMongoDbStep =
  StructuredCountryPopulationDataAfterWritingCountryDataToMongoDbStep;
export type ConsolidatedCountryDataAfterWritingEstimateDataToMongoDbStep = 
  ConsolidatedCountryDataAfterWritingCountryDataToMongoDbStep;

interface WriteEstimateDataToMongoDbStepInput {
  allEstimates: EstimateFieldsAfterWritingCountryDataToMongoDbStep[];
  allStudies: StudyFieldsAfterWritingCountryDataToMongoDbStep[];
  allCountries: CountryFieldsAfterWritingCountryDataToMongoDbStep[];
  vaccinationData: StructuredVaccinationDataAfterWritingCountryDataToMongoDbStep;
  positiveCaseData: StructuredPositiveCaseDataAfterWritingCountryDataToMongoDbStep;
  countryPopulationData: StructuredCountryPopulationDataAfterWritingCountryDataToMongoDbStep;
  consolidatedCountryData: ConsolidatedCountryDataAfterWritingCountryDataToMongoDbStep[];
  mongoClient: MongoClient;
}

interface WriteEstimateDataToMongoDbStepOutput {
  allEstimates: EstimateFieldsAfterWritingEstimateDataToMongoDbStep[];
  allStudies: StudyFieldsAfterWritingEstimateDataToMongoDbStep[];
  allCountries: CountryFieldsAfterWritingEstimateDataToMongoDbStep[];
  vaccinationData: StructuredVaccinationDataAfterWritingEstimateDataToMongoDbStep;
  positiveCaseData: StructuredPositiveCaseDataAfterWritingEstimateDataToMongoDbStep;
  countryPopulationData: StructuredCountryPopulationDataAfterWritingEstimateDataToMongoDbStep;
  consolidatedCountryData: ConsolidatedCountryDataAfterWritingEstimateDataToMongoDbStep[];
  mongoClient: MongoClient;
}

export const writeEstimateDataToMongoDbStep = async(
  input: WriteEstimateDataToMongoDbStepInput
): Promise<WriteEstimateDataToMongoDbStepOutput> => {
  console.log(`Running step: writeEstimateDataToMongoDbStep. Remaining estimates: ${input.allEstimates.length}.`);

  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  await writeDataToMongoEtlStep({
    databaseName,
    collectionName: "sarsCov2Estimates",
    data: input.allEstimates,
    mongoClient: input.mongoClient,
  });

  return {
    allEstimates: input.allEstimates,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    consolidatedCountryData: input.consolidatedCountryData,
    mongoClient: input.mongoClient
  };
};
