### Workspace Detection (PHASE 1)

   This is a single-workspace React app. All code lives in `src/`.

   | Signal in description | Location | Test framework | Test file pattern |
   |---|---|---|---|
   | component, page, screen, UI, form, layout, navigation | `src/components/`, `src/pages/` | Vitest | `*.test.tsx` in `__tests__/` |
   | hook, store, state, context | `src/hooks/`, `src/store/` | Vitest | `*.test.ts` in `__tests__/` |
   | database, Dexie, IndexedDB, storage | `src/lib/db/` | Vitest | `*.test.ts` in `__tests__/` |
   | sync, Google Drive, cloud | `src/lib/sync/` | Vitest | `*.test.ts` in `__tests__/` |
   | crypto, encryption, key | `src/lib/crypto/` | Vitest | `*.test.ts` in `__tests__/` |
   | utility, calculation, helper, format | `src/lib/` | Vitest | `*.test.ts` in `__tests__/` |

   This project is always single-workspace — no team orchestration needed.

### Test Patterns

   - Vitest globals enabled (`describe`, `it`, `expect`, `vi` available without import)
   - Component tests: `@testing-library/react` + `@testing-library/user-event`
   - Dexie tests: use `fake-indexeddb` (imported in test setup)
   - Path alias: `@/` = `./src/`
   - Mock Capacitor plugins: `vi.mock('@capacitor/...')`
   - Mock Google Drive API: `vi.mock('../lib/sync/google-drive')`

### Test Commands

   **CRITICAL: Always use the `run` flag with vitest. Without it, vitest starts watch mode and hangs forever.**

   | Scope | Command |
   |---|---|
   | All tests | `bunx vitest run` |
   | Single file | `bunx vitest run <test-file>` |
   | Coverage | `bunx vitest run --coverage` |

### Test Runner Reference (CLAUDE.md)

| Runner | Run all | Run single file | File pattern | Location |
|---|---|---|---|---|
| Vitest | `bunx vitest run` | `bunx vitest run <file>` | `*.test.ts(x)` | `__tests__/` subdirs |

### Validation Commands (PHASE 5)

```bash
# Type check
bunx tsc --noEmit

# Run all tests
bunx vitest run
```

### Agent Dispatch (PHASE 2+3)

#### Single-workspace: combined RED+GREEN agent dispatch

```
Agent(subagent_type: "app-dev",
      prompt: "Complete RED+GREEN TDD cycle for this feature.
        Gherkin scenarios: [list from spec]. Test files: [paths].
        RED: Write tests, confirm ALL fail. CRITICAL: Always use `bunx vitest run`.
        GREEN: Implement simplest code to pass. Fix IMPLEMENTATION only.
        Report when done: files created, test count, all passing.")
```

### Platform Security Checks

- **Capacitor bridge**: No sensitive data (tokens, keys, passwords) passed through JS bridge without encryption
- **Web Crypto**: Key material never stored in localStorage or sessionStorage — use IndexedDB with Capacitor Secure Storage
- **Google Drive sync**: OAuth tokens stored encrypted, refresh tokens never exposed to frontend JS
- **Dexie/IndexedDB**: Sensitive records encrypted at rest using Web Crypto API (AES-GCM)
- **Offline data**: Local data integrity verified on sync (checksums, version vectors)
- **Deep links**: Capacitor deep link handlers validate URL schemes and parameters
