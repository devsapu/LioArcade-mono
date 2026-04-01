# LioArcade Monorepo Foundation

## Apps

- `apps/web`: Next.js web app (App Router)
- `apps/mobile`: Expo React Native app
- `apps/bff`: Fastify backend-for-frontend

## Packages

- `packages/types`: shared TypeScript contracts
- `packages/api-client`: reusable API + TanStack Query helpers
- `packages/config`: shared TypeScript and ESLint base config

## Commands

- `npx pnpm install`
- `npx pnpm dev`
- `npx pnpm dev:web`
- `npx pnpm dev:mobile`
- `npx pnpm dev:bff`
- `npx pnpm typecheck`

## Environment

- Copy `apps/web/.env.example` to `apps/web/.env.local` for FusionAuth and BFF URLs.
- Copy `apps/bff/.env.example` to `apps/bff/.env` (optional; defaults match local FusionAuth JWKS).
- FusionAuth local setup: see `docs/development/fusionauth-setup.md`.
