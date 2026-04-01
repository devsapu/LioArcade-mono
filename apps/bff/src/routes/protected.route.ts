import type { FastifyInstance } from "fastify";
import { protectedController } from "../controllers/protected.controller.js";
import { authenticate } from "../middleware/auth.js";

export async function protectedRoute(app: FastifyInstance): Promise<void> {
  app.get("/api/protected", { preHandler: authenticate }, protectedController);
}
