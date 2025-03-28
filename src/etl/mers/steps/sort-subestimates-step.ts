import { MongoClient } from "mongodb";
import { isAfter, isEqual } from "date-fns";
import {
  CountryFieldsAfterFilteringInvalidSubestimatesStep,
  CountryPopulationDataAfterFilteringInvalidSubestimatesStep,
  EstimateFieldsAfterFilteringInvalidSubestimatesStep,
  EstimateFilterOptionsAfterFilteringInvalidSubestimatesStep,
  FaoMersEventAfterFilteringInvalidSubestimatesStep,
  GroupedEstimateFieldsAfterFilteringInvalidSubestimatesStep,
  MacroSampleFrameFieldsAfterFilteringInvalidSubestimatesStep,
  SourceFieldsAfterFilteringInvalidSubestimatesStep,
  StudyFieldsAfterFilteringInvalidSubestimatesStep,
  WhoCaseDataAfterFilteringInvalidSubestimatesStep,
  YearlyCamelPopulationDataAfterFilteringInvalidSubestimatesStep
} from "./filter-invalid-subestimates-step";

export type EstimateFieldsAfterSortingSubestimatesStep = EstimateFieldsAfterFilteringInvalidSubestimatesStep;
export type GroupedEstimateFieldsAfterSortingSubestimatesStep = GroupedEstimateFieldsAfterFilteringInvalidSubestimatesStep;
export type EstimateFilterOptionsAfterSortingSubestimatesStep = EstimateFilterOptionsAfterFilteringInvalidSubestimatesStep;
export type SourceFieldsAfterSortingSubestimatesStep = SourceFieldsAfterFilteringInvalidSubestimatesStep;
export type StudyFieldsAfterSortingSubestimatesStep = StudyFieldsAfterFilteringInvalidSubestimatesStep;
export type CountryFieldsAfterSortingSubestimatesStep = CountryFieldsAfterFilteringInvalidSubestimatesStep;
export type MacroSampleFrameFieldsAfterSortingSubestimatesStep = MacroSampleFrameFieldsAfterFilteringInvalidSubestimatesStep;
export type FaoMersEventAfterSortingSubestimatesStep = FaoMersEventAfterFilteringInvalidSubestimatesStep;
export type YearlyCamelPopulationDataAfterSortingSubestimatesStep = YearlyCamelPopulationDataAfterFilteringInvalidSubestimatesStep;
export type CountryPopulationDataAfterSortingSubestimatesStep = CountryPopulationDataAfterFilteringInvalidSubestimatesStep;
export type WhoCaseDataAfterSortingSubestimatesStep = WhoCaseDataAfterFilteringInvalidSubestimatesStep;

interface SortSubestimatesStepInput {
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
  whoCaseData: WhoCaseDataAfterFilteringInvalidSubestimatesStep[];
  mongoClient: MongoClient;
}

interface SortSubestimatesStepOutput {
  allEstimates: EstimateFieldsAfterSortingSubestimatesStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterSortingSubestimatesStep[];
  allSources: SourceFieldsAfterSortingSubestimatesStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterSortingSubestimatesStep;
  allStudies: StudyFieldsAfterSortingSubestimatesStep[];
  allCountries: CountryFieldsAfterSortingSubestimatesStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterSortingSubestimatesStep[];
  allFaoMersEvents: FaoMersEventAfterSortingSubestimatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterSortingSubestimatesStep[];
  countryPopulationData: CountryPopulationDataAfterSortingSubestimatesStep[];
  whoCaseData: WhoCaseDataAfterSortingSubestimatesStep[];
  mongoClient: MongoClient;
}

export const sortSubestimatesStep = (input: SortSubestimatesStepInput): SortSubestimatesStepOutput => {
  console.log(`Running step: sortSubestimatesStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates,
    allGroupedEstimates: input.allGroupedEstimates.map((groupedEstimate) => ({
      primaryEstimate: groupedEstimate.primaryEstimate,
      geographicalAreaSubestimates: groupedEstimate.geographicalAreaSubestimates
        .sort((subestimateA, subestimateB) => {
          if(subestimateA.country !== subestimateB.country) {
            return subestimateA.country > subestimateB.country ? 1 : -1;
          }
          if(!subestimateA.state) {
            return -1
          }
          if(!subestimateB.state) {
            return 1
          }
          if(subestimateA.state !== subestimateB.state) {
            return subestimateA.state > subestimateB.state ? 1 : -1;
          }
          if(!subestimateA.city) {
            return -1
          }
          if(!subestimateB.city) {
            return 1
          }
          if(subestimateA.city !== subestimateB.city) {
            return subestimateA.city > subestimateB.city ? 1 : -1;
          }
          return 0;
        }),
      ageGroupSubestimates: groupedEstimate.ageGroupSubestimates
        .sort((subestimateA, subestimateB) => {
          if(subestimateA.ageMinimum === undefined) {
            return -1
          }
          if(subestimateB.ageMinimum === undefined) {
            return 1
          }
          if(subestimateA.ageMinimum !== subestimateB.ageMinimum) {
            return subestimateA.ageMinimum > subestimateB.ageMinimum ? 1 : -1;
          }
          return 0;
        }),
      testUsedSubestimates: groupedEstimate.testUsedSubestimates
        .sort((subestimateA, subestimateB) => subestimateA.assay.join(',') > subestimateB.assay.join(',') ? 1 : -1),
      animalSpeciesSubestimates: groupedEstimate.animalSpeciesSubestimates
        .sort((subestimateA, subestimateB) => {
          let index = 0;

          while(index < subestimateA.animalSpecies.length && index < subestimateB.animalSpecies.length) {
            const subestimateASpecies = subestimateA.animalSpecies[index];
            const subestimateBSpecies = subestimateB.animalSpecies[index];

            if(subestimateASpecies !== subestimateBSpecies) {
              return subestimateASpecies > subestimateBSpecies ? 1 : -1;
            }
            index++;
          }

          return subestimateA.animalCountriesOfImport.length - subestimateB.animalCountriesOfImport.length
        }),
      sexSubestimates: groupedEstimate.sexSubestimates
        .sort((subestimateA, subestimateB) => subestimateA.sex > subestimateB.sex ? 1 : -1),
      timeFrameSubestimates: groupedEstimate.timeFrameSubestimates
        .sort((subestimateA, subestimateB) => {
          if(!subestimateA.samplingStartDate && !subestimateB.samplingStartDate) {
            if(isEqual(subestimateA.samplingEndDate, subestimateB.samplingEndDate)) {
              return 0;
            }

            return isAfter(subestimateA.samplingEndDate, subestimateB.samplingEndDate) ? 1 : -1;
          }
          if(!subestimateA.samplingStartDate) {
            return -1
          }
          if(!subestimateB.samplingStartDate) {
            return 1
          }
          if(isEqual(subestimateA.samplingStartDate, subestimateB.samplingStartDate)) {
            if(isEqual(subestimateA.samplingEndDate, subestimateB.samplingEndDate)) {
              return 0;
            }

            return isAfter(subestimateA.samplingEndDate, subestimateB.samplingEndDate) ? 1 : -1;
          }

          return isAfter(subestimateA.samplingStartDate, subestimateB.samplingStartDate) ? 1 : -1;
        }),
      sampleTypeSubestimates: groupedEstimate.sampleTypeSubestimates
        .sort((subestimateA, subestimateB) => subestimateA.specimenType.join(',') > subestimateB.specimenType.join(',') ? 1 : -1),
      occupationSubestimates: groupedEstimate.occupationSubestimates
        .sort((subestimateA, subestimateB) => subestimateA.occupation > subestimateB.occupation ? 1 : -1),
      animalSourceLocationSubestimates: groupedEstimate.animalSourceLocationSubestimates
        .sort((subestimateA, subestimateB) => {
          if(subestimateA.animalImportedOrLocal !== subestimateB.animalImportedOrLocal) {
            return subestimateA.animalImportedOrLocal > subestimateB.animalImportedOrLocal ? 1 : -1;
          }

          let index = 0;

          while(index < subestimateA.animalCountriesOfImport.length && index < subestimateB.animalCountriesOfImport.length) {
            const subestimateACountry = subestimateA.animalCountriesOfImport[index];
            const subestimateBCountry = subestimateB.animalCountriesOfImport[index];

            if(subestimateACountry !== subestimateBCountry) {
              return subestimateACountry > subestimateBCountry ? 1 : -1;
            }
            index++;
          }

          return subestimateA.animalCountriesOfImport.length - subestimateB.animalCountriesOfImport.length
        }),
      animalSamplingContextSubestimates: groupedEstimate.animalSamplingContextSubestimates
        .sort((subestimateA, subestimateB) => subestimateA.animalDetectionSettings.join(',') > subestimateB.animalDetectionSettings.join(',') ? 1 : -1),
      camelExposureLevelSubestimates: groupedEstimate.camelExposureLevelSubestimates
        .sort((subestimateA, subestimateB) => {
          if(subestimateA.details !== subestimateB.details) {
            return subestimateA.details > subestimateB.details ? 1 : -1;
          }

          const sortedSubestimateASampleFrames = [...subestimateA.sampleFrames].sort();
          const sortedSubestimateBSampleFrames = [...subestimateB.sampleFrames].sort();
          const mostAmountOfSampleFramesBetweenBothSubestimates =
            Math.max(sortedSubestimateASampleFrames.length, sortedSubestimateBSampleFrames.length);

          let index = 0;

          while(index < mostAmountOfSampleFramesBetweenBothSubestimates) {
            const sampleFrameA = sortedSubestimateASampleFrames.at(index);
            const sampleFrameB = sortedSubestimateASampleFrames.at(index);
            index++;

            if(sampleFrameA === sampleFrameB) {
              continue;
            }

            if(!sampleFrameA) return 1;
            if(!sampleFrameB) return -1;

            return subestimateA.sampleFrames > subestimateB.sampleFrames ? 1 : -1;
          }
          if(subestimateA.exposureToCamels !== subestimateB.exposureToCamels) {
            return subestimateA.exposureToCamels > subestimateB.exposureToCamels ? 1 : -1;
          }

          return 0;
        }),
      nomadismSubestimates: groupedEstimate.nomadismSubestimates
        .sort((subestimateA, subestimateB) => {
          if(subestimateA.details !== subestimateB.details) {
            return subestimateA.details > subestimateB.details ? 1 : -1;
          }

          return 0;
        }),
      humanCountriesOfTravelSubestimates: groupedEstimate.humanCountriesOfTravelSubestimates
        .sort((subestimateA, subestimateB) => {
          let index = 0;

          while(index < subestimateA.humanCountriesOfTravel.length && index < subestimateB.humanCountriesOfTravel.length) {
            const subestimateACountry = subestimateA.humanCountriesOfTravel[index];
            const subestimateBCountry = subestimateB.humanCountriesOfTravel[index];

            if(subestimateACountry !== subestimateBCountry) {
              return subestimateACountry > subestimateBCountry ? 1 : -1;
            }
            index++;
          }

          return subestimateA.humanCountriesOfTravel.length - subestimateB.humanCountriesOfTravel.length
        })
    })),
    allSources: input.allSources,
    estimateFilterOptions: input.estimateFilterOptions,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  }
}