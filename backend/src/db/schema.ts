import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar, check, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    username: varchar("username", { length: 50 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    password_salt: varchar("password_salt", { length: 30 }).notNull(),
  },
  (table) => [
    check("username_min_length_check", sql`length(${table.username}) > 2`),
  ],
);

export const sessionsTable = pgTable("sessions", {
  token: varchar({ length: 255 }).primaryKey(),
  refresh_token: varchar({ length: 255 }).notNull(),
  user_id: varchar("user_id", { length: 50 })
    .notNull()
    .references(() => usersTable.id),
  expires: timestamp({ mode: "date" }).default(sql`now() + interval '3 hours'`),
});
