### Workspace Detection (PHASE 1)

This is a single-package project. No workspace detection needed.
All code lives under `src/`.

   | Signal in description | Directory | Test file pattern |
   |---|---|---|
   | page, layout, route | `src/app/` | `*.test.tsx` in `__tests__/` |
   | component, UI, form | `src/components/` | `*.test.tsx` in `__tests__/` |
   | util, helper, types, pricing | `src/lib/` | `*.test.ts` in `__tests__/` |
   | i18n, dictionary, locale | `src/lib/i18n/` | `*.test.ts` in `__tests__/` |
   | hook, use- prefix | `src/hooks/` | `*.test.ts` in `__tests__/` |

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

- **React**: No raw HTML injection — use JSX text nodes for all dynamic content
- **Input validation**: Validate booking form data before processing
- **i18n completeness**: All translation keys must be present in both `ro.json` and `ru.json`
- **POC data layer**: No real user data stored — mock data only, no persistence
