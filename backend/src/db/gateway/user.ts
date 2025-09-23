import * as schema from "../schema";
import { drizzle } from "drizzle-orm/node-postgres";
import type { UserType } from "../../types/user.ts";
import { eq } from "drizzle-orm";
export class UserGateway {
  _db: ReturnType<typeof drizzle<typeof schema>> | null;
  public constructor(db: ReturnType<typeof drizzle<typeof schema>>) {
    this._db = db;
  }

  public async findByUsername(username: string): Promise<UserType | null> {
    const query = await this._db
      ?.select()
      .from(schema.usersTable)
      .where(eq(schema.usersTable.username, username));
    if (query) {
      const user = query[0];
      if (user) {
        return user;
      } else {
        // TODO: Log Error
        console.log("Error");
        return null;
      }
    } else {
      // TODO: Log Error
      return null;
    }
  }
}
