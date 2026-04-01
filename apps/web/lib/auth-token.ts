export const AUTH_TOKEN_STORAGE_KEY = "lioarcade_access_token";

export function getStoredAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export function clearStoredAccessToken(): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
}
