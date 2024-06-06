import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterCombiningEstimatesAndStudiesStep,
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

interface FilterStudiesThatDoNotMeetDataStructureRequirementsInput {
  allEstimates: EstimateFieldsAfterCombiningEstimatesAndStudiesStep[];
  allStudies: StudyFieldsAfterCombiningEstimatesAndStudiesStep[];
  vaccinationData: StructuredVaccinationDataAfterCombiningEstimatesAndStudiesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterCombiningEstimatesAndStudiesStep;
  mongoClient: MongoClient;
}

interface FilterStudiesThatDoNotMeetDataStructureRequirementsOutput {
  allEstimates: EstimateFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep[];
  allStudies: StudyFieldsAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep[];
  vaccinationData: StructuredVaccinationDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFilteringStudiesThatDoNotMeetDataStructureRequirementsStep;
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
    mongoClient: input.mongoClient
  };
};
