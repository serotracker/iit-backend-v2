import { MongoClient, ObjectId } from "mongodb";
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
  MersSubEstimateBase
} from "../../../storage/types.js";
import assertNever from "assert-never";
import {
  CountryFieldsAfterApplyingTypedEstimateConstraintsStep,
  CountryPopulationDataAfterApplyingTypedEstimateConstraintsStep,
  EstimateFieldsAfterApplyingTypedEstimateConstraintsStep,
  FaoMersEventAfterApplyingTypedEstimateConstraintsStep,
  SourceFieldsAfterApplyingTypedEstimateConstraintsStep,
  StudyFieldsAfterApplyingTypedEstimateConstraintsStep,
  YearlyCamelPopulationDataAfterApplyingTypedEstimateConstraintsStep
} from "./apply-typed-estimate-constraints-step.js";
import {
  EstimateFilterOptionsAfterGroupingEstimatesUnderPrimaryEstimatesStep,
  GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep
} from "./group-estimates-under-primary-estimates-step.js";

export type EstimateFieldsAfterTransformingFormatForDatabaseStep = MersEstimateDocument;
export type GroupedEstimateFieldsAfterTransformingFormatForDatabaseStep = MersPrimaryEstimateDocument;
export type SourceFieldsAfterTransformingFormatForDatabaseStep = SourceFieldsAfterApplyingTypedEstimateConstraintsStep;
export type EstimateFilterOptionsAfterTransformingFormatForDatabaseStep = MersEstimateFilterOptionsDocument;
export type StudyFieldsAfterTransformingFormatForDatabaseStep = StudyFieldsAfterApplyingTypedEstimateConstraintsStep;
export type CountryFieldsAfterTransformingFormatForDatabaseStep = CountryFieldsAfterApplyingTypedEstimateConstraintsStep;
export type FaoMersEventAfterTransformingFormatForDatabaseStep = FaoMersEventDocument;
export type YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep = FaoYearlyCamelPopulationDataDocument;
export type CountryPopulationDataAfterTransformingFormatForDatabaseStep = CountryPopulationDataAfterApplyingTypedEstimateConstraintsStep;

interface TransformIntoFormatForDatabaseStepInput {
  allEstimates: EstimateFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allSources: SourceFieldsAfterApplyingTypedEstimateConstraintsStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
  allStudies: StudyFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allCountries: CountryFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allFaoMersEvents: FaoMersEventAfterApplyingTypedEstimateConstraintsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterApplyingTypedEstimateConstraintsStep[];
  countryPopulationData: CountryPopulationDataAfterApplyingTypedEstimateConstraintsStep[];
  mongoClient: MongoClient;
}

interface TransformIntoFormatForDatabaseStepOutput {
  allEstimates: EstimateFieldsAfterTransformingFormatForDatabaseStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterTransformingFormatForDatabaseStep[];
  allSources: SourceFieldsAfterTransformingFormatForDatabaseStep[];
  estimateFilterOptions: EstimateFilterOptionsAfterTransformingFormatForDatabaseStep;
  allStudies: StudyFieldsAfterTransformingFormatForDatabaseStep[];
  allCountries: CountryFieldsAfterTransformingFormatForDatabaseStep[];
  allFaoMersEvents: FaoMersEventAfterTransformingFormatForDatabaseStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep[];
  countryPopulationData: CountryPopulationDataAfterTransformingFormatForDatabaseStep[];
  mongoClient: MongoClient;
}

interface TransformFaoMersEventBaseForDatabaseInput {
  event: FaoMersEventAfterApplyingTypedEstimateConstraintsStep;
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
  event: FaoMersEventAfterApplyingTypedEstimateConstraintsStep;
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
  estimate: EstimateFieldsAfterApplyingTypedEstimateConstraintsStep;
  createdAtForAllRecords: Date;
  updatedAtForAllRecords: Date;
}

const transformMersEstimateBaseForDatabase = (input: TransformMersEstimateBaseForDatabaseInput): MersEstimateDocumentBase => ({
  _id: new ObjectId(),
  estimateId: input.estimate.estimateId,
  subGroupingVariable: input.estimate.subGroupingVariable,
  city: input.estimate.city,
  state: input.estimate.state,
  country: input.estimate.country,
  countryAlphaTwoCode: input.estimate.countryAlphaTwoCode,
  countryAlphaThreeCode: input.estimate.countryAlphaThreeCode,
  whoRegion: input.estimate.whoRegion,
  unRegion: input.estimate.unRegion,
  latitude: input.estimate.latitude,
  longitude: input.estimate.longitude,
  firstAuthorFullName: input.estimate.study.source.firstAuthorFullName,
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
  isotypes: input.estimate.isotypes,
  samplingStartDate: input.estimate.samplingStartDate,
  samplingEndDate: input.estimate.samplingEndDate,
  samplingMidDate: input.estimate.samplingMidDate,
  samplingMethod: input.estimate.samplingMethod,
  geographicScope: input.estimate.geographicScope,
  testProducer: input.estimate.testProducer,
  testValidation: input.estimate.testValidation,
  createdAt: input.createdAtForAllRecords,
  updatedAt: input.updatedAtForAllRecords,
})

interface TransformMersEstimateForDatabaseInput {
  estimate: EstimateFieldsAfterApplyingTypedEstimateConstraintsStep;
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
      ageGroup: estimate.ageGroup,
      sampleFrame: estimate.sampleFrame,
    }
  }

  if(estimate.type === MersEstimateType.HUMAN_VIRAL) {
    return {
      ...transformMersEstimateBaseForDatabase({ estimate, createdAtForAllRecords, updatedAtForAllRecords }),
      type: MersEstimateType.HUMAN_VIRAL,
      positivePrevalence: estimate.positivePrevalence,
      positivePrevalence95CILower: estimate.positivePrevalence95CILower,
      positivePrevalence95CIUpper: estimate.positivePrevalence95CIUpper,
      ageGroup: estimate.ageGroup,
      sampleFrame: estimate.sampleFrame,
    }
  }

  if(estimate.type === MersEstimateType.ANIMAL_SEROPREVALENCE) {
    return {
      ...transformMersEstimateBaseForDatabase({ estimate, createdAtForAllRecords, updatedAtForAllRecords }),
      type: MersEstimateType.ANIMAL_SEROPREVALENCE,
      seroprevalence: estimate.seroprevalence,
      seroprevalence95CILower: estimate.seroprevalence95CILower,
      seroprevalence95CIUpper: estimate.seroprevalence95CIUpper,
      animalSpecies: estimate.animalSpecies,
      animalType: estimate.animalType,
      animalDetectionSettings: estimate.animalDetectionSettings,
      animalPurpose: estimate.animalPurpose,
      animalImportedOrLocal: estimate.animalImportedOrLocal,
      animalAgeGroup: estimate.animalAgeGroup
    }
  }

  if(estimate.type === MersEstimateType.ANIMAL_VIRAL) {
    return {
      ...transformMersEstimateBaseForDatabase({ estimate, createdAtForAllRecords, updatedAtForAllRecords }),
      type: MersEstimateType.ANIMAL_VIRAL,
      positivePrevalence: estimate.positivePrevalence,
      positivePrevalence95CILower: estimate.positivePrevalence95CILower,
      positivePrevalence95CIUpper: estimate.positivePrevalence95CIUpper,
      animalSpecies: estimate.animalSpecies,
      animalType: estimate.animalType,
      animalDetectionSettings: estimate.animalDetectionSettings,
      animalPurpose: estimate.animalPurpose,
      animalImportedOrLocal: estimate.animalImportedOrLocal,
      animalAgeGroup: estimate.animalAgeGroup
    }
  }

  assertNever(estimate);
}

interface TransformMersEstimateFilterOptionsForDatabaseInput {
  estimateFilterOptions: EstimateFilterOptionsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
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
  animalImportedOrLocal: input.estimateFilterOptions.animalImportedOrLocal,
  sampleFrame: input.estimateFilterOptions.sampleFrame,
  testProducer: input.estimateFilterOptions.testProducer,
  testValidation: input.estimateFilterOptions.testValidation,
  createdAt: input.createdAtForAllRecords,
  updatedAt: input.updatedAtForAllRecords,
});

const transformMersSubEstimateBaseForDatabaseInput = (estimate: EstimateFieldsAfterApplyingTypedEstimateConstraintsStep): MersSubEstimateBase => ({
  id: estimate.id,
  estimateId: estimate.estimateId,
  estimateInfo: estimate.type === MersEstimateType.ANIMAL_SEROPREVALENCE || estimate.type === MersEstimateType.HUMAN_SEROPREVALENCE ? {
    sampleDenominator: estimate.sampleDenominator,
    sampleNumerator: estimate.sampleNumerator,
    seroprevalence: estimate.seroprevalence,
    seroprevalence95CILower: estimate.seroprevalence95CILower,
    seroprevalence95CIUpper: estimate.seroprevalence95CIUpper
  } : {
    sampleDenominator: estimate.sampleDenominator,
    sampleNumerator: estimate.sampleNumerator,
    positivePrevalence: estimate.positivePrevalence,
    positivePrevalence95CILower: estimate.positivePrevalence95CILower,
    positivePrevalence95CIUpper: estimate.positivePrevalence95CIUpper
  }
})

interface TransformGroupedMersEstimatesForDatabaseInput {
  groupedEstimates: GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
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
    }))
    .filter((subestimate): subestimate is Omit<typeof subestimate, 'animalSpecies'> & {
      animalSpecies: NonNullable<typeof subestimate['animalSpecies']>
    } => !!subestimate.animalSpecies),
  sexSubestimates: input.groupedEstimates.sexSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      sex: subestimate.sex
    }))
    .filter((subestimate): subestimate is Omit<typeof subestimate, 'sex'> & {
      sex: NonNullable<typeof subestimate['sex']>
    } => !!subestimate.sex),
  timeFrameSubestimates: input.groupedEstimates.timeFrameSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      samplingStartDate: subestimate.samplingStartDate,
      samplingEndDate: subestimate.samplingEndDate
    }))
    .filter((subestimate): subestimate is Omit<typeof subestimate, 'samplingStartDate'|'samplingEndDate'> & {
      samplingStartDate: NonNullable<typeof subestimate['samplingStartDate']>;
      samplingEndDate: NonNullable<typeof subestimate['samplingEndDate']>;
    } => !!subestimate.samplingStartDate && !!subestimate.samplingEndDate),
  sampleTypeSubestimates: input.groupedEstimates.sampleTypeSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      specimenType: subestimate.specimenType,
    }))
    .filter((subestimate): subestimate is Omit<typeof subestimate, 'specimenType'> & {
      specimenType: NonNullable<typeof subestimate['specimenType']>;
    } => !!subestimate.specimenType),
  occupationSubestimates: input.groupedEstimates.occupationSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      occupation: subestimate.subGroupingCategory,
    }))
    .filter((subestimate): subestimate is Omit<typeof subestimate, 'occupation'> & {
      occupation: NonNullable<typeof subestimate['occupation']>;
    } => !!subestimate.occupation),
  animalSourceLocationSubestimates: input.groupedEstimates.animalSourceLocationSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      animalImportedOrLocal: subestimate.animalImportedOrLocal,
      animalCountryOfImport: subestimate.animalCountryOfImport?.country,
      animalCountryOfImportAlphaTwoCode: subestimate.animalCountryOfImport?.countryAlphaTwoCode,
      animalCountryOfImportAlphaThreeCode: subestimate.animalCountryOfImport?.countryAlphaThreeCode
    }))
    .filter((subestimate): subestimate is Omit<typeof subestimate,
      'animalImportedOrLocal'|'animalCountryOfImport'|'animalCountryOfImportAlphaTwoCode'|'animalCountryOfImportAlphaThreeCode'
    > & {
      animalImportedOrLocal: NonNullable<typeof subestimate['animalImportedOrLocal']>,
      animalCountryOfImport: NonNullable<typeof subestimate['animalCountryOfImport']>,
      animalCountryOfImportAlphaTwoCode: NonNullable<typeof subestimate['animalCountryOfImportAlphaTwoCode']>,
      animalCountryOfImportAlphaThreeCode: NonNullable<typeof subestimate['animalCountryOfImportAlphaThreeCode']>,
    } => 
      !!subestimate.animalImportedOrLocal &&
      !!subestimate.animalCountryOfImport &&
      !!subestimate.animalCountryOfImportAlphaTwoCode &&
      !!subestimate.animalCountryOfImportAlphaThreeCode
    ),
  animalSamplingContextSubestimates: input.groupedEstimates.animalSamplingContextSubestimates
    .map((subestimate) => ({
      ...transformMersSubEstimateBaseForDatabaseInput(subestimate),
      animalDetectionSettings: subestimate.animalDetectionSettings
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
    mongoClient: input.mongoClient
  };
};
