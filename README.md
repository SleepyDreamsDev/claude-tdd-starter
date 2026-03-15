# Claude TDD Starter

Production-grade TDD workflow for Claude Code. One setup script gives you autonomous feature delivery, security review, and quality gates from day one.

## Quick Start

```bash
# 1. Clone the template
git clone https://github.com/SleepyDreamsDev/claude-tdd-starter.git
cd claude-tdd-starter

# 2. Run setup pointing at your project
./setup.sh nestjs-react-monorepo
# Follow the prompts (target directory, project name)

# 3. Start building
# In Claude Code:
/feature add user authentication with JWT
```

## What You Get

### Skills

| Skill | Purpose |
|---|---|
| `/feature <description>` | Full TDD cycle: RED (write tests) -> PAUSE (review) -> GREEN (implement) -> REFACTOR -> SHIP (commit) |
| `/security [files]` | Deep security review: threat model -> OWASP Top 10 -> report -> fix |

### Hooks (run automatically on every edit)

| Hook | Trigger | Action |
|---|---|---|
| `format-on-write.sh` | After Edit/Write | Prettier formatting (skips generated files) |
| `typecheck-on-edit.sh` | After editing .ts/.tsx | Full TypeScript check |
| `block-dangerous.sh` | Before Bash commands | Blocks `rm -rf /`, force push to main, DROP TABLE, etc. |
| `notify.sh` | When Claude needs attention | Desktop notification (macOS/Linux) |

### Git Hooks (Husky)

| Hook | Action |
|---|---|
| `pre-commit` | lint-staged (ESLint + Prettier on staged files) |
| `commit-msg` | commitlint (enforces conventional commits) |
| `pre-push` | TypeScript check + full test suite |

## Workflow

```
Plan mode -> design the feature
     |
/feature -> autonomous TDD execution
     |
     v
DISCOVER: Read codebase, detect workspace
     |
RED: Write 5-8 failing tests
     |
PAUSE: You review the test list, say "go"
     |
GREEN: Implement until all tests pass
     |
REFACTOR: Improve one change at a time
     |
SHIP: Typecheck + tests + security check + commit
     |
/security -> deep review before PR (optional)
     |
Push -> Husky pre-push validates everything
```

## Presets

| Preset | Stack | Package Manager | Test Runner |
|---|---|---|---|
| `nestjs-react-monorepo` | NestJS 11 + React 18 + Vite | npm workspaces | Vitest (web) + Jest (api) |
| `nextjs` | Next.js 15 + App Router | pnpm | Vitest |
| `express-simple` | Express + TypeScript | npm | Vitest |

### Using a preset

```bash
# Apply to an existing project
./setup.sh nestjs-react-monorepo

# Or specify target directory
./setup.sh nextjs
# Then enter: /path/to/my-nextjs-app
```

The setup script:
1. Copies `.claude/` (skills, hooks, settings) to your project
2. Copies `.husky/` hooks (pre-commit, commit-msg, pre-push)
3. Replaces `{{PLACEHOLDERS}}` with preset-specific commands
4. Generates/appends TDD sections to your CLAUDE.md
5. Adds `lint-staged` config and scripts to package.json
6. Installs husky, lint-staged, commitlint
7. Makes all hook scripts executable

### Creating a custom preset

```
presets/my-stack/
  preset.json           # Variables (test commands, scopes, lint config)
  CLAUDE.md.partial     # Stack-specific CLAUDE.md sections
  feature-overrides.md  # Workspace detection + test runner table
```

See existing presets for the format.

## File Structure

```
claude-tdd-starter/
├── setup.sh                          # Interactive setup script
├── core/                             # Framework-agnostic (always copied)
│   ├── .claude/
│   │   ├── settings.json             # Hook configuration
│   │   ├── hooks/                    # 4 hook scripts
│   │   └── skills/
│   │       ├── feature/SKILL.md      # TDD cycle with placeholders
│   │       └── security/SKILL.md     # Security review
│   ├── .husky/                       # Git hooks
│   ├── commitlint.config.js
│   ├── CLAUDE.md.template
│   └── docs/                         # Reference guides
├── presets/                           # Stack-specific configs
│   ├── nestjs-react-monorepo/
│   ├── nextjs/
│   └── express-simple/
└── examples/
    └── platform-monorepo/            # Real-world reference
```

## TDD Rules (applied to all presets)

- NEVER write implementation and tests in the same step
- RED: tests only. GREEN: implementation only. REFACTOR: improve only
- If a test fails during REFACTOR, revert immediately
- Testing Trophy priority: integration > unit > E2E
- Coverage target: 70%+ on business logic
- Conventional commits enforced by commitlint

## Requirements

- Node.js 18+
- Claude Code CLI
- `jq` (for setup.sh to parse preset.json)
- Git repository initialized in target project

## License

MIT
