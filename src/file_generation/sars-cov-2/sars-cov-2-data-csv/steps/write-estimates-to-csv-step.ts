import { writeFileSync } from 'fs';
import { EstimateFieldsAfterFilteringEstimatesWhichDontMeetDataStructureRequirementsStep } from './filter-estimates-which-dont-meet-data-structure-requirements';
import { isArrayOfUnknownType } from '../../../../lib/lib.js';

export type EstimateFieldsAfterWritingEstimatesToCsvStep = EstimateFieldsAfterFilteringEstimatesWhichDontMeetDataStructureRequirementsStep;

interface WriteEstimatesToCsvStepInput {
  allEstimates: EstimateFieldsAfterFilteringEstimatesWhichDontMeetDataStructureRequirementsStep[];
}

interface WriteEstimatesToCsvStepOutput {
  allEstimates: EstimateFieldsAfterWritingEstimatesToCsvStep[];
}

export const writeEstimatesToCsvStep = (input: WriteEstimatesToCsvStepInput): WriteEstimatesToCsvStepOutput => {
  console.log(`Running step: writeEstimatesToCsvStep. Remaining estimates: ${input.allEstimates.length}`);

  const outputFilename = './serotracker_dataset.csv'

  const sortedEstimates = input.allEstimates
    .sort((estimateA, estimateB) => {
      if(estimateA.country !== estimateB.country) {
        return estimateA.country > estimateB.country ? 1 : -1
      }

      if(estimateA.publicationDate !== estimateB.publicationDate) {
        return estimateA.publicationDate > estimateB.publicationDate ? 1 : -1
      }

      if(estimateA.sourceName !== estimateB.sourceName) {
        return estimateA.sourceName > estimateB.sourceName ? 1 : -1
      }

      if(estimateA.studyName !== estimateB.studyName) {
        return estimateA.sourceName > estimateB.sourceName ? 1 : -1
      }

      if(
        estimateA.isSeroTrackerPrimaryEstimate === true && (
          estimateB.isSeroTrackerPrimaryEstimate === null ||
          estimateB.isSeroTrackerPrimaryEstimate === false
        )
      ) {
        return -1;
      }

      if(
        estimateB.isSeroTrackerPrimaryEstimate === true && (
          estimateA.isSeroTrackerPrimaryEstimate === null ||
          estimateA.isSeroTrackerPrimaryEstimate === false
        )
      ) {
        return 1;
      }

      return 0;
    })

  const estimatesWithCsvFieldNames = sortedEstimates.map((estimate) => ({
    estimate_name: estimate.estimateName,
    study_name: estimate.studyName,
    source_name: estimate.sourceName,
    publication_date: estimate.publicationDate,
    source_type: estimate.sourceType,
    estimate_grade: estimate.estimateGrade,
    study_type: estimate.studyType,
    country: estimate.country,
    state: estimate.state,
    city: estimate.city,
    study_inclusion_criteria: estimate.inclusionCriteria,
    study_exclusion_criteria: estimate.exclusionCriteria,
    sampling_start_date: estimate.samplingStartDate,
    sampling_end_date: estimate.samplingEndDate,
    population_group: estimate.populationGroup,
    sex: estimate.sex,
    age: estimate.age,
    age_min: estimate.ageMinimum,
    age_max: estimate.ageMaximum,
    subgroup_var: estimate.subgroupingVariable,
    subgroup_specific_category: estimate.subgroupCategory,
    denominator_value: estimate.denominatorValue,
    serum_pos_prevalence: estimate.seroprevalence,
    seroprev_95_ci_lower: estimate.confidenceInterval95PercentLowerBound,
    seroprev_95_ci_upper: estimate.confidenceInterval95PercentUpperBound,
    dashboard_primary_estimate: estimate.isSeroTrackerPrimaryEstimate,
    test_adj: estimate.isTestAdjusted,
    pop_adj: estimate.isPopulationAdjusted,
    clustering_adjustment: estimate.isClusteringAdjusted,
    academic_primary_estimate: estimate.isAcademicPrimaryEstimate,
    sampling_method: estimate.samplingMethod,
    test_name: estimate.testName,
    test_manufacturer: estimate.testManufacturer,
    test_type: estimate.testType,
    specimen_type: estimate.specimenType,
    isotypes: estimate.reportedIsotypes,
    antibody_target: estimate.antibodyTarget,
    test_validation: estimate.testValidation,
    sensitivity: estimate.sensitivity,
    specificity: estimate.specificity,
    overall_risk_of_bias: estimate.overallRiskOfBias,
    jbi_1: estimate.jbi1,
    jbi_2: estimate.jbi2,
    jbi_3: estimate.jbi3,
    jbi_4: estimate.jbi4,
    jbi_5: estimate.jbi5,
    jbi_6: estimate.jbi6,
    jbi_7: estimate.jbi7,
    jbi_8: estimate.jbi8,
    jbi_9: estimate.jbi9,
    first_author: estimate.firstAuthor,
    lead_institution: estimate.leadInstitution,
    is_unity_aligned: estimate.unityCriteria,
    url: estimate.url,
    date_created: estimate.dateCreated,
    last_modified_time: estimate.lastModifiedTime,
    data_quality_status: estimate.dataQualityStatus,
    zotero_citation_key: estimate.zoteroCitationKey,
    alpha_3_code: estimate.countryAlphaThreeCode,
  }))

  const fieldNames = [
    'estimate_name',
    'study_name',
    'source_name',
    'publication_date',
    'source_type',
    'estimate_grade',
    'study_type',
    'country',
    'state',
    'city',
    'study_inclusion_criteria',
    'study_exclusion_criteria',
    'sampling_start_date',
    'sampling_end_date',
    'population_group',
    'sex',
    'age',
    'age_min',
    'age_max',
    'subgroup_var',
    'subgroup_specific_category',
    'denominator_value',
    'serum_pos_prevalence',
    'seroprev_95_ci_lower',
    'seroprev_95_ci_upper',
    'dashboard_primary_estimate',
    'test_adj',
    'pop_adj',
    'clustering_adjustment',
    'academic_primary_estimate',
    'sampling_method',
    'test_name',
    'test_manufacturer',
    'test_type',
    'specimen_type',
    'isotypes',
    'antibody_target',
    'test_validation',
    'sensitivity',
    'specificity',
    'overall_risk_of_bias',
    'jbi_1',
    'jbi_2',
    'jbi_3',
    'jbi_4',
    'jbi_5',
    'jbi_6',
    'jbi_7',
    'jbi_8',
    'jbi_9',
    'first_author',
    'lead_institution',
    'is_unity_aligned',
    'url',
    'date_created',
    'last_modified_time',
    'data_quality_status',
    'zotero_citation_key',
    'alpha_3_code'
  ] as const;

  const headersForCsv = fieldNames.join(',')

  const formatValueForCsv = (value: string): string => {
    if(value.includes(',') || value.includes('\n')) {
      if(value.at(0) === '"' && value.at(-1) === '"') {
        return value;
      }

      return `"${value}"`;
    }

    return value;
  }

  const dataRowsForCsv = estimatesWithCsvFieldNames.reduce((accumulator, currentValue, index, fullArray) => {
    const valueToAppend = fieldNames
      .map((fieldName) => currentValue[fieldName] ?? '')
      .map((value) => {
        if(typeof value === 'number') {
          return formatValueForCsv(value.toString());
        }

        if(typeof value === 'boolean') {
          return value === true
            ? 'True'
            : 'False'
        }

        if(isArrayOfUnknownType(value)) {
          if(value.length === 0) {
            return ""
          }

          if(value.length === 1) {
            return `['${value}']`;
          }

          return `"[${value.map((element) => `'${element}'`).join(',')}]"`;
        }

        return formatValueForCsv(value);
      })
      .join(',')

    if(!accumulator) {
      return accumulator + valueToAppend;
    }

    return accumulator + '\n' + valueToAppend;
  }, '')

  const fullFileContent = headersForCsv + '\n' + dataRowsForCsv;

  writeFileSync(outputFilename, fullFileContent);

  return {
    allEstimates: input.allEstimates
  };
}