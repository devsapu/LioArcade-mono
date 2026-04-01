import type { HealthStatus } from "@lioarcade/types";

export function getHealthStatus(): HealthStatus {
  return {
    status: "ok",
    service: "lioarcade-bff",
    timestamp: new Date().toISOString()
  };
}
