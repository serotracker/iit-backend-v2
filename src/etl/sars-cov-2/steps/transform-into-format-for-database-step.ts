import { ObjectId } from "mongodb";
import { SarsCov2EstimateDocument } from "../../../storage/types.js";
import { 
  EstimateFieldsAfterAddingPositiveCaseDataStep,
  StructuredPositiveCaseDataAfterAddingPositiveCaseDataStep,
  StructuredVaccinationDataAfterAddingPositiveCaseDataStep
} from "./add-positive-case-data-to-estimate-step.js";

export type StructuredVaccinationDataAfterTransformingFormatForDatabaseStep = StructuredVaccinationDataAfterAddingPositiveCaseDataStep;
export type StructuredPositiveCaseDataAfterTransformingFormatForDatabaseStep = StructuredPositiveCaseDataAfterAddingPositiveCaseDataStep;

interface TransformIntoFormatForDatabaseStepInput {
  allEstimates: EstimateFieldsAfterAddingPositiveCaseDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingPositiveCaseDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingPositiveCaseDataStep;
}

interface TransformIntoFormatForDatabaseStepOutput {
  allEstimates: SarsCov2EstimateDocument[];
  vaccinationData: StructuredVaccinationDataAfterTransformingFormatForDatabaseStep;
  positiveCaseData: StructuredPositiveCaseDataAfterTransformingFormatForDatabaseStep;
}

export const transformIntoFormatForDatabaseStep = (
  input: TransformIntoFormatForDatabaseStepInput
): TransformIntoFormatForDatabaseStepOutput => {
  const { allEstimates } = input;

  console.log(
    `Running step: transformIntoFormatForDatabaseStep. Remaining estimates: ${input.allEstimates.length}`
  );

  const createdAtForAllRecords = new Date();
  const updatedAtForAllRecords = createdAtForAllRecords;

  return {
    allEstimates: allEstimates.map((estimate) => ({
      _id: new ObjectId(),
      antibodies: estimate.antibodies,
      isotypes: estimate.isotypes,
      isWHOUnityAligned: estimate.isWHOUnityAligned,
      testType: estimate.testType,
      riskOfBias: estimate.riskOfBias,
      ageGroup: estimate.ageGroup,
      sex: estimate.sex,
      sourceType: estimate.sourceType,
      populationGroup: estimate.populationGroup,
      latitude: estimate.latitude,
      longitude: estimate.longitude,
      country: estimate.country,
      countryAlphaTwoCode: estimate.countryAlphaTwoCode,
      countryAlphaThreeCode: estimate.countryAlphaThreeCode,
      whoRegion: estimate.whoRegion,
      unRegion: estimate.unRegion,
      gbdSuperRegion: estimate.gbdSuperRegion,
      gbdSubRegion: estimate.gbdSubRegion,
      state: estimate.state,
      county: estimate.county,
      city: estimate.city,
      scope: estimate.scope,
      samplingStartDate: estimate.samplingStartDate,
      samplingEndDate: estimate.samplingEndDate,
      samplingMidDate: estimate.samplingMidDate,
      countryPeopleVaccinatedPerHundred: estimate.countryPeopleVaccinatedPerHundred,
      countryPeopleFullyVaccinatedPerHundred: estimate.countryPeopleFullyVaccinatedPerHundred,
      countryPositiveCasesPerMillionPeople: estimate.countryPositiveCasesPerMillionPeople,
      createdAt: createdAtForAllRecords,
      updatedAt: updatedAtForAllRecords,
    })),
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
  };
};