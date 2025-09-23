import { Static, Type } from "@sinclair/typebox";
export const User = Type.Object({
  id: Type.String(),
  username: Type.String(),
  password: Type.String({ minLength: 2, maxLength: 255 }),
  password_salt: Type.String({ maxLength: 30 }),
});

export const UserRequest = Type.Object({
  username: Type.String(),
  password: Type.String({ minLength: 2, maxLength: 255 }),
});

export type UserType = Static<typeof User>;
export type UserRequest = Static<typeof UserRequest>;
