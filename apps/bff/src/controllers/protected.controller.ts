import type { FastifyReply, FastifyRequest } from "fastify";

export async function protectedController(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  reply.send({
    message: "You are authenticated",
    user: request.user
  });
}
