import { ObjectId, MongoClient } from "mongodb";
import { SarsCov2CountryDataDocument, SarsCov2EstimateDocument } from "../../../storage/types.js";
import {
  EstimateFieldsAfterAddingCountryPopulationDataStep,
  StructuredCountryPopulationDataAfterAddingCountryPopulationDataStep,
  StructuredPositiveCaseDataAfterAddingCountryPopulationDataStep,
  StructuredVaccinationDataAfterAddingCountryPopulationDataStep,
  StudyFieldsAfterAddingCountryPopulationDataStep
} from "./add-country-population-data-to-estimate-step.js";

export type EstimateFieldsAfterTransformingFormatForDatabaseStep = SarsCov2EstimateDocument;
export type StudyFieldsAfterTransformingFormatForDatabaseStep = StudyFieldsAfterAddingCountryPopulationDataStep;
export type StructuredVaccinationDataAfterTransformingFormatForDatabaseStep = StructuredVaccinationDataAfterAddingCountryPopulationDataStep;
export type StructuredPositiveCaseDataAfterTransformingFormatForDatabaseStep = StructuredPositiveCaseDataAfterAddingCountryPopulationDataStep;
export type StructuredCountryPopulationDataAfterTransformingFormatForDatabaseStep = StructuredCountryPopulationDataAfterAddingCountryPopulationDataStep;
export type ConsolidatedCountryDataAfterTransformingFormatForDatabaseStep = SarsCov2CountryDataDocument;

interface TransformIntoFormatForDatabaseStepInput {
  allEstimates: EstimateFieldsAfterAddingCountryPopulationDataStep[];
  allStudies: StudyFieldsAfterAddingCountryPopulationDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingCountryPopulationDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingCountryPopulationDataStep;
  countryPopulationData: StructuredCountryPopulationDataAfterAddingCountryPopulationDataStep;
  mongoClient: MongoClient;
}

interface TransformIntoFormatForDatabaseStepOutput {
  allEstimates: EstimateFieldsAfterTransformingFormatForDatabaseStep[];
  allStudies: StudyFieldsAfterTransformingFormatForDatabaseStep[];
  vaccinationData: StructuredVaccinationDataAfterTransformingFormatForDatabaseStep;
  positiveCaseData: StructuredPositiveCaseDataAfterTransformingFormatForDatabaseStep;
  countryPopulationData: StructuredCountryPopulationDataAfterTransformingFormatForDatabaseStep;
  consolidatedCountryData: ConsolidatedCountryDataAfterTransformingFormatForDatabaseStep[];
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
      denominatorValue: estimate.denominatorValue,
      numeratorValue: estimate.numeratorValue,
      seroprevalence: estimate.seroprevalence,
      estimateName: estimate.estimateName,
      url: estimate.url,
      countryPopulation: estimate.countryPopulation,
      createdAt: createdAtForAllRecords,
      updatedAt: updatedAtForAllRecords,
    })),
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    consolidatedCountryData: [],
    mongoClient: input.mongoClient
  };
};
