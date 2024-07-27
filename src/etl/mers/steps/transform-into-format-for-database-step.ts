import { MongoClient, ObjectId } from "mongodb";
import { MersEstimateDocument, MersEventType, FaoMersEventDocumentBase, FaoMersEventDocument, FaoYearlyCamelPopulationDataDocument, MersEstimateType, MersEstimateDocumentBase } from "../../../storage/types.js";
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
import { GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep } from "./group-estimates-under-primary-estimates-step.js";

export type EstimateFieldsAfterTransformingFormatForDatabaseStep = MersEstimateDocument;
export type GroupedEstimateFieldsAfterTransformingFormatForDatabaseStep = GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep;
export type SourceFieldsAfterTransformingFormatForDatabaseStep = SourceFieldsAfterApplyingTypedEstimateConstraintsStep;
export type StudyFieldsAfterTransformingFormatForDatabaseStep = StudyFieldsAfterApplyingTypedEstimateConstraintsStep;
export type CountryFieldsAfterTransformingFormatForDatabaseStep = CountryFieldsAfterApplyingTypedEstimateConstraintsStep;
export type FaoMersEventAfterTransformingFormatForDatabaseStep = FaoMersEventDocument;
export type YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep = FaoYearlyCamelPopulationDataDocument;
export type CountryPopulationDataAfterTransformingFormatForDatabaseStep = CountryPopulationDataAfterApplyingTypedEstimateConstraintsStep;

interface TransformIntoFormatForDatabaseStepInput {
  allEstimates: EstimateFieldsAfterApplyingTypedEstimateConstraintsStep[];
  allGroupedEstimates: GroupedEstimateFieldsAfterGroupingEstimatesUnderPrimaryEstimatesStep[];
  allSources: SourceFieldsAfterApplyingTypedEstimateConstraintsStep[];
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
      animalImportedOrLocal: estimate.animalImportedOrLocal
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
      animalImportedOrLocal: estimate.animalImportedOrLocal
    }
  }

  assertNever(estimate);
}

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
    allGroupedEstimates: input.allGroupedEstimates,
    allSources: input.allSources,
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
