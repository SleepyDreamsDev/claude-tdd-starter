# Claude TDD Starter

Production-grade TDD workflow for Claude Code. One setup script gives you autonomous feature delivery with Gherkin specs, specialist agents, security review, and quality gates from day one.

## Quick Start

```bash
# 1. Clone the template
git clone https://github.com/SleepyDreamsDev/claude-tdd-starter.git
cd claude-tdd-starter

# 2. Run setup pointing at your project
./setup.sh react-capacitor
# Follow the prompts (target directory, project name)

# 3. Start building
# In Claude Code:
/feature add fuel entry tracking with consumption calculation
```

## What You Get

### Skills

| Skill | Purpose |
|---|---|
| `/feature [--careful] <desc>` | Orchestrated TDD: Gherkin spec → RED (tests) → GREEN (implement) → REFACTOR → SHIP (commit + Kaizen) |
| `/security [files]` | Deep security review: threat model → OWASP Top 10 → report → fix |

### Hooks (run automatically on every edit)

| Hook | Trigger | Action |
|---|---|---|
| `format-on-write.sh` | After Edit/Write | Prettier/ktlint formatting (skips generated files) |
| `typecheck-on-edit.sh` | After editing .ts/.tsx | TypeScript/lint check |
| `block-dangerous.sh` | Before Bash commands | Blocks 16 dangerous patterns (rm -rf, force push, DROP TABLE, docker privileged, etc.) |
| `notify.sh` | When Claude needs attention | Desktop notification (macOS/Linux/Windows) |

### Specialist Agents (preset-dependent)

| Agent | Model | Role |
|---|---|---|
| Implementation agents | Sonnet | Write tests and code (RED+GREEN phases) — e.g., `backend-dev`, `frontend-dev`, `app-dev` |
| Reviewer | Opus | Read-only security + quality validation at SHIP phase |

### Git Hooks (Husky)

| Hook | Action |
|---|---|
| `pre-commit` | lint-staged (ESLint + Prettier on staged files) |
| `commit-msg` | commitlint (enforces conventional commits) |
| `pre-push` | TypeScript check + full test suite |

### Plans System

- `.claude/plans/backlog.md` — prioritized task list
- Plans serve as pre-approved feature specs — `/feature` loads them automatically
- Backlog auto-updated when features ship

## Workflow

```
Plan mode → design the feature
     |
/feature → autonomous TDD execution
     |
     v
PHASE 0: Load plan context, determine FAST/CAREFUL mode
     |
PHASE 1: DISCOVER — Read codebase, detect workspace
     |
PHASE 1.5: SPECIFY — Write Gherkin acceptance criteria
     |
     v (FAST_MODE: auto-approve | --careful: user reviews)
     |
PHASE 2+3: RED+GREEN — Write tests → implement (via specialist agent)
     |
PHASE 4: REFACTOR — Improve one change at a time
     |
PHASE 5: SHIP — Validate → security check → commit → push → Kaizen
     |
/security → deep review before PR (optional)
     |
Push → Husky pre-push validates everything
```

## Presets

| Preset | Stack | Package Manager | Agents | Test Runner |
|---|---|---|---|---|
| `nestjs-react-monorepo` | NestJS 11 + React 18 + Vite | npm workspaces | backend-dev, frontend-dev, reviewer | Vitest (web) + Jest (api) |
| `react-capacitor` | React 18 + Capacitor + Vite | Bun | app-dev, reviewer | Vitest |
| `nextjs` | Next.js 15 + App Router | pnpm | none (inline) | Vitest |
| `express-simple` | Express + TypeScript | npm | none (inline) | Vitest |

### Using a preset

```bash
# Apply to an existing project
./setup.sh react-capacitor

# Or specify target directory interactively
./setup.sh nestjs-react-monorepo
# Then enter: /path/to/my-project
```

The setup script:
1. Copies `.claude/` (skills, hooks, settings, agents) to your project
2. Sets up `.claude/plans/` with backlog template
3. Creates `specs/` directory for Gherkin output
4. Copies `.husky/` hooks (pre-commit, commit-msg, pre-push)
5. Replaces `{{PLACEHOLDERS}}` with preset-specific commands
6. Generates/appends TDD + Gherkin sections to your CLAUDE.md
7. Configures specialist agents and reviewer (if preset has agents)
8. Adds `lint-staged` config and scripts to package.json
9. Installs husky, lint-staged, commitlint (Bun-compatible)
10. Makes all hook scripts executable

### Creating a custom preset

```
presets/my-stack/
  preset.json           # Variables (test commands, scopes, agents, lint config)
  CLAUDE.md.partial     # Stack-specific CLAUDE.md sections
  feature-overrides.md  # Workspace detection, test patterns, agent dispatch, security checks
  agents/               # Specialist agent definitions (optional)
    my-agent.md
```

See existing presets for the format.

## File Structure

```
claude-tdd-starter/
├── setup.sh                          # Interactive setup script
├── core/                             # Framework-agnostic (always copied)
│   ├── .claude/
│   │   ├── settings.json             # Hook config + permissions
│   │   ├── hooks/                    # 4 hook scripts
│   │   ├── skills/
│   │   │   ├── feature/SKILL.md      # Orchestrated TDD with Gherkin + Kaizen
│   │   │   └── security/SKILL.md     # OWASP security review
│   │   ├── agents/
│   │   │   ├── reviewer.md.template  # Reviewer (filled by setup.sh)
│   │   │   └── README.md             # Agent system docs
│   │   └── plans/
│   │       ├── backlog.md.template   # Task list skeleton
│   │       └── README.md             # Plans system docs
│   ├── specs/.gitkeep                # Gherkin spec output directory
│   ├── .husky/                       # Git hooks
│   ├── commitlint.config.js
│   ├── CLAUDE.md.template
│   └── docs/                         # Reference guides
├── presets/                           # Stack-specific configs
│   ├── nestjs-react-monorepo/
│   │   ├── agents/                   # backend-dev, frontend-dev, infra-agent
│   │   └── ...
│   ├── react-capacitor/
│   │   ├── agents/                   # app-dev
│   │   └── ...
│   ├── nextjs/
│   └── express-simple/
└── examples/
    └── platform-monorepo/            # Real-world reference
```

## Key Features (v2)

### Gherkin Specs
Every `/feature` run writes a `.feature` file before any code. Human-readable acceptance criteria that maps 1:1 to test cases. Lives in `specs/`.

### FAST_MODE (default)
Combined RED+GREEN in one pass, auto-approved Gherkin specs. No pauses unless you pass `--careful`.

### Specialist Agents
Presets can define scoped agents (e.g., `backend-dev` for NestJS, `app-dev` for Capacitor). Agents carry domain expertise and are dispatched during RED+GREEN phases.

### Kaizen Retrospectives
After every feature, the skill evaluates what went well/poorly and auto-implements clear improvements (stale code fixes, type improvements). Debatable changes are surfaced but not auto-applied.

### 16-Pattern Safety Hook
Blocks: rm -rf on system paths, force push to main, DROP TABLE, git RCE vectors, Docker privileged mode, host root mounts, sed command execution, find -exec, curl piping to shell, wget, .env reading, node/python shell escapes.

## TDD Rules (applied to all presets)

- NEVER write implementation and tests in the same step
- RED: tests only. GREEN: implementation only. REFACTOR: improve only
- If a test fails during REFACTOR, revert immediately
- Testing Trophy priority: integration > unit > E2E
- Coverage target: 70%+ on business logic
- Conventional commits enforced by commitlint

## Requirements

- Node.js 18+ (or Bun for react-capacitor preset)
- Claude Code CLI
- `jq` (for setup.sh to parse preset.json)
- `python3` (for multi-line placeholder replacement in setup.sh)
- Git repository initialized in target project

## License

MIT
