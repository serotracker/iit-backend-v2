export interface AirtableSourceFields {
  id: string,
  "First author name": string,
  "DOI/url": string,
  "Source type": string,
  "Source title": string,
  "Institution": string | null,
  "Country": string[],
  "Population type": string[],
  "seropositive (1/0)": string | null,
  "PCR positive (1/0)": string | null
}

export interface AirtableStudyFields {
  id: string;
  'Inclusion Criteria': string | null;
  'Exclusion Criteria': string | null;
  'Source Sheet': Array<string | null>;
}

export interface AirtableCountryFields {
  id: string;
  'Country': string;
  'Alpha3 Code': string;
  'Alpha2 Code': string;
}

export interface AirtableMersEstimateFields {
  id: string;
  'Sub-grouping variable': string;
  'Sub-group specific category': string | null;
  'Sex': string | null;
  'Prevalence Estimate Name': string;
  'Population Type': string;
  'Estimate Type': string;
  'Age Group (Human)': Array<string | null>;
  'Age Group (Animal)': Array<string | null>;
  'State/Province': string | null;
  'City': string | null;
  'Country': Array<string | null>;
  'Study': Array<string | null>;
  'Prevalence': number;
  'Denominator': number | null;
  'Numerator': number | null;
  'Prevalence 95% CI Lower': number | null;
  'Prevalence 95% CI Upper': number | null;
  'Sensitivity': number | null;
  'Sensitivity, 95% CI Lower': number | null;
  'Sensitivity, 95% CI Upper': number | null;
  'Sensitivity Denominator': number | null;
  'Specificity': number | null;
  'Specificity, 95% CI Lower': number | null;
  'Specificity, 95% CI Upper': number | null;
  'Specificity Denominator': number | null;
  'Isotype(s)': Array<string | null>;
  'Assay Type': Array<string | null>;
  'Animal type': Array<string | null>;
  'Sample Frame (Animal)': Array<string | null>;
  'Animal purpose': string | null;
  'Imported or Local': Array<string | null>;
  'Country of Import': Array<string | null>;
  'Sample Frame (Human)': string | null;
  'Producer': Array<string | null>;
  'Test Validation': Array<string | null>;
  'Geographic scope': string | null;
  'Sampling Method': string | null;
  'Specimen Type': string | null;
  'Sample End Date': string | null;
  'Sample Start Date': string | null;
  'Species': string | null;
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