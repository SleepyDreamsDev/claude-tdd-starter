### Workspace Detection (PHASE 1)

This is a single-package project. No workspace detection needed.
All code lives under `src/`.

   | Signal in description | Directory | Test file pattern |
   |---|---|---|
   | page, layout, route | `src/app/` | `*.test.tsx` in `__tests__/` |
   | component, UI, form | `src/components/` | `*.test.tsx` in `__tests__/` |
   | API, router, query, mutation | `src/server/` | `*.test.ts` in `__tests__/` |
   | util, helper, schema, validation | `src/lib/` | `*.test.ts` in `__tests__/` |

### Test Patterns

   - Vitest globals enabled (describe, it, expect, vi available without import)
   - Component tests: `@testing-library/react` + `@testing-library/user-event`
   - Server tests: Direct function calls, no HTTP layer needed

### Test Commands

   | Scope | Command |
   |---|---|
   | Single file | `pnpm vitest run <test-file>` |
   | All tests | `pnpm vitest run` |
   | Watch mode | `pnpm vitest` |

### Test Runner Reference (CLAUDE.md)

| Runner | Run single file | File pattern | Location |
|---|---|---|---|
| Vitest | `pnpm vitest run <file>` | `*.test.ts(x)` | `__tests__/` subdirs |

**CRITICAL:** Never run `pnpm vitest` without `run` flag — it starts watch mode and hangs.

### Validation Commands (PHASE 5)

```bash
# Type check
pnpm tsc --noEmit

# Run all tests
pnpm vitest run
```

### Agent Dispatch (PHASE 2+3)

No specialist agents — execute RED+GREEN inline.

### Platform Security Checks

- **Auth**: Server Actions and API routes check session before mutations
- **Data access**: All DB queries filter by authenticated user
- **React**: No unsafe HTML rendering
- **Server Actions**: Validate input with Zod before processing
