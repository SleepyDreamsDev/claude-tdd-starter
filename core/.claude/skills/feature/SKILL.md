---
name: feature
description: >
  End-to-end TDD feature delivery. Writes tests, implements, refactors,
  commits. Use when the user says "implement", "build", "add feature",
  or runs /feature.
command: /feature
argument-hint: "<feature description>"
allowed-tools: Read, Glob, Grep, Write, Edit, MultiEdit, Bash, TodoWrite
---

# Feature Delivery: Autonomous TDD Cycle

You will deliver a complete feature using strict TDD. Follow every phase
in order. Do not skip phases. Do not ask for permission between phases
except where marked PAUSE.

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
2. Determine the target workspace(s) from the feature description and/or plan file.

{{WORKSPACE_TABLE}}

3. For the primary workspace, find and read ONE existing test file to learn patterns:
   - Run a directory listing of test files, read one to learn the style.
   - Note: imports, describe/it structure, assertion patterns, test utilities.

{{TEST_PATTERNS}}

4. Identify where the new feature's source and test files should live based on
   existing directory structure.

---

## PHASE 2 — RED: Write Failing Tests

### Testing Trophy priority (most valuable first):
1. **Integration tests** — API endpoints with real request/response, component behavior
2. **Unit tests** — Pure functions, calculations, validators
3. **Edge cases** — Boundary values, error conditions, empty states

### Write tests:

1. Create test file(s) in the appropriate location using workspace conventions.
2. Write 5-8 test cases covering:
   - Happy path (main behavior works)
   - Input validation (bad inputs rejected)
   - Edge cases (empty, null, boundary values)
   - Error conditions (what should fail and how)
3. Each test uses `describe`/`it` blocks, AAA pattern (Arrange, Act, Assert).
4. Import from where the implementation WILL exist. Do NOT create the
   implementation file yet.
5. Run the test file to confirm ALL tests fail:

{{TEST_COMMANDS}}

### PAUSE — Show the test list

Output the complete list of `it()` blocks and ask:

> "Here are the behaviors I'll implement. Review the test list.
> Reply **go** to proceed, or tell me what to add/change."

**Wait for the user to respond before continuing.**

---

## PHASE 3 — GREEN: Implement Until All Pass

1. Create the implementation file(s).
2. Write the SIMPLEST code that makes each test pass.
3. Run the test file using the correct command for the workspace.
4. If any test fails:
   - Read the failure output carefully.
   - Fix the IMPLEMENTATION, never the tests (unless a test has a genuine bug).
   - Run tests again.
5. **Keep going until ALL tests pass.** Do not stop after the first attempt.
   Do not ask for help unless stuck on the same error 3+ times.
6. When all green, continue immediately to Phase 4.

---

## PHASE 4 — REFACTOR: Improve Without Breaking

1. Run the feature's tests first to confirm baseline is green.
2. Apply these improvements one at a time:
   - Extract magic numbers/strings into named constants
   - Add input validation where appropriate
   - Improve error handling
   - Clean up variable names and remove duplication
3. After EACH change, run the test file again.
4. If any test fails after a refactoring change, revert that change and try differently.
5. When refactoring is complete, continue to Phase 5.

---

## PHASE 5 — SHIP: Commit and Checkpoint

### Step 1: Full validation

```bash
{{TYPECHECK_CMD}}
{{TEST_CI_CMD}}
```

If either fails, fix and re-run before proceeding.

### Step 1.5: Quick security check

Review the new/modified code for common security issues:
- **Input validation**: Are all user inputs validated?
- **Auth/authz**: Do new API endpoints have proper guards?
- **Injection**: No raw SQL, no innerHTML, no dynamic code execution, no unsanitized template literals
- **Data exposure**: Response DTOs don't leak sensitive fields (passwords, tokens, internal IDs)
- **Error messages**: Errors don't expose stack traces or internal details to clients

If any issue found, fix it and re-run tests before proceeding.

### Step 2: Commit

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

4. Push:
   ```bash
   git push -u origin HEAD
   ```

### Step 3: Checkpoint summary

Output:

```
## Checkpoint

### What was built
- [1-2 sentence summary]

### Files created/modified
- [list all files]

### Tests
- [count] tests, all passing

### Assumptions (unvalidated)
- [list anything assumed but not proven]

### Next session
- [what to work on next]
```
