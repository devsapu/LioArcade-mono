import type { JwtPayload } from "@lioarcade/types";

declare module "fastify" {
  interface FastifyRequest {
    user?: JwtPayload;
  }
}
