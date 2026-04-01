"use client";

import { AUTH_TOKEN_STORAGE_KEY } from "@/lib/auth-token";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.startsWith("#")
      ? window.location.hash.slice(1)
      : window.location.hash;
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const oauthError = params.get("error");
    const description = params.get("error_description");

    if (oauthError) {
      setError(description ?? oauthError);
      return;
    }

    if (accessToken) {
      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, accessToken);
      router.replace("/");
      return;
    }

    setError("No access token returned. Enable Implicit Grant and check redirect URI in FusionAuth.");
  }, [router]);

  if (error) {
    return (
      <main className="container">
        <p>Login failed: {error}</p>
      </main>
    );
  }

  return (
    <main className="container">
      <p>Completing sign-in…</p>
    </main>
  );
}
