import { MongoClient } from "mongodb";
import { parse } from "date-fns";
import { EstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep, StructuredPositiveCaseDataAfterTransformingNotReportedValuesToUndefinedStep, StructuredVaccinationDataAfterTransformingNotReportedValuesToUndefinedStep, StudyFieldsAfterTransformingNotReportedValuesToUndefinedStep } from "./transform-not-reported-values-to-undefined-step.js";

export type EstimateFieldsAfterParsingDatesStep = Omit<EstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep, 'samplingEndDate' | 'samplingStartDate'> & {
  samplingStartDate: Date | undefined;
  samplingEndDate: Date | undefined;
  samplingMidDate: Date | undefined;
};
export type StudyFieldsAfterParsingDatesStep = StudyFieldsAfterTransformingNotReportedValuesToUndefinedStep;
export type StructuredVaccinationDataAfterParsingDatesStep = StructuredVaccinationDataAfterTransformingNotReportedValuesToUndefinedStep;
export type StructuredPositiveCaseDataAfterParsingDatesStep = StructuredPositiveCaseDataAfterTransformingNotReportedValuesToUndefinedStep;

interface ParseDatesStepInput {
  allEstimates: EstimateFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
  allStudies: StudyFieldsAfterTransformingNotReportedValuesToUndefinedStep[];
  vaccinationData: StructuredVaccinationDataAfterTransformingNotReportedValuesToUndefinedStep;
  positiveCaseData: StructuredPositiveCaseDataAfterTransformingNotReportedValuesToUndefinedStep;
  mongoClient: MongoClient;
}

interface ParseDatesStepOutput {
  allEstimates: EstimateFieldsAfterParsingDatesStep[];
  allStudies: StudyFieldsAfterParsingDatesStep[];
  vaccinationData: StructuredVaccinationDataAfterParsingDatesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterParsingDatesStep;
  mongoClient: MongoClient;
}

export const parseDatesStep = (input: ParseDatesStepInput): ParseDatesStepOutput => {
  console.log(
    `Running step: parseDatesStep. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates.map((estimate) => {
      const samplingStartDate = estimate.samplingStartDate ? parse(estimate.samplingStartDate, "yyyy-MM-dd", new Date()) : undefined;
      const samplingEndDate = estimate.samplingStartDate ? parse(estimate.samplingStartDate, "yyyy-MM-dd", new Date()) : undefined;
      const samplingMidDate = samplingEndDate && samplingStartDate ? new Date((samplingStartDate.getTime() + samplingEndDate.getTime()) / 2) : undefined;

      return {
        ...estimate,
        samplingStartDate,
        samplingEndDate,
        samplingMidDate, 
      };
    }),
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    mongoClient: input.mongoClient
  };
}