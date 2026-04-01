# LioArcade Engineering and AI Collaboration Rules

## 1. Purpose

These rules exist to keep LioArcade reliable, maintainable, and scalable while enabling safe AI-assisted development.

- Enforce consistent architecture and coding standards across all apps and packages.
- Reduce regressions by requiring predictable patterns and strict type safety.
- Ensure AI contributions match senior engineering expectations, not ad hoc code generation.

## 2. Core Principles

- **Simplicity over complexity**: choose the smallest solution that solves the current problem well.
- **Consistency over cleverness**: follow existing conventions before introducing new patterns.
- **Explicit over implicit**: make data flow, dependencies, and contracts obvious.
- **Safety over speed**: do not trade correctness for short-term delivery speed.
- **Scalable by default**: design changes so future auth, CI/CD, and new features can be added without rewrites.

## 3. Monorepo Rules

### DO

- Use `pnpm` workspaces and run commands from the repository root unless app-specific execution is required.
- Use `workspace:*` for all internal package dependencies.
- Move shared types and reusable logic into `packages/*`.
- Keep app-specific UI/runtime code inside `apps/*`.

### DO NOT

- Do not duplicate logic across `apps/web`, `apps/mobile`, and `apps/bff`.
- Do not bypass workspace linking by using relative imports across app boundaries.
- Do not create new top-level folders without architecture justification and team agreement.

## 4. Code Organization Rules

### DO

- Follow the current structure:
  - `apps/web` (Next.js App Router)
  - `apps/mobile` (Expo)
  - `apps/bff` (Fastify, layered routes/controllers/services)
  - `packages/types`, `packages/api-client`, `packages/config`
- Keep functions focused, with a single clear responsibility.
- Prefer extending existing modules over creating parallel abstractions.

### DO NOT

- Do not introduce new architectural patterns without documenting why current patterns are insufficient.
- Do not create generic utility layers "just in case."
- Do not leave dead code, commented-out logic, or unused exports.

## 5. API and BFF Rules

### DO

- Route external service communication through `apps/bff`.
- Validate request inputs at the backend boundary before processing.
- Keep BFF handlers thin: route -> controller -> service separation.
- Return typed, consistent response shapes using shared contracts.

### DO NOT

- Do not call third-party APIs directly from `web` or `mobile`.
- Do not leak provider-specific payloads directly to frontend consumers.
- Do not embed business logic in route registration files.

## 6. State Management Rules

### DO

- Use TanStack Query for all server state in `web` and `mobile`.
- Centralize query client setup and API wrapper logic in shared packages where practical.
- Keep UI-only state local to components/hooks.

### DO NOT

- Do not store server state in local component state when TanStack Query should own it.
- Do not mix cache orchestration with presentational UI logic.
- Do not create multiple conflicting patterns for data fetching.

## 7. Type Safety Rules

### DO

- Use strict TypeScript and shared contracts from `packages/types`.
- Type all public function inputs/outputs and API responses.
- Prefer `unknown` + narrowing over `any` when type is uncertain.

### DO NOT

- Do not use `any` unless explicitly justified and documented in code.
- Do not silence type errors with unsafe assertions to "make build pass."
- Do not duplicate shared interfaces inside app code.

## 8. Dependency Rules

### DO

- Add dependencies in the narrowest valid scope (root vs app vs package).
- Reuse existing dependencies and shared packages before adding new libraries.
- Keep dependencies minimal and aligned with the monorepo stack choices.

### DO NOT

- Do not install duplicate libraries that solve the same problem.
- Do not introduce heavy frameworks for small problems.
- Do not add runtime dependencies for build-time-only needs.

## 9. AI Usage Rules (Mandatory)

### DO

- Analyze existing code and patterns before proposing or writing changes.
- Explain approach and trade-offs before implementation for non-trivial changes.
- Prefer modifying existing files over creating new files.
- Preserve behavior unless change intent explicitly requires behavior updates.
- Validate changes with type checks/tests relevant to the touched scope.

### DO NOT

- Do not overwrite or remove existing behavior without clear confirmation.
- Do not introduce new patterns when an established pattern already exists.
- Do not make speculative architectural changes unrelated to the request.
- Do not add files, dependencies, or abstractions "for future use" without immediate value.

## 10. Testing Rules

### DO

- Add or update tests for critical business logic and regressions.
- Prioritize tests at the level where risk is highest (service/unit/integration).
- Keep tests deterministic and focused on behavior.

### DO NOT

- Do not add low-value tests that only assert implementation details.
- Do not skip tests for critical paths affected by the change.
- Do not leave failing or flaky tests in the branch.

## 11. Documentation Rules

### DO

- Update documentation when architecture, boundaries, or developer workflows change.
- Keep `README.md` accurate for setup, scripts, and run instructions.
- Document non-obvious decisions in concise ADR-style notes when needed.

### DO NOT

- Do not merge architectural changes without documentation updates.
- Do not leave outdated command examples or folder references.

## 12. Forbidden Actions

- Breaking existing features to ship unrelated work faster.
- Introducing unused dependencies, files, or abstractions.
- Duplicating logic that belongs in shared packages.
- Changing core architecture without rationale and documentation.
- Bypassing type safety or validation in production code.

## 13. Decision-Making Guidelines

- Start with the simplest viable solution that meets current requirements.
- Optimize for clarity and maintainability before micro-optimizations.
- Evaluate impact across `web`, `mobile`, `bff`, and shared packages before merging.
- Prefer reversible, incremental changes over large unbounded refactors.
- If trade-offs are unclear, document options and choose the lowest-risk path.
