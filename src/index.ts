import { ApolloServer, BaseContext } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { arboTypedefs } from "./api/arbo-typedefs.js";
import { arboResolvers } from "./api/arbo-resolvers.js";

const startServer = async () => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    console.log(
      "Unable to find value for MONGO_URL. Please make sure you have specified one in your .env file."
    );
    console.log("Exiting early.");
    process.exit(1);
  }

  const port = 4000;
  const apolloServer = new ApolloServer<BaseContext>({
    typeDefs: arboTypedefs,
    resolvers: arboResolvers,
  });

  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startServer().catch(console.error);