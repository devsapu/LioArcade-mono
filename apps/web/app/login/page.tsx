"use client";

import { useEffect } from "react";

const fusionAuthBase = process.env.NEXT_PUBLIC_FUSIONAUTH_URL ?? "http://localhost:9011";
const clientId = process.env.NEXT_PUBLIC_FUSIONAUTH_CLIENT_ID ?? "";

export default function LoginPage() {
  useEffect(() => {
    if (!clientId) {
      return;
    }
    const redirectUri = `${window.location.origin}/auth/callback`;
    const params = new URLSearchParams({
      client_id: clientId,
      response_type: "token",
      redirect_uri: redirectUri
    });
    window.location.replace(`${fusionAuthBase}/oauth2/authorize?${params.toString()}`);
  }, []);

  if (!clientId) {
    return (
      <main className="container">
        <p>Set NEXT_PUBLIC_FUSIONAUTH_CLIENT_ID in your environment.</p>
      </main>
    );
  }

  return (
    <main className="container">
      <p>Redirecting to FusionAuth…</p>
    </main>
  );
}
