export interface AirtableSourceFields {
  "First author name": string;
  "DOI/url": string;
  "Source type": string;
  "Institution": string;
}

export interface AirtableMersEstimateFields {
  id: string;
}

export type StructuredYearlyCamelPopulationByCountryData = Array<{
  threeLetterCountryCode: string,
  data: Array<{
    year: number;
    data: Array<{
      camelCount: number;
      note: string;
    }>
  }>
}>;

export type StructuredCountryPopulationDataPoint = {
  threeLetterCountryCode: string,
  data: Array<{
    year: number,
    populationEstimate: number
  }>
}