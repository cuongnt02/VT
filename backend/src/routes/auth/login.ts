import { FastifyPluginAsync } from "fastify";
import { UserRequest } from "../../types/user";
import * as argon2 from "argon2";
import { setTimeout } from "node:timers/promises";
import { LoginResponse, LoginResponseType } from "../../types/api/login";
import { createHash, randomBytes } from "node:crypto";

const login: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/login", async function (request, reply) {
    return { route: "login" };
  });

  fastify.post<{ Body: UserRequest; Reply: Object }>(
    "/login",
    {
      schema: {
        body: UserRequest,
        response: {
          200: LoginResponse,
        },
      },
    },
    async (request, reply) => {
      const { username, password } = request.body;

      const user = await fastify.db.user.findByUsername(username);
      await setTimeout(3000);

      if (user) {
        try {
          if (
            await argon2.verify(user.password, password, {
              secret: Buffer.from(user.password_salt, "hex"),
            })
          ) {
            reply.status(200);
            // TODO: Create function to handle tokens
            const response: LoginResponseType = {
              message: "Login successful",
              session_token: "",
              refresh_token: "",
              user: user,
            };
            reply.send(response);
          } else {
            reply.status(401);
            const error = new Error(
              "Login unsuccessful - You have entered an invalid password",
            );
            reply.send(error);
          }
        } catch (err) {
          if (err instanceof Error) {
            reply.send(err);
          } else {
            const unexpected = new Error(
              "Unexpected Error Occurred - Check the server logs for more details",
            );
            reply.send(unexpected);
          }
        }
      } else {
        // TODO: DRY Here - Create function to handle
        reply.status(401);
        const error = new Error(
          "Login unsuccessful - You have entered an invalid username",
        );
        reply.send(error);
      }
    },
  );
};

const generateTokens = (): { session_token; refresh_token } => {
  const sessionToken = createHash("sha-256")
    .update(randomBytes(12))
    .digest("hex");

  const refreshToken = createHash("sha-256")
    .update(randomBytes(12))
    .digest("hex");

  return {
    session_token: sessionToken,
    refresh_token: refreshToken,
  };
};

export default login;
