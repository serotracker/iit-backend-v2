import { EstimateFieldsAfterValidatingEstimatesFromAirtableStep } from "./validate-estimates-from-airtable-step";

export interface EstimateFieldsAfterCleaningEstimatesFromAirtableStep {
  id: string;
  estimateName: string | null;
  studyName: string | null;
  sourceName: string | null;
  publicationDate: string | null;
  sourceType: string | null;
  estimateGrade: string | null;
  studyType: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  inclusionCriteria: string | null;
  exclusionCriteria: string | null;
  samplingStartDate: string | null;
  samplingEndDate: string | null;
  populationGroup: string | null;
  sex: string | null;
  age: string | null;
  ageMinimum: number | null;
  ageMaximum: number | null;
  subgroupingVariable: string | null;
  subgroupCategory: string | null;
}

interface CleanEstimatesFromAirtableStepInput {
  allEstimates: EstimateFieldsAfterValidatingEstimatesFromAirtableStep[];
}

interface CleanEstimatesFromAirtableStepOutput {
  allEstimates: EstimateFieldsAfterCleaningEstimatesFromAirtableStep[];
}

export const cleanEstimatesFromAirtableStep = (input: CleanEstimatesFromAirtableStepInput): CleanEstimatesFromAirtableStepOutput => {
  console.log(`Running step: cleanEstimatesFromAirtableStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates.map((estimate) => ({
      id: estimate.id,
      estimateName: estimate['Prevalence Estimate Name'],
      studyName: estimate['Rapid Review Study Name (Text)'],
      sourceName: estimate['Source Name'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      publicationDate: estimate['Publication Date'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      sourceType: estimate['Source Type'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      estimateGrade: estimate['Grade of Estimate Scope'],
      studyType: estimate['Study Type'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      country: estimate['Country'],
      state: estimate['State/Province'],
      city: estimate['City'],
      inclusionCriteria: estimate['Study Inclusion Criteria'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      exclusionCriteria: estimate['Study Exclusion Criteria'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      samplingStartDate: estimate['Sampling Start Date (ISO)'],
      samplingEndDate: estimate['Sampling End Date (ISO)'],
      populationGroup: estimate['Sample Frame (groups of interest)'],
      sex: estimate['Sample Frame (sex)'],
      age: estimate['Sample Frame (age)'],
      ageMinimum: estimate['Age Minimum'],
      ageMaximum: estimate['Age Maximum'],
      subgroupingVariable: estimate['Sub-grouping Variable'],
      subgroupCategory: estimate['Sub-group specific category (clean)'],
    }))
  };
}