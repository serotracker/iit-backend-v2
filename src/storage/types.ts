import { Document, ObjectId } from "mongodb";
import { WHORegion } from "../lib/who-regions";
import { UNRegion } from "../lib/un-regions";
import { GBDSubRegion, GBDSuperRegion } from "../lib/gbd-regions";

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
  pathogen: string;
  pediatricAgeGroup: string | undefined;
  seroprevalence: number | undefined;
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
  unRegion: string | undefined;
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
  denominatorValue: number | undefined;
  numeratorValue: number | undefined;
  seroprevalence: number | undefined;
  estimateName: string | undefined;
  url: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export enum CachedMapboxApiResponseStatus {
  SUCCESSFUL_RESPONSE = "SUCCESSFUL_RESPONSE",
  FAILED_RESPONSE = "FAILED_RESPONSE",
}

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