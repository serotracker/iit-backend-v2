export type AirtableEstimateFields = {
  "id": string;
  "Unique ID": string | undefined;
  "Study Design": string | undefined;
  "Inclusion Criteria": string | undefined;
  "Exclusion Criteria": string | undefined;
  Age: string | undefined;
  "Age Minimum": number | undefined;
  "Age Maximum": number | undefined;
  Sex: string | undefined;
  "Sample Frame": string | undefined;
  "Sample Frame - Description": string | undefined;
  "Sampling Method": string | undefined;
  Pathogen: string;
  Antibody: string[] | undefined;
  Antigen: string | undefined;
  "Source Sheet": string[] | undefined;
  'Estimate Type': string | undefined;
  "Pediatric age group": string | undefined;
  Producer: string | undefined;
  "Producer - Other": string | undefined;
  "Assay Type": Array<string | undefined> | undefined | null;
  "Assay - Other": string | undefined;
  "Sample Start Date": `${number}-${number}-${number}` | undefined;
  "Sample End Date": `${number}-${number}-${number}` | undefined;
  "Sample Size (Denominator)": number | undefined;
  "Serotype": string[] | undefined;
  Prevalence: number | undefined;
  "Prevalence 95% CI Lower": number | undefined;
  "Prevalence 95% CI Upper": number | undefined;
  "Prevalence 95% CI Lower (formula)": number | undefined;
  "Prevalence 95% CI Upper (formula)": number | undefined;
  "Subgroups Available": string[] | undefined;
  Continent: string | undefined;
  "Country": string[] | undefined;
  "Sample Numerator": number | undefined;
  URL: string[] | undefined;
  "Age group": string | undefined;
  City: string | undefined;
  "State/Province": string | undefined;
  "ETL Included": 0 | 1 | undefined;
  "Publication Date": unknown[] | undefined;
  "First Author Last Name": unknown[] | undefined;
  "WHO Region": string[] | undefined;
  "Study Population (OROV only)": string | undefined;
  "Study Species (OROV only)": string | undefined;
  'Grouping Variable': string | undefined;
  'Subsetting Variable': string | undefined;
} & Record<string, never>;

export type AirtableSourceFields = {
  "id": string;
  "Source Title": string | undefined;
  "First Author": string | undefined;
  "Publication Date": `${number}-${number}-${number}` | undefined;
  URL: string | undefined;
  "Unique ID": string[] | undefined;
  Extractor: string | undefined;
  "First Author Last Name": string | undefined;
} & Record<string, never>;

export type AirtableCountryFields = {
  "id": string;
  "Country": string;
  "Alpha3 Code": string;
  "Alpha2 Code": string;
}