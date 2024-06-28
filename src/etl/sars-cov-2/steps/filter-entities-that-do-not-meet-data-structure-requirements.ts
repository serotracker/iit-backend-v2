import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterCombiningEstimatesAndStudiesStep,
  EstimateFieldsAfterCombiningEstimatesAndStudiesStep,
  StructuredCountryPopulationDataAfterCombiningEstimatesAndStudiesStep,
  StructuredPositiveCaseDataAfterCombiningEstimatesAndStudiesStep,
  StructuredVaccinationDataAfterCombiningEstimatesAndStudiesStep,
  StudyFieldsAfterCombiningEstimatesAndStudiesStep
} from "./combine-estimates-and-studies-step.js";

export type EstimateFieldsAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep =
  Omit<
    EstimateFieldsAfterCombiningEstimatesAndStudiesStep,
    "country" | "countryAlphaThreeCode" | "studyName"
  > & { country: string; countryAlphaThreeCode: string, studyName: string };
export type StudyFieldsAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep =
  StudyFieldsAfterCombiningEstimatesAndStudiesStep;
export type CountryFieldsAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep =
  Omit<
    CountryFieldsAfterCombiningEstimatesAndStudiesStep,
    'alphaThreeCode' | 'alphaTwoCode'
  > & { alphaThreeCode: string, alphaTwoCode: string };
export type StructuredVaccinationDataAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep =
  StructuredVaccinationDataAfterCombiningEstimatesAndStudiesStep;
export type StructuredPositiveCaseDataAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep =
  StructuredPositiveCaseDataAfterCombiningEstimatesAndStudiesStep;
export type StructuredCountryPopulationDataAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep =
  StructuredCountryPopulationDataAfterCombiningEstimatesAndStudiesStep;

interface FilterEntitiesThatDoNotMeetDataStructureRequirementsInput {
  allEstimates: EstimateFieldsAfterCombiningEstimatesAndStudiesStep[];
  allStudies: StudyFieldsAfterCombiningEstimatesAndStudiesStep[];
  allCountries: CountryFieldsAfterCombiningEstimatesAndStudiesStep[];
  vaccinationData: StructuredVaccinationDataAfterCombiningEstimatesAndStudiesStep;
  positiveCaseData: StructuredPositiveCaseDataAfterCombiningEstimatesAndStudiesStep;
  countryPopulationData: StructuredCountryPopulationDataAfterCombiningEstimatesAndStudiesStep;
  mongoClient: MongoClient;
}

interface FilterEntitiesThatDoNotMeetDataStructureRequirementsOutput {
  allEstimates: EstimateFieldsAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep[];
  allStudies: StudyFieldsAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep[];
  allCountries: CountryFieldsAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep[];
  vaccinationData: StructuredVaccinationDataAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep;
  countryPopulationData: StructuredCountryPopulationDataAfterFilteringEntitiesThatDoNotMeetDataStructureRequirementsStep;
  mongoClient: MongoClient;
}

export const filterEntitiesThatDoNotMeetDataStructureRequirement = (
  input: FilterEntitiesThatDoNotMeetDataStructureRequirementsInput
): FilterEntitiesThatDoNotMeetDataStructureRequirementsOutput => {
  console.log(
    `Running step: filterEntitiesThatDoNotMeetDataStructureRequirement. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates.filter((estimate): estimate is Omit<
      typeof estimate, 'country'|'countryAlphaThreeCode'|'studyName'
    > & {
      country: NonNullable<typeof estimate['country']>;
      countryAlphaThreeCode: NonNullable<typeof estimate['countryAlphaThreeCode']>;
      studyName: NonNullable<typeof estimate['studyName']>;
    } =>
      !!estimate.country
      && !!estimate.countryAlphaThreeCode
      && !!estimate.studyName
    ),
    allStudies: input.allStudies,
    allCountries: input.allCountries.filter((country): country is Omit<
      typeof country, 'alphaThreeCode'|'alphaTwoCode'
    > & {
      alphaThreeCode: NonNullable<typeof country['alphaThreeCode']>;
      alphaTwoCode: NonNullable<typeof country['alphaTwoCode']>;
    } => 
      !!country.alphaThreeCode
      && !!country.alphaTwoCode
    ),
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
