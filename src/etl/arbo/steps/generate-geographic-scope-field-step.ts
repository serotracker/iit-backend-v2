import { MongoClient } from "mongodb";
import {
  AirtableCountryFieldsAfterAddingCountryAndRegionInformationStep,
  AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep,
  AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterAddingCountryAndRegionInformationStep,
  GroupedEstimatesAfterAddingCountryAndRegionInformationStep,
  UnravelledGroupedEstimatesAfterAddingCountryAndRegionInformationStep
} from "./add-country-and-region-information-step.js";
import { ArbovirusStudyGeographicScope } from "../../../storage/types.js";


export type AirtableEstimateFieldsAfterGeneratingGeographicScopeFieldStep =
  AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep & {
    geographicScope: ArbovirusStudyGeographicScope;
  };
export type AirtableSourceFieldsAfterGeneratingGeographicScopeFieldStep =
  AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep;
export type AirtableCountryFieldsAfterGeneratingGeographicScopeFieldStep =
  AirtableCountryFieldsAfterAddingCountryAndRegionInformationStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterGeneratingGeographicScopeFieldStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterAddingCountryAndRegionInformationStep;
export type GroupedEstimatesAfterGeneratingGeographicScopeFieldStep =
  GroupedEstimatesAfterAddingCountryAndRegionInformationStep;
export type UnravelledGroupedEstimatesAfterGeneratingGeographicScopeFieldStep =
  UnravelledGroupedEstimatesAfterAddingCountryAndRegionInformationStep;

interface GenerateGeographicScopeFieldStepInput {
  allEstimates: AirtableEstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  allSources: AirtableSourceFieldsAfterAddingCountryAndRegionInformationStep[];
  allCountries: AirtableCountryFieldsAfterAddingCountryAndRegionInformationStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterAddingCountryAndRegionInformationStep[];
  groupedEstimates: GroupedEstimatesAfterAddingCountryAndRegionInformationStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterAddingCountryAndRegionInformationStep[];
  mongoClient: MongoClient;
}

interface GenerateGeographicScopeFieldStepOutput {
  allEstimates: AirtableEstimateFieldsAfterGeneratingGeographicScopeFieldStep[];
  allSources: AirtableSourceFieldsAfterGeneratingGeographicScopeFieldStep[];
  allCountries: AirtableCountryFieldsAfterGeneratingGeographicScopeFieldStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterGeneratingGeographicScopeFieldStep[];
  groupedEstimates: GroupedEstimatesAfterGeneratingGeographicScopeFieldStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterGeneratingGeographicScopeFieldStep[];
  mongoClient: MongoClient;
}

export const generateGeographicScopeFieldStep = (
  input: GenerateGeographicScopeFieldStepInput
): GenerateGeographicScopeFieldStepOutput => {
  console.log(`Running step: generateGeographicScopeFieldStep. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources, allCountries } = input;

  return {
    allEstimates: allEstimates.map((estimate) => {
      if(!!estimate.city) {
        return {
          ...estimate,
          geographicScope: ArbovirusStudyGeographicScope.LOCAL,
        }
      }

      if(!!estimate.district) {
        return {
          ...estimate,
          geographicScope: ArbovirusStudyGeographicScope.LOCAL,
        }
      }

      if(!!estimate.state) {
        return {
          ...estimate,
          geographicScope: ArbovirusStudyGeographicScope.REGIONAL,
        }
      }

      return {
        ...estimate,
        geographicScope: ArbovirusStudyGeographicScope.NATIONAL,
      }
    }),
    allSources: allSources,
    allCountries: allCountries,
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry,
    groupedEstimates: input.groupedEstimates,
    unravelledGroupedEstimates: input.unravelledGroupedEstimates,
    mongoClient: input.mongoClient
  };
};
