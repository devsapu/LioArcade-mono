import Fastify from "fastify";
import cors from "@fastify/cors";
import { healthRoute } from "./routes/health.route.js";
import { helloRoute } from "./routes/hello.route.js";

const app = Fastify({ logger: true });
await app.register(cors, { origin: true });

await healthRoute(app);
await helloRoute(app);

const port = Number(process.env.PORT ?? 4000);
const host = process.env.HOST ?? "0.0.0.0";

try {
  await app.listen({ port, host });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
