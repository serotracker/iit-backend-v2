export interface AirtableSourceFields {
  id: string,
  "First author name": string,
  "DOI/url": string,
  "Source type": string,
  "Source title": string,
  "Institution": string | null,
  "Country": string[],
  "Population type": string[],
  "Publication year": number,
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
  'Socioeconomic status': string | null;
  'Exposure to camels': string | null;
  'Prevalence Estimate Name': string;
  'Population Type': string;
  'Estimate Type': string;
  'Age Group (Human)': Array<string | null>;
  'Age Group (Animal)': Array<string | null>;
  'State/Province': string | null;
  'District': string | null;
  'City': string | null;
  'Country': Array<string | null>;
  'Study': Array<string | null>;
  'Prevalence': number;
  'Denominator': number | null;
  'Numerator': number | null;
  'Prevalence 95% CI Lower': number | null;
  'Prevalence 95% CI Lower (calculated)': number;
  'Prevalence 95% CI Upper': number | null;
  'Prevalence 95% CI Upper (calculated)': number;
  'Sensitivity': number | null;
  'Sensitivity, 95% CI Lower': number | null;
  'Sensitivity, 95% CI Upper': number | null;
  'Sensitivity Denominator': number | null;
  'Specificity': number | null;
  'Specificity, 95% CI Lower': number | null;
  'Specificity, 95% CI Upper': number | null;
  'Specificity Denominator': number | null;
  'Age Minimum': number | null;
  'Age Maximum': number | null;
  'Isotype(s)': Array<string | null>;
  'Antigen or gene': Array<string | null>;
  'Assay Type': Array<string | null>;
  'Animal type': Array<string | null>;
  'Sample Frame (Animal)': Array<string | null>;
  'Animal purpose': string | null;
  'Imported or Local': Array<string | null>;
  'Country of Import': Array<string | null>;
  'Country of travel': Array<string | null>;
  'Sample Frame (Human)': string | null;
  'Producer': Array<string | null>;
  'Producer - Other': string | null;
  'Test Validation': Array<string | null>;
  'Species Test Validated On': string | null;
  'Positive Cut-off': string | null;
  'Geographic scope': string | null;
  'Sampling Method': string | null;
  'Specimen Type': Array<string | null>;
  'Sample End Date': string | null;
  'Sample Start Date': string | null;
  'Symptom Prevalence of Positives': number | null;
  'Symptom definition': string | null;
  'Species': string | null;
  'Sequencing done': boolean;
  'Clade': Array<string | null>;
  'Accession numbers': string | null;
  'Genome coverage': Array<string | null>;
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