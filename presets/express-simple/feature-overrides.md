### Workspace Detection (PHASE 1)

This is a single-package project. No workspace detection needed.
All code lives under `src/`.

   | Signal in description | Directory | Test file pattern |
   |---|---|---|
   | endpoint, route, handler | `src/routes/` | `*.test.ts` in `__tests__/` |
   | middleware, guard, auth | `src/middleware/` | `*.test.ts` in `__tests__/` |
   | model, schema, entity | `src/models/` | `*.test.ts` in `__tests__/` |
   | util, helper, validation | `src/lib/` | `*.test.ts` in `__tests__/` |

### Test Patterns

   - Vitest globals enabled (describe, it, expect, vi available without import)
   - HTTP tests: use `supertest` with the Express app
   - Unit tests: direct function calls

### Test Commands

   | Scope | Command |
   |---|---|
   | Single file | `npx vitest run <test-file>` |
   | All tests | `npx vitest run` |
   | Watch mode | `npx vitest` |

### Test Runner Reference (CLAUDE.md)

| Runner | Run single file | File pattern | Location |
|---|---|---|---|
| Vitest | `npx vitest run <file>` | `*.test.ts` | `__tests__/` subdirs |

**CRITICAL:** Never run `npx vitest` without `run` flag — it starts watch mode and hangs.

### Platform Security Checks

- **Auth**: All routes behind auth middleware? Token validation correct?
- **Input validation**: Request body/params validated before use?
- **SQL/NoSQL**: Parameterized queries? No string concatenation in queries?
- **Error handling**: Global error handler doesn't leak stack traces?
- **CORS**: Configured for specific origins, not `*`?
