import { MongoClient } from "mongodb";
import { pipe } from "fp-ts/lib/function.js";
import sum from "lodash/sum.js";
import {
  AirtableCountryFieldsAfterJitteringPinLatLngStep,
  AirtableEstimateFieldsAfterJitteringPinLatLngStep,
  AirtableSourceFieldsAfterJitteringPinLatLngStep,
  EnvironmentalSuitabilityStatsByCountryEntryAfterJitteringPinLatLngStep,
  GroupedEstimatesAfterJitteringPinLatLngStep,
  UnravelledGroupedEstimatesAfterJitteringPinLatLngStep
} from "./jitter-pin-lat-lng-step.js";
import { groupByArray } from "../../../lib/lib.js";
import { ArbovirusGroupingVariable } from "../../../storage/types.js";

export type AirtableEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep =
  AirtableEstimateFieldsAfterJitteringPinLatLngStep;
export type AirtableSourceFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep =
  AirtableSourceFieldsAfterJitteringPinLatLngStep;
export type AirtableCountryFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep =
  AirtableCountryFieldsAfterJitteringPinLatLngStep;
export type EnvironmentalSuitabilityStatsByCountryEntryAfterGroupingEstimatesUnderPrimaryEstimateStep =
  EnvironmentalSuitabilityStatsByCountryEntryAfterJitteringPinLatLngStep;

type EstimateForGroupedEstimates = Omit<GroupEstimatesUnderPrimaryEstimateStepInput['allEstimates'][number], 'sex'|'ageGroup'> & {
  sex: Array<NonNullable<GroupEstimatesUnderPrimaryEstimateStepInput['allEstimates'][number]['sex']>>;
  ageGroup: Array<NonNullable<GroupEstimatesUnderPrimaryEstimateStepInput['allEstimates'][number]['ageGroup']>>;
}
export interface GroupedEstimatesAfterGroupingEstimatesUnderPrimaryEstimateStep {
  shownEstimates: Array<EstimateForGroupedEstimates>;
  hiddenEstimates: Array<EstimateForGroupedEstimates>;
}
export type UnravelledGroupedEstimatesAfterGroupingEstimatesUnderPrimaryEstimateStep =
  UnravelledGroupedEstimatesAfterJitteringPinLatLngStep;

interface GroupEstimatesUnderPrimaryEstimateStepInput {
  allEstimates: AirtableEstimateFieldsAfterJitteringPinLatLngStep[];
  allSources: AirtableSourceFieldsAfterJitteringPinLatLngStep[];
  allCountries: AirtableCountryFieldsAfterJitteringPinLatLngStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterJitteringPinLatLngStep[];
  groupedEstimates: GroupedEstimatesAfterJitteringPinLatLngStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterJitteringPinLatLngStep[];
  mongoClient: MongoClient;
}

interface GroupEstimatesUnderPrimaryEstimateStepOutput {
  allEstimates: AirtableEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep[];
  allSources: AirtableSourceFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep[];
  allCountries: AirtableCountryFieldsAfterGroupingEstimatesUnderPrimaryEstimateStep[];
  environmentalSuitabilityStatsByCountry: EnvironmentalSuitabilityStatsByCountryEntryAfterGroupingEstimatesUnderPrimaryEstimateStep[];
  groupedEstimates: GroupedEstimatesAfterGroupingEstimatesUnderPrimaryEstimateStep[];
  unravelledGroupedEstimates: UnravelledGroupedEstimatesAfterGroupingEstimatesUnderPrimaryEstimateStep[];
  mongoClient: MongoClient;
}

export const groupEstimatesUnderPrimaryEstimateStep = (
    input: GroupEstimatesUnderPrimaryEstimateStepInput
): GroupEstimatesUnderPrimaryEstimateStepOutput => {
  console.log(`Running step: groupEstimatesUnderPrimaryEstimateStep. Remaining estimates: ${input.allEstimates.length}`);

  // Arbitrary, just some unicode characters I pulled off wikipedia. All that really matters is that these never appear in Airtable.
  const seperator = '技Д用α字科'
  const undefinedValueMarker ='한국字역사字정보字통합字시스템'

  const groupedEstimates = pipe(
    input.allEstimates,
    (allEstimates) => allEstimates.filter((estimate): estimate is Omit<typeof estimate, 'sourceSheetId'> & {
      sourceSheetId: typeof estimate['sourceSheetId'],
    } => !!estimate.sourceSheetId),
    (allEstimates) => allEstimates.map((estimate) => ({
      ...estimate,
      groupingKey: `${estimate.pathogen}${seperator}${estimate.sourceSheetId}${seperator}${estimate.sampleFrame ?? undefinedValueMarker}`,
    })),
    (allEstimates) => groupByArray(allEstimates, 'groupingKey'),
    (groupedEstimateDictionary) => {
      return Object.entries(groupedEstimateDictionary).map(([key, value]) => {
        const pathogen = key.split(seperator)[0];
        const sourceSheetId = key.split(seperator)[1];
        const sampleFrame = key.split(seperator)[2];

        return {
          pathogen,
          sourceSheetId,
          sampleFrame: sampleFrame !== undefinedValueMarker ? sampleFrame : undefined,
          data: value.data,
        }
      })
    },
    (estimateGroups) => estimateGroups.flatMap((estimateGroup): GroupEstimatesUnderPrimaryEstimateStepOutput['groupedEstimates'][number] => {
      const { data } = estimateGroup;

      if(data.length === 1) {
        return {
          shownEstimates: data.map((estimate) => ({
            ...estimate,
            sex: estimate.sex ? [ estimate.sex ] : [],
            ageGroup: estimate.ageGroup ? [ estimate.ageGroup ] : [],
          })),
          hiddenEstimates: []
        }
      }

      const validGroupsForIncludingAndExcludingAllOthers = [
        ArbovirusGroupingVariable.OVERALL,
        ArbovirusGroupingVariable.GEOGRAPHY,
      ];

      if(data.some((element) => !!element.groupingVariable && validGroupsForIncludingAndExcludingAllOthers.includes(element.groupingVariable))) {
        return {
          shownEstimates: data
            .filter((estimate) => !!estimate.groupingVariable && validGroupsForIncludingAndExcludingAllOthers.includes(estimate.groupingVariable))
            .map((estimate) => ({
              ...estimate,
              sex: estimate.sex ? [ estimate.sex ] : [],
              ageGroup: estimate.ageGroup ? [ estimate.ageGroup ] : [],
            })),
          hiddenEstimates: data
            .filter((estimate) => !estimate.groupingVariable || !validGroupsForIncludingAndExcludingAllOthers.includes(estimate.groupingVariable))
            .map((estimate) => ({
              ...estimate,
              sex: estimate.sex ? [ estimate.sex ] : [],
              ageGroup: estimate.ageGroup ? [ estimate.ageGroup ] : [],
            })),
        }
      }

      const genderEstimates = data.filter((estimate) => estimate.groupingVariable === ArbovirusGroupingVariable.GENDER);

      if(genderEstimates.length === 2) {
        const overallSampleSize = sum(genderEstimates.map((estimate) => estimate.sampleSize));
        const overallSampleNumerator = sum(genderEstimates.map((estimate) => estimate.sampleNumerator ?? 0));
        const overallSeroprevalence = overallSampleNumerator / overallSampleSize;

        return {
          shownEstimates: [{
            ...genderEstimates[0],
            sex: genderEstimates
              .map((estimate) => estimate.sex)
              .filter((sex): sex is NonNullable<typeof sex> => !!sex),
            ageGroup: genderEstimates[0].ageGroup ? [ genderEstimates[0].ageGroup ] : [],
            seroprevalence: overallSeroprevalence, 
            seroprevalenceCalculated95CILower: undefined,
            seroprevalenceCalculated95CIUpper: undefined,
            seroprevalenceStudy95CILower: undefined,
            seroprevalenceStudy95CIUpper: undefined,
            sampleSize: overallSampleSize, 
            sampleNumerator: overallSampleNumerator, 
          }],
          hiddenEstimates: data.map((estimate) => ({
            ...estimate,
            sex: estimate.sex ? [ estimate.sex ] : [],
            ageGroup: estimate.ageGroup ? [ estimate.ageGroup ] : [],
          }))
        }
      }

      const ageEstimates = data.filter((estimate) => !!estimate && estimate.groupingVariable === ArbovirusGroupingVariable.AGE);

      if(ageEstimates.length > 1) {
        const overallSampleSize = sum(ageEstimates.map((estimate) => estimate.sampleSize));
        const overallSampleNumerator = sum(ageEstimates.map((estimate) => estimate.sampleNumerator ?? 0));
        const overallSeroprevalence = overallSampleNumerator / overallSampleSize;

        return {
          shownEstimates: [{
            ...ageEstimates[0],
            ageGroup: ageEstimates
              .map((estimate) => estimate.ageGroup)
              .filter((ageGroup): ageGroup is NonNullable<typeof ageGroup> => !!ageGroup),
            sex: ageEstimates[0].sex ? [ ageEstimates[0].sex ] : [],
            seroprevalence: overallSeroprevalence, 
            seroprevalenceCalculated95CILower: undefined,
            seroprevalenceCalculated95CIUpper: undefined,
            seroprevalenceStudy95CILower: undefined,
            seroprevalenceStudy95CIUpper: undefined,
            sampleSize: overallSampleSize, 
            sampleNumerator: overallSampleNumerator, 
          }],
          hiddenEstimates: data
            .filter((estimate) => estimate.groupingVariable !== ArbovirusGroupingVariable.GENDER)
            .map((estimate) => ({
              ...estimate,
              sex: estimate.sex ? [ estimate.sex ] : [],
              ageGroup: estimate.ageGroup ? [ estimate.ageGroup ] : [],
            }))
        }
      }

      return {
        shownEstimates: data.map((estimate) => ({
          ...estimate,
          sex: estimate.sex ? [ estimate.sex ] : [],
          ageGroup: estimate.ageGroup ? [ estimate.ageGroup ] : [],
        })),
        hiddenEstimates: []
      }
    }),
  );

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allCountries: input.allCountries,
    environmentalSuitabilityStatsByCountry: input.environmentalSuitabilityStatsByCountry,
    groupedEstimates: groupedEstimates,
    unravelledGroupedEstimates: input.unravelledGroupedEstimates,
    mongoClient: input.mongoClient
  };
}