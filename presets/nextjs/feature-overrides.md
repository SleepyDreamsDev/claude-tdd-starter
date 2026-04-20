### Workspace Detection (PHASE 1)

This is a single-package project. No workspace detection needed.
All code lives under `src/`.

| Signal in description            | Directory         | Test file pattern            |
| -------------------------------- | ----------------- | ---------------------------- |
| page, layout, route              | `src/app/`        | `*.test.tsx` in `__tests__/` |
| component, UI, form              | `src/components/` | `*.test.tsx` in `__tests__/` |
| API, router, query, mutation     | `src/server/`     | `*.test.ts` in `__tests__/`  |
| util, helper, schema, validation | `src/lib/`        | `*.test.ts` in `__tests__/`  |

### Test Patterns

- Vitest globals enabled (describe, it, expect, vi available without import)
- Component tests: `@testing-library/react` + `@testing-library/user-event`
- Server tests: Direct function calls, no HTTP layer needed

### Test Commands

| Scope       | Command                       |
| ----------- | ----------------------------- |
| Single file | `pnpm vitest run <test-file>` |
| All tests   | `pnpm vitest run`             |
| Watch mode  | `pnpm vitest`                 |

### Test Runner Reference (CLAUDE.md)

| Runner | Run single file          | File pattern   | Location             |
| ------ | ------------------------ | -------------- | -------------------- |
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

### Project Layout

src/
├── app/
│ ├── (routes)/ # App Router pages
│ │ ├── page.tsx
│ │ └── layout.tsx
│ └── api/ # API route handlers
├── components/ # React components
│ └── ui/ # Shared UI primitives
├── lib/
│ ├── types.ts # Shared TypeScript types
│ ├── utils.ts # Utilities and helpers
│ └── db/ # Database client and schema
└── hooks/ # Custom React hooks

### Project Conventions

- Function declarations for components, not arrow functions
- Named exports for all components, hooks, and utilities
- Exception: page.tsx and layout.tsx use default exports (Next.js requirement)
- Absolute imports with @/ alias — never relative paths
- No `any` — use `unknown` and narrow, or define explicit types
- Server components by default; only add `"use client"` when needed (hooks, events)
- All visible strings from i18n dictionary, never hardcoded

### Test File Location Table

| Domain        | Source path     | Test file                               |
| ------------- | --------------- | --------------------------------------- |
| Page / route  | src/app/        | src/app/\*_/**tests**/_.test.tsx        |
| Component     | src/components/ | src/components/\*_/**tests**/_.test.tsx |
| Utility / lib | src/lib/        | src/lib/\*_/**tests**/_.test.ts         |
| Hook          | src/hooks/      | src/hooks/**tests**/\*.test.ts          |

### Test Watch Warning

**CRITICAL:** Never run `pnpm vitest` without `run` — it starts watch mode and hangs.

### Project Technical Rules

- Function declarations for components (not arrow functions)
- Named exports for components, hooks, utilities
- Server components by default — only add `"use client"` when needed
- Absolute imports with @/ alias
- No `any` type — use `unknown` and narrow
- All visible strings from i18n dictionary
