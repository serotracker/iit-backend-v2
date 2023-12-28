import { ApolloServer } from "apollo-server-micro";
import { MongoClient } from "mongodb";
import { arboTypedefs } from "./api/arbo-typedefs.js";
import { generateArboResolvers } from "./api/arbo-resolvers.js";

const mongoUrl = process.env.MONGODB_URI;

if (!mongoUrl) {
  console.log(
    "Unable to find value for MONGODB_URI. Please make sure you have specified one in your .env file."
  );
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

export default server.createHandler({
  path: "/api/graphql",
});

export const config = {
  api: {
    bodyParser: false,
  },
};
