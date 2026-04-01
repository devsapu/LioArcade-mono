# Mobile Architecture (`apps/mobile`)

## Purpose

`apps/mobile` is the Expo React Native client for LioArcade.  
It shares API and type contracts with web and BFF through workspace packages.

## Tech and Boundaries

- Runtime: Expo + React Native
- Language: TypeScript (strict)
- Server state: TanStack Query
- API access: `@lioarcade/api-client`
- Shared contracts: `@lioarcade/types`

## App Structure

Current structure:

- `App.tsx`: root app composition and initial screen
- `app.json`: Expo app metadata
- `metro.config.js`: monorepo resolution setup
- `babel.config.js`: Expo Babel preset

Guidelines:

- Keep screen logic simple and feature-focused.
- Extract reusable hooks/services into shared packages when needed by multiple apps.
- Do not duplicate transport or type logic from web.

## TanStack Query Usage

`App.tsx` uses shared query client setup:

```tsx
const queryClient = createQueryClient();
const apiClient = createApiClient("http://localhost:4000");
```

Query usage pattern:

```tsx
const health = useQuery({
  queryKey: ["health"],
  queryFn: () => apiClient.get<HealthStatus>("/health")
});
```

Rules:

- Use TanStack Query for server state.
- Keep UI state local; avoid mixing caching concerns in presentational components.

## `app.json` Configuration

Current file defines base app metadata (`name`, `slug`, version, orientation).

For production readiness, add explicit bundle identifiers:

```json
{
  "expo": {
    "ios": { "bundleIdentifier": "com.lioarcade.app" },
    "android": { "package": "com.lioarcade.app" }
  }
}
```

Notes:

- Keep identifiers stable after release.
- Align identifiers with store/account ownership strategy.

## Metro Config for Monorepo

`metro.config.js` is configured for workspace compatibility:

- Watches workspace root
- Resolves `node_modules` from app and workspace root
- Enables symlink support

This is required so Expo can consume local workspace packages (`@lioarcade/*`) reliably.

## EAS Build Notes (Future)

EAS is not configured yet. When introduced:

- Add `eas.json` and build profiles (`development`, `preview`, `production`).
- Move environment-dependent app config to `app.config.ts`.
- Keep secrets in EAS secrets, not in committed files.
- Ensure API base URL strategy supports per-profile endpoints.
