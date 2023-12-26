import { Document } from "mongodb";

export interface EstimateDocument extends Pick<Document, "_id"> {
  sex: string;
  ageMinimum: number;
  ageMaximum: number;
  ageGroup: string;
  assayOther: string;
  producer: string;
  producerOther: string;
  sampleFrame: string;
  sameFrameTargetGroup: string;
  sampleSize: number;
  sampleNumerator: number;
  inclusionCriteria: string;
  pathogen: string;
  seroprevalence: number;
  country: string;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
  sampleStartDate: Date;
  sampleEndDate: Date;
  assay: string;
  url: string;
  sourceSheetId: string;
  antigen: string;
  whoRegion: string;
  sourceSheetName: string | undefined;
  estimateId: string;
  createdAt: Date;
  updatedAt: Date;
}
