import { MongoClient } from "mongodb";
import { QueryResolvers } from "../graphql-types/__generated__/graphql-types";
import { MersEstimateFilterOptionsDocument } from "../../storage/types";
import { sample } from "lodash";

interface GenerateMersEstimateResolversInput {
  mongoClient: MongoClient;
}

interface GenerateMersEstimateResolversOutput {
  mersEstimateResolvers: { Query: QueryResolvers }
}

export const generateMersEstimateResolvers = (input: GenerateMersEstimateResolversInput): GenerateMersEstimateResolversOutput => {
  const { mongoClient } = input;
  const databaseName = process.env.DATABASE_NAME;

  if(!databaseName) {
    throw new Error("Unable to find value for DATABASE_NAME. Please make sure you have run generate-env-files.sh and have specified one in the appropriate environment file.")
  }

  const mersEstimatesFilterOptions = async () => {
    const mersEstimateFilterOptionsCollection = mongoClient.db(databaseName).collection<MersEstimateFilterOptionsDocument>('mersEstimateFilterOptions');
    const mersEstimateFilterOptions = await mersEstimateFilterOptionsCollection.findOne({});

    return {
      sourceType: mersEstimateFilterOptions?.sourceType ?? [],
      ageGroup: mersEstimateFilterOptions?.ageGroup ?? [],
      assay: mersEstimateFilterOptions?.assay ?? [],
      specimenType: mersEstimateFilterOptions?.specimenType ?? [],
      sex: mersEstimateFilterOptions?.sex ?? [],
      isotypes: mersEstimateFilterOptions?.isotypes ?? [],
      samplingMethod: mersEstimateFilterOptions?.samplingMethod ?? [],
      geographicScope: mersEstimateFilterOptions?.geographicScope ?? [],
      animalDetectionSettings: mersEstimateFilterOptions?.animalDetectionSettings ?? [],
      animalPurpose: mersEstimateFilterOptions?.animalPurpose ?? [],
      animalImportedOrLocal: mersEstimateFilterOptions?.animalImportedOrLocal ?? [],
      sampleFrame: mersEstimateFilterOptions?.sampleFrame ?? [],
      testProducer: mersEstimateFilterOptions?.testProducer ?? [],
      testValidation: mersEstimateFilterOptions?.testValidation ?? []
    }
  }
  return {
    mersEstimateResolvers: {
      Query: {
        mersPrimaryEstimates: () => [],
        mersEstimatesFilterOptions,
      }
    }
  }
}