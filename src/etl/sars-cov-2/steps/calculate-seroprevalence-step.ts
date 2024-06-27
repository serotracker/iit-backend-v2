import { MongoClient } from "mongodb";
import { parse } from "date-fns";
import { EstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep, StructuredPositiveCaseDataAfterTransformingNotReportedValuesToUndefinedStep, StructuredVaccinationDataAfterTransformingNotReportedValuesToUndefinedStep, StudyFieldsAfterTransformingNotReportedValuesToUndefinedStep } from "./transform-not-reported-values-to-undefined-step.js";
import {
  EstimateFieldsAfterParsingDatesStep,
  StructuredCountryPopulationDataAfterParsingDatesStep,
  StructuredPositiveCaseDataAfterParsingDatesStep,
  StructuredVaccinationDataAfterParsingDatesStep,
  StudyFieldsAfterParsingDatesStep
} from "./parse-dates-step.js";

export type EstimateFieldsAfterCalculatingSeroprevalenceStep = EstimateFieldsAfterParsingDatesStep & {
  seroprevalence: number | undefined;
};
export type StudyFieldsAfterCalculatingSeroprevalenceStep = StudyFieldsAfterParsingDatesStep;
export type StructuredVaccinationDataAfterCalculatingSeroprevalenceStep = StructuredVaccinationDataAfterParsingDatesStep;
export type StructuredPositiveCaseDataAfterCalculatingSeroprevalenceStep = StructuredPositiveCaseDataAfterParsingDatesStep;
export type StructuredCountryPopulationDataAfterCalculatingSeroprevalenceStep = StructuredCountryPopulationDataAfterParsingDatesStep;

interface CalculateSeroprevalenceStepInput {
  allEstimates: EstimateFieldsAfterParsingDatesStep[];
  allStudies: StudyFieldsAfterParsingDatesStep[];
  vaccinationData: StructuredVaccinationDataAfterParsingDatesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterParsingDatesStep;
  countryPopulationData: StructuredCountryPopulationDataAfterParsingDatesStep;
  mongoClient: MongoClient;
}

interface CalculateSeroprevalenceStepOutput {
  allEstimates: EstimateFieldsAfterCalculatingSeroprevalenceStep[];
  allStudies: StudyFieldsAfterCalculatingSeroprevalenceStep[];
  vaccinationData: StructuredVaccinationDataAfterCalculatingSeroprevalenceStep;
  positiveCaseData: StructuredPositiveCaseDataAfterCalculatingSeroprevalenceStep;
  countryPopulationData: StructuredCountryPopulationDataAfterCalculatingSeroprevalenceStep;
  mongoClient: MongoClient;
}

export const calculateSeroprevalenceStep = (input: CalculateSeroprevalenceStepInput): CalculateSeroprevalenceStepOutput => {
  console.log(
    `Running step: calculateSeroprevalenceStep. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates.map((estimate) => {
      const seroprevalenceFromAirtable = estimate.airtableRawSeroprevalence ? estimate.airtableRawSeroprevalence / 100 : undefined;
      const calculatedSeroprevalence = (estimate.denominatorValue !== undefined && estimate.numeratorValue) ? (
        estimate.denominatorValue > 0 ? estimate.numeratorValue / estimate.denominatorValue : 0
      ) : undefined;

      return {
        ...estimate,
        seroprevalence: seroprevalenceFromAirtable ?? calculatedSeroprevalence ?? undefined,
      }
    }),
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
}