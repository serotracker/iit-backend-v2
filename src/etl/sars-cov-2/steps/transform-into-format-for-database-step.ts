import { ObjectId, MongoClient } from "mongodb";
import { Month, SarsCov2CountryDataDocument, SarsCov2EstimateDocument } from "../../../storage/types.js";
import {
  ConsolidatedCountryDataAfterAddingCountryPopulationDataStep,
  CountryFieldsAfterAddingCountryPopulationDataStep,
  EstimateFieldsAfterAddingCountryPopulationDataStep,
  StructuredCountryPopulationDataAfterAddingCountryPopulationDataStep,
  StructuredPositiveCaseDataAfterAddingCountryPopulationDataStep,
  StructuredVaccinationDataAfterAddingCountryPopulationDataStep,
  StudyFieldsAfterAddingCountryPopulationDataStep
} from "./add-country-population-data-to-estimate-step.js";

export type EstimateFieldsAfterTransformingFormatForDatabaseStep = SarsCov2EstimateDocument;
export type StudyFieldsAfterTransformingFormatForDatabaseStep = StudyFieldsAfterAddingCountryPopulationDataStep;
export type CountryFieldsAfterTransformingFormatForDatabaseStep = CountryFieldsAfterAddingCountryPopulationDataStep;
export type StructuredVaccinationDataAfterTransformingFormatForDatabaseStep = StructuredVaccinationDataAfterAddingCountryPopulationDataStep;
export type StructuredPositiveCaseDataAfterTransformingFormatForDatabaseStep = StructuredPositiveCaseDataAfterAddingCountryPopulationDataStep;
export type StructuredCountryPopulationDataAfterTransformingFormatForDatabaseStep = StructuredCountryPopulationDataAfterAddingCountryPopulationDataStep;
export type ConsolidatedCountryDataAfterTransformingFormatForDatabaseStep = SarsCov2CountryDataDocument;

interface TransformIntoFormatForDatabaseStepInput {
  allEstimates: EstimateFieldsAfterAddingCountryPopulationDataStep[];
  allStudies: StudyFieldsAfterAddingCountryPopulationDataStep[];
  allCountries: CountryFieldsAfterAddingCountryPopulationDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingCountryPopulationDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingCountryPopulationDataStep;
  countryPopulationData: StructuredCountryPopulationDataAfterAddingCountryPopulationDataStep;
  consolidatedCountryData: ConsolidatedCountryDataAfterAddingCountryPopulationDataStep[];
  mongoClient: MongoClient;
}

interface TransformIntoFormatForDatabaseStepOutput {
  allEstimates: EstimateFieldsAfterTransformingFormatForDatabaseStep[];
  allStudies: StudyFieldsAfterTransformingFormatForDatabaseStep[];
  allCountries: CountryFieldsAfterTransformingFormatForDatabaseStep[];
  vaccinationData: StructuredVaccinationDataAfterTransformingFormatForDatabaseStep;
  positiveCaseData: StructuredPositiveCaseDataAfterTransformingFormatForDatabaseStep;
  countryPopulationData: StructuredCountryPopulationDataAfterTransformingFormatForDatabaseStep;
  consolidatedCountryData: ConsolidatedCountryDataAfterTransformingFormatForDatabaseStep[];
  mongoClient: MongoClient;
}

export const transformIntoFormatForDatabaseStep = (
  input: TransformIntoFormatForDatabaseStepInput
): TransformIntoFormatForDatabaseStepOutput => {
  console.log(`Running step: transformIntoFormatForDatabaseStep. Remaining estimates: ${input.allEstimates.length}`);

  const createdAtForAllRecords = new Date();
  const updatedAtForAllRecords = createdAtForAllRecords;

  const monthNumberToMonthEnumMap: Record<number, Month | undefined> = {
    1: Month.JANUARY,
    2: Month.FEBRUARY,
    3: Month.MARCH,
    4: Month.APRIL,
    5: Month.MAY,
    6: Month.JUNE,
    7: Month.JULY,
    8: Month.AUGUST,
    9: Month.SEPTEMBER,
    10: Month.OCTOBER,
    11: Month.NOVEMBER,
    12: Month.DECEMBER,
  }

  return {
    allEstimates: input.allEstimates.map((estimate) => ({
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
    allCountries: input.allCountries,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    consolidatedCountryData: input.consolidatedCountryData.map((countryDataPoint) => ({
      _id: new ObjectId(),
      population: countryDataPoint.countryPopulation,
      peopleVaccinatedPerHundred: countryDataPoint.countryPeopleVaccinatedPerHundred,
      peopleFullyVaccinatedPerHundred: countryDataPoint.countryPeopleFullyVaccinatedPerHundred,
      positiveCasesPerMillionPeople: countryDataPoint.countryPositiveCasesPerMillionPeople,
      alphaTwoCode: countryDataPoint.alphaTwoCode,
      alphaThreeCode: countryDataPoint.alphaThreeCode,
      month: monthNumberToMonthEnumMap[countryDataPoint.month],
      year: countryDataPoint.year,
      createdAt: createdAtForAllRecords,
      updatedAt: createdAtForAllRecords
    })).filter((countryDataPoint): countryDataPoint is Omit<typeof countryDataPoint, 'month'> & {
      month: NonNullable<typeof countryDataPoint['month']>
    } => !!countryDataPoint.month),
    mongoClient: input.mongoClient
  };
};
