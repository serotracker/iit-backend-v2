import { MongoClient } from "mongodb";
import {
  QueryResolvers,
  MersMacroSampleFrameType as MersMacroSampleFrameForApi
} from "../graphql-types/__generated__/graphql-types.js";
import {
  MersMacroSampleFrameDocument,
  MersMacroSampleFrame
} from "../../storage/types.js";

interface GenerateMersMacroSampleFramesResolversInput {
  mongoClient: MongoClient;
}

interface GenerateMersMacroSampleFramesResolversOutput {
  mersMacroSampleFramesResolvers: { Query: QueryResolvers }
}

const MacroSampleFrameForApiMap = {
  [MersMacroSampleFrame.GENERAL_POPULATION]:
    MersMacroSampleFrameForApi.GeneralPopulation,
  [MersMacroSampleFrame.HIGH_RISK_NOT_OCCUPATIONALLY_EXPOSED_TO_DROMEDARY_CAMELS]:
    MersMacroSampleFrameForApi.HighRiskNotOccupationallyExposedToDromedaryCamels,
  [MersMacroSampleFrame.HIGH_RISK_OCCUPATIONALLY_EXPOSED_TO_DROMEDARY_CAMELS]:
    MersMacroSampleFrameForApi.HighRiskOccupationallyExposedToDromedaryCamels,
  [MersMacroSampleFrame.UNCATEGORIZED]:
    MersMacroSampleFrameForApi.Uncategorized,
}

const mapMersMacroSampleFrameTypeForApi = (macroSampleFrame: MersMacroSampleFrame): MersMacroSampleFrameForApi => 
  MacroSampleFrameForApiMap[macroSampleFrame];

export const generateMersMacroSampleFramesResolvers = (input: GenerateMersMacroSampleFramesResolversInput): GenerateMersMacroSampleFramesResolversOutput => {
  const { mongoClient } = input;

  const databaseName = process.env.DATABASE_NAME;

  if(!databaseName) {
    throw new Error("Unable to find value for DATABASE_NAME. Please make sure you have run generate-env-files.sh and have specified one in the appropriate environment file.")
  }

  const mersMacroSampleFrames = async() => {
    const macroSampleFramesCollection = mongoClient.db(databaseName).collection<MersMacroSampleFrameDocument>('mersMacroSampleFrames');

    const databaseResult = await macroSampleFramesCollection.find({}).toArray();

    return databaseResult.map((macroSampleFrame) => ({
      id: macroSampleFrame._id.toHexString(),
      macroSampleFrame: mapMersMacroSampleFrameTypeForApi(macroSampleFrame.macroSampleFrame),
      sampleFrames: macroSampleFrame.sampleFrames
    }))
  };

  return {
    mersMacroSampleFramesResolvers: {
      Query: {
        mersMacroSampleFrames
      }
    }
  }
}