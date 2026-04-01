# Web Architecture (`apps/web`)

## Purpose

`apps/web` is the Next.js frontend for LioArcade, built with App Router and TypeScript.  
It renders user-facing web experiences and consumes backend data via the BFF.

## Tech and Boundaries

- Framework: Next.js (App Router)
- Language: TypeScript (strict)
- Server state: TanStack Query
- API access: `@lioarcade/api-client`
- Shared contracts: `@lioarcade/types`

## App Router Structure

Current structure:

- `app/layout.tsx`: root layout and provider wiring
- `app/providers.tsx`: TanStack Query provider
- `app/page.tsx`: homepage and initial BFF query
- `app/globals.css`: global styles

Pattern:

- Keep route-level UI in `app/*`.
- Keep shared logic in packages (`packages/api-client`, `packages/types`).
- Avoid route files with direct external integrations.

## Data Fetching with TanStack Query

Query client is initialized once in `app/providers.tsx` using `createQueryClient()` from `@lioarcade/api-client`.

Use this pattern for server state:

```tsx
const health = useQuery({
  queryKey: ["health"],
  queryFn: () => apiClient.get<HealthStatus>("/health")
});
```

Guidelines:

- Use stable `queryKey` values.
- Keep query functions thin and delegate transport logic to `api-client`.
- Use shared response types from `@lioarcade/types`.

## API Integration via `@lioarcade/api-client`

Web app creates a client with BFF base URL:

```tsx
const apiClient = createApiClient(
  process.env.NEXT_PUBLIC_BFF_URL ?? "http://localhost:4000"
);
```

Rules:

- All web API calls go through BFF endpoints.
- Do not call third-party APIs directly from web routes/components.
- Reuse `ApiClient` and shared types instead of per-feature fetch wrappers.

## Environment Variables

Current variable:

- `NEXT_PUBLIC_BFF_URL` (optional locally, defaults to `http://localhost:4000`)

Recommended `.env.local`:

```env
NEXT_PUBLIC_BFF_URL=http://localhost:4000
```

Practices:

- Prefix browser-exposed variables with `NEXT_PUBLIC_`.
- Keep secrets out of frontend env files.
- Add new variables to docs and keep names consistent across environments.
