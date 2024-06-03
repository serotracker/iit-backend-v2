import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterCombiningEstimatesAndStudiesStep,
  StructuredCountryPopulationDataAfterAfterCombiningEstimatesAndStudiesStep,
  StructuredPositiveCaseDataAfterAfterCombiningEstimatesAndStudiesStep,
  StructuredVaccinationDataAfterAfterCombiningEstimatesAndStudiesStep,
  StudyFieldsAfterCombiningEstimatesAndStudiesStep
} from "./combine-estimates-and-studies-step.js";

export type EstimateFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep =
  Omit<
    EstimateFieldsAfterCombiningEstimatesAndStudiesStep,
    "country" | "countryAlphaThreeCode" | "studyName"
  > & { country: string; countryAlphaThreeCode: string, studyName: string };
export type StudyFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep =
  StudyFieldsAfterCombiningEstimatesAndStudiesStep;
export type StructuredVaccinationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep =
  StructuredVaccinationDataAfterAfterCombiningEstimatesAndStudiesStep;
export type StructuredPositiveCaseDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep =
  StructuredPositiveCaseDataAfterAfterCombiningEstimatesAndStudiesStep;
export type StructuredCountryPopulationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep =
  StructuredCountryPopulationDataAfterAfterCombiningEstimatesAndStudiesStep;

interface FilterStudiesThatDoNotMeetDataStructureRequirementsInput {
  allEstimates: EstimateFieldsAfterCombiningEstimatesAndStudiesStep[];
  allStudies: StudyFieldsAfterCombiningEstimatesAndStudiesStep[];
  vaccinationData: StructuredVaccinationDataAfterAfterCombiningEstimatesAndStudiesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAfterCombiningEstimatesAndStudiesStep;
  countryPopulationData: StructuredCountryPopulationDataAfterAfterCombiningEstimatesAndStudiesStep;
  mongoClient: MongoClient;
}

interface FilterStudiesThatDoNotMeetDataStructureRequirementsOutput {
  allEstimates: EstimateFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep[];
  allStudies: StudyFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep[];
  vaccinationData: StructuredVaccinationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
  countryPopulationData: StructuredCountryPopulationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
  mongoClient: MongoClient;
}

export const filterStudiesThatDoNotMeetDataStructureRequirement = (
  input: FilterStudiesThatDoNotMeetDataStructureRequirementsInput
): FilterStudiesThatDoNotMeetDataStructureRequirementsOutput => {
  console.log(
    `Running step: filterStudiesThatDoNotMeetDataStructureRequirement. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates.filter(
      (
        estimate
      ): estimate is EstimateFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep =>
        !!estimate.country
        && !!estimate.countryAlphaThreeCode
        && !!estimate.studyName
    ),
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
