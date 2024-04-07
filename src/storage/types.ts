import { Document, ObjectId } from "mongodb";

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