export interface AirtableSourceFields {
  id: string,
  "First author name": string,
  "DOI/url": string,
  "Source type": string,
  "Source title": string,
  "Institution": string,
  "Country": string[],
  "Population type": string[],
  "seropositive (1/0)": string | null,
  "PCR positive (1/0)": string | null
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