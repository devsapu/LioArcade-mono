"use client";

import { createApiClient, getHello } from "@lioarcade/api-client";
import type { HealthStatus } from "@lioarcade/types";
import { useQuery } from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_BFF_URL ?? "http://localhost:4000";
const apiClient = createApiClient(baseUrl);

export default function HomePage() {
  const health = useQuery({
    queryKey: ["health"],
    queryFn: () => apiClient.get<HealthStatus>("/health")
  });
  const hello = useQuery({
    queryKey: ["hello"],
    queryFn: () => getHello(baseUrl)
  });

  return (
    <main className="container">
      <h1>LioArcade</h1>
      <p>Monorepo foundation is ready for web, mobile, and BFF integration.</p>
      <div className="card">
        <p>Hello API:</p>
        <pre>{hello.isLoading ? "Loading..." : hello.data?.message}</pre>
      </div>
      <div className="card">
        <p>BFF health:</p>
        <pre>{health.isLoading ? "Loading..." : JSON.stringify(health.data, null, 2)}</pre>
      </div>
    </main>
  );
}
