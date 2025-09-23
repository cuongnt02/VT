import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "./schema";
import * as crypto from "crypto";
import * as argon2 from "argon2";

const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
  },
});

async function main() {
  let password = "123456789aA@";
  let salt;
  try {
    salt = crypto.randomBytes(12).toString("hex");
    password = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 19456,
      parallelism: 1,
      timeCost: 2,
      secret: Buffer.from(salt, "hex"),
    });
  } catch (err) {
    console.log(err);
  }
  const user: typeof usersTable.$inferInsert = {
    username: "cuong.ntc1102@gmail.com",
    password: password,
    password_salt: salt!,
  };

  await db.insert(usersTable).values(user);
  console.log("new user created");

  // const users = await db.select().from(usersTable);
  // console.log("Getting all the users from the database: ", users);
  //
  // await db
  //   .update(usersTable)
  //   .set({ username: "Viva" })
  //   .where(eq(usersTable.username, user.username));
  // console.log("User info updated");
  //
  // await db.delete(usersTable).where(eq(usersTable.username, user.username));
  // console.log("deleted");
}

main();
