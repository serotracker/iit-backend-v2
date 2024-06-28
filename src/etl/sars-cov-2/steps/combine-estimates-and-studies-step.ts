import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterRemovingNonPrimaryEstimatesStep,
  EstimateFieldsAfterRemovingNonPrimaryEstimatesStep,
  StructuredCountryPopulationDataAfterRemovingNonPrimaryEstimatesStep,
  StructuredPositiveCaseDataAfterRemovingNonPrimaryEstimatesStep,
  StructuredVaccinationDataAfterRemovingNonPrimaryEstimatesStep,
  StudyFieldsAfterRemovingNonPrimaryEstimatesStep
} from "./remove-non-primary-estimates-step.js";

export type EstimateFieldsAfterCombiningEstimatesAndStudiesStep = EstimateFieldsAfterRemovingNonPrimaryEstimatesStep & {studyName: string | undefined};
export type StudyFieldsAfterCombiningEstimatesAndStudiesStep = StudyFieldsAfterRemovingNonPrimaryEstimatesStep;
export type CountryFieldsAfterCombiningEstimatesAndStudiesStep =
  CountryFieldsAfterRemovingNonPrimaryEstimatesStep;
export type StructuredVaccinationDataAfterCombiningEstimatesAndStudiesStep =
  StructuredVaccinationDataAfterRemovingNonPrimaryEstimatesStep;
export type StructuredPositiveCaseDataAfterCombiningEstimatesAndStudiesStep =
  StructuredPositiveCaseDataAfterRemovingNonPrimaryEstimatesStep;
export type StructuredCountryPopulationDataAfterCombiningEstimatesAndStudiesStep =
  StructuredCountryPopulationDataAfterRemovingNonPrimaryEstimatesStep;

interface CombineEstimatesAndStudiesInput {
  allEstimates: EstimateFieldsAfterRemovingNonPrimaryEstimatesStep[];
  allStudies: StudyFieldsAfterRemovingNonPrimaryEstimatesStep[];
  allCountries: CountryFieldsAfterRemovingNonPrimaryEstimatesStep[];
  vaccinationData: StructuredVaccinationDataAfterRemovingNonPrimaryEstimatesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterRemovingNonPrimaryEstimatesStep;
  countryPopulationData: StructuredCountryPopulationDataAfterRemovingNonPrimaryEstimatesStep;
  mongoClient: MongoClient;
}

interface CombineEstimatesAndStudiesOutput {
  allEstimates: EstimateFieldsAfterCombiningEstimatesAndStudiesStep[];
  allStudies: StudyFieldsAfterCombiningEstimatesAndStudiesStep[];
  allCountries: CountryFieldsAfterCombiningEstimatesAndStudiesStep[];
  vaccinationData: StructuredVaccinationDataAfterCombiningEstimatesAndStudiesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterCombiningEstimatesAndStudiesStep;
  countryPopulationData: StructuredCountryPopulationDataAfterCombiningEstimatesAndStudiesStep;
  mongoClient: MongoClient;
}

export const combineEstimatesAndStudies = (
  input: CombineEstimatesAndStudiesInput
): CombineEstimatesAndStudiesOutput => {
  console.log(
    `Running step: combineEstimatesAndStudies. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates.map((estimate) => {
      const associatedStudy = input.allStudies.find((study) => study.id === estimate.studyId);

      if(!associatedStudy) {
        return {
          ...estimate,
          studyName: undefined
        }
      }

      return {
        ...estimate,
        studyName: associatedStudy.studyName
      }
    }),
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
