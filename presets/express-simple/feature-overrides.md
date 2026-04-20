### Workspace Detection (PHASE 1)

This is a single-package project. No workspace detection needed.
All code lives under `src/`.

| Signal in description    | Directory         | Test file pattern           |
| ------------------------ | ----------------- | --------------------------- |
| endpoint, route, handler | `src/routes/`     | `*.test.ts` in `__tests__/` |
| middleware, guard, auth  | `src/middleware/` | `*.test.ts` in `__tests__/` |
| model, schema, entity    | `src/models/`     | `*.test.ts` in `__tests__/` |
| util, helper, validation | `src/lib/`        | `*.test.ts` in `__tests__/` |

### Test Patterns

- Vitest globals enabled (describe, it, expect, vi available without import)
- HTTP tests: use `supertest` with the Express app
- Unit tests: direct function calls

### Test Commands

| Scope       | Command                      |
| ----------- | ---------------------------- |
| Single file | `npx vitest run <test-file>` |
| All tests   | `npx vitest run`             |
| Watch mode  | `npx vitest`                 |

### Test Runner Reference (CLAUDE.md)

| Runner | Run single file         | File pattern | Location             |
| ------ | ----------------------- | ------------ | -------------------- |
| Vitest | `npx vitest run <file>` | `*.test.ts`  | `__tests__/` subdirs |

**CRITICAL:** Never run `npx vitest` without `run` flag — it starts watch mode and hangs.

### Validation Commands (PHASE 5)

```bash
# Type check
npx tsc --noEmit

# Run all tests
npx vitest run
```

### Agent Dispatch (PHASE 2+3)

No specialist agents — execute RED+GREEN inline.

### Platform Security Checks

- **Auth**: All routes behind auth middleware? Token validation correct?
- **Input validation**: Request body/params validated before use?
- **SQL/NoSQL**: Parameterized queries? No string concatenation in queries?
- **Error handling**: Global error handler doesn't leak stack traces?
- **CORS**: Configured for specific origins, not `*`?

### Project Layout

src/
├── routes/ # Express route handlers
├── middleware/ # Express middleware
├── models/ # Data models and schemas
├── lib/ # Utilities and helpers
│ ├── types/ # TypeScript types
│ └── utils.ts
└── index.ts # Entry point

### Project Conventions

- Named exports for all route handlers, middleware, and utilities
- Separate route definitions from business logic (thin controllers)
- Validate all request input before processing (Zod or express-validator)
- Use parameterized queries — no string concatenation in DB calls
- 4-argument error handlers as the last middleware `(err, req, res, next)`
- No `any` — use `unknown` and narrow, or define explicit types

### Test File Location Table

| Domain          | Source path     | Test file                              |
| --------------- | --------------- | -------------------------------------- |
| Route handler   | src/routes/     | src/routes/\*_/**tests**/_.test.ts     |
| Middleware      | src/middleware/ | src/middleware/\*_/**tests**/_.test.ts |
| Model / service | src/models/     | src/models/\*_/**tests**/_.test.ts     |
| Utility / lib   | src/lib/        | src/lib/\*_/**tests**/_.test.ts        |

### Test Watch Warning

**CRITICAL:** Never run `npx vitest` without `run` — it starts watch mode and hangs.

### Project Technical Rules

- Named exports for route handlers, middleware, utilities
- Validate all request input before processing
- Use parameterized queries — no string concatenation in DB calls
- 4-argument error handlers as the last middleware
- No `any` type — use `unknown` and narrow
