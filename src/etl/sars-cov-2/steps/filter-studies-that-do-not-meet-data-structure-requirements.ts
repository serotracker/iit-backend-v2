import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterCombiningEstimatesAndStudiesStep,
  StructuredCountryPopulationDataAfterCombiningEstimatesAndStudiesStep,
  StructuredPositiveCaseDataAfterCombiningEstimatesAndStudiesStep,
  StructuredVaccinationDataAfterCombiningEstimatesAndStudiesStep,
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
  StructuredVaccinationDataAfterCombiningEstimatesAndStudiesStep;
export type StructuredPositiveCaseDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep =
  StructuredPositiveCaseDataAfterCombiningEstimatesAndStudiesStep;
export type StructuredCountryPopulationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep =
  StructuredCountryPopulationDataAfterCombiningEstimatesAndStudiesStep;

interface FilterStudiesThatDoNotMeetDataStructureRequirementsInput {
  allEstimates: EstimateFieldsAfterCombiningEstimatesAndStudiesStep[];
  allStudies: StudyFieldsAfterCombiningEstimatesAndStudiesStep[];
  vaccinationData: StructuredVaccinationDataAfterCombiningEstimatesAndStudiesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterCombiningEstimatesAndStudiesStep;
  countryPopulationData: StructuredCountryPopulationDataAfterCombiningEstimatesAndStudiesStep;
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
