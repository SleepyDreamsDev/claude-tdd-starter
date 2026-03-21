### Workspace Detection (PHASE 1)

   | Signal in description | Workspace | Test framework | Test file pattern |
   |---|---|---|---|
   | endpoint, controller, service, guard, DTO, module, API | `apps/api` | Jest | `*.spec.ts` co-located |
   | component, page, hook, store, UI, form, dashboard | `apps/web` | Vitest | `*.test.ts(x)` in `__tests__/` |
   | type, schema, validation, calculation, util, shared | `packages/shared` | Vitest | `*.test.ts` in `__tests__/` |
   | job, queue, worker, processor | `apps/worker` | Vitest | `*.test.ts` in `__tests__/` |

   If the feature spans multiple workspaces, process in order:
   packages/shared -> apps/api -> apps/web -> apps/worker.

   Classify scope:
   - **Single-workspace** → use combined RED+GREEN agent dispatch
   - **Multi-workspace** → orchestrate with parallel subagents where safe

### Test Patterns

   **apps/web:**
   - Vitest globals enabled (describe, it, expect, vi available without import)
   - Component tests: `@testing-library/react` + `@testing-library/user-event`
   - Use `renderWithRouter` from `@/test/utils` for routed components
   - Path alias: `@/` = `./src/`

   **apps/api:**
   - Uses `@nestjs/testing` with `Test.createTestingModule` pattern
   - Uses `supertest` for HTTP integration tests
   - E2E tests go in `apps/api/test/` with `*.e2e-spec.ts`
   - Jest globals available without import

### Test Commands

   **CRITICAL: Always use the `run` flag with vitest. Without it, vitest starts watch mode and hangs forever.**

   | Workspace | Command |
   |---|---|
   | `apps/web` | `cd apps/web && npx vitest run <test-file>` |
   | `apps/api` | `cd apps/api && npx jest <test-file>` |
   | `packages/shared` | `cd packages/shared && npx vitest run <test-file>` |

### Test Runner Reference (CLAUDE.md)

| Workspace | Runner | Run single file | File pattern | Location |
|---|---|---|---|---|
| apps/web | Vitest | `cd apps/web && npx vitest run <file>` | `*.test.ts(x)` | `__tests__/` subdirs |
| apps/api | Jest | `cd apps/api && npx jest <file>` | `*.spec.ts` | Co-located with source |
| packages/shared | Vitest | `cd packages/shared && npx vitest run <file>` | `*.test.ts` | `__tests__/` subdirs |

### Validation Commands (PHASE 5)

Run these checks **in parallel** — make multiple Bash tool calls in a single message:

```bash
# Bash call 1: Type check the entire monorepo
npx tsc --build --noEmit

# Bash call 2: Run API tests (if API workspace was modified)
cd apps/api && npx jest

# Bash call 3: Run web tests (if web workspace was modified)
cd apps/web && npx vitest run
```

**CRITICAL: Always use the `run` flag with vitest — without it, vitest starts watch mode and hangs.**
**CRITICAL: Never use `npm run test` at root — it starts vitest watch mode.**

### Agent Dispatch (PHASE 2+3)

#### Single-workspace: combined RED+GREEN agent dispatch

Dispatch the appropriate specialist agent:

**For `apps/api`, `packages/shared`, or `apps/worker`:**

```
Agent(subagent_type: "backend-dev",
      prompt: "Complete RED+GREEN TDD cycle for this feature.
        Gherkin scenarios: [list from spec]. Test files: [paths].
        RED: Write tests, confirm ALL fail.
        GREEN: Implement simplest code to pass. Fix IMPLEMENTATION only.
        Report when done: files created, test count, all passing.")
```

**For `apps/web` or `packages/ui`:**

```
Agent(subagent_type: "frontend-dev",
      prompt: "Complete RED+GREEN TDD cycle for this feature.
        Gherkin scenarios: [list from spec]. Test files: [paths].
        RED: Write tests, confirm ALL fail. CRITICAL: Always use `npx vitest run`.
        GREEN: Implement simplest code to pass. Fix IMPLEMENTATION only.
        Report when done: files created, test count, all passing.")
```

#### Multi-workspace: create team and dispatch specialists in parallel

```
TeamCreate("feature-<slug>")

Agent(name: "backend-dev", subagent_type: "backend-dev",
      team_name: "feature-<slug>",
      prompt: "RED+GREEN for backend. Scenarios: [...]. Report when done.")

Agent(name: "frontend-dev", subagent_type: "frontend-dev",
      team_name: "feature-<slug>",
      prompt: "RED+GREEN for frontend. Scenarios: [...]. Report when done.")
```

**If web depends on API:** dispatch API first, then web sequentially.

#### API client generation (if API modified)

After GREEN, if `apps/api/src/` was modified:
```bash
npm run codegen
```

### Platform Security Checks

- **Multi-tenancy**: All queries scoped by `companyId`? `CompanyScopeGuard` on routes?
- **Prisma**: Using parameterized queries (default)? No `$queryRaw` with string interpolation?
- **NestJS**: DTOs have `@IsString()`, `@IsNumber()`, etc.? `ValidationPipe` with `whitelist: true`?
- **React**: No unsafe HTML rendering? User input sanitized before display?
- **API responses**: No password hashes, tokens, or internal errors leaked?
