import cors from "micro-cors";
import { ApolloServer } from "apollo-server-micro";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { MongoClient } from "mongodb";
import { send } from 'micro';
import { arboTypedefs } from "../public/dist/src/api/arbo/arbo-typedefs.js";
import { sarsCov2Typedefs } from "../public/dist/src/api/sarscov2/sars-cov-2-typedefs.js";
import { teamTypedefs } from "../public/dist/src/api/team/team-typedefs.js";
import { mersTypedefs } from "../public/dist/src/api/mers/mers-typedefs.js";
import { sharedTypedefs } from "../public/dist/src/api/shared/shared-typedefs.js";
import { generateArboResolvers } from "../public/dist/src/api/arbo/arbo-resolvers.js";
import { generateTeamResolvers } from "../public/dist/src/api/team/team-resolvers.js";
import { generateSarsCov2Resolvers } from "../public/dist/src/api/sarscov2/sars-cov-2-resolvers.js";
import { generateMersResolvers } from "../public/dist/src/api/mers/mers-resolvers.js";

const mongoUrl = process.env.MONGODB_URI;

if (!mongoUrl) {
  console.log("Unable to find value for MONGODB_URI. Please make sure you have run generate-env-files.sh and have specified one in the appropriate environment file.");
  console.log("Exiting early.");
  process.exit(1);
}

const mongoClient = new MongoClient(mongoUrl);
await mongoClient.connect();

const server = new ApolloServer({
  typeDefs: mergeTypeDefs([
    sharedTypedefs,
    arboTypedefs,
    teamTypedefs,
    sarsCov2Typedefs,
    mersTypedefs
  ]),
  resolvers: {
    Query: {
      ...generateTeamResolvers({ mongoClient }).teamResolvers.Query,
      ...generateArboResolvers({ mongoClient }).arboResolvers.Query,
      ...generateSarsCov2Resolvers({ mongoClient }).sarsCov2Resolvers.Query,
      ...generateMersResolvers({ mongoClient }).mersResolvers.Query
    }
  },
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