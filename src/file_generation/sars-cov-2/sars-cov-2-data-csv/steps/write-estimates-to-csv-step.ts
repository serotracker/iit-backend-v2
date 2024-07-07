import { writeFileSync } from 'fs';
import { EstimateFieldsAfterFilteringEstimatesWhichDontMeetDataStructureRequirementsStep } from './filter-estimates-which-dont-meet-data-structure-requirements';

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
    subgroup_specific_category: estimate.subgroupCategory
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
    'subgroup_specific_category'
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