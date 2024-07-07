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

  const estimatesWithCsvFieldNames = input.allEstimates.map((estimate) => ({
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
  ] as const;

  const headersForCsv = fieldNames.join(',')

  const formatValueForCsv = (value: string): string => {
    if(value.includes(',')) {
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
            return `[${value}]`;
          }

          return `"[${value.join(',')}]"`;
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