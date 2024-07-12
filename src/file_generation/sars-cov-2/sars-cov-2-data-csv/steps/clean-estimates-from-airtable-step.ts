import { EstimateFieldsAfterValidatingEstimatesFromAirtableStep } from "./validate-estimates-from-airtable-step";

export interface EstimateFieldsAfterCleaningEstimatesFromAirtableStep {
  id: string;
  isIncludedInGithubCsv: boolean;
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
  antibodyTarget: string | null;
  testValidation: string | null;
  sensitivity: number | null;
  specificity: number | null;
  overallRiskOfBias: string[];
  jbi1: string | null;
  jbi2: string | null;
  jbi3: string | null;
  jbi4: string | null;
  jbi5: string | null;
  jbi6: string | null;
  jbi7: string | null;
  jbi8: string | null;
  jbi9: string | null;
  firstAuthor: string | null;
  leadInstitution: string | null;
  unityCriteria: string | null;
  url: string | null;
  dateCreated: string | null;
  lastModifiedTime: string | null;
  dataQualityStatus: string | null;
  zoteroCitationKey: string | null;
  countryAlphaThreeCode: string | null;
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
      isIncludedInGithubCsv: estimate['GitHub CSV Included'] === 1 ? true : false,
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
      reportedIsotypes: estimate['Isotype(s) Reported (Reviewer)'].filter((element): element is NonNullable<typeof element> => !!element),
      antibodyTarget: estimate['Antibody target'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      testValidation: estimate['Test Validation'],
      sensitivity: estimate['Sensitivity'],
      specificity: estimate['Specificity'],
      overallRiskOfBias: estimate['Overall Risk of Bias (JBI)'].filter((element): element is NonNullable<typeof element> => !!element),
      jbi1: estimate['JBI 1'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      jbi2: estimate['JBI 2'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      jbi3: estimate['JBI 3'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      jbi4: estimate['JBI 4'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      jbi5: estimate['JBI 5'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      jbi6: estimate['JBI 6'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      jbi7: estimate['JBI 7'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      jbi8: estimate['JBI 8'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      jbi9: estimate['JBI 9'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      firstAuthor: estimate['First Author Full Name'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      leadInstitution: estimate['Lead Institution'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      unityCriteria: estimate['UNITY: Criteria'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      url: estimate['URL'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      dateCreated: estimate['Date Created (ISO)'],
      lastModifiedTime: estimate['Last Modified time (ISO)'],
      dataQualityStatus: estimate['Data Quality Status'],
      zoteroCitationKey: estimate['Zotero Citation Key'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
      countryAlphaThreeCode: estimate['Alpha3 Code'].filter((element): element is NonNullable<typeof element> => !!element).at(0) ?? null,
    }))
  };
}