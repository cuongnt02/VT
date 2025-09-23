import { db } from "./src/db";
declare module "fastify" {
  interface FastifyInstance {
    db: typeof db;
  }
}
