import { Static, Type } from "@sinclair/typebox";
import { User } from "../user";

export const LoginResponse = Type.Object({
  message: Type.String(),
  session_token: Type.String(),
  refresh_token: Type.String(),
  user: User,
});

export type LoginResponseType = Static<typeof LoginResponse>;
