import type { FastifyInstance } from "fastify";
import { helloController } from "../controllers/hello.controller.js";

export async function helloRoute(app: FastifyInstance): Promise<void> {
  app.get("/api/hello", helloController);
}
