import { EstimateFieldsAfterCleaningEstimatesFromAirtableStep } from "./clean-estimates-from-airtable-step";

export type EstimateFieldsAfterFilteringEstimatesWhichDontMeetDataStructureRequirementsStep = Omit<
  EstimateFieldsAfterCleaningEstimatesFromAirtableStep,
  | 'isIncludedInGithubCsv'
  | 'estimateName'
  | 'studyName'
  | 'sourceName'
  | 'publicationDate'
  | 'sourceType'
  | 'estimateGrade'
  | 'studyType'
  | 'country'
> & {
  isIncludedInGithubCsv: true;
  estimateName: NonNullable<EstimateFieldsAfterCleaningEstimatesFromAirtableStep['estimateName']>,
  studyName: NonNullable<EstimateFieldsAfterCleaningEstimatesFromAirtableStep['studyName']>,
  sourceName: NonNullable<EstimateFieldsAfterCleaningEstimatesFromAirtableStep['sourceName']>,
  publicationDate: NonNullable<EstimateFieldsAfterCleaningEstimatesFromAirtableStep['publicationDate']>,
  sourceType: NonNullable<EstimateFieldsAfterCleaningEstimatesFromAirtableStep['sourceType']>,
  estimateGrade: NonNullable<EstimateFieldsAfterCleaningEstimatesFromAirtableStep['estimateGrade']>,
  studyType: NonNullable<EstimateFieldsAfterCleaningEstimatesFromAirtableStep['studyType']>,
  country: NonNullable<EstimateFieldsAfterCleaningEstimatesFromAirtableStep['country']>
};

interface FilterEstimatesWhichDontMeetDataStructureRequirementsInput {
  allEstimates: EstimateFieldsAfterCleaningEstimatesFromAirtableStep[];
}

interface FilterEstimatesWhichDontMeetDataStructureRequirementsOutput {
  allEstimates: EstimateFieldsAfterFilteringEstimatesWhichDontMeetDataStructureRequirementsStep[];
}

export const filterEstimatesWhichDontMeetDataStructureRequirements = (
  input: FilterEstimatesWhichDontMeetDataStructureRequirementsInput
): FilterEstimatesWhichDontMeetDataStructureRequirementsOutput => {
  console.log(`Running step: filterEstimatesWhichDontMeetDataStructureRequirements. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates.filter((estimate): estimate is EstimateFieldsAfterFilteringEstimatesWhichDontMeetDataStructureRequirementsStep => 
      !!estimate.isIncludedInGithubCsv &&
      !!estimate.estimateName &&
      !!estimate.studyName &&
      !!estimate.sourceName &&
      !!estimate.publicationDate &&
      !!estimate.sourceType &&
      !!estimate.estimateGrade &&
      !!estimate.studyType &&
      !!estimate.country
    )
  };
}