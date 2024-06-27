import { MongoClient, ObjectId } from "mongodb";
import { MersEstimateDocument } from "../../../storage/types";
import { EstimateFieldsAfterJitteringPinLatLngStep } from "./jitter-pin-lat-lng-step";

export type EstimateFieldsAfterTransformingFormatForDatabaseStep = MersEstimateDocument;

interface TransformIntoFormatForDatabaseStepInput {
  allEstimates: EstimateFieldsAfterJitteringPinLatLngStep[];
  mongoClient: MongoClient;
}

interface TransformIntoFormatForDatabaseStepOutput {
  allEstimates: EstimateFieldsAfterTransformingFormatForDatabaseStep[];
  mongoClient: MongoClient;
}

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
    mongoClient: input.mongoClient
  };
};
