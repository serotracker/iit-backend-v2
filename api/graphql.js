import cors from "micro-cors";
import { ApolloServer } from "apollo-server-micro";
import { MongoClient } from "mongodb";
import { send } from 'micro';
import { arboTypedefs } from "../public/dist/src/api/arbo-typedefs.js";
import { generateArboResolvers } from "../public/dist/src/api/arbo-resolvers.js";

const mongoUrl = process.env.MONGODB_URI;

if (!mongoUrl) {
  console.log("Unable to find value for MONGODB_URI. Please make sure you have run generate-env-files.sh and have specified one in the appropriate environment file.");
  console.log("Exiting early.");
  process.exit(1);
}

const mongoClient = new MongoClient(mongoUrl);
await mongoClient.connect();

const server = new ApolloServer({
  typeDefs: arboTypedefs,
  resolvers: generateArboResolvers({ mongoClient }).arboResolvers,
  introspection: true,
});

await server.start();
const handler = server.createHandler({
  path: "/api/graphql",
});

const corsHandler = cors({allowMethods: ['POST']})((req, res) => req.method === 'OPTIONS' ? send(res, 200, 'ok') : handler(req, res))

export default corsHandler;

export const config = {
  api: {
    bodyParser: false,
  },
};