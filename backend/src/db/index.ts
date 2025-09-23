import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import "dotenv/config";
import { UserGateway } from "./gateway/user";

export interface Db {
  //instance: ReturnType<typeof drizzle<typeof schema>>;
  user: UserGateway;
}

// eslint-disable-next-line import/no-mutable-exports
export let db: Db;

export const initDb = () => {
  const instance = drizzle({
    schema: schema,
    connection: {
      connectionString: process.env.DATABASE_URL!,
    },
  });
  db = {
    user: new UserGateway(instance),
  };
};
