import type { FastifyReply, FastifyRequest } from "fastify";
import { getHelloMessage } from "../services/hello.service.js";

export async function helloController(
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  reply.send(getHelloMessage());
}
