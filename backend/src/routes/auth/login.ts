import { FastifyPluginAsync } from "fastify";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/login", async function (request, reply) {
    return { route: "login" };
  });
};

export default example;
