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
  denominatorValue: number | null;
  seroprevalence: number | null;
  confidenceInterval95PercentLowerBound: number | string | null;
  confidenceInterval95PercentUpperBound: number | string | null;
  isSeroTrackerPrimaryEstimate: boolean | null;
  isTestAdjusted: boolean | null;
  isPopulationAdjusted: boolean | null;
  isClusteringAdjusted: boolean | null;
  isAcademicPrimaryEstimate: boolean | null;
  samplingMethod: string | null;
  testName: string | null;
  testManufacturer: string | null;
  testType: string | null;
  specimenType: string | null;
  reportedIsotypes: string[];
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
      denominatorValue: estimate['Denominator Value'],
      seroprevalence: estimate['Serum positive prevalence'],
      confidenceInterval95PercentLowerBound: estimate['estimate check 95% lower bound'],
      confidenceInterval95PercentUpperBound: estimate['estimate check 95% upper bound'],
      isSeroTrackerPrimaryEstimate: estimate['SeroTracker Analysis Primary Estimate'],
      isTestAdjusted: estimate['Test Adjustment'],
      isPopulationAdjusted: estimate['Population Adjustment'],
      isClusteringAdjusted: estimate['Clustering Adjustment'],
      isAcademicPrimaryEstimate: estimate['Academic Primary Estimate'],
      samplingMethod: estimate['Sampling Method'],
      testName: estimate['Test Name'],
      testManufacturer: estimate['Test Manufacturer'],
      testType: estimate['Test Type'],
      specimenType: estimate['Specimen Type'],
      reportedIsotypes: estimate['Isotype(s) Reported (Reviewer)'].filter((element): element is NonNullable<typeof element> => !!element)
    }))
  };
}