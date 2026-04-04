# FusionAuth (local) — prerequisite

Do not run Docker from this document automatically. Start FusionAuth locally when you are ready to test authentication.

## Start FusionAuth (Docker)

```bash
docker run -d -p 9011:9011 fusionauth/fusionauth-app
```

Then open the admin UI: [http://localhost:9011](http://localhost:9011)

## Bootstrap the application

1. Complete the FusionAuth setup wizard if prompted (admin account, etc.).
2. Create an **Application** named `LioArcade`.
3. Enable **Email** login (email + password) for that application.
4. Ensure **JWT** is enabled for issued tokens (default in most FusionAuth setups).
5. OAuth settings for this monorepo’s web flow:
   - **Authorized redirect URLs**: add **exactly** `http://localhost:3000/auth/callback` (same string the app sends — no trailing slash). If you use `NEXT_PUBLIC_FUSIONAUTH_REDIRECT_URI` in `apps/web/.env.local`, that value and FusionAuth must match **character for character**.
   - If you open the app as `http://127.0.0.1:3000` instead of `http://localhost:3000`, either register **both** redirect URLs in FusionAuth or set `NEXT_PUBLIC_FUSIONAUTH_REDIRECT_URI` to a single canonical URL and always use that host in the browser.
   - **Enabled grants**: enable **Implicit** (access token returned in the URL fragment for the minimal web demo).

Copy the application’s **Client Id** into `NEXT_PUBLIC_FUSIONAUTH_CLIENT_ID` for `apps/web`.

## JWKS

The BFF validates JWTs using the FusionAuth JWKS document:

- Default local URL: `http://localhost:9011/.well-known/jwks.json`

Set `FUSIONAUTH_JWKS_URL` in `apps/bff` if your FusionAuth base URL differs.
