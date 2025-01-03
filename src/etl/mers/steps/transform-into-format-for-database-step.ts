import { MongoClient, ObjectId } from "mongodb";
import assertNever from "assert-never";
import {
  MersEstimateDocument,
  MersEventType,
  FaoMersEventDocumentBase,
  FaoMersEventDocument,
  FaoYearlyCamelPopulationDataDocument,
  MersEstimateType,
  MersEstimateDocumentBase,
  MersEstimateFilterOptionsDocument,
  MersPrimaryEstimateDocument,
  MersSubEstimateBase,
  MersMacroSampleFrameDocument,
  MersMacroSampleFrame,
  MersWhoCaseDataEntryDocument
} from "../../../storage/types.js";
import {
  CountryFieldsAfterSortingSubestimatesStep,
  CountryPopulationDataAfterSortingSubestimatesStep,
  EstimateFieldsAfterSortingSubestimatesStep,
  EstimateFilterOptionsAfterSortingSubestimatesStep,
  FaoMersEventAfterSortingSubestimatesStep,
  GroupedEstimateFieldsAfterSortingSubestimatesStep,
  MacroSampleFrameFieldsAfterSortingSubestimatesStep,
  SourceFieldsAfterSortingSubestimatesStep,
  StudyFieldsAfterSortingSubestimatesStep,
  WhoCaseDataAfterSortingSubestimatesStep,
  YearlyCamelPopulationDataAfterSortingSubestimatesStep
} from "./sort-subestimates-step.js";

export type EstimateFieldsAfterTransformingFormatForDatabaseStep = MersEstimateDocument;
export type GroupedEstimateFieldsAfterTransformingFormatForDatabaseStep = MersPrimaryEstimateDocument;
export type SourceFieldsAfterTransformingFormatForDatabaseStep = SourceFieldsAfterSortingSubestimatesStep;
export type EstimateFilterOptionsAfterTransformingFormatForDatabaseStep = MersEstimateFilterOptionsDocument;
export type StudyFieldsAfterTransformingFormatForDatabaseStep = StudyFieldsAfterSortingSubestimatesStep;
export type CountryFieldsAfterTransformingFormatForDatabaseStep = CountryFieldsAfterSortingSubestimatesStep;
export type MacroSampleFrameFieldsAfterTransformingFormatForDatabaseStep = MersMacroSampleFrameDocument;
export type FaoMersEventAfterTransformingFormatForDatabaseStep = FaoMersEventDocument;
export type YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep = FaoYearlyCamelPopulationDataDocument;
export type CountryPopulationDataAfterTransformingFormatForDatabaseStep = CountryPopulationDataAfterSortingSubestimatesStep;
export type WhoCaseDataAfterTransformingFormatForDatabaseStep = MersWhoCaseDataEntryDocument;

interface TransformIntoFormatForDatabaseStepInput {
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

interface TransformIntoFormatForDatabaseStepOutput {
  allEstimates: EstimateFieldsAfterTransformingFormatForDatabaseStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterTransformingFormatForDatabaseStep[];
  allSources: SourceFieldsAfterTransformingFormatForDatabaseStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterTransformingFormatForDatabaseStep;
  allStudies: StudyFieldsAfterTransformingFormatForDatabaseStep[];
  allCountries: CountryFieldsAfterTransformingFormatForDatabaseStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterTransformingFormatForDatabaseStep[];
  allFaoMersEvents: FaoMersEventAfterTransformingFormatForDatabaseStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep[];
  countryPopulationData: CountryPopulationDataAfterTransformingFormatForDatabaseStep[];
  whoCaseData: WhoCaseDataAfterTransformingFormatForDatabaseStep[];
  mongoClient: MongoClient;
}

interface TransformFaoMersEventBaseForDatabaseInput {
  event: FaoMersEventAfterSortingSubestimatesStep;
  createdAtForAllRecords: Date;
  updatedAtForAllRecords: Date;
}

const transformFaoMersEventBaseForDatabase = (input: TransformFaoMersEventBaseForDatabaseInput): FaoMersEventDocumentBase => ({
  _id: new ObjectId(),
  partitionKey: input.event.partitionKey,
  diagnosisStatus: input.event.diagnosisStatus,
  diagnosisSource: input.event.diagnosisSource,
  country: input.event.country,
  state: input.event.state,
  city: input.event.city,
  latitude: input.event.latitude,
  longitude: input.event.longitude,
  observationDate: input.event.observationDate,
  reportDate: input.event.reportDate,
  countryAlphaTwoCode: input.event.countryAlphaTwoCode,
  countryAlphaThreeCode: input.event.countryAlphaThreeCode,
  whoRegion: input.event.whoRegion,
  unRegion: input.event.unRegion,
  createdAt: input.createdAtForAllRecords,
  updatedAt: input.updatedAtForAllRecords,
})

interface TransformFaoMersEventForDatabaseInput {
  event: FaoMersEventAfterSortingSubestimatesStep;
  createdAtForAllRecords: Date;
  updatedAtForAllRecords: Date;
}

const transformFaoMersEventForDatabase = (input: TransformFaoMersEventForDatabaseInput): FaoMersEventDocument => {
  const { event, createdAtForAllRecords, updatedAtForAllRecords } = input;

  if(event.type === MersEventType.HUMAN) {
    return {
      ...transformFaoMersEventBaseForDatabase({
        event,
        createdAtForAllRecords,
        updatedAtForAllRecords
      }),
      type: MersEventType.HUMAN as const,
      humansAffected: event.humansAffected,
      humanDeaths: event.humanDeaths,
      animalSpecies: undefined,
      animalType: undefined
    }
  }

  if(event.type === MersEventType.ANIMAL) {
    return {
      ...transformFaoMersEventBaseForDatabase({
        event,
        createdAtForAllRecords,
        updatedAtForAllRecords
      }),
      type: MersEventType.ANIMAL as const,
      humansAffected: undefined,
      humanDeaths: undefined,
      animalSpecies: event.animalSpecies,
      animalType: event.animalType,
    }
  }

  assertNever(event);
}

interface TransformMersEstimateBaseForDatabaseInput {
  estimate: EstimateFieldsAfterSortingSubestimatesStep;
  createdAtForAllRecords: Date;
  updatedAtForAllRecords: Date;
}

const transformMersEstimateBaseForDatabase = (input: TransformMersEstimateBaseForDatabaseInput): MersEstimateDocumentBase => ({
  _id: new ObjectId(),
  estimateId: input.estimate.estimateId,
  subGroupingVariable: input.estimate.subGroupingVariable,
  city: input.estimate.city,
  state: input.estimate.state,
  district: input.estimate.district,
  country: input.estimate.country,
  countryAlphaTwoCode: input.estimate.countryAlphaTwoCode,
  countryAlphaThreeCode: input.estimate.countryAlphaThreeCode,
  whoRegion: input.estimate.whoRegion,
  unRegion: input.estimate.unRegion,
  latitude: input.estimate.latitude,
  longitude: input.estimate.longitude,
  firstAuthorFullName: input.estimate.study.source.firstAuthorFullName,
  sourcePublicationYear: input.estimate.study.source.publicationYear,
  sourceUrl: input.estimate.study.source.url,
  sourceType: input.estimate.study.source.type,
  sourceTitle: input.estimate.study.source.title,
  insitutution: input.estimate.study.source.insitutution,
  studyInclusionCriteria: input.estimate.study.inclusionCriteria,
  studyExclusionCriteria: input.estimate.study.exclusionCriteria,
  sensitivity: input.estimate.sensitivity,
  sensitivity95CILower: input.estimate.sensitivity95CILower,
  sensitivity95CIUpper: input.estimate.sensitivity95CIUpper,
  sensitivityDenominator: input.estimate.sensitivityDenominator,
  specificity: input.estimate.specificity,
  specificity95CILower: input.estimate.specificity95CILower,
  specificity95CIUpper: input.estimate.specificity95CIUpper,
  specificityDenominator: input.estimate.specificityDenominator,
  sampleDenominator: input.estimate.sampleDenominator,
  sampleNumerator: input.estimate.sampleNumerator,
  assay: input.estimate.assay,
  specimenType: input.estimate.specimenType,
  sex: input.estimate.sex,
  socioeconomicStatus: input.estimate.socioeconomicStatus,
  exposureToCamels: input.estimate.exposureToCamels,
  isotypes: input.estimate.isotypes,
  antigen: input.estimate.antigen,
  samplingStartDate: input.estimate.samplingStartDate,
  samplingEndDate: input.estimate.samplingEndDate,
  samplingMidDate: input.estimate.samplingMidDate,
  samplingMethod: input.estimate.samplingMethod,
  geographicScope: input.estimate.geographicScope,
  testProducer: input.estimate.testProducer,
  testProducerOther: input.estimate.testProducerOther,
  testValidation: input.estimate.testValidation,
  testValidatedOn: input.estimate.testValidatedOn,
  positiveCutoff: input.estimate.positiveCutoff,
  symptomPrevalenceOfPositives: input.estimate.symptomPrevalenceOfPositives,
  symptomDefinition: input.estimate.symptomDefinition,
  sequencingDone: input.estimate.sequencingDone,
  clade: input.estimate.clade,
  accessionNumbers: input.estimate.accessionNumbers,
  genomeSequenced: input.estimate.genomeSequenced,
  createdAt: input.createdAtForAllRecords,
  updatedAt: input.updatedAtForAllRecords,
})

interface TransformMersEstimateForDatabaseInput {
  estimate: EstimateFieldsAfterSortingSubestimatesStep;
  createdAtForAllRecords: Date;
  updatedAtForAllRecords: Date;
}

const transformMersEstimateForDatabase = (input: TransformMersEstimateForDatabaseInput): MersEstimateDocument => {
  const { estimate, createdAtForAllRecords, updatedAtForAllRecords } = input;

  if(estimate.type === MersEstimateType.HUMAN_SEROPREVALENCE) {
    return {
      ...transformMersEstimateBaseForDatabase({ estimate, createdAtForAllRecords, updatedAtForAllRecords }),
      type: MersEstimateType.HUMAN_SEROPREVALENCE,
      seroprevalence: estimate.seroprevalence,
      seroprevalence95CILower: estimate.seroprevalence95CILower,
      seroprevalence95CIUpper: estimate.seroprevalence95CIUpper,
      seroprevalenceCalculated95CILower: estimate.seroprevalenceCalculated95CILower,
      seroprevalenceCalculated95CIUpper: estimate.seroprevalenceCalculated95CIUpper,
      ageGroup: estimate.ageGroup,
      sampleFrames: estimate.sampleFrames,
      humanCountriesOfTravel: estimate.humanCountriesOfTravel.map((element) => ({
        country: element.country,
        countryAlphaTwoCode: element.countryAlphaTwoCode,
        countryAlphaThreeCode: element.countryAlphaThreeCode,
      }))
    }
  }

  if(estimate.type === MersEstimateType.HUMAN_VIRAL) {
    return {
      ...transformMersEstimateBaseForDatabase({ estimate, createdAtForAllRecords, updatedAtForAllRecords }),
      type: MersEstimateType.HUMAN_VIRAL,
      positivePrevalence: estimate.positivePrevalence,
      positivePrevalence95CILower: estimate.positivePrevalence95CILower,
      positivePrevalence95CIUpper: estimate.positivePrevalence95CIUpper,
      positivePrevalenceCalculated95CILower: estimate.positivePrevalenceCalculated95CILower,
      positivePrevalenceCalculated95CIUpper: estimate.positivePrevalenceCalculated95CIUpper,
      ageGroup: estimate.ageGroup,
      sampleFrames: estimate.sampleFrames,
      humanCountriesOfTravel: estimate.humanCountriesOfTravel.map((element) => ({
        country: element.country,
        countryAlphaTwoCode: element.countryAlphaTwoCode,
        countryAlphaThreeCode: element.countryAlphaThreeCode,
      }))
    }
  }

  if(estimate.type === MersEstimateType.ANIMAL_SEROPREVALENCE) {
    return {
      ...transformMersEstimateBaseForDatabase({ estimate, createdAtForAllRecords, updatedAtForAllRecords }),
      type: MersEstimateType.ANIMAL_SEROPREVALENCE,
      seroprevalence: estimate.seroprevalence,
      seroprevalence95CILower: estimate.seroprevalence95CILower,
      seroprevalence95CIUpper: estimate.seroprevalence95CIUpper,
      seroprevalenceCalculated95CILower: estimate.seroprevalenceCalculated95CILower,
      seroprevalenceCalculated95CIUpper: estimate.seroprevalenceCalculated95CIUpper,
      animalSpecies: estimate.animalSpecies,
      animalType: estimate.animalType,
      animalDetectionSettings: estimate.animalDetectionSettings,
      animalPurpose: estimate.animalPurpose,
      animalImportedOrLocal: estimate.animalImportedOrLocal,
      animalAgeGroup: estimate.animalAgeGroup,
      animalCountriesOfImport: estimate.animalCountriesOfImport.map((element) => ({
        country: element.country,
        countryAlphaTwoCode: element.countryAlphaTwoCode,
        countryAlphaThreeCode: element.countryAlphaThreeCode,
      }))
    }
  }

  if(estimate.type === MersEstimateType.ANIMAL_VIRAL) {
    return {
      ...transformMersEstimateBaseForDatabase({ estimate, createdAtForAllRecords, updatedAtForAllRecords }),
      type: MersEstimateType.ANIMAL_VIRAL,
      positivePrevalence: estimate.positivePrevalence,
      positivePrevalence95CILower: estimate.positivePrevalence95CILower,
      positivePrevalence95CIUpper: estimate.positivePrevalence95CIUpper,
      positivePrevalenceCalculated95CILower: estimate.positivePrevalenceCalculated95CILower,
      positivePrevalenceCalculated95CIUpper: estimate.positivePrevalenceCalculated95CIUpper,
      animalSpecies: estimate.animalSpecies,
      animalType: estimate.animalType,
      animalDetectionSettings: estimate.animalDetectionSettings,
      animalPurpose: estimate.animalPurpose,
      animalImportedOrLocal: estimate.animalImportedOrLocal,
      animalAgeGroup: estimate.animalAgeGroup,
      animalCountriesOfImport: estimate.animalCountriesOfImport.map((element) => ({
        country: element.country,
        countryAlphaTwoCode: element.countryAlphaTwoCode,
        countryAlphaThreeCode: element.countryAlphaThreeCode,
      }))
    }
  }

  assertNever(estimate);
}

interface TransformMersEstimateFilterOptionsForDatabaseInput {
  estimateFilterOptions: EstimateFilterOptionsAfterSortingSubestimatesStep;
  createdAtForAllRecords: Date;
  updatedAtForAllRecords: Date;
}

const transformMersEstimateFilterOptionsForDatabase = (input: TransformMersEstimateFilterOptionsForDatabaseInput): MersEstimateFilterOptionsDocument => ({
  _id: new ObjectId(),
  sourceType: input.estimateFilterOptions.sourceType,
  ageGroup: input.estimateFilterOptions.ageGroup,
  assay: input.estimateFilterOptions.assay,
  specimenType: input.estimateFilterOptions.specimenType,
  sex: input.estimateFilterOptions.sex,
  isotypes: input.estimateFilterOptions.isotypes,
  samplingMethod: input.estimateFilterOptions.samplingMethod,
  geographicScope: input.estimateFilterOptions.geographicScope,
  animalDetectionSettings: input.estimateFilterOptions.animalDetectionSettings,
  animalPurpose: input.estimateFilterOptions.animalPurpose,
  animalSpecies: input.estimateFilterOptions.animalSpecies,
  animalImportedOrLocal: input.estimateFilterOptions.animalImportedOrLocal,
  sampleFrame: input.estimateFilterOptions.sampleFrame,
  testProducer: input.estimateFilterOptions.testProducer,
  testValidation: input.estimateFilterOptions.testValidation,
  exposureToCamels: input.estimateFilterOptions.exposureToCamels,
  antigen: input.estimateFilterOptions.antigen,
  clade: input.estimateFilterOptions.clade,
  createdAt: input.createdAtForAllRecords,
  updatedAt: input.updatedAtForAllRecords,
});

interface TransformMacroSampleFrameForDatabaseInput {
  macroSampleFrames: MacroSampleFrameFieldsAfterSortingSubestimatesStep[];
  createdAtForAllRecords: Date;
  updatedAtForAllRecords: Date;
}

const transformMacroSampleFrameForDatabase = (input: TransformMacroSampleFrameForDatabaseInput): MersMacroSampleFrameDocument[] => {
  const sampleFramesForHighRiskOccupationallyExposed = input.macroSampleFrames
    .filter((macroSampleFrame) => macroSampleFrame.populationType === 'High-risk' && macroSampleFrame.occupationallyExposedToDromedaries === true)
    .map((macroSampleFrame) => macroSampleFrame.sampleFrame);
  const sampleFramesForHighRiskNonOccupationallyExposed = input.macroSampleFrames
    .filter((macroSampleFrame) => macroSampleFrame.populationType === 'High-risk' && macroSampleFrame.occupationallyExposedToDromedaries === false)
    .map((macroSampleFrame) => macroSampleFrame.sampleFrame);
  const sampleFramesForGeneralPopulation = input.macroSampleFrames
    .filter((macroSampleFrame) => macroSampleFrame.populationType === 'General population')
    .map((macroSampleFrame) => macroSampleFrame.sampleFrame);
  const uncategorizedSampleFrames = input.macroSampleFrames
    .filter((macroSampleFrame) => (
      !sampleFramesForHighRiskOccupationallyExposed.includes(macroSampleFrame.sampleFrame) &&
      !sampleFramesForHighRiskNonOccupationallyExposed.includes(macroSampleFrame.sampleFrame) &&
      !sampleFramesForGeneralPopulation.includes(macroSampleFrame.sampleFrame)
    ))
    .map((macroSampleFrame) => macroSampleFrame.sampleFrame);

  return [{
    macroSampleFrame: MersMacroSampleFrame.HIGH_RISK_OCCUPATIONALLY_EXPOSED_TO_DROMEDARY_CAMELS,
    sampleFrames: sampleFramesForHighRiskOccupationallyExposed,
  }, {
    macroSampleFrame: MersMacroSampleFrame.HIGH_RISK_NOT_OCCUPATIONALLY_EXPOSED_TO_DROMEDARY_CAMELS,
    sampleFrames: sampleFramesForHighRiskNonOccupationallyExposed,
  }, {
    macroSampleFrame: MersMacroSampleFrame.GENERAL_POPULATION,
    sampleFrames: sampleFramesForGeneralPopulation,
  }, {
    macroSampleFrame: MersMacroSampleFrame.UNCATEGORIZED,
    sampleFrames: uncategorizedSampleFrames,
  }, {
    macroSampleFrame: MersMacroSampleFrame.HIGH_RISK_HEALTHCARE_WORKERS,
    sampleFrames: ['Healthcare workers'],
  }, {
    macroSampleFrame: MersMacroSampleFrame.HIGH_RISK_CLINICAL_MONITORING,
    sampleFrames: ['Suspected cases', 'Close contacts of cases'],
  }, {
    macroSampleFrame: MersMacroSampleFrame.HIGH_RISK_OTHER,
    sampleFrames: sampleFramesForHighRiskNonOccupationallyExposed
      .filter((sampleFrame) => !['Suspected cases', 'Close contacts of cases', 'Healthcare workers'].includes(sampleFrame))
  }].map((element) => ({
    _id: new ObjectId(),
    macroSampleFrame: element.macroSampleFrame,
    sampleFrames: element.sampleFrames,
    createdAt: input.createdAtForAllRecords,
    updatedAt: input.updatedAtForAllRecords,
  }))
};

const transformMersSubEstimateBaseForDatabaseInput = (estimate: 
  Pick<Extract<EstimateFieldsAfterSortingSubestimatesStep, {type: MersEstimateType.ANIMAL_SEROPREVALENCE }>,
    'id'|'estimateId'|'type'|'sampleDenominator'|
    'sampleNumerator'|'seroprevalence'|'seroprevalence95CILower'|'seroprevalence95CIUpper'|
    'seroprevalenceCalculated95CILower'|'seroprevalenceCalculated95CIUpper'
  >
  | Pick<Extract<EstimateFieldsAfterSortingSubestimatesStep, {type: MersEstimateType.HUMAN_SEROPREVALENCE }>,
    'id'|'estimateId'|'type'|'sampleDenominator'|
    'sampleNumerator'|'seroprevalence'|'seroprevalence95CILower'|'seroprevalence95CIUpper'|
    'seroprevalenceCalculated95CILower'|'seroprevalenceCalculated95CIUpper'
  >
  | Pick<Extract<EstimateFieldsAfterSortingSubestimatesStep, {type: MersEstimateType.ANIMAL_VIRAL }>,
    'id'|'estimateId'|'type'|'sampleDenominator'|
    'sampleNumerator'|'positivePrevalence'|'positivePrevalence95CILower'|'positivePrevalence95CIUpper'|
    'positivePrevalenceCalculated95CILower'|'positivePrevalenceCalculated95CIUpper'
  >
  | Pick<Extract<EstimateFieldsAfterSortingSubestimatesStep, {type: MersEstimateType.HUMAN_VIRAL }>,
    'id'|'estimateId'|'type'|'sampleDenominator'|
    'sampleNumerator'|'positivePrevalence'|'positivePrevalence95CILower'|'positivePrevalence95CIUpper'|
    'positivePrevalenceCalculated95CILower'|'positivePrevalenceCalculated95CIUpper'
  >
): MersSubEstimateBase => ({
  id: estimate.id,
  estimateId: estimate.estimateId,
  estimateInfo: estimate.type === MersEstimateType.ANIMAL_SEROPREVALENCE || estimate.type === MersEstimateType.HUMAN_SEROPREVALENCE ? {
    sampleDenominator: estimate.sampleDenominator,
    sampleNumerator: estimate.sampleNumerator,
    seroprevalence: estimate.seroprevalence,
    seroprevalence95CILower: estimate.seroprevalence95CILower,
    seroprevalence95CIUpper: estimate.seroprevalence95CIUpper,
    seroprevalenceCalculated95CILower: estimate.seroprevalenceCalculated95CILower,
    seroprevalenceCalculated95CIUpper: estimate.seroprevalenceCalculated95CIUpper
  } : {
    sampleDenominator: estimate.sampleDenominator,
    sampleNumerator: estimate.sampleNumerator,
    positivePrevalence: estimate.positivePrevalence,
    positivePrevalence95CILower: estimate.positivePrevalence95CILower,
    positivePrevalence95CIUpper: estimate.positivePrevalence95CIUpper,
    positivePrevalenceCalculated95CILower: estimate.positivePrevalenceCalculated95CILower,
    positivePrevalenceCalculated95CIUpper: estimate.positivePrevalenceCalculated95CIUpper
  }
})

interface TransformGroupedMersEstimatesForDatabaseInput {
  groupedEstimates: GroupedEstimateFieldsAfterSortingSubestimatesStep;
  createdAtForAllRecords: Date;
  updatedAtForAllRecords: Date;
}

const transformGroupedMersEstimatesForDatabase = (input: TransformGroupedMersEstimatesForDatabaseInput): GroupedEstimateFieldsAfterTransformingFormatForDatabaseStep => ({
  _id: new ObjectId(),
  estimateId: input.groupedEstimates.primaryEstimate.estimateId,
  primaryEstimateInfo: {
    ...transformMersEstimateForDatabase({
      estimate: input.groupedEstimates.primaryEstimate,
      createdAtForAllRecords: input.createdAtForAllRecords,
      updatedAtForAllRecords: input.updatedAtForAllRecords,
    }),
    id: new ObjectId(),
    createdAt: undefined,
    updatedAt: undefined,
  },
  geographicalAreaSubestimates: input.groupedEstimates.geographicalAreaSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      city: subestimate.city,
      state: subestimate.state,
      district: subestimate.district,
      country: subestimate.country,
      countryAlphaTwoCode: subestimate.countryAlphaTwoCode,
      countryAlphaThreeCode: subestimate.countryAlphaThreeCode,
      latitude: subestimate.latitude,
      longitude: subestimate.longitude,
      whoRegion: subestimate.whoRegion,
      unRegion: subestimate.unRegion,
      geographicScope: subestimate.geographicScope
    })),
  ageGroupSubestimates: input.groupedEstimates.ageGroupSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      ...( input.groupedEstimates.primaryEstimate.type === MersEstimateType.HUMAN_SEROPREVALENCE || input.groupedEstimates.primaryEstimate.type === MersEstimateType.HUMAN_VIRAL
        ? {
          ageGroup: subestimate.ageGroup,
          ageGroupLabel: subestimate.subGroupingCategory ? subestimate.subGroupingCategory : subestimate.ageGroup.join(',')
        }
        : {
          animalAgeGroup: subestimate.animalAgeGroup,
          animalAgeGroupLabel: subestimate.subGroupingCategory ? subestimate.subGroupingCategory : subestimate.animalAgeGroup.join(',')
        }
      ),
    })),
  testUsedSubestimates: input.groupedEstimates.testUsedSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      assay: subestimate.assay
    })),
  animalSpeciesSubestimates: input.groupedEstimates.animalSpeciesSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      animalSpecies: subestimate.animalSpecies
    })),
  sexSubestimates: input.groupedEstimates.sexSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      sex: subestimate.sex
    })),
  timeFrameSubestimates: input.groupedEstimates.timeFrameSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      samplingStartDate: subestimate.samplingStartDate,
      samplingEndDate: subestimate.samplingEndDate
    })),
  sampleTypeSubestimates: input.groupedEstimates.sampleTypeSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      specimenType: subestimate.specimenType,
    })),
  occupationSubestimates: input.groupedEstimates.occupationSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      occupation: subestimate.occupation,
      sampleFrames: subestimate.sampleFrames,
      exposureToCamels: subestimate.exposureToCamels
    })),
  animalSourceLocationSubestimates: input.groupedEstimates.animalSourceLocationSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      animalImportedOrLocal: subestimate.animalImportedOrLocal,
      animalCountriesOfImport: subestimate.animalCountriesOfImport.map((element) => ({
        country: element.country,
        countryAlphaTwoCode: element.countryAlphaTwoCode,
        countryAlphaThreeCode: element.countryAlphaThreeCode
      }))
    })),
  animalSamplingContextSubestimates: input.groupedEstimates.animalSamplingContextSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      animalDetectionSettings: subestimate.animalDetectionSettings
    })),
  camelExposureLevelSubestimates: input.groupedEstimates.camelExposureLevelSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      details: subestimate.details,
      sampleFrames: subestimate.sampleFrames,
      exposureToCamels: subestimate.exposureToCamels,
    })),
  nomadismSubestimates: input.groupedEstimates.nomadismSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      details: subestimate.details
    })),
  humanCountriesOfTravelSubestimates: input.groupedEstimates.humanCountriesOfTravelSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      humanCountriesOfTravel: subestimate.humanCountriesOfTravel
    })),
  createdAt: input.createdAtForAllRecords,
  updatedAt: input.updatedAtForAllRecords
})

export const transformIntoFormatForDatabaseStep = (
  input: TransformIntoFormatForDatabaseStepInput
): TransformIntoFormatForDatabaseStepOutput => {
  console.log(`Running step: transformIntoFormatForDatabaseStep. Remaining estimates: ${input.allEstimates.length}`);

  const createdAtForAllRecords = new Date();
  const updatedAtForAllRecords = createdAtForAllRecords;

  return {
    allEstimates: input.allEstimates.map((estimate) => transformMersEstimateForDatabase({
      estimate,
      createdAtForAllRecords,
      updatedAtForAllRecords
    })),
    allGroupedEstimates: input.allGroupedEstimates.map((groupedEstimates) => transformGroupedMersEstimatesForDatabase({
      groupedEstimates,
      createdAtForAllRecords,
      updatedAtForAllRecords
    })),
    allSources: input.allSources,
    estimateFilterOptions: transformMersEstimateFilterOptionsForDatabase({
      estimateFilterOptions: input.estimateFilterOptions,
      createdAtForAllRecords,
      updatedAtForAllRecords
    }),
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: transformMacroSampleFrameForDatabase({
      macroSampleFrames: input.allMacroSampleFrames,
      createdAtForAllRecords,
      updatedAtForAllRecords
    }),
    allFaoMersEvents: input.allFaoMersEvents.map((event) => transformFaoMersEventForDatabase({
      event,
      createdAtForAllRecords,
      updatedAtForAllRecords
    })),
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData.map((element) => ({
      _id: new ObjectId(),
      partitionKey: element.partitionKey,
      countryAlphaThreeCode: element.threeLetterCountryCode,
      countryAlphaTwoCode: element.twoLetterCountryCode,
      countryName: element.countryName,
      whoRegion: element.whoRegion,
      unRegion: element.unRegion,
      year: element.year,
      camelCount: element.camelCount,
      camelCountPerCapita: element.camelCountPerCapita,
      note: element.note,
      createdAt: createdAtForAllRecords,
      updatedAt: updatedAtForAllRecords,
    })),
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData.map((element) => ({
      _id: new ObjectId(),
      partitionKey: element.partitionKey,
      countryAlphaThreeCode: element.countryAlphaThreeCode,
      countryAlphaTwoCode: element.countryAlphaTwoCode,
      countryName: element.countryName,
      whoRegion: element.whoRegion,
      unRegion: element.unRegion,
      positiveCasesReported: element.positiveCasesReported,
      createdAt: createdAtForAllRecords,
      updatedAt: updatedAtForAllRecords,
    })),
    mongoClient: input.mongoClient
  };
};
