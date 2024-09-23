import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep,
  CountryPopulationDataAfterGroupingEstimatesUnderPrimaryEstimatesStep,
  EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep,
  EstimateFilterOptionsAfterGroupingEstimatesUnderPrimaryEstimatesStep,
  FaoMersEventAfterGroupingEstimatesUnderPrimaryEstimatesStep,
  GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep,
  MacroSampleFrameFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep,
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
  'animalImportedOrLocal'
> & {
  animalImportedOrLocal: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['animalSourceLocationSubestimates'][number]['animalImportedOrLocal']>;
}
type ValidAnimalSeroprevalenceAnimalSourceLocationSubestimate = Omit<
  Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['animalSourceLocationSubestimates'][number], { type: MersEstimateType.ANIMAL_SEROPREVALENCE }>,
  'animalImportedOrLocal'
> & {
  animalImportedOrLocal: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['animalSourceLocationSubestimates'][number]['animalImportedOrLocal']>;
}
type ValidHumanViralCamelExposureLevelSubestimate = Omit<
  Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['camelExposureLevelSubestimates'][number], { type: MersEstimateType.HUMAN_VIRAL }>,
  'sampleFrame'|'exposureToCamels'
> & {
  details: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['camelExposureLevelSubestimates'][number]['subGroupingCategory']>;
  sampleFrame: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['camelExposureLevelSubestimates'][number]['sampleFrame']>;
  exposureToCamels: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['camelExposureLevelSubestimates'][number]['exposureToCamels']>;
}
type ValidHumanSeroprevalenceCamelExposureLevelSubestimate = Omit<
  Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['camelExposureLevelSubestimates'][number], { type: MersEstimateType.HUMAN_SEROPREVALENCE }>,
  'sampleFrame'|'exposureToCamels'
> & {
  details: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['camelExposureLevelSubestimates'][number]['subGroupingCategory']>;
  sampleFrame: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['camelExposureLevelSubestimates'][number]['sampleFrame']>;
  exposureToCamels: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['camelExposureLevelSubestimates'][number]['exposureToCamels']>;
}
type ValidHumanViralNomadismSubestimate = Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['nomadismSubestimates'][number], { type: MersEstimateType.HUMAN_VIRAL }> & {
  details: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['nomadismSubestimates'][number]['subGroupingCategory']>;
}
type ValidHumanSeroprevalenceNomadismSubestimate = Extract<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['nomadismSubestimates'][number], { type: MersEstimateType.HUMAN_SEROPREVALENCE }> & {
  details: NonNullable<GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep['nomadismSubestimates'][number]['subGroupingCategory']>;
}

export type EstimateFieldsAfterFilteringInvalidSubestimatesStep = EstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
export type GroupedEstimateFieldsAfterFilteringInvalidSubestimatesStep =Omit<
  GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep,
  'animalSpeciesSubestimates'|'sexSubestimates'|'timeFrameSubestimates'|
  'occupationSubestimates'|'animalSourceLocationSubestimates'|'camelExposureLevelSubestimates'|
  'nomadismSubestimates'
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
  camelExposureLevelSubestimates: Array<
    ValidHumanViralCamelExposureLevelSubestimate
    | ValidHumanSeroprevalenceCamelExposureLevelSubestimate
  >;
  nomadismSubestimates: Array<
    ValidHumanViralNomadismSubestimate
    | ValidHumanSeroprevalenceNomadismSubestimate
  >;
}
export type EstimateFilterOptionsAfterFilteringInvalidSubestimatesStep = EstimateFilterOptionsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
export type SourceFieldsAfterFilteringInvalidSubestimatesStep = SourceFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
export type StudyFieldsAfterFilteringInvalidSubestimatesStep = StudyFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
export type CountryFieldsAfterFilteringInvalidSubestimatesStep = CountryFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
export type MacroSampleFrameFieldsAfterFilteringInvalidSubestimatesStep = MacroSampleFrameFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
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
  allMacroSampleFrames: MacroSampleFrameFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
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
  allMacroSampleFrames: MacroSampleFrameFieldsAfterFilteringInvalidSubestimatesStep[];
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
          animalCountriesOfImport: subestimate.animalCountriesOfImport,
        }))
        .filter((subestimate): subestimate is GroupedEstimateFieldsAfterFilteringInvalidSubestimatesStep['animalSourceLocationSubestimates'][number] =>
           !!subestimate.animalImportedOrLocal && (subestimate.type === MersEstimateType.ANIMAL_SEROPREVALENCE || subestimate.type === MersEstimateType.ANIMAL_VIRAL)
        ),
      animalSamplingContextSubestimates: groupedEstimate.animalSamplingContextSubestimates,
      camelExposureLevelSubestimates: groupedEstimate.camelExposureLevelSubestimates
        .map((subestimate) => ({ ...subestimate, details: subestimate.subGroupingCategory }))
        .filter((subestimate): subestimate is GroupedEstimateFieldsAfterFilteringInvalidSubestimatesStep['camelExposureLevelSubestimates'][number] =>
           !!subestimate.details && !!subestimate.sampleFrame && !!subestimate.exposureToCamels && (subestimate.type === MersEstimateType.HUMAN_SEROPREVALENCE || subestimate.type === MersEstimateType.HUMAN_VIRAL)
        ),
      nomadismSubestimates: groupedEstimate.nomadismSubestimates
        .map((subestimate) => ({ ...subestimate, details: subestimate.subGroupingCategory }))
        .filter((subestimate): subestimate is GroupedEstimateFieldsAfterFilteringInvalidSubestimatesStep['nomadismSubestimates'][number] =>
           !!subestimate.details && (subestimate.type === MersEstimateType.HUMAN_SEROPREVALENCE || subestimate.type === MersEstimateType.HUMAN_VIRAL)
        ),
      humanCountriesOfTravelSubestimates: groupedEstimate.humanCountriesOfTravelSubestimates,
    })),
    allSources: input.allSources,
    estimateFilterOptions: input.estimateFilterOptions,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
}