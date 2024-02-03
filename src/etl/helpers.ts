import { MongoClient, ObjectId } from "mongodb";

export const asyncEtlStep = <TFunctionInput, TFunctionOutput>(stepFunction: (input: TFunctionInput) => Promise<TFunctionOutput>) => {
  const returnFunction: (inputPromise: Promise<TFunctionInput> | TFunctionInput) => Promise<TFunctionOutput> = async (inputPromise) => {
    const input = await Promise.resolve(inputPromise);
    return stepFunction(input);
  }

  return returnFunction;
}

export const etlStep = <TFunctionInput, TFunctionOutput>(stepFunction: (input: TFunctionInput) => TFunctionOutput) => {
  const returnFunction: (inputPromise: Promise<TFunctionInput> | TFunctionInput) => Promise<TFunctionOutput> = async (inputPromise) => {
    const input = await Promise.resolve(inputPromise);
    return stepFunction(input);
  }

  return returnFunction;
}

interface WriteDataToMongoInput<TData extends {_id: ObjectId, createdAt: Date }> {
  data: TData[];
  databaseName: string;
  collectionName: string;
  mongoClient: MongoClient;
}

export const writeDataToMongoEtlStep = async<TData extends {_id: ObjectId, createdAt: Date }>(
  input: WriteDataToMongoInput<TData>
): Promise<void> => {
  if (input.data.length === 0) {
    console.log("Unable to find any records to insert.");
    console.log("Database was not modified.");
    return;
  }

  const { insertedCount } = await input.mongoClient
    .db(input.databaseName)
    .collection(input.collectionName)
    .insertMany(input.data);

  console.log(`Inserted ${insertedCount} records into the database.`);

  if(insertedCount === 0) {
    console.log("Not deleting data because no records were inserted. Please investigate.")
    return;
  }

  const { deletedCount } = await input.mongoClient
    .db(input.databaseName)
    .collection(input.collectionName)
    .deleteMany({ createdAt: { $ne: input.data[0].createdAt } });

  console.log(`Cleared ${deletedCount} records from the database.`);
}

interface GetEnvironmentVariableOrThrowInput {
  key: string;
}

export const getEnvironmentVariableOrThrow = (input: GetEnvironmentVariableOrThrowInput): string => {
  const variable = process.env[input.key];

  if(!variable || variable === "PLEASE_SPECIFY") {
    const errorText = `Unable to find value for ${input.key}. Please make sure you have run generate-env-files.sh and have specified a value for ${input.key} in the appropriate environment file.`
    console.log(errorText);

    throw new Error(errorText);
  }

  return variable;
}

interface GetMongoClientInput {
  mongoUri: string;
}

export const getMongoClient = async (input: GetMongoClientInput): Promise<MongoClient> => {
  const mongoClient = new MongoClient(input.mongoUri);

  await mongoClient.connect();

  return mongoClient
}