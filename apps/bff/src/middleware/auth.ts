import type { FastifyReply, FastifyRequest } from "fastify";
import { createRemoteJWKSet, jwtVerify } from "jose";
import type { JwtPayload } from "@lioarcade/types";

const jwksUrl =
  process.env.FUSIONAUTH_JWKS_URL ?? "http://localhost:9011/.well-known/jwks.json";

const JWKS = createRemoteJWKSet(new URL(jwksUrl));

export async function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const header = request.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    await reply.status(401).send({ error: "Missing or invalid Authorization header" });
    return;
  }

  const token = header.slice("Bearer ".length).trim();
  if (!token) {
    await reply.status(401).send({ error: "Missing or invalid Authorization header" });
    return;
  }

  try {
    const { payload } = await jwtVerify(token, JWKS);
    request.user = payload as unknown as JwtPayload;
  } catch {
    await reply.status(401).send({ error: "Invalid or expired token" });
  }
}
