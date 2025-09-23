import { Db, db, initDb } from "../db";
import fp from "fastify-plugin";

export interface DrizzlePluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<DrizzlePluginOptions>((fastify, opts) => {
  initDb();
  fastify.decorate("drizzleDb", db);
});

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  export interface FastifyInstance {
    db: Db;
  }
}
