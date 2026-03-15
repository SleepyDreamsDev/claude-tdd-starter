---
name: feature
description: >
  End-to-end TDD feature delivery for the Platform monorepo. Writes tests,
  implements, refactors, commits. Handles Vitest (apps/web), Jest (apps/api),
  and shared packages. Use when the user says "implement", "build", "add feature",
  or runs /feature.
command: /feature
argument-hint: "<feature description>"
allowed-tools: Read, Glob, Grep, Write, Edit, MultiEdit, Bash, TodoWrite
---

# Feature Delivery: Autonomous TDD Cycle

You will deliver a complete feature using strict TDD in this npm-workspace monorepo.
Follow every phase in order. Do not skip phases. Do not ask for permission between
phases except where marked PAUSE.

The feature to build: $ARGUMENTS

---

## PHASE 0 — PLAN CONTEXT (silent)

Check if a plan file exists:

1. Run `ls -t .claude/plans/*.md 2>/dev/null | head -1` to find the most recent plan.
2. If a plan file exists, read it. Use it as the detailed specification for this feature.
   The plan is the source of truth for scope, file locations, and acceptance criteria.
3. If no plan file exists, proceed using only $ARGUMENTS as the feature specification.

---

## PHASE 1 — DISCOVER (silent, no output needed)

1. Read CLAUDE.md for project conventions.
2. Determine the target workspace(s) from the feature description and/or plan file:

   | Signal in description                                  | Workspace         | Test framework | Test file pattern              |
   | ------------------------------------------------------ | ----------------- | -------------- | ------------------------------ |
   | endpoint, controller, service, guard, DTO, module, API | `apps/api`        | Jest           | `*.spec.ts` co-located         |
   | component, page, hook, store, UI, form, dashboard      | `apps/web`        | Vitest         | `*.test.ts(x)` in `__tests__/` |
   | type, schema, validation, calculation, util, shared    | `packages/shared` | Vitest         | `*.test.ts` in `__tests__/`    |
   | job, queue, worker, processor                          | `apps/worker`     | Vitest         | `*.test.ts` in `__tests__/`    |

   If the feature spans multiple workspaces (e.g., API endpoint + React page), note both.
   Process them in order: packages/shared → apps/api → apps/web → apps/worker.

3. For the primary workspace, find and read ONE existing test file to learn patterns:

   **apps/web:**
   - Run `ls apps/web/src/lib/__tests__/*.test.ts 2>/dev/null | head -3` — read one.
   - Vitest globals are enabled (`describe`, `it`, `expect`, `vi` available without import).
   - Rich test utilities at `apps/web/src/test/utils.tsx`:
     `renderWithRouter`, `createMockSubscription`, `createMockSubscriptions`,
     `createMockSettings`, `setupMockDB`, `waitForAsync`.
   - Component tests use `@testing-library/react` + `@testing-library/user-event`.
   - Path alias: `@/` = `./src/`.

   **apps/api:**
   - Run `find apps/api/src -name "*.spec.ts" | head -3` — read one.
   - Uses `@nestjs/testing` with `Test.createTestingModule` pattern.
   - Uses `supertest` for HTTP integration tests.
   - E2E tests go in `apps/api/test/` with `*.e2e-spec.ts`.
   - Jest globals available without import.

4. Identify where the new feature's source and test files should live based on
   existing directory structure.

---

## PHASE 2 — RED: Write Failing Tests

### Testing Trophy priority (most valuable first):

1. **Integration tests** — API endpoints with real request/response, component behavior
2. **Unit tests** — Pure functions, calculations, validators
3. **Edge cases** — Boundary values, error conditions, empty states

### Write tests:

1. Create test file(s) in the appropriate location using workspace conventions:

   **For apps/web:**
   - File: `apps/web/src/<module>/__tests__/<name>.test.ts(x)`
   - Globals are available — do NOT import `describe`, `it`, `expect`, `vi` from vitest.
   - For components: import `render`, `screen` from `@testing-library/react`,
     `userEvent` from `@testing-library/user-event`.
   - Use `renderWithRouter` from `@/test/utils` for routed components.
   - Use `createMockSubscription` from `@/test/utils` for subscription fixtures.

   **For apps/api:**
   - File: `apps/api/src/<module>/<name>.spec.ts` (co-located with source)
   - Import `Test`, `TestingModule` from `@nestjs/testing`.
   - Use `Test.createTestingModule({ ... }).compile()` in `beforeEach`.
   - For HTTP tests: import `INestApplication` and use `supertest`.

   **For packages/shared:**
   - File: `packages/shared/src/<module>/__tests__/<name>.test.ts`
   - Pure unit tests, no framework-specific setup needed.

2. Write 5-8 test cases covering:
   - Happy path (main behavior works)
   - Input validation (bad inputs rejected)
   - Edge cases (empty, null, boundary values)
   - Error conditions (what should fail and how)

3. Each test uses `describe`/`it` blocks, AAA pattern (Arrange, Act, Assert).

4. Import from where the implementation WILL exist. Do NOT create the
   implementation file yet.

5. Run the test file to confirm ALL tests fail:

   **CRITICAL: Always use the `run` flag with vitest. Without it, vitest starts watch mode and hangs forever.**

   | Workspace         | Command                                                     |
   | ----------------- | ----------------------------------------------------------- |
   | `apps/web`        | `cd apps/web && npx vitest run <test-file-relative-to-web>` |
   | `apps/api`        | `cd apps/api && npx jest <test-file-relative-to-api-src>`   |
   | `packages/shared` | `cd packages/shared && npx vitest run <test-file>`          |

### PAUSE — Show the test list

Output the complete list of `it()` blocks and ask:

> "Here are the behaviors I'll implement. Review the test list.
> Reply **go** to proceed, or tell me what to add/change."

**Wait for the user to respond before continuing.**

---

## PHASE 3 — GREEN: Implement Until All Pass

1. Create the implementation file(s).
2. Write the SIMPLEST code that makes each test pass.
3. Run the test file using the correct command for the workspace (see table above).
4. If any test fails:
   - Read the failure output carefully.
   - Fix the IMPLEMENTATION, never the tests (unless a test has a genuine bug).
   - Run tests again.
5. **Keep going until ALL tests pass.** Do not stop after the first attempt.
   Do not ask for help unless stuck on the same error 3+ times.
6. If the feature spans multiple workspaces, implement in order:
   packages/shared → apps/api → apps/web → apps/worker.
   Run each workspace's tests after implementing that workspace's code.
7. When all green, continue immediately to Phase 4.

---

## PHASE 4 — REFACTOR: Improve Without Breaking

1. Run the feature's tests first to confirm baseline is green.
2. Apply these improvements one at a time:
   - Extract magic numbers/strings into named constants
   - Add input validation with Zod where appropriate (check `packages/shared/src/validation/` for existing schemas)
   - Improve error handling
   - Clean up variable names and remove duplication
   - For API: ensure `@ApiProperty`, `@ApiOperation`, `@ApiResponse` decorators are present
   - For Web: ensure proper TypeScript types (avoid `any`, use `unknown` + type guards)
3. After EACH change, run the test file again.
4. If any test fails after a refactoring change, revert that change and try differently.
5. When refactoring is complete, continue to Phase 5.

---

## PHASE 5 — SHIP: Commit and Checkpoint

### Step 1: Full validation

Run these checks sequentially — both must pass before committing:

```bash
# Type check the entire monorepo
npx tsc --build --noEmit

# Run tests per workspace (NEVER use `npm run test` at root — it starts vitest watch mode)
cd apps/web && npx vitest run && cd -
cd apps/api && npx jest && cd -
```

If either fails, fix and re-run before proceeding.

### Step 1.5: Quick security check

Review the new/modified code for common security issues:

- **Input validation**: Are all user inputs validated? (Zod schemas, class-validator DTOs)
- **Auth/authz**: Do new API endpoints have proper guards? Is `x-company-id` checked?
- **Injection**: No raw SQL, no `innerHTML`, no dynamic code execution, no unsanitized template literals
- **Data exposure**: Response DTOs don't leak sensitive fields (passwords, tokens, internal IDs)
- **Error messages**: Errors don't expose stack traces or internal details to clients

If any issue found, fix it and re-run tests before proceeding.

### Step 2: Generate API client (if API was modified)

If you created or modified any files in `apps/api/src/`:

```bash
npm run codegen
```

### Step 3: Commit

1. Create a feature branch if on main:
   ```bash
   git checkout -b feature/<short-slug>
   ```
2. Stage changed files (be specific, avoid `git add -A`):
   ```bash
   git add <list of changed files>
   ```
3. Commit with conventional commit message:

   ```
   feat(<scope>): <description>
   ```

   Scopes: `api`, `web`, `worker`, `shared`, `ui`, `prisma`, `infra`, `ci`

4. Push:
   ```bash
   git push -u origin HEAD
   ```

### Step 4: Checkpoint summary

Output:

```
## Checkpoint

### What was built
- [1-2 sentence summary]

### Workspace(s)
- [which workspaces were modified]

### Files created/modified
- [list all files]

### Tests
- [count] tests, all passing
- Test runner: [Vitest/Jest]

### Assumptions (unvalidated)
- [list anything assumed but not proven]

### Next session
- [what to work on next]
```
