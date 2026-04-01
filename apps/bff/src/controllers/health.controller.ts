import type { FastifyReply, FastifyRequest } from "fastify";
import { getHealthStatus } from "../services/health.service.js";

export async function healthController(
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  reply.send(getHealthStatus());
}
