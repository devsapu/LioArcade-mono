# BFF Architecture (`apps/bff`)

## Purpose

`apps/bff` is the backend-for-frontend service for LioArcade.  
It provides a stable API contract to web/mobile and isolates external integrations from clients.

## Tech and Runtime

- Framework: Fastify
- Language: TypeScript (strict)
- Runtime tooling: `tsx` for local dev
- Shared contracts: `@lioarcade/types`

## Code Structure

Current layered structure:

- `src/routes/*`: HTTP route registration
- `src/controllers/*`: request/response orchestration
- `src/services/*`: core business/data logic
- `src/server.ts`: server bootstrapping, plugins, host/port config

Current endpoint:

- `GET /health`

## Request Flow: Route -> Controller -> Service

Use this enforced flow for every endpoint:

1. Route maps URL + method to controller.
2. Controller handles request context and response handling.
3. Service performs business logic and returns typed data.

Benefits:

- Clear separation of responsibilities
- Easier testing of business logic
- Safer future expansion for auth and third-party integrations

## API Design Principles

- Expose frontend-oriented contracts, not third-party provider payloads.
- Keep response shapes consistent and typed.
- Use shared types where possible (`packages/types`).
- Keep controllers thin; keep services deterministic and reusable.

## Validation Strategy

Current codebase has minimal validation because only `/health` exists.

Required strategy for new endpoints:

- Validate params, query, headers, and body at the BFF boundary.
- Reject invalid input early with explicit error responses.
- Never pass unvalidated data into service logic.
- Prefer schema-driven validation with Fastify-compatible schemas.

## Runtime Configuration

Current startup in `server.ts`:

- `HOST` default: `0.0.0.0`
- `PORT` default: `4000`
- CORS enabled via `@fastify/cors`

Guidelines:

- Keep local defaults simple.
- Make production settings explicit via environment variables.
- Do not hardcode environment-specific values in services/routes.

## Future Auth Integration Point

Planned auth (FusionAuth/Google OAuth) should integrate at BFF boundary:

- Add auth plugin/middleware at server bootstrap level.
- Keep token/session validation centralized.
- Attach authenticated user context before controller execution.
- Expose sanitized user/session models to frontend via shared types.
