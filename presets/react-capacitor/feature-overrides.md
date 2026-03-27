### Workspace Detection (PHASE 1)

This is a single-workspace React + Capacitor app. All code lives in `src/`.
Work is split by **domain** — UI layer vs Data layer:

| Signal in description                                 | Domain | Agent    | Test pattern                             |
| ----------------------------------------------------- | ------ | -------- | ---------------------------------------- |
| component, page, screen, UI, form, layout, navigation | UI     | ui-dev   | `*.test.tsx` in `__tests__/`             |
| hook, context, provider, state, store                 | UI     | ui-dev   | `*.test.ts(x)` in `__tests__/`           |
| database, Dexie, IndexedDB, storage, migration        | Data   | data-dev | `*.test.ts` in `__tests__/`              |
| sync, Google Drive, cloud, backup, conflict           | Data   | data-dev | `*.test.ts` in `__tests__/`              |
| crypto, encryption, key, security, PBKDF2             | Data   | data-dev | `*.test.ts` in `__tests__/`              |
| utility, calculation, helper, format                  | Data   | data-dev | `*.test.ts` in `__tests__/`              |
| cross-cutting (UI + data layer changes)               | Both   | both     | dispatch sequentially: data-dev → ui-dev |

### Test Patterns

- Vitest globals enabled (`describe`, `it`, `expect`, `vi` available without import)
- Component tests: `@testing-library/react` + `@testing-library/user-event`
- Dexie tests: use `fake-indexeddb` (imported in test setup)
- Path alias: `@/` = `./src/`
- Mock Capacitor plugins: `vi.mock('@capacitor/...')`
- Mock Google Drive API: `vi.mock('../sync/google-drive')` or similar
- Chart library testing: test at component render level (verify DOM, aria labels, data attributes), do NOT mock internal render prop functions

### Test Commands

**CRITICAL: Always use the `run` flag with vitest. Without it, vitest starts watch mode and hangs forever.**

| Scope       | Command                       |
| ----------- | ----------------------------- |
| All tests   | `bunx vitest run`             |
| Single file | `bunx vitest run <test-file>` |
| Coverage    | `bunx vitest run --coverage`  |

### Test Runner Reference (CLAUDE.md)

| Runner | Run all           | Run single file          | File pattern   | Location             |
| ------ | ----------------- | ------------------------ | -------------- | -------------------- |
| Vitest | `bunx vitest run` | `bunx vitest run <file>` | `*.test.ts(x)` | `__tests__/` subdirs |

### Validation Commands (PHASE 5)

```bash
# Type check
bunx tsc --noEmit

# Run all tests
bunx vitest run
```

### Agent Dispatch (PHASE 2+3)

#### Domain detection and agent dispatch

Determine which agent(s) to dispatch based on PHASE 1 domain detection:

**Single-domain dispatch (UI only OR data only):**

```
Agent(subagent_type: "<ui-dev|data-dev>",
      prompt: "Complete RED+GREEN TDD cycle for this feature.
        Gherkin scenarios:
        [paste relevant scenarios from the spec]

        Target files: [paths identified in PHASE 1]

        RED: Write failing tests first. Each Scenario becomes one it() block.
        Confirm ALL tests fail with: bunx vitest run <test-file>

        GREEN: Implement the simplest code to pass all tests.
        Fix IMPLEMENTATION only, never modify tests (unless genuine test bug).
        Keep going until ALL tests pass.

        Report via SendMessage when done: files created, test count, pass/fail status.")
```

**Cross-cutting dispatch (both UI and data domains):**

```
# Step 1: data-dev first (foundations — database, sync, crypto, storage)
Agent(subagent_type: "data-dev",
      prompt: "RED+GREEN for data layer portion of this feature.
        Gherkin scenarios: [data-related scenarios]
        Target files: [src/lib/ paths]
        Report via SendMessage when done.")

# Step 2: ui-dev second (consumes data layer)
Agent(subagent_type: "ui-dev",
      prompt: "RED+GREEN for UI layer portion of this feature.
        Gherkin scenarios: [UI-related scenarios]
        Target files: [src/components/, src/pages/, etc.]
        The data layer has already been implemented in src/lib/.
        Import and use the new functions from there.
        Report via SendMessage when done.")
```

#### Prompt hygiene for agents

- For CSS/Tailwind-only refactors involving chart library components (e.g., Recharts), test at the component render level (verify rendered DOM content, aria labels, or data attributes) rather than mocking internal render prop functions. Mocking render props is fragile in jsdom and tests implementation details rather than behavior.

### Security Gate Patterns

Files that trigger automatic `/security` invocation:

- `src/lib/crypto*`
- `src/lib/secure-storage*`
- `src/lib/*sync*`
- `src/contexts/Auth*`
- `src/contexts/Security*`
- Any file with "auth", "token", "key", or "encrypt" in the path

### Platform Security Checks

- **Capacitor bridge**: No sensitive data (tokens, keys, passwords) passed through JS bridge without encryption
- **Web Crypto**: Key material never stored in localStorage or sessionStorage — use IndexedDB with Capacitor Secure Storage
- **Google Drive sync**: OAuth tokens stored encrypted, refresh tokens never exposed to frontend JS
- **Dexie/IndexedDB**: Sensitive records encrypted at rest using Web Crypto API (AES-GCM)
- **Offline data**: Local data integrity verified on sync (checksums, version vectors)
- **Deep links**: Capacitor deep link handlers validate URL schemes and parameters
