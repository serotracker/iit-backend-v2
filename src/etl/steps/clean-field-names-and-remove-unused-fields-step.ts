import { AirtableEstimateFields, AirtableSourceFields } from "../types";

export interface AirtableEstimateFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep {
  sourceSheetId: string[];
  estimateId: string;
  inclusionCriteria: string;
  sampleStartDate: `${number}-${number}-${number}`;
  sampleEndDate: `${number}-${number}-${number}`;
  sex: string;
  pathogen: string;
  antibody: string[];
  antigen: string;
  assay: string;
  assayOther: string;
  sampleSize: number;
  sampleNumerator: number;
  sampleFrame: string;
  sampleFrameTargetGroup: string;
  seroprevalence: number;
  country: string;
  state: string;
  city: string;
  url: string;
  ageGroup: string;
  ageMinimum: number;
  ageMaximum: number;
  includeInEtl: 0 | 1;
  producer: string;
  producerOther: string;
  whoRegion: string[];
}

export interface AirtableSourceFieldsCleaningFieldNamesAndRemoveUnusedFieldsStep {
  id: string;
  sourceSheetName: string;
}

interface CleanFieldNamesAndRemoveUnusedFieldsStepInput {
  allEstimates: AirtableEstimateFields[];
  allSources: AirtableSourceFields[];
}

interface CleanFieldNamesAndRemoveUnusedFieldsStepOutput {
  allEstimates: AirtableEstimateFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep[];
  allSources: AirtableSourceFieldsCleaningFieldNamesAndRemoveUnusedFieldsStep[];
}

export const cleanFieldNamesAndRemoveUnusedFieldsStep = (
  input: CleanFieldNamesAndRemoveUnusedFieldsStepInput
): CleanFieldNamesAndRemoveUnusedFieldsStepOutput => {
  console.log("Running step: cleanFieldNamesAndRemoveUnusedFields");

  const { allEstimates, allSources } = input;

  return {
    allEstimates: allEstimates.map((estimate) => ({
      sourceSheetId: estimate["Source Sheet"],
      estimateId: estimate["Unique ID"],
      inclusionCriteria: estimate["Inclusion Criteria"],
      sampleStartDate: estimate["Sample Start Date"],
      sampleEndDate: estimate["Sample End Date"],
      sex: estimate["Sex"],
      pathogen: estimate["Pathogen"],
      antibody: estimate["Antibody"],
      antigen: estimate["Antigen"],
      assay: estimate["Assay"],
      assayOther: estimate["Assay - Other"],
      sampleSize: estimate["Sample Size"],
      sampleNumerator: estimate["Sample Numerator"],
      sampleFrame: estimate["Sample Frame"],
      sampleFrameTargetGroup: estimate["Sample Frame - Target Group"],
      seroprevalence: estimate["Seroprevalence"],
      country: estimate["Country"],
      state: estimate["State"],
      city: estimate["City"],
      url: estimate["Url"],
      ageGroup: estimate["Age group"],
      ageMaximum: estimate["Age Maximum"],
      ageMinimum: estimate["Age Minimum"],
      whoRegion: estimate["WHO Region"],
      producer: estimate["Producer"],
      producerOther: estimate["Producer - Other"],
      includeInEtl: estimate["ETL Included"],
    })),
    allSources: allSources.map((source) => ({
      id: source["id"],
      sourceSheetName: source["Source Title"],
    })),
  };
};
