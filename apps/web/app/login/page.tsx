"use client";

import { useEffect } from "react";

const fusionAuthBase = process.env.NEXT_PUBLIC_FUSIONAUTH_URL ?? "http://localhost:9011";
const clientId = process.env.NEXT_PUBLIC_FUSIONAUTH_CLIENT_ID ?? "";

export default function LoginPage() {
  useEffect(() => {
    if (!clientId) {
      return;
    }
    const redirectUri =
      process.env.NEXT_PUBLIC_FUSIONAUTH_REDIRECT_URI?.trim() ||
      `${window.location.origin}/auth/callback`;
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
        <h1 style={{ fontSize: "1.25rem" }}>FusionAuth Client Id required</h1>
        <ol style={{ lineHeight: 1.7, paddingLeft: "1.25rem" }}>
          <li>
            Open FusionAuth Admin → <strong>Applications</strong> → your app (e.g. LioArcade).
          </li>
          <li>
            Open the <strong>OAuth</strong> tab and copy the <strong>Client Id</strong> (UUID).
          </li>
          <li>
            In <code>apps/web/.env.local</code>, set:{" "}
            <code>NEXT_PUBLIC_FUSIONAUTH_CLIENT_ID=&lt;paste-here&gt;</code>
          </li>
          <li>
            Restart the web dev server (<code>npx pnpm dev:web</code>) so Next.js picks up env changes.
          </li>
        </ol>
        <p style={{ marginTop: "1rem" }}>
          You can copy <code>apps/web/.env.example</code> to <code>.env.local</code> if the file does not exist yet.
        </p>
      </main>
    );
  }

  return (
    <main className="container">
      <p>Redirecting to FusionAuth…</p>
    </main>
  );
}
