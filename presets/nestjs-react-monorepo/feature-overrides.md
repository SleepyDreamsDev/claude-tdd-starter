### Workspace Detection (PHASE 1)

   | Signal in description | Workspace | Test framework | Test file pattern |
   |---|---|---|---|
   | endpoint, controller, service, guard, DTO, module, API | `apps/api` | Jest | `*.spec.ts` co-located |
   | component, page, hook, store, UI, form, dashboard | `apps/web` | Vitest | `*.test.ts(x)` in `__tests__/` |
   | type, schema, validation, calculation, util, shared | `packages/shared` | Vitest | `*.test.ts` in `__tests__/` |
   | job, queue, worker, processor | `apps/worker` | Vitest | `*.test.ts` in `__tests__/` |

   If the feature spans multiple workspaces, process in order:
   packages/shared -> apps/api -> apps/web -> apps/worker.

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

### Platform Security Checks

- **Multi-tenancy**: All queries scoped by `companyId`? `CompanyScopeGuard` on routes?
- **Prisma**: Using parameterized queries (default)? No `$queryRaw` with string interpolation?
- **NestJS**: DTOs have `@IsString()`, `@IsNumber()`, etc.? `ValidationPipe` with `whitelist: true`?
- **React**: No unsafe HTML rendering? User input sanitized before display?
- **API responses**: No password hashes, tokens, or internal errors leaked?
