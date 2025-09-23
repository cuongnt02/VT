import { FastifyPluginAsync } from "fastify";
import { UserRequest } from "../../types/user";
import * as argon2 from "argon2";

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
          200: {},
        },
      },
    },
    async (request, reply) => {
      // TODO: Determine if this would throw any errors
      const { username, password } = request.body;
      // TODO: Verify request body

      const user = await fastify.db.user.findByUsername(username);

      if (user) {
        try {
          const hashed_password = await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 19456,
            parallelism: 1,
            timeCost: 2,
            secret: Buffer.from(user.password_salt, "hex"),
          });
          console.log("SALT:", user.password_salt);
          console.log("PASS:", hashed_password);
          console.log("PASS_DB:", user.password);
          if (await argon2.verify(hashed_password, password)) {
            console.log("Login successful");
          } else {
            console.log("Login failed");
          }
        } catch (err) {
          console.log(err);
        }
      }
      reply.status(200).send({ login: "success" });
    },
  );
};

export default login;
