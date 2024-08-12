import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep,
  CountryPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep,
  EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep,
  EstimateFilterOptionsAfterGroupingEstimatesUnderPrimaryEstimatesStep,
  FaoMersEventAfterGroupingEstimatesUnderPrimaryEstimatesStep,
  GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep,
  SourceFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep,
  StudyFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep,
  YearlyCamelPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep
} from "./group-estimates-under-primary-estimates-step";
import { MersEstimateType } from "../../../storage/types.js";

type ValidAnimalViralAnimalSpeciesSubestimate = Omit<
  Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['animalSpeciesSubestimates'][number], { type: MersEstimateType.ANIMAL_VIRAL }>,
  'animalSpecies'
> & {
  animalSpecies: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['animalSpeciesSubestimates'][number]['animalSpecies']>;
}
type ValidAnimalSeroprevalenceAnimalSpeciesSubestimate = Omit<
  Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['animalSpeciesSubestimates'][number], { type: MersEstimateType.ANIMAL_SEROPREVALENCE }>,
  'animalSpecies'
> & {
  animalSpecies: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['animalSpeciesSubestimates'][number]['animalSpecies']>;
}
type ValidAnimalViralSexSubestimate = Omit<
  Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['sexSubestimates'][number], { type: MersEstimateType.ANIMAL_VIRAL }>,
  'sex'
> & {
  sex: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['sexSubestimates'][number]['sex']>;
}
type ValidAnimalSeroprevalenceSexSubestimate = Omit<
  Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['sexSubestimates'][number], { type: MersEstimateType.ANIMAL_SEROPREVALENCE }>,
  'sex'
> & {
  sex: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['sexSubestimates'][number]['sex']>;
}
type ValidHumanViralSexSubestimate = Omit<
  Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['sexSubestimates'][number], { type: MersEstimateType.HUMAN_VIRAL }>,
  'sex'
> & {
  sex: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['sexSubestimates'][number]['sex']>;
}
type ValidHumanSeroprevalenceSexSubestimate = Omit<
  Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['sexSubestimates'][number], { type: MersEstimateType.HUMAN_SEROPREVALENCE }>,
  'sex'
> & {
  sex: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['sexSubestimates'][number]['sex']>;
}
type ValidAnimalViralTimeFrameSubestimate = Omit<
  Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['timeFrameSubestimates'][number], { type: MersEstimateType.ANIMAL_VIRAL }>,
  'samplingStartDate'|'samplingEndDate'
> & {
  samplingStartDate: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['timeFrameSubestimates'][number]['samplingStartDate']>;
  samplingEndDate: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['timeFrameSubestimates'][number]['samplingEndDate']>;
}
type ValidAnimalSeroprevalenceTimeFrameSubestimate = Omit<
  Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['timeFrameSubestimates'][number], { type: MersEstimateType.ANIMAL_SEROPREVALENCE }>,
  'samplingStartDate'|'samplingEndDate'
> & {
  samplingStartDate: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['timeFrameSubestimates'][number]['samplingStartDate']>;
  samplingEndDate: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['timeFrameSubestimates'][number]['samplingEndDate']>;
}
type ValidHumanViralTimeFrameSubestimate = Omit<
  Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['timeFrameSubestimates'][number], { type: MersEstimateType.HUMAN_VIRAL }>,
  'samplingStartDate'|'samplingEndDate'
> & {
  samplingStartDate: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['timeFrameSubestimates'][number]['samplingStartDate']>;
  samplingEndDate: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['timeFrameSubestimates'][number]['samplingEndDate']>;
}
type ValidHumanSeroprevalenceTimeFrameSubestimate = Omit<
  Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['timeFrameSubestimates'][number], { type: MersEstimateType.HUMAN_SEROPREVALENCE }>,
  'samplingStartDate'|'samplingEndDate'
> & {
  samplingStartDate: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['timeFrameSubestimates'][number]['samplingStartDate']>;
  samplingEndDate: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['timeFrameSubestimates'][number]['samplingEndDate']>;
}
type ValidAnimalViralOccupationSubestimate = Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['occupationSubestimates'][number], { type: MersEstimateType.ANIMAL_VIRAL }> & {
  occupation: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['sampleTypeSubestimates'][number]['subGroupingCategory']>;
}
type ValidAnimalSeroprevalenceOccupationSubestimate = Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['occupationSubestimates'][number], { type: MersEstimateType.ANIMAL_SEROPREVALENCE }> & {
  occupation: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['sampleTypeSubestimates'][number]['subGroupingCategory']>;
}
type ValidHumanViralOccupationSubestimate = Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['occupationSubestimates'][number], { type: MersEstimateType.HUMAN_VIRAL }> & {
  occupation: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['sampleTypeSubestimates'][number]['subGroupingCategory']>;
}
type ValidHumanSeroprevalenceOccupationSubestimate = Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['occupationSubestimates'][number], { type: MersEstimateType.HUMAN_SEROPREVALENCE }> & {
  occupation: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['sampleTypeSubestimates'][number]['subGroupingCategory']>;
}
type ValidAnimalViralAnimalSourceLocationSubestimate = Omit<
  Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['animalSourceLocationSubestimates'][number], { type: MersEstimateType.ANIMAL_VIRAL }>,
  'animalImportedOrLocal'|'animalCountryOfImport'|'animalCountryOfImportAlphaTwoCode'|'animalCountryOfImportAlphaThreeCode'
> & {
  animalImportedOrLocal: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['animalSourceLocationSubestimates'][number]['animalImportedOrLocal']>;
  animalCountryOfImport: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['animalSourceLocationSubestimates'][number]['animalCountryOfImport']>['country'];
  animalCountryOfImportAlphaTwoCode: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['animalSourceLocationSubestimates'][number]['animalCountryOfImport']>['countryAlphaTwoCode'];
  animalCountryOfImportAlphaThreeCode: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['animalSourceLocationSubestimates'][number]['animalCountryOfImport']>['countryAlphaThreeCode'];
}
type ValidAnimalSeroprevalenceAnimalSourceLocationSubestimate = Omit<
  Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['animalSourceLocationSubestimates'][number], { type: MersEstimateType.ANIMAL_SEROPREVALENCE }>,
  'animalImportedOrLocal'|'animalCountryOfImport'|'animalCountryOfImportAlphaTwoCode'|'animalCountryOfImportAlphaThreeCode'
> & {
  animalImportedOrLocal: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['animalSourceLocationSubestimates'][number]['animalImportedOrLocal']>;
  animalCountryOfImport: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['animalSourceLocationSubestimates'][number]['animalCountryOfImport']>['country'];
  animalCountryOfImportAlphaTwoCode: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['animalSourceLocationSubestimates'][number]['animalCountryOfImport']>['countryAlphaTwoCode'];
  animalCountryOfImportAlphaThreeCode: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['animalSourceLocationSubestimates'][number]['animalCountryOfImport']>['countryAlphaThreeCode'];
}

export type EstimateFieldsAfterFilteringInvalidSubestimatesStep = EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
export type GroupedEstimateFieldsAfterFilteringInvalidSubestimatesStep =Omit<
  GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep,
  'animalSpeciesSubestimates'|'sexSubestimates'|'timeFrameSubestimates'|'occupationSubestimates'|'animalSourceLocationSubestimates'
> & {
  animalSpeciesSubestimates: Array<
    ValidAnimalViralAnimalSpeciesSubestimate
    | ValidAnimalSeroprevalenceAnimalSpeciesSubestimate
  >;
  sexSubestimates: Array<
    ValidAnimalViralSexSubestimate
    | ValidAnimalSeroprevalenceSexSubestimate
    | ValidHumanViralSexSubestimate
    | ValidHumanSeroprevalenceSexSubestimate
  >;
  timeFrameSubestimates: Array<
    ValidAnimalViralTimeFrameSubestimate
    | ValidAnimalSeroprevalenceTimeFrameSubestimate
    | ValidHumanViralTimeFrameSubestimate
    | ValidHumanSeroprevalenceTimeFrameSubestimate
  >;
  occupationSubestimates: Array<
    ValidAnimalViralOccupationSubestimate
    | ValidAnimalSeroprevalenceOccupationSubestimate
    | ValidHumanViralOccupationSubestimate
    | ValidHumanSeroprevalenceOccupationSubestimate
  >;
  animalSourceLocationSubestimates: Array<
    ValidAnimalViralAnimalSourceLocationSubestimate
    | ValidAnimalSeroprevalenceAnimalSourceLocationSubestimate
  >;
}
export type EstimateFilterOptionsAfterFilteringInvalidSubestimatesStep = EstimateFilterOptionsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
export type SourceFieldsAfterFilteringInvalidSubestimatesStep = SourceFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
export type StudyFieldsAfterFilteringInvalidSubestimatesStep = StudyFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
export type CountryFieldsAfterFilteringInvalidSubestimatesStep = CountryFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
export type FaoMersEventAfterFilteringInvalidSubestimatesStep = FaoMersEventAfterGroupingEstimatesUnderPrimaryEstimatesStep;
export type YearlyCamelPopulationDataAfterFilteringInvalidSubestimatesStep = YearlyCamelPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep;
export type CountryPopulationDataAfterFilteringInvalidSubestimatesStep = CountryPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep;

interface FilterInvalidSubestimatesStepInput {
  allEstimates: EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allSources: SourceFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
  allStudies: StudyFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allCountries: CountryFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allFaoMersEvents: FaoMersEventAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  countryPopulationData: CountryPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  mongoClient: MongoClient;
}

interface FilterInvalidSubestimatesStepOutput {
  allEstimates: EstimateFieldsAfterFilteringInvalidSubestimatesStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterFilteringInvalidSubestimatesStep[];
  allSources: SourceFieldsAfterFilteringInvalidSubestimatesStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterFilteringInvalidSubestimatesStep;
  allStudies: StudyFieldsAfterFilteringInvalidSubestimatesStep[];
  allCountries: CountryFieldsAfterFilteringInvalidSubestimatesStep[];
  allFaoMersEvents: FaoMersEventAfterFilteringInvalidSubestimatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterFilteringInvalidSubestimatesStep[];
  countryPopulationData: CountryPopulationDataAfterFilteringInvalidSubestimatesStep[];
  mongoClient: MongoClient;
}

export const filterInvalidSubestimatesStep = (input: FilterInvalidSubestimatesStepInput): FilterInvalidSubestimatesStepOutput => {
  console.log(`Running step: filterInvalidSubestimatesStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates,
    allGroupedEstimates: input.allGroupedEstimates.map((groupedEstimate) => ({
      primaryEstimate: groupedEstimate.primaryEstimate,
      geographicalAreaSubestimates: groupedEstimate.geographicalAreaSubestimates,
      ageGroupSubestimates: groupedEstimate.ageGroupSubestimates,
      testUsedSubestimates: groupedEstimate.testUsedSubestimates,
      animalSpeciesSubestimates: groupedEstimate.animalSpeciesSubestimates
        .filter((subestimate): subestimate is GroupedEstimateFieldsAfterFilteringInvalidSubestimatesStep['animalSpeciesSubestimates'][number] =>
          !!subestimate.animalSpecies && (subestimate.type === MersEstimateType.ANIMAL_SEROPREVALENCE || subestimate.type === MersEstimateType.ANIMAL_VIRAL)
        ),
      sexSubestimates: groupedEstimate.sexSubestimates
        .filter((subestimate): subestimate is GroupedEstimateFieldsAfterFilteringInvalidSubestimatesStep['sexSubestimates'][number] => !!subestimate.sex),
      timeFrameSubestimates: groupedEstimate.timeFrameSubestimates
        .filter((subestimate): subestimate is GroupedEstimateFieldsAfterFilteringInvalidSubestimatesStep['timeFrameSubestimates'][number] => !!subestimate.samplingStartDate && !!subestimate.samplingEndDate),
      sampleTypeSubestimates: groupedEstimate.sampleTypeSubestimates,
      occupationSubestimates: groupedEstimate.occupationSubestimates
        .map((subestimate) => ({ ...subestimate, occupation: subestimate.subGroupingCategory }))
        .filter((subestimate): subestimate is GroupedEstimateFieldsAfterFilteringInvalidSubestimatesStep['occupationSubestimates'][number] => !!subestimate.occupation),
      animalSourceLocationSubestimates: groupedEstimate.animalSourceLocationSubestimates
        .map((subestimate) => ({
          ...subestimate,
          animalImportedOrLocal: subestimate.animalImportedOrLocal,
          animalCountryOfImport: subestimate.animalCountryOfImport?.country,
          animalCountryOfImportAlphaTwoCode: subestimate.animalCountryOfImport?.countryAlphaTwoCode,
          animalCountryOfImportAlphaThreeCode: subestimate.animalCountryOfImport?.countryAlphaThreeCode
        }))
        .filter((subestimate): subestimate is GroupedEstimateFieldsAfterFilteringInvalidSubestimatesStep['animalSourceLocationSubestimates'][number] =>
           !!subestimate.animalImportedOrLocal && !!subestimate.animalCountryOfImport && (subestimate.type === MersEstimateType.ANIMAL_SEROPREVALENCE || subestimate.type === MersEstimateType.ANIMAL_VIRAL)
        ),
      animalSamplingContextSubestimates: groupedEstimate.animalSamplingContextSubestimates
    })),
    allSources: input.allSources,
    estimateFilterOptions: input.estimateFilterOptions,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
}