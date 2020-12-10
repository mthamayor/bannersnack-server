import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import cors from "cors";
import { UserResolver } from "./resolvers/user.resolver";
import { IndexResolver } from "./resolvers/index.resolver";
import { RecordResolver } from "./resolvers/record.resolver";
import IContext from "./interfaces/context.interface";

const { ApolloServer } = require("apollo-server-express");

dotenv.config();

const app = express();

(async () => {

  app.use(cors());

  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
    models: [
      __dirname + "/**/*.model.ts",
      __dirname + "/**/*.model.js"
    ]
  });

  await sequelize.sync({ force: true })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [IndexResolver, UserResolver, RecordResolver]
    }),
    context: ({ req, res }: IContext) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || '4000';

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
})();

export default app;