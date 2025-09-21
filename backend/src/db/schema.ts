import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar, check } from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    username: varchar({ length: 50 }).notNull(),
    password: varchar({ length: 200 }).notNull(),
    password_salt: varchar({ length: 20 }).notNull(),
  },
  (table) => [
    check("username_min_length_check", sql`length(${table.username}) > 2`),
  ],
);
