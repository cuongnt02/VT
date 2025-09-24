import { Static, Type } from "@sinclair/typebox";

export const Session = Type.Object({
  token: Type.String(),
  refresh_token: Type.String(),
  user_id: Type.String({ maxLength: 50 }),
  expires: Type.Date(),
});

export type SessionType = Static<typeof Session>;
