import { AirtableEstimateFields, AirtableSourceFields } from "../types.js";

export interface AirtableEstimateFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep {
  sourceSheetId: string[] | undefined;
  estimateId: string | undefined;
  inclusionCriteria: string | undefined;
  sampleStartDate: `${number}-${number}-${number}` | undefined;
  sampleEndDate: `${number}-${number}-${number}` | undefined;
  sex: string | undefined;
  pathogen: string | undefined;
  antibodies: string[] | undefined;
  antigen: string | undefined;
  assay: string | undefined;
  assayOther: string | undefined;
  sampleSize: number | undefined;
  serotype: string[] | undefined;
  sampleNumerator: number | undefined;
  sampleFrame: string | undefined;
  sampleFrameTargetGroup: string | undefined;
  seroprevalence: number | undefined;
  country: string | undefined;
  state: string | undefined;
  city: string | undefined;
  url: string[] | undefined;
  ageGroup: string | undefined;
  ageMinimum: number | undefined;
  ageMaximum: number | undefined;
  includeInEtl: 0 | 1 | undefined;
  producer: string | undefined;
  producerOther: string | undefined;
  whoRegion: string[] | undefined;
}

export interface AirtableSourceFieldsCleaningFieldNamesAndRemoveUnusedFieldsStep {
  id: string;
  sourceSheetName: string | undefined;
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
  console.log(`Running step: cleanFieldNamesAndRemoveUnusedFields. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources } = input;

  return {
    allEstimates: allEstimates.map((estimate) => ({
      sourceSheetId: estimate["Source Sheet"],
      estimateId: estimate["Unique ID"],
      inclusionCriteria: estimate["Inclusion Criteria"],
      sampleStartDate: estimate["Sample Start Date"],
      sampleEndDate: estimate["Sample End Date"],
      serotype: estimate["Serotype"],
      sex: estimate["Sex"],
      pathogen: estimate["Pathogen"],
      antibodies: estimate["Antibody"],
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
      url: estimate["URL"],
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
