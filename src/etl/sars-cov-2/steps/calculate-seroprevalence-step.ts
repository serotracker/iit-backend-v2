import { MongoClient } from "mongodb";
import { parse } from "date-fns";
import { EstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep, StructuredPositiveCaseDataAfterTransformingNotReportedValuesToUndefinedStep, StructuredVaccinationDataAfterTransformingNotReportedValuesToUndefinedStep, StudyFieldsAfterTransformingNotReportedValuesToUndefinedStep } from "./transform-not-reported-values-to-undefined-step.js";
import {
  EstimateFieldsAfterParsingDatesStep,
  StructuredPositiveCaseDataAfterParsingDatesStep,
  StructuredVaccinationDataAfterParsingDatesStep,
  StudyFieldsAfterParsingDatesStep
} from "./parse-dates-step.js";

export type EstimateFieldsAfterCalculatingSeroprevalenceStep = EstimateFieldsAfterParsingDatesStep & {
  seroprevalence: number;
};
export type StudyFieldsAfterCalculatingSeroprevalenceStep = StudyFieldsAfterParsingDatesStep;
export type StructuredVaccinationDataAfterCalculatingSeroprevalenceStep = StructuredVaccinationDataAfterParsingDatesStep;
export type StructuredPositiveCaseDataAfterCalculatingSeroprevalenceStep = StructuredPositiveCaseDataAfterParsingDatesStep;

interface CalculateSeroprevalenceStepInput {
  allEstimates: EstimateFieldsAfterParsingDatesStep[];
  allStudies: StudyFieldsAfterParsingDatesStep[];
  vaccinationData: StructuredVaccinationDataAfterParsingDatesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterParsingDatesStep;
  mongoClient: MongoClient;
}

interface CalculateSeroprevalenceStepOutput {
  allEstimates: EstimateFieldsAfterCalculatingSeroprevalenceStep[];
  allStudies: StudyFieldsAfterCalculatingSeroprevalenceStep[];
  vaccinationData: StructuredVaccinationDataAfterCalculatingSeroprevalenceStep;
  positiveCaseData: StructuredPositiveCaseDataAfterCalculatingSeroprevalenceStep;
  mongoClient: MongoClient;
}

export const calculateSeroprevalenceStep = (input: CalculateSeroprevalenceStepInput): CalculateSeroprevalenceStepOutput => {
  console.log(
    `Running step: calculateSeroprevalenceStep. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates.map((estimate) => ({
      ...estimate,
      seroprevalence: estimate.denominatorValue > 0 ? estimate.numeratorValue / estimate.denominatorValue : 0,
    })),
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    mongoClient: input.mongoClient
  };
}