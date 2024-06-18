import { MongoClient, ObjectId } from "mongodb";
import { MersEstimateDocument, MersEventType, FaoMersEventDocumentBase, FaoMersEventDocument, FaoYearlyCamelPopulationDataDocument } from "../../../storage/types.js";
import {
  CountryPopulationDataAfterAssigningPartitionsStep,
  EstimateFieldsAfterAssigningPartitionsStep,
  FaoMersEventAfterAssigningPartitionsStep,
  YearlyCamelPopulationDataAfterAssigningPartitionsStep
} from "./assign-partitions-step.js";
import assertNever from "assert-never";

export type EstimateFieldsAfterTransformingFormatForDatabaseStep = MersEstimateDocument;
export type FaoMersEventAfterTransformingFormatForDatabaseStep = FaoMersEventDocument;
export type YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep = FaoYearlyCamelPopulationDataDocument;
export type CountryPopulationDataAfterTransformingFormatForDatabaseStep = CountryPopulationDataAfterAssigningPartitionsStep;

interface TransformIntoFormatForDatabaseStepInput {
  allEstimates: EstimateFieldsAfterAssigningPartitionsStep[];
  allFaoMersEvents: FaoMersEventAfterAssigningPartitionsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterAssigningPartitionsStep[];
  countryPopulationData: CountryPopulationDataAfterAssigningPartitionsStep[];
  mongoClient: MongoClient;
}

interface TransformIntoFormatForDatabaseStepOutput {
  allEstimates: EstimateFieldsAfterTransformingFormatForDatabaseStep[];
  allFaoMersEvents: FaoMersEventAfterTransformingFormatForDatabaseStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterTransformingFormatForDatabaseStep[];
  countryPopulationData: CountryPopulationDataAfterTransformingFormatForDatabaseStep[];
  mongoClient: MongoClient;
}

interface TransformFaoMersEventBaseForDatabaseInput {
  event: FaoMersEventAfterAssigningPartitionsStep;
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
  createdAt: input.createdAtForAllRecords,
  updatedAt: input.updatedAtForAllRecords,
})

export const transformIntoFormatForDatabaseStep = (
  input: TransformIntoFormatForDatabaseStepInput
): TransformIntoFormatForDatabaseStepOutput => {
  console.log(`Running step: transformIntoFormatForDatabaseStep. Remaining estimates: ${input.allEstimates.length}`);

  const createdAtForAllRecords = new Date();
  const updatedAtForAllRecords = createdAtForAllRecords;

  return {
    allEstimates: input.allEstimates.map((estimate) => ({
      _id: new ObjectId(),
      country: estimate.country,
      countryAlphaTwoCode: estimate.countryAlphaTwoCode,
      countryAlphaThreeCode: estimate.countryAlphaThreeCode,
      latitude: estimate.latitude,
      longitude: estimate.longitude,
      whoRegion: estimate.whoRegion,
      createdAt: createdAtForAllRecords,
      updatedAt: updatedAtForAllRecords,
    })),
    allFaoMersEvents: input.allFaoMersEvents.map((event) => {
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
          animalSpecies: event.animalSpecies,
          animalType: event.animalType,
        }
      }
      assertNever(event);
    }),
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData.map((element) => ({
      _id: new ObjectId(),
      partitionKey: element.partitionKey,
      countryAlphaThreeCode: element.threeLetterCountryCode,
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
