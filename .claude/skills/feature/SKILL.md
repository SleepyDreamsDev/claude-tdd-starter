---
name: feature
description: >
  End-to-end TDD feature delivery with orchestrated agent dispatch. Writes Gherkin
  specs, dispatches specialist agents for RED+GREEN, gates on reviewer,
  auto-invokes /security for auth/crypto/sync changes. Default FAST_MODE uses
  combined RED+GREEN dispatch. Use when the user says "implement", "build",
  "add feature", or runs /feature.
command: /feature
argument-hint: "[--careful] <feature description>"
allowed-tools: Read, Glob, Grep, Write, Edit, MultiEdit, Bash, TodoWrite
---

# Feature Delivery: Orchestrated TDD Cycle

You will deliver a complete feature using strict TDD. Follow every phase
in order. Do not skip phases. Do not ask for permission between phases
except where marked PAUSE.

The feature to build: $ARGUMENTS

---

## PHASE 0 — PLAN CONTEXT (silent)

### Step 0: Determine execution mode

The default execution mode is **FAST_MODE = true** (combined RED+GREEN, skip PAUSE).
Override to `FAST_MODE = false` **only when** `$ARGUMENTS` contains `--careful`.

A plan file with detailed task specs IS the pre-approval — even for security-sensitive
features. If a plan file exists and covers the feature, FAST_MODE remains true.

When `FAST_MODE = false` (`--careful` explicitly passed):

- PHASE 1.5: PAUSE for user approval of Gherkin spec
- PHASE 2+3: separate RED and GREEN steps so you can review tests before implementing

When `FAST_MODE = true` (the default):

- PHASE 1.5: auto-approve Gherkin spec (output banner with scenario count)
- PHASE 2+3: combined RED+GREEN in one pass

If `$ARGUMENTS` contains `--careful`, remove it from arguments before using as
the feature description.

### Step 0.5: Model guardrail (non-blocking)

Planning and specification phases produce the highest quality output with Opus.
If the current model is not Opus, output a warning but **do not wait for user input**:

> ── WARNING: Running on \<model>. Opus recommended for planning quality. ──

Continue immediately — this is informational, not a gate.

### Step 1: Load plan context

Check if a plan file exists:

1. Run `ls -t .claude/plans/*.md 2>/dev/null | head -1` to find the most recent plan.
2. If a plan file exists, read it. Use it as the detailed specification for this feature.
   The plan is the source of truth for scope, file locations, and acceptance criteria.
3. If no plan file exists, proceed using only $ARGUMENTS as the feature specification.

### Phase status banner

Output (only if plan was loaded):

> ── PHASE 0 PLAN ✓ ── loaded \<plan-filename>

---

## PHASE 1 — DISCOVER (silent, no output needed)

1. Read CLAUDE.md for project conventions.
2. Determine the target domain(s) from the feature description and/or plan file:

This is a single-package project. No workspace detection needed.
All code lives under `src/`.

| Signal in description        | Directory         | Test file pattern            |
| ---------------------------- | ----------------- | ---------------------------- |
| page, layout, route          | `src/app/`        | `*.test.tsx` in `__tests__/` |
| component, UI, form          | `src/components/` | `*.test.tsx` in `__tests__/` |
| util, helper, types, pricing | `src/lib/`        | `*.test.ts` in `__tests__/`  |
| i18n, dictionary, locale     | `src/lib/i18n/`   | `*.test.ts` in `__tests__/`  |
| hook, use- prefix            | `src/hooks/`      | `*.test.ts` in `__tests__/`  |

3. For the target domain, find and read ONE existing test file to learn patterns:
   - Run a directory listing of test files, read one to learn the style.
   - Note: imports, describe/it structure, assertion patterns, test utilities.

   - Vitest globals enabled (describe, it, expect, vi available without import)
   - Component tests: `@testing-library/react` + `@testing-library/user-event`
   - Server tests: Direct function calls, no HTTP layer needed

4. Identify where the new feature's source and test files should live based on
   existing directory structure.

5. Read the relevant scaffold template if one exists:
   - **New page** (domain: `src/app/`): read `.claude/templates/new-page.md`
   - **New component** (domain: `src/components/`): read `.claude/templates/new-component.md`
   - If both page and component are needed, read both.
   - If no templates directory exists, skip this step.
   - Apply any CSS variable patterns, checklists, or conventions from the template
     when writing the skeleton in GREEN phase.

   **DO NOT read reference screens or `Specs/Design/DESIGN_SYSTEM.md` here.**
   These are large files (2,000–4,000 tokens each) that stay in context for the
   entire session. They are only needed during GREEN phase when writing visual
   layout. Read them at the start of Phase 3 GREEN, not before.

6. Read `.claude/lessons.md` if it exists — apply any lessons relevant to the
   detected domain before writing tests or implementation.

7. Read `.claude/dependency-map.md` — use the stable layer order to determine:
   - Which domains are safe to work on in parallel
   - Whether the feature spans layers that require sequential execution
   - Which layer a new file belongs to (informs agent dispatch order)

### Phase status banner

Output:

> ── PHASE 1 DISCOVER ✓ ── domain(s): \<detected>, agent(s): \<to dispatch>

---

## PHASE 1.5 — SPECIFY (Gherkin acceptance criteria)

Before writing any tests, create a Gherkin spec at `specs/<feature-slug>.feature`.

This is the human-readable acceptance criteria that drives test writing.
Each `Scenario:` will map to one `it()` block in the test files.

Example:

```gherkin
Feature: Fuel entry tracking
  As a vehicle owner
  I want to log fuel purchases
  So that I can track consumption and costs

  Scenario: Add fuel entry with valid data
    Given I have a vehicle "Toyota Camry"
    When I add a fuel entry with 45L at $1.85/L
    Then the entry is saved with total cost $83.25
    And the fuel history shows 1 entry

  Scenario: Reject fuel entry with negative amount
    Given I have a vehicle
    When I add a fuel entry with -10L
    Then I see a validation error

  Scenario: Calculate fuel economy between entries
    Given I have two fuel entries 500km apart
    When I view fuel economy
    Then I see consumption in L/100km
```

Rules:

- One `.feature` file per `/feature` invocation
- Not executable — documentation only, no cucumber dependency
- Scenarios should cover: happy path, validation, edge cases, error conditions
- Write scenarios for ALL target domains in the same file

### Phase status banner

Output:

> ── PHASE 1.5 SPECIFY ✓ ── N scenarios in specs/\<feature>.feature

---

### PAUSE — Review spec

**If `FAST_MODE` is true:** skip this pause. Output:

> ── FAST MODE: auto-approving N scenarios. Proceeding to RED+GREEN. ──

**Otherwise:** output the Gherkin scenarios and ask:

> "Here are the acceptance criteria I'll test and implement.
> Reply **go** to proceed, or tell me what to add/change."

**Wait for the user to respond before continuing.**

---

## PHASE 2 — RED + GREEN: Write Tests and Implement

### Testing Trophy priority (most valuable first):

1. **Integration tests** — component behavior, data flow through lib functions
2. **Unit tests** — Pure functions, calculations, validators
3. **Edge cases** — Boundary values, error conditions, empty states

Each `Scenario:` from the Gherkin spec becomes one `it()` block.

No specialist agents — execute RED+GREEN inline.

### Platform Security Checks

- **React**: No raw HTML injection — use JSX text nodes for all dynamic content
- **Input validation**: Validate booking form data before processing
- **i18n completeness**: All translation keys must be present in both `ro.json` and `ru.json`
- **POC data layer**: No real user data stored — mock data only, no persistence

### Inline execution (when no specialist agents are configured)

If no specialist agents are available, execute RED+GREEN directly:

**RED — Write failing tests:**

1. Create test file(s) in the appropriate location using project conventions.
2. Write 5-8 test cases covering:
   - Happy path (main behavior works)
   - Input validation (bad inputs rejected)
   - Edge cases (empty, null, boundary values)
   - Error conditions (what should fail and how)
3. Each test uses `describe`/`it` blocks, AAA pattern (Arrange, Act, Assert).
4. Import from where the implementation WILL exist. Do NOT create the
   implementation file yet.
5. Run the test file to confirm ALL tests fail.

   | Scope       | Command                       |
   | ----------- | ----------------------------- |
   | Single file | `pnpm vitest run <test-file>` |
   | All tests   | `pnpm vitest run`             |
   | Watch mode  | `pnpm vitest`                 |

**GREEN — Implement until all pass:**

0. **For UI components/pages only:** now read the reference screen and design system.
   - Reference screen: `Specs/Design/reference-screens/<matching>.html`
   - Design system rules: `.claude/rules/design-system.md`
   - Reading them here (not Phase 1) keeps them out of context during RED.

1. Create the implementation file(s).
2. Write the SIMPLEST code that makes each test pass.
3. Run the test file using the correct command for the workspace.
4. If any test fails:
   - Read the failure output carefully.
   - Fix the IMPLEMENTATION, never the tests (unless a test has a genuine bug).
   - Run tests again.
5. **Keep going until ALL tests pass.** Do not stop after the first attempt.
   Do not ask for help unless stuck on the same error 3+ times.

### Phase status banners

After RED+GREEN completes, output:

> ── PHASE 2 RED ✓ ── N tests written, all failing
> ── PHASE 3 GREEN ✓ ── N/N tests passing

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

### Phase status banner

Output:

> ── PHASE 4 REFACTOR ✓ ── code improved, all tests green

---

## PHASE 5 — SHIP: Validate, Review, Commit

### Step 1: Full validation (parallel)

Run these checks — make parallel Bash tool calls:

````bash
```bash
# Type check
pnpm tsc --noEmit

# Run all tests
pnpm vitest run
````

````

If any fail, fix and re-run only the failing check.

### Step 2: Code review gate (three-tier waterfall)

#### Tier 1 — Codex cross-model review (primary)

Attempt a Codex adversarial review on all changed files. This catches blind
spots that Claude may miss due to same-model evaluation bias.

```bash
/codex:review --files <changed-files>
````

If Codex returns findings:

- CRITICAL/HIGH → fix before proceeding to Tier 2
- MEDIUM/LOW → note findings, fix if trivial, continue

If Codex fails for any reason (rate limit, timeout, network error, auth expired):

> ── CODEX UNAVAILABLE — falling back to Claude reviewer ──

Proceed immediately to Tier 2. Do NOT retry or block on Codex.

#### Tier 2 — Claude reviewer agent (fallback + logic/security gate)

Always runs if Tier 1 was unavailable. Also always runs after Codex when
changes involve logic/API/security (not CSS-only).

Classify the changes:

**CSS/presentation-only** if ALL of these hold:

- Every changed file is `.tsx` or `.css` in `src/pages/` or `src/components/`
- The diff only adds/modifies CSS class strings (Tailwind tokens)
- No new functions, logic branches, or state changes
- No new imports beyond a responsive-layout hook (e.g., `useIsMobile`)

**Otherwise** → full review (logic/API/security).

##### Light reviewer dispatch (CSS/presentation-only):

```
Agent(subagent_type: "reviewer",
      prompt: "
<scope>
  Changed files: <list changed .tsx/.css files>
</scope>
<context>
  Project: Forever Clean — Next.js 15, TypeScript strict, Tailwind CSS v4.
  Design system tokens: .claude/rules/design-system.md
  Lessons learned: .claude/lessons.md (read before starting)
</context>
<task>
  Light review — CSS/presentation changes only.
  Do NOT run the full test suite (already ran in Step 1).
  Run only: pnpm tsc --noEmit
  Check for:
  - Broken responsive logic (missing breakpoint variants)
  - Inconsistent desktop overrides (e.g., sm: without base)
  - Hardcoded hex values — must use Tailwind design system tokens
  - Accidental logic changes mixed into the CSS diff
  Skip OWASP/security checks — no logic changed.
</task>
<rules>
  1. Read existing code FIRST before assessing
  2. Report MEDIUM (inconsistency) or LOW (style) findings only
</rules>
<output_format>
  ## Findings
  [MEDIUM|LOW] file:line — description
  ## Summary
  PASS or list of issues to fix
</output_format>
")

##### Full reviewer dispatch (logic/API/security):

```

Agent(subagent_type: "reviewer",
prompt: "
<scope>
Changed files: <list all changed files>
Gherkin spec: specs/<feature-slug>.feature
</scope>
<context>
Project: Forever Clean — Next.js 15, TypeScript strict, Tailwind CSS v4, bilingual (ro/ru).
Technical conventions: .claude/rules/technical.md
Design system tokens: .claude/rules/design-system.md
Lessons learned: .claude/lessons.md (read before starting)
</context>
<task>
Full logic/security review of all changes from this feature delivery.
Run: pnpm tsc --noEmit && pnpm vitest run
Check:

- Type safety — no any, unknown narrowed correctly
- Input validation — user inputs validated at system boundaries
- i18n completeness — every new key present in BOTH ro.json and ru.json
- No hardcoded Romanian or Russian text in component files
- No hardcoded hex values — only Tailwind design system tokens
- XSS risks — no raw HTML injection with dynamic content
- Data exposure — no sensitive data leaked into client components
  </task>
  <rules>

1. Read existing code FIRST before assessing
2. Stay within the changed files — do not review unrelated code
3. Check translation files have matching keys in both locales
   </rules>
   <output_format>

## Findings

[CRITICAL|HIGH|MEDIUM|LOW] file:line — description

## Summary

PASS or list of issues requiring fixes before shipping
</output_format>
")

If reviewer reports CRITICAL or HIGH findings, fix them before proceeding.

#### Tier 3 — Copilot PR review (post-push)

Handled in Step 4.5 — runs automatically after push regardless of Tier 1/2 outcome.

### Step 2.5: Security gate (conditional)

Auto-invoke `/security` if the feature modified ANY files matching these patterns:

No security gate patterns configured for this preset.

Also invoke if the change touches >5 files (large change surface).

Otherwise, skip this step.

### Step 3: Prepare commit

1. Create a feature branch if on main:
   ```bash
   git checkout -b feature/<short-slug>
   ```

````

2. Stage changed files including `specs/<feature>.feature`:
   ```bash
   git add <list of changed files> specs/<feature>.feature
   ```
3. Draft the commit message (conventional commit format):
   ```
   feat(<scope>): <description>
   ```

### Step 4: Commit and push

```bash
git commit -m "<message>"
git push -u origin HEAD
```

### Step 4.5: Copilot review gate

After pushing, create the PR and wait for Copilot to post its review:

```bash
gh pr create --title "..." --body "..."
```

Poll until Copilot has reviewed (up to ~60s):

```bash
PR=$(gh pr view --json number -q .number)
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
for i in $(seq 1 6); do
  COUNT=$(gh api "repos/$REPO/pulls/$PR/reviews" \
    --jq '[.[] | select(.user.login | test("copilot"; "i"))] | length')
  [ "$COUNT" -gt 0 ] && break
  sleep 10
done
gh api "repos/$REPO/pulls/$PR/reviews" \
  --jq '.[] | select(.user.login | test("copilot"; "i")) | .body'
```

Triage rules:

| Severity                      | Action                                        |
| ----------------------------- | --------------------------------------------- |
| Bug / security / correctness  | Fix before merging                            |
| Style / cosmetic / suggestion | Fix if trivial (<5 min), note in PR otherwise |
| Scope / docs observation      | Note in PR description, skip fix              |

If fixes needed: apply, commit `fix(<scope>): address Copilot review`, re-run tests, then merge.

```bash
gh pr merge <N> --squash --delete-branch
```

### Step 5: Update backlog (if backlog exists)

If `.claude/plans/backlog.md` exists:

- Mark the matching item as `[x]` (done) and move it to the **Done** section
- Add a brief note if the implementation differed from what was planned
- If new follow-up work was discovered, add it as a new `[ ]` item
- Commit the backlog update (separate commit)

### Step 6: Checkpoint summary

Output using this bordered format:

```
══════════════════════════════════════════════════════
  FEATURE COMPLETE: <short description>
══════════════════════════════════════════════════════

  Gherkin spec: specs/<feature>.feature — N scenarios
  Tests: N passing
  Branch: feature/<slug>
  Commit: <short hash> <message>

  Domain(s): <detected domains>
  Agent(s) dispatched: <list> + reviewer

  Files created/modified:
    - <file list>

  Assumptions (unvalidated):
    - <list or "none">

  Next session:
    - <what to work on next>
══════════════════════════════════════════════════════
```

### Step 7: Kaizen retrospective

After every feature delivery, briefly evaluate the session and suggest improvements.

Classify each improvement as:

| Type                                                            | Action                                         |
| --------------------------------------------------------------- | ---------------------------------------------- |
| **Fix** — broken/stale code discovered during feature           | Auto-implement + commit                        |
| **Quality** — clear best practice missing (e.g., `as any` cast) | Auto-implement + commit                        |
| **Workflow** — process change suggestion                        | Output only, do NOT auto-implement (debatable) |
| **Architecture** — structural change to codebase                | Output only, do NOT auto-implement (debatable) |

Output:

```
── KAIZEN ──────────────────────────────────────
  What went well:
    - <1-2 things that worked efficiently>

  What could improve:
    - <1-2 concrete, actionable suggestions>

  Auto-implemented:
    - <list of improvements applied, or "none">

  Workflow delta (not auto-implemented):
    - <debatable changes to consider>
    - "none" if no changes needed
────────────────────────────────────────────────
```

Rules:

- Keep it to 2-3 bullets per section — brevity over completeness
- Focus on **actionable** improvements, not generic observations
- If no improvements are obvious, output "No improvements identified this session"

---

### Step 7.5: Starter sync check (conditional)

**Trigger:** Run after Step 7 (Kaizen) if any Fix/Quality improvements were auto-implemented **or** any framework files were modified during this feature.

**SYNC CANDIDATES** — files that are framework-generic and live in claude-tdd-starter:

| Project path                         | Starter path                                                  |
| ------------------------------------ | ------------------------------------------------------------- |
| `.claude/hooks/*.sh`                 | `core/.claude/hooks/*.sh`                                     |
| `.claude/skills/feature/SKILL.md`    | `core/.claude/skills/feature/SKILL.md`                        |
| `.claude/skills/security/SKILL.md`   | `core/.claude/skills/security/SKILL.md`                       |
| `.claude/agents/reviewer.md`         | `core/.claude/agents/reviewer.md.template`                    |
| `.claude/settings.json`              | `core/.claude/settings.json`                                  |
| `.claude/rules/tdd-workflow.md`      | `core/.claude/rules/tdd-workflow.md`                          |
| `.claude/rules/session-reporting.md` | `core/.claude/rules/session-reporting.md`                     |
| `CLAUDE.md`                          | `core/CLAUDE.md.template` (manual — needs placeholder review) |
| `.husky/*`                           | `core/.husky/*`                                               |
| `docs/solo-dev-sdlc-blueprint.md`    | `core/docs/solo-dev-sdlc-blueprint.md`                        |
| `docs/tdd-guide.md`                  | `core/docs/tdd-guide.md`                                      |

**Classification rules:**

- **SYNC** — clearly framework-generic (hook scripts, TDD/session rules, skill phases, reviewer agent)
- **ASK** — could go either way (new hooks, structural changes to CLAUDE.md, new rule patterns)
- **SKIP** — project-specific (business rules, design tokens, memory files, backlog content)

**Procedure:**

1. Check which SYNC CANDIDATE files were modified during this feature session
2. If none were modified → **skip silently**
3. For each modified file, classify as SYNC / ASK / SKIP
4. Output:
   ```
   ── STARTER SYNC CHECK ───────────────────────────
     Modified framework files:
       SYNC  .claude/hooks/example.sh
       ASK   .claude/skills/feature/SKILL.md
       SKIP  specs/rules/order-flow.md
   ─────────────────────────────────────────────────
   ```
5. Ask user:
   > "These framework improvements were made during this feature. Should I sync them to `claude-tdd-starter`?
   > SYNC items will be applied automatically. ASK items are listed above — confirm which to include."
6. If user confirms (all or selected items):
   a. `cd {{STARTER_REPO_PATH}}`
   b. Apply each confirmed change to its corresponding `core/` path (use the table above)
   c. For `CLAUDE.md → core/CLAUDE.md.template`: apply changes manually, preserving `{{PLACEHOLDER}}` markers — do NOT overwrite them
   d. Create branch: `sync/<project-slug>-<YYYY-MM-DD>`
   e. Commit: `feat(core): sync improvements from <project-slug>`
   f. Ask before remote push: "Push branch to origin? (gh pr create afterward?)"
   g. Return to project directory
7. If user declines → skip silently

**What NOT to sync:**

- Project-specific rule files (business context, security policies, order flow)
- `.claude/rules/technical.md` (project-specific framework conventions)
- `.claude/memory/` (architecture decisions, project context)
- `.claude/plans/backlog.md` content
- Any project-specific design or documentation files
````
