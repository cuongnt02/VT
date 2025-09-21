import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "./schema";
import { eq } from "drizzle-orm";

const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
  },
});

async function main() {
  const user: typeof usersTable.$inferInsert = {
    username: "John",
    password: "09310491039213123Go@",
    password_salt: "090931210313",
  };

  await db.insert(usersTable).values(user);
  console.log("new user created");

  const users = await db.select().from(usersTable);
  console.log("Getting all the users from the database: ", users);

  await db
    .update(usersTable)
    .set({ username: "Viva" })
    .where(eq(usersTable.username, user.username));
  console.log("User info updated");

  await db.delete(usersTable).where(eq(usersTable.username, user.username));
  console.log("deleted");
}

main();
