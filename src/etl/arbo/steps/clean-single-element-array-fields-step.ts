import { MongoClient } from "mongodb";
import {
  AirtableEstimateFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep,
  AirtableSourceFieldsCleaningFieldNamesAndRemoveUnusedFieldsStep,
} from "./clean-field-names-and-remove-unused-fields-step.js";

export type AirtableEstimateFieldsAfterCleaningSingleElementArrayFieldsStep = Omit<
  AirtableEstimateFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep,
  "url" | "sourceSheetId" | "whoRegion"
> & {
  url: string | undefined;
  sourceSheetId: string | undefined;
  whoRegion: string | undefined;
};

export type AirtableSourceFieldsAfterCleaningSingleElementArrayFieldsStep =
  AirtableSourceFieldsCleaningFieldNamesAndRemoveUnusedFieldsStep;

interface CleanSingleElementArrayFieldsStepInput {
  allEstimates: AirtableEstimateFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep[];
  allSources: AirtableSourceFieldsCleaningFieldNamesAndRemoveUnusedFieldsStep[];
  mongoClient: MongoClient;
}

interface CleanSingleElementArrayFieldsStepOutput {
  allEstimates: AirtableEstimateFieldsAfterCleaningSingleElementArrayFieldsStep[];
  allSources: AirtableSourceFieldsAfterCleaningSingleElementArrayFieldsStep[];
  mongoClient: MongoClient;
}

export const cleanSingleElementArrayFieldsStep = (
  input: CleanSingleElementArrayFieldsStepInput
): CleanSingleElementArrayFieldsStepOutput => {
  console.log(`Running step: cleanSingleElementArrayFieldsStep. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources } = input;

  return {
    allEstimates: allEstimates.map((estimate) => {
      return {
        ...estimate,
        url: estimate.url?.[0],
        sourceSheetId: estimate.sourceSheetId?.[0],
        whoRegion: estimate.whoRegion?.[0],
      };
    }),
    allSources: allSources,
    mongoClient: input.mongoClient
  };
};
