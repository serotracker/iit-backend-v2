import { MongoClient } from "mongodb";
import { dateToMonthCount, monthCountToMonthNumber, monthCountToYear } from "../../../lib/time-utils.js";
import { generateRange } from "../../../lib/lib.js";
import {
  CountryFieldsAfterCalculatingSeroprevalenceStep,
  EstimateFieldsAfterCalculatingSeroprevalenceStep,
  StructuredCountryPopulationDataAfterCalculatingSeroprevalenceStep,
  StructuredPositiveCaseDataAfterCalculatingSeroprevalenceStep,
  StructuredVaccinationDataAfterCalculatingSeroprevalenceStep,
  StudyFieldsAfterCalculatingSeroprevalenceStep
} from "./calculate-seroprevalence-step.js";

export type EstimateFieldsAfterGeneratingConsolidatedCountryDataStep =
  EstimateFieldsAfterCalculatingSeroprevalenceStep;
export type StudyFieldsAfterGeneratingConsolidatedCountryDataStep =
  StudyFieldsAfterCalculatingSeroprevalenceStep;
export type CountryFieldsAfterGeneratingConsolidatedCountryDataStep =
  CountryFieldsAfterCalculatingSeroprevalenceStep;
export type StructuredVaccinationDataAfterGeneratingConsolidatedCountryDataStep =
  StructuredVaccinationDataAfterCalculatingSeroprevalenceStep;
export type StructuredPositiveCaseDataAfterGeneratingConsolidatedCountryDataStep =
  StructuredPositiveCaseDataAfterCalculatingSeroprevalenceStep;
export type StructuredCountryPopulationDataAfterGeneratingConsolidatedCountryDataStep =
  StructuredCountryPopulationDataAfterCalculatingSeroprevalenceStep;

export interface ConsolidatedCountryDataAfterGeneratingConsolidatedCountryDataStep {
  year: number;
  month: number;
  alphaTwoCode: string;
  alphaThreeCode: string;
};


interface GenerateConsolidatedCountryDataStepInput {
  allEstimates: EstimateFieldsAfterCalculatingSeroprevalenceStep[];
  allStudies: StudyFieldsAfterCalculatingSeroprevalenceStep[];
  allCountries: CountryFieldsAfterCalculatingSeroprevalenceStep[];
  vaccinationData: StructuredVaccinationDataAfterCalculatingSeroprevalenceStep;
  positiveCaseData: StructuredPositiveCaseDataAfterCalculatingSeroprevalenceStep;
  countryPopulationData: StructuredCountryPopulationDataAfterCalculatingSeroprevalenceStep;
  mongoClient: MongoClient;
}

interface GenerateConsolidatedCountryDataStepOutput {
  allEstimates: EstimateFieldsAfterGeneratingConsolidatedCountryDataStep[];
  allStudies: StudyFieldsAfterGeneratingConsolidatedCountryDataStep[];
  allCountries: CountryFieldsAfterGeneratingConsolidatedCountryDataStep[];
  vaccinationData: StructuredVaccinationDataAfterGeneratingConsolidatedCountryDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterGeneratingConsolidatedCountryDataStep;
  countryPopulationData: StructuredCountryPopulationDataAfterGeneratingConsolidatedCountryDataStep;
  consolidatedCountryData: ConsolidatedCountryDataAfterGeneratingConsolidatedCountryDataStep[];
  mongoClient: MongoClient;
}

export const generateConsolidatedCountryDataStep = (
  input: GenerateConsolidatedCountryDataStepInput
): GenerateConsolidatedCountryDataStepOutput => {
  console.log(`Running step: generateConsolidatedCountryDataStep. Remaining estimates: ${input.allEstimates.length}.`);

  //Only save country data between the earliest start date and the latest end date.
  const earliestSamplingStartDate = new Date(Math.min(...
    input.allEstimates
      .filter((estimate): estimate is Omit<typeof estimate, 'samplingStartDate'> & {
        samplingStartDate: NonNullable<typeof estimate['samplingStartDate']>
      } => !!estimate.samplingStartDate)
      .map(({ samplingStartDate }) => samplingStartDate.valueOf())
  ))
  const latestSamplingEndDate = new Date(Math.max(...
    input.allEstimates
      .filter((estimate): estimate is Omit<typeof estimate, 'samplingEndDate'> & {
        samplingEndDate: NonNullable<typeof estimate['samplingEndDate']>
      } => !!estimate.samplingEndDate)
      .map(({ samplingEndDate }) => samplingEndDate.valueOf())
  ))
  const earliestMonthCount = dateToMonthCount(earliestSamplingStartDate);
  const latestMonthCount = dateToMonthCount(latestSamplingEndDate);

  return {
    allEstimates: input.allEstimates,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    consolidatedCountryData: generateRange({
      startInclusive: earliestMonthCount,
      endInclusive: latestMonthCount,
      stepSize: 1
    }).map((monthCount) => ({
      year: monthCountToYear(monthCount),
      month: monthCountToMonthNumber(monthCount) + 1
    })).flatMap(({year, month}) => input.allCountries.map(({ alphaTwoCode, alphaThreeCode }) => ({
      year,
      month,
      alphaTwoCode,
      alphaThreeCode
    }))),
    mongoClient: input.mongoClient
  }
}