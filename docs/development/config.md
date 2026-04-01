# Configuration Strategy

## Purpose

This document defines how configuration and environment variables are managed across the LioArcade monorepo.

## Monorepo Configuration Scope

- Root: workspace/tooling config (`pnpm-workspace.yaml`, root scripts)
- `packages/config`: shared TypeScript and lint configuration
- App-level runtime config:
  - `apps/web`: Next.js env variables
  - `apps/mobile`: Expo `app.json` (future `app.config.ts`)
  - `apps/bff`: Node environment variables

## Environment Variable Strategy

### Rules

- Keep secrets server-side (`apps/bff`) and never expose them in frontend bundles.
- Use explicit prefixes where required by framework:
  - Next.js public vars: `NEXT_PUBLIC_*`
- Keep variable names consistent across local/staging/production.
- Document every new variable in this file and relevant app docs.

### Current Variables

- Web:
  - `NEXT_PUBLIC_BFF_URL` (optional local fallback exists)
- BFF:
  - `HOST` (default `0.0.0.0`)
  - `PORT` (default `4000`)
- Mobile:
  - No env pipeline yet (currently uses a local hardcoded BFF URL in `App.tsx`)

## Local vs Production Configuration

### Local Development

- Web can use `NEXT_PUBLIC_BFF_URL=http://localhost:4000`.
- BFF runs on `http://localhost:4000` by default.
- Mobile currently points to localhost and should be updated per device/network when testing on physical devices.

### Production

- Web: point `NEXT_PUBLIC_BFF_URL` to production BFF origin.
- BFF: set `HOST`, `PORT`, and future auth/provider credentials via deployment environment.
- Mobile: inject API endpoints through Expo config (`app.config.ts` + EAS env/secrets).

## API URL Strategy

Single source of truth:

- Clients (`web`, `mobile`) call BFF only.
- BFF handles downstream integrations.

Current defaults:

- BFF local: `http://localhost:4000`
- Web fallback: `http://localhost:4000`
- Mobile current default: `http://localhost:4000` (development placeholder)

## Future Plan: `app.config.ts` (Mobile)

Move mobile runtime configuration from static `app.json` to dynamic `app.config.ts` when introducing multi-environment builds.

Planned outcomes:

- Environment-based API URL selection per EAS profile
- Build-time injection for non-secret runtime values
- Centralized config logic for iOS/Android identifiers and app metadata

## Operational Guidelines

- Do not hardcode production URLs in app source.
- Do not commit secrets to repository files.
- Validate configuration in app startup paths where practical.
- Keep configuration changes small, reviewed, and documented.
