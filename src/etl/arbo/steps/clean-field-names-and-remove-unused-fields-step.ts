import { MongoClient } from "mongodb";
import { ThreeLetterIsoCountryCode, TwoLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes.js";
import {
  AirtableCountryFieldsAfterFetchingEnvironmentalSuitabilityStatsByCountryStep,
  AirtableEstimateFieldsAfterFetchingEnvironmentalSuitabilityStatsByCountryStep,
  AirtableSourceFieldsAfterFetchingEnvironmentalSuitabilityStatsByCountryStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterFetchingEnvironmentalSuitabilityStatsByCountryStep,
  GroupedEstimatesAfterFetchingEnvironmentalSuitabilityStatsByCountryStep,
  UnravelledGroupedEstimatesAfterFetchingEnvironmentalSuitabilityStatsByCountryStep
} from "./fetch-environmental-suitability-stats-by-country-step.js";
import { ArbovirusGroupingVariable, ArbovirusSubsettingVariable } from "../../../storage/types.js";

export interface AirtableEstimateFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep {
  estimateType: string | undefined;
  sourceSheetId: string[] | undefined;
  estimateId: string | undefined;
  inclusionCriteria: string | undefined;
  sampleStartDate: `${number}-${number}-${number}` | undefined;
  sampleEndDate: `${number}-${number}-${number}` | undefined;
  sex: string | undefined;
  pathogen: string | undefined;
  pediatricAgeGroup: string | undefined;
  antibodies: string[] | undefined;
  antigen: string | undefined;
  assay: string[];
  assayOther: string | undefined;
  sampleSize: number | undefined;
  serotype: string[] | undefined;
  sampleNumerator: number | undefined;
  sampleFrame: string | undefined;
  sampleFrameTargetGroup: string | undefined;
  seroprevalence: number | undefined;
  seroprevalenceStudy95CILower: number | undefined;
  seroprevalenceStudy95CIUpper: number | undefined;
  seroprevalenceCalculated95CILower: number | undefined;
  seroprevalenceCalculated95CIUpper: number | undefined;
  district: string | undefined;
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
  countryId: string[] | undefined;
  studyPopulation: string | undefined;
  studySpecies: string | undefined;
  groupingVariable: ArbovirusGroupingVariable | undefined;
  subsettingVariable: ArbovirusSubsettingVariable | undefined;
}

export interface AirtableSourceFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep {
  id: string;
  sourceSheetName: string | undefined;
}

export interface AirtableCountryFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep {
  id: string;
  name: string;
  alphaThreeCode: ThreeLetterIsoCountryCode;
  alphaTwoCode: TwoLetterIsoCountryCode;
}

interface EnviromnentalSuitabilityDataCollection {
  minimumValue: number;
  maximumValue: number;
  valueRange: number;
  meanValue: number;
  medianValue: number;
  ninetyPercentOfValuesAreBelowThisValue: number;
}

export interface EnvironmentalSuitabilityStatsByCountryEntryAfterCleaningFieldNamesAndRemoveUnusedFieldsStep {
  countryAlphaThreeCode: string;
  zikaData: EnviromnentalSuitabilityDataCollection;
  dengue2015Data: EnviromnentalSuitabilityDataCollection;
  dengue2050Data: EnviromnentalSuitabilityDataCollection;
}

export type GroupedEstimatesAfterCleaningFieldNamesAndRemoveUnusedFieldsStep =
  GroupedEstimatesAfterFetchingEnvironmentalSuitabilityStatsByCountryStep;
export type UnravelledGroupedEstimatesAfterCleaningFieldNamesAndRemoveUnusedFieldsStep =
  UnravelledGroupedEstimatesAfterFetchingEnvironmentalSuitabilityStatsByCountryStep;

interface CleanFieldNamesAndRemoveUnusedFieldsStepInput {
  allEstimates: AirtableEstimateFieldsAfterFetchingEnvironmentalSuitabilityStatsByCountryStep[];
  allSources: AirtableSourceFieldsAfterFetchingEnvironmentalSuitabilityStatsByCountryStep[];
  allCountries: AirtableCountryFieldsAfterFetchingEnvironmentalSuitabilityStatsByCountryStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterFetchingEnvironmentalSuitabilityStatsByCountryStep[];
  groupedEstimates: GroupedEstimatesAfterFetchingEnvironmentalSuitabilityStatsByCountryStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterFetchingEnvironmentalSuitabilityStatsByCountryStep[];
  mongoClient: MongoClient;
}

interface CleanFieldNamesAndRemoveUnusedFieldsStepOutput {
  allEstimates: AirtableEstimateFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep[];
  allSources: AirtableSourceFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep[];
  allCountries: AirtableCountryFieldsAfterCleaningFieldNamesAndRemoveUnusedFieldsStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterCleaningFieldNamesAndRemoveUnusedFieldsStep[];
  groupedEstimates: GroupedEstimatesAfterCleaningFieldNamesAndRemoveUnusedFieldsStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterCleaningFieldNamesAndRemoveUnusedFieldsStep[];
  mongoClient: MongoClient;
}

const airtableGroupingVariableToGroupingVariableEnumMap: Record<string, ArbovirusGroupingVariable | undefined> = {
  ['Timeframe']: ArbovirusGroupingVariable.TIMEFRAME,
  ['Age']: ArbovirusGroupingVariable.AGE,
  ['Gender']: ArbovirusGroupingVariable.GENDER,
  ['Geography']: ArbovirusGroupingVariable.GEOGRAPHY,
  ['Test type']: ArbovirusGroupingVariable.TEST_TYPE,
  ['Overall']: ArbovirusGroupingVariable.OVERALL,
  ['DENV Serotype']: ArbovirusGroupingVariable.DENV_SEROTYPE,
  ['Species']: ArbovirusGroupingVariable.SPECIES,
  ['Race']: ArbovirusGroupingVariable.RACE,
  ['Education']: ArbovirusGroupingVariable.EDUCATION,
}

const airtableSubsettingVariableToSubsettingVariableEnumMap: Record<string, ArbovirusSubsettingVariable | undefined> = {
  ['Geography']: ArbovirusSubsettingVariable.GEOGRAPHY,
  ['Distinct Populations']: ArbovirusSubsettingVariable.DISTINCT_POPULATIONS,
  ['Timeframe']: ArbovirusSubsettingVariable.TIMEFRAME,
  ['None']: ArbovirusSubsettingVariable.NONE,
  ['Test type']: ArbovirusSubsettingVariable.TEST_TYPE,
  ['No']: ArbovirusSubsettingVariable.NO,
}

export const cleanFieldNamesAndRemoveUnusedFieldsStep = (
  input: CleanFieldNamesAndRemoveUnusedFieldsStepInput
): CleanFieldNamesAndRemoveUnusedFieldsStepOutput => {
  console.log(`Running step: cleanFieldNamesAndRemoveUnusedFields. Remaining estimates: ${input.allEstimates.length}`);

  const { allEstimates, allSources, allCountries } = input;

  return {
    allEstimates: allEstimates.map((estimate) => ({
      estimateType: estimate['Estimate Type'],
      sourceSheetId: estimate["Source Sheet"],
      estimateId: estimate["Unique ID"],
      inclusionCriteria: estimate["Inclusion Criteria"],
      sampleStartDate: estimate["Sample Start Date"],
      sampleEndDate: estimate["Sample End Date"],
      serotype: estimate["Serotype"],
      sex: estimate["Sex"],
      pathogen: estimate["Pathogen"],
      pediatricAgeGroup: estimate["Pediatric age group"],
      antibodies: estimate["Assay Target"],
      antigen: estimate["Antigen"],
      assay: estimate["Assay Type"] ? estimate["Assay Type"].filter((assay): assay is NonNullable<typeof assay> => !!assay) : [],
      assayOther: estimate["Assay - Other"],
      sampleSize: estimate["Sample Size (Denominator)"],
      sampleNumerator: estimate["Sample Numerator"],
      sampleFrame: estimate["Sample Frame"],
      sampleFrameTargetGroup: estimate["Sample Frame - Description"],
      seroprevalence: estimate["Prevalence"],
      seroprevalenceStudy95CILower: estimate["Prevalence 95% CI Lower"],
      seroprevalenceStudy95CIUpper: estimate["Prevalence 95% CI Upper"],
      seroprevalenceCalculated95CILower: estimate["Prevalence 95% CI Lower (formula)"],
      seroprevalenceCalculated95CIUpper: estimate["Prevalence 95% CI Upper (formula)"],
      district: estimate["District"],
      state: estimate["State/Province"],
      city: estimate["City"],
      url: estimate["URL"],
      ageGroup: estimate["Age group"],
      ageMaximum: estimate["Age Maximum"],
      ageMinimum: estimate["Age Minimum"],
      whoRegion: estimate["WHO Region"],
      producer: estimate["Producer"],
      producerOther: estimate["Producer - Other"],
      includeInEtl: estimate["ETL Included"],
      countryId: estimate["Country"],
      studyPopulation: estimate["Study Population (OROV only)"],
      studySpecies: estimate["Study Species (OROV only)"],
      groupingVariable: !!estimate["Grouping Variable"]
        ? airtableGroupingVariableToGroupingVariableEnumMap[estimate["Grouping Variable"]]
        : undefined,
      subsettingVariable: !!estimate["Subsetting Variable"]
        ? airtableSubsettingVariableToSubsettingVariableEnumMap[estimate["Subsetting Variable"]]
        : undefined,
    })),
    allSources: allSources.map((source) => ({
      id: source["id"],
      sourceSheetName: source["Source Title"],
    })),
    allCountries: allCountries.map((country) => ({
      id: country["id"],
      name: country["Country"],
      alphaThreeCode: country["Alpha3 Code"] as ThreeLetterIsoCountryCode,
      alphaTwoCode: country["Alpha2 Code"] as TwoLetterIsoCountryCode
    })),
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry.map((dataPoint) => ({
      countryAlphaThreeCode: dataPoint['color_code'],
      zikaData: {
        minimumValue: dataPoint['MIN_zika'],
        maximumValue: dataPoint['MAX_zika'],
        valueRange: dataPoint['RANGE_zika'],
        meanValue: dataPoint['MEAN_zika'],
        medianValue: dataPoint['MEDIAN_zika'],
        ninetyPercentOfValuesAreBelowThisValue: dataPoint['PCT90_zika']
      },
      dengue2015Data: {
        minimumValue: dataPoint['MIN_dengue2015'],
        maximumValue: dataPoint['MAX_dengue2015'],
        valueRange: dataPoint['RANGE_dengue2015'],
        meanValue: dataPoint['MEAN_dengue2015'],
        medianValue: dataPoint['MEDIAN_dengue2015'],
        ninetyPercentOfValuesAreBelowThisValue: dataPoint['PCT90_dengue2015']
      },
      dengue2050Data: {
        minimumValue: dataPoint['MIN_dengue2050'],
        maximumValue: dataPoint['MAX_dengue2050'],
        valueRange: dataPoint['RANGE_dengue2050'],
        meanValue: dataPoint['MEAN_dengue2050'],
        medianValue: dataPoint['MEDIAN_dengue2050'],
        ninetyPercentOfValuesAreBelowThisValue: dataPoint['PCT90_dengue2050']
      }
    })),
    groupedEstimates: input.groupedEstimates,
    unravelledGroupedEstimates: input.unravelledGroupedEstimates,
    mongoClient: input.mongoClient
  };
};
