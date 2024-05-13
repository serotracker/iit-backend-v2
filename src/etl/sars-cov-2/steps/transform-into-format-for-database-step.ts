import { ObjectId, MongoClient } from "mongodb";
import { SarsCov2EstimateDocument } from "../../../storage/types.js";
import { 
  EstimateFieldsAfterAddingPositiveCaseDataStep,
  StructuredPositiveCaseDataAfterAddingPositiveCaseDataStep,
  StructuredVaccinationDataAfterAddingPositiveCaseDataStep,
  StudyFieldsAfterAddingPositiveCaseDataStep
} from "./add-positive-case-data-to-estimate-step.js";

export type StudyFieldsAfterTransformingFormatForDatabaseStep = StudyFieldsAfterAddingPositiveCaseDataStep;
export type StructuredVaccinationDataAfterTransformingFormatForDatabaseStep = StructuredVaccinationDataAfterAddingPositiveCaseDataStep;
export type StructuredPositiveCaseDataAfterTransformingFormatForDatabaseStep = StructuredPositiveCaseDataAfterAddingPositiveCaseDataStep;

interface TransformIntoFormatForDatabaseStepInput {
  allEstimates: EstimateFieldsAfterAddingPositiveCaseDataStep[];
  allStudies: StudyFieldsAfterAddingPositiveCaseDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingPositiveCaseDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingPositiveCaseDataStep;
  mongoClient: MongoClient;
}

interface TransformIntoFormatForDatabaseStepOutput {
  allEstimates: SarsCov2EstimateDocument[];
  allStudies: StudyFieldsAfterTransformingFormatForDatabaseStep[];
  vaccinationData: StructuredVaccinationDataAfterTransformingFormatForDatabaseStep;
  positiveCaseData: StructuredPositiveCaseDataAfterTransformingFormatForDatabaseStep;
  mongoClient: MongoClient;
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
      studyName: estimate.studyName,
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
      publicationDate: estimate.publicationDate,
      countryPeopleVaccinatedPerHundred: estimate.countryPeopleVaccinatedPerHundred,
      countryPeopleFullyVaccinatedPerHundred: estimate.countryPeopleFullyVaccinatedPerHundred,
      countryPositiveCasesPerMillionPeople: estimate.countryPositiveCasesPerMillionPeople,
      createdAt: createdAtForAllRecords,
      updatedAt: updatedAtForAllRecords,
    })),
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    mongoClient: input.mongoClient
  };
};
