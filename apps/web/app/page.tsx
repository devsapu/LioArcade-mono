"use client";

import { createApiClient, getHello } from "@lioarcade/api-client";
import { clearStoredAccessToken, getStoredAccessToken } from "@/lib/auth-token";
import type { HealthStatus, ProtectedResponse } from "@lioarcade/types";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BFF_URL ?? "http://localhost:4000";
const apiClient = createApiClient(baseUrl, {
  getAccessToken: () => getStoredAccessToken()
});

export default function HomePage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(getStoredAccessToken());
  }, []);

  const health = useQuery({
    queryKey: ["health"],
    queryFn: () => apiClient.get<HealthStatus>("/health")
  });
  const hello = useQuery({
    queryKey: ["hello"],
    queryFn: () => getHello(baseUrl)
  });
  const protectedApi = useQuery({
    queryKey: ["protected", token],
    queryFn: () => apiClient.get<ProtectedResponse>("/api/protected"),
    enabled: Boolean(token),
    retry: false
  });

  return (
    <main className="container">
      <h1>LioArcade</h1>
      <p>Monorepo foundation is ready for web, mobile, and BFF integration.</p>
      <p>
        <Link href="/login">Sign in</Link>
        {token ? (
          <>
            {" "}
            ·{" "}
            <button
              type="button"
              onClick={() => {
                clearStoredAccessToken();
                setToken(null);
              }}
            >
              Sign out
            </button>
          </>
        ) : null}
      </p>
      <div className="card">
        <p>Protected API:</p>
        <pre>
          {!token
            ? "Not signed in"
            : protectedApi.isLoading
              ? "Loading..."
              : protectedApi.isError
                ? `Error: ${protectedApi.error instanceof Error ? protectedApi.error.message : "request failed"}`
                : JSON.stringify(protectedApi.data, null, 2)}
        </pre>
      </div>
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
