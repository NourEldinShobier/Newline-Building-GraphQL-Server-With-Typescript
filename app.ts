import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./src/graphql";

const port = 9000;

const app = express();
const server = new ApolloServer({ schema });
/// const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: "/api" });


app.listen(port);
console.log(`[server]: http://localhost:${port}`);