import { Document, ObjectId } from "mongodb";
import { WHORegion } from "../lib/who-regions";
import { UNRegion } from "../lib/un-regions";
import { GBDSubRegion, GBDSuperRegion } from "../lib/gbd-regions";
import { ThreeLetterIsoCountryCode, TwoLetterIsoCountryCode } from "../lib/geocoding-api/country-codes";

export enum Arbovirus {
  ZIKV = "ZIKV",
  DENV = "DENV",
  CHIKV = "CHIKV",
  YF = "YF",
  WNV = "WNV",
  MAYV = "MAYV"
}

export enum Month {
  JANUARY = "JANUARY",
  FEBRUARY = "FEBRUARY",
  MARCH = "MARCH",
  APRIL = "APRIL",
  MAY = "MAY",
  JUNE = "JUNE",
  JULY = "JULY",
  AUGUST = "AUGUST",
  SEPTEMBER = "SEPTEMBER",
  OCTOBER = "OCTOBER",
  NOVEMBER = "NOVEMBER",
  DECEMBER = "DECEMBER"
}

export const isArbovirus = (arbovirus: string): arbovirus is Arbovirus => Object.values(Arbovirus).some((element) => element === arbovirus);

export interface ArbovirusEstimateDocument {
  _id: ObjectId;
  sex: string | undefined;
  ageMinimum: number | undefined;
  ageMaximum: number | undefined;
  ageGroup: string | undefined;
  assayOther: string | undefined;
  producer: string | undefined;
  producerOther: string | undefined;
  sampleFrame: string | undefined;
  sameFrameTargetGroup: string | undefined;
  sampleSize: number;
  serotype: string[];
  sampleNumerator: number | undefined;
  inclusionCriteria: string | undefined;
  pathogen: Arbovirus;
  pediatricAgeGroup: string | undefined;
  seroprevalence: number;
  seroprevalenceStudy95CILower: number | undefined;
  seroprevalenceStudy95CIUpper: number | undefined;
  seroprevalenceCalculated95CILower: number | undefined;
  seroprevalenceCalculated95CIUpper: number | undefined;
  country: string;
  countryAlphaTwoCode: string;
  countryAlphaThreeCode: string;
  state: string | undefined;
  city: string | undefined;
  antibodies: string[] | undefined;
  latitude: number;
  longitude: number;
  sampleStartDate: Date | undefined;
  sampleEndDate: Date | undefined;
  assay: string | undefined;
  unRegion: UNRegion | undefined;
  url: string | undefined;
  sourceSheetId: string | undefined;
  antigen: string | undefined;
  whoRegion: string | undefined;
  sourceSheetName: string | undefined;
  estimateId: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMemberDocument {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string | undefined;
  twitterUrl: string | undefined;
  linkedinUrl: string | undefined;
  teams: Array<{
    label: string,
    sortOrder: number,
  }>;
  affiliations: Array<{
    label: string;
  }>;
  arbotrackerContributorFlag: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SarsCov2EstimateDocument {
  _id: ObjectId;
  riskOfBias: string | undefined;
  antibodies: string[];
  isotypes: string[];
  isWHOUnityAligned: boolean;
  testType: string[];
  ageGroup: string | undefined;
  sex: string | undefined;
  studyName: string;
  sourceType: string | undefined;
  populationGroup: string | undefined;
  latitude: number;
  longitude: number;
  whoRegion: WHORegion | undefined;
  unRegion: UNRegion | undefined;
  gbdSuperRegion: GBDSuperRegion | undefined;
  gbdSubRegion: GBDSubRegion | undefined;
  country: string;
  countryAlphaTwoCode: string;
  countryAlphaThreeCode: string;
  state: string | undefined;
  county: string | undefined;
  city: string | undefined;
  scope: string | undefined;
  samplingEndDate: Date | undefined;
  samplingStartDate: Date | undefined;
  samplingMidDate: Date | undefined;
  publicationDate: Date | undefined;
  countryPeopleVaccinatedPerHundred: number | undefined;
  countryPeopleFullyVaccinatedPerHundred: number | undefined;
  countryPositiveCasesPerMillionPeople: number | undefined;
  countryPopulation: number | undefined;
  denominatorValue: number | undefined;
  numeratorValue: number | undefined;
  seroprevalence: number | undefined;
  estimateName: string | undefined;
  partitionKey: number;
  url: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export interface SarsCov2CountryDataDocument {
  _id: ObjectId;
  population: number | undefined;
  peopleVaccinatedPerHundred: number | undefined;
  peopleFullyVaccinatedPerHundred: number | undefined;
  positiveCasesPerMillionPeople: number | undefined;
  alphaTwoCode: string;
  alphaThreeCode: string;
  whoRegion: WHORegion | undefined;
  unRegion: UNRegion | undefined;
  gbdSuperRegion: GBDSuperRegion | undefined;
  gbdSubRegion: GBDSubRegion | undefined;
  month: Month;
  year: number;
  partitionKey: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MersEstimateDocument {
  _id: ObjectId;
  country: string;
  countryAlphaTwoCode: string;
  countryAlphaThreeCode: string;
  whoRegion: WHORegion | undefined;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum MersDiagnosisStatus {
  CONFIRMED = "CONFIRMED",
  DENIED = "DENIED"
}

export enum MersDiagnosisSource {
  WORLD_ORGANISATION_FOR_ANIMAL_HEALTH = "WORLD_ORGANISATION_FOR_ANIMAL_HEALTH",
  WORLD_HEALTH_ORGANIZATION = "WORLD_HEALTH_ORGANIZATION",
  NATIONAL_AUTHORITIES = "NATIONAL_AUTHORITIES",
  PUBLICATIONS = "PUBLICATIONS",
  MEDIA = "MEDIA",
  FAO_FIELD_OFFICER = "FAO_FIELD_OFFICER"
}

export enum MersEventAnimalType {
  DOMESTIC = "DOMESTIC",
  WILD = "WILD"
}

export enum MersEventAnimalSpecies {
  CAMEL = "CAMEL",
  BAT = "BAT"
}

export enum MersEventType {
  HUMAN = "HUMAN",
  ANIMAL = "ANIMAL"
}

export enum CachedMapboxApiResponseStatus {
  SUCCESSFUL_RESPONSE = "SUCCESSFUL_RESPONSE",
  FAILED_RESPONSE = "FAILED_RESPONSE",
}

export interface FaoMersEventDocumentBase {
  _id: ObjectId;
  partitionKey: number;
  diagnosisStatus: MersDiagnosisStatus;
  diagnosisSource: MersDiagnosisSource;
  country: string;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
  observationDate: Date | undefined;
  reportDate: Date;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  countryAlphaThreeCode: ThreeLetterIsoCountryCode;
  whoRegion: WHORegion | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export type FaoMersAnimalEventDocument = FaoMersEventDocumentBase & {
  type: MersEventType.ANIMAL;
  animalType: MersEventAnimalType;
  animalSpecies: MersEventAnimalSpecies;
}

export type FaoMersHumanEventDocument = FaoMersEventDocumentBase & {
  type: MersEventType.HUMAN;
  humansAffected: number;
  humanDeaths: number;
}

export type FaoMersEventDocument =
  | FaoMersAnimalEventDocument
  | FaoMersHumanEventDocument;

interface CachedMapboxApiResponseDocumentBase {
  _id: ObjectId;
  mapboxSearchText: string;
  countryCode: string;
  geocoderDataType: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CachedMapboxApiSuccessResponseDocument extends CachedMapboxApiResponseDocumentBase {
  status: CachedMapboxApiResponseStatus.SUCCESSFUL_RESPONSE,
  centerCoordinates: {
    longitude: number;
    latitude: number;
  };
  boundingBox: {
    longitudeMinimum: number;
    latitudeMinimum: number;
    longitudeMaximum: number;
    latitudeMaximum: number;
  } | undefined;
  text: string | undefined;
  matchingText: string | undefined;
  regionName: string | undefined;
}

interface CachedMapboxApiFailureResponseDocument extends CachedMapboxApiResponseDocumentBase {
  status: CachedMapboxApiResponseStatus.FAILED_RESPONSE,
}

export type CachedMapboxApiResponseDocument = CachedMapboxApiSuccessResponseDocument | CachedMapboxApiFailureResponseDocument;