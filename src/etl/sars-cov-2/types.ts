export interface AirtableError {
  error: unknown;
};

export const isAirtableError = (input: unknown): input is AirtableError => {
  return (
    !!input &&
    typeof input === "object" &&
    "error" in input &&
    !!input["error"]
  );
};

export interface AirtableSarsCov2EstimateFields {
  id: string;
  "Alpha3 Code": Array<string>;
  "Source Type": Array<string | null>;
  "Overall Risk of Bias (JBI)": Array<string | null | AirtableError>;
  "Sample Frame (age)": string | null;
  "Sample Frame (sex)": string | null;
  "Sample Frame (groups of interest)": string | null;
  "ETL Included": number;
  Country: string | null;
  "State/Province": string | null;
  County: string | null;
  "Test Type": string | null;
  "Isotype(s) Reported": string | null | Array<string | null>;
  "UNITY: Criteria": Array<string | null | AirtableError>;
  "Antibody target": string | null | Array<string | null>;
  City: string | null;
  "Grade of Estimate Scope": string | null;
  "Sampling End Date": string | null;
  "Sampling Start Date": string | null;
}

export type StructuredVaccinationData = Array<{
  threeLetterCountryCode: string,
  data: {
    year: string,
    data: {
      month: string,
      data: {
        day: string,
        data: {
          totalVaccinationsPerHundred: number
        }
      }
    }
  }
}>

export type StructuredPositiveCaseData = Array<{
  twoLetterCountryCode: string,
  data: {
    year: string,
    data: {
      month: string,
      data: {
        day: string,
        data: {
          totalPositiveCasesPerHundred: number
        }
      }
    }
  }
}>