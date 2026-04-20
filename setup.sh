#!/bin/bash
set -e

# Claude TDD Starter — Post-clone setup script
# Usage: ./setup.sh [preset-name]

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CORE_DIR="$SCRIPT_DIR/core"
PRESETS_DIR="$SCRIPT_DIR/presets"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   Claude TDD Starter v2 — Setup      ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
echo ""

# ─── Step 1: Select preset ───────────────────────────────────────────

PRESET="$1"

if [ -z "$PRESET" ]; then
  echo "Available presets:"
  echo ""
  for dir in "$PRESETS_DIR"/*/; do
    name=$(basename "$dir")
    desc=$(jq -r '.description' "$dir/preset.json" 2>/dev/null || echo "No description")
    echo -e "  ${GREEN}$name${NC}"
    echo "    $desc"
    echo ""
  done
  echo -n "Select preset: "
  read -r PRESET
fi

PRESET_DIR="$PRESETS_DIR/$PRESET"

if [ ! -d "$PRESET_DIR" ]; then
  echo "Error: Preset '$PRESET' not found in $PRESETS_DIR"
  exit 1
fi

echo ""
echo -e "${GREEN}Using preset: $PRESET${NC}"

# ─── Step 2: Ask for target directory ────────────────────────────────

echo ""
echo -n "Target project directory (default: current directory): "
read -r TARGET_DIR
TARGET_DIR="${TARGET_DIR:-.}"
TARGET_DIR="$(cd "$TARGET_DIR" 2>/dev/null && pwd || echo "$TARGET_DIR")"

if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: Directory '$TARGET_DIR' does not exist"
  exit 1
fi

echo -e "${GREEN}Target: $TARGET_DIR${NC}"

# ─── Step 3: Ask for project name ────────────────────────────────────

DEFAULT_NAME=$(basename "$TARGET_DIR")
echo ""
echo -n "Project name (default: $DEFAULT_NAME): "
read -r PROJECT_NAME
PROJECT_NAME="${PROJECT_NAME:-$DEFAULT_NAME}"

# ─── Step 3.5: Ask for starter repo path ─────────────────────────────

echo ""
echo -n "Path to claude-tdd-starter repo (leave empty to skip sync checks): "
read -r STARTER_REPO_PATH

# ─── Step 4: Load preset variables ──────────────────────────────────

echo ""
echo -e "${YELLOW}Loading preset variables...${NC}"

TYPECHECK_CMD=$(jq -r '.variables.TYPECHECK_CMD' "$PRESET_DIR/preset.json")
TEST_CI_CMD=$(jq -r '.variables.TEST_CI_CMD' "$PRESET_DIR/preset.json")
TEST_CMD_PRIMARY=$(jq -r '.variables.TEST_CMD_PRIMARY' "$PRESET_DIR/preset.json")
TEST_CMD_SECONDARY=$(jq -r '.variables.TEST_CMD_SECONDARY // ""' "$PRESET_DIR/preset.json")
COVERAGE_THRESHOLD=$(jq -r '.variables.COVERAGE_THRESHOLD' "$PRESET_DIR/preset.json")
SCOPES=$(jq -r '.variables.SCOPES' "$PRESET_DIR/preset.json")
FORMAT_CMD=$(jq -r '.variables.FORMAT_CMD // "npx prettier --write"' "$PRESET_DIR/preset.json")
FORMAT_EXTENSIONS=$(jq -r '.variables.FORMAT_EXTENSIONS // "*.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.md|*.html|*.yaml|*.yml"' "$PRESET_DIR/preset.json")
HAS_AGENTS=$(jq -r '.variables.HAS_AGENTS // false' "$PRESET_DIR/preset.json")
PACKAGE_MANAGER=$(jq -r '.variables.PACKAGE_MANAGER // "npm"' "$PRESET_DIR/preset.json")
TYPES_FILE=$(jq -r '.variables.TYPES_FILE // ""' "$PRESET_DIR/preset.json")
COMPONENTS_DIR=$(jq -r '.variables.COMPONENTS_DIR // ""' "$PRESET_DIR/preset.json")
COMPONENTS_GLOB=$(jq -r '.variables.COMPONENTS_GLOB // ""' "$PRESET_DIR/preset.json")
DATA_FILE=$(jq -r '.variables.DATA_FILE // ""' "$PRESET_DIR/preset.json")
TEST_DIR=$(jq -r '.variables.TEST_DIR // ""' "$PRESET_DIR/preset.json")
TEST_GLOB=$(jq -r '.variables.TEST_GLOB // ""' "$PRESET_DIR/preset.json")
TEST_CMD="$TEST_CMD_PRIMARY"
TEST_CMD_ALL="$TEST_CI_CMD"
TYPECHECK_CMD_RAW=$(jq -r '.variables.TYPECHECK_CMD_RAW // .variables.TYPECHECK_CMD' "$PRESET_DIR/preset.json")

# ─── Step 5: Copy core files ────────────────────────────────────────

echo -e "${YELLOW}Copying core files...${NC}"

# Copy .claude directory (settings, hooks, skills)
cp -r "$CORE_DIR/.claude" "$TARGET_DIR/"

# Copy .husky directory
cp -r "$CORE_DIR/.husky" "$TARGET_DIR/"

# Copy commitlint config
cp "$CORE_DIR/commitlint.config.js" "$TARGET_DIR/"

# Copy docs (if not exists)
mkdir -p "$TARGET_DIR/docs"
cp -n "$CORE_DIR/docs/"*.md "$TARGET_DIR/docs/" 2>/dev/null || true

# Create specs directory for Gherkin specs
mkdir -p "$TARGET_DIR/specs"
cp "$CORE_DIR/specs/.gitkeep" "$TARGET_DIR/specs/" 2>/dev/null || true

echo -e "${GREEN}  Core files copied${NC}"

# ─── Step 5.1: Generate framework.json ──────────────────────────────

echo -e "${YELLOW}Generating framework.json...${NC}"

cat > "$TARGET_DIR/.claude/framework.json" << FWJSON
{
  "PROJECT_NAME": "$PROJECT_NAME",
  "PACKAGE_MANAGER": "$PACKAGE_MANAGER",
  "TYPECHECK_CMD": "$TYPECHECK_CMD",
  "TYPECHECK_CMD_RAW": "$TYPECHECK_CMD_RAW",
  "TEST_CMD": "$TEST_CMD",
  "TEST_CMD_ALL": "$TEST_CMD_ALL",
  "FORMAT_CMD": "$FORMAT_CMD",
  "FORMAT_EXTENSIONS_CASE": "$FORMAT_EXTENSIONS",
  "TYPES_FILE": "$TYPES_FILE",
  "COMPONENTS_GLOB": "$COMPONENTS_GLOB",
  "DATA_FILE": "$DATA_FILE",
  "TEST_GLOB": "$TEST_GLOB"
}
FWJSON

echo -e "${GREEN}  framework.json created${NC}"

# ─── Step 5.5: Copy preset agents ───────────────────────────────────

echo -e "${YELLOW}Setting up agents...${NC}"

mkdir -p "$TARGET_DIR/.claude/agents"

if [ "$HAS_AGENTS" = "true" ] && [ -d "$PRESET_DIR/agents" ]; then
  # Copy preset-specific implementation agents
  cp "$PRESET_DIR/agents/"*.md "$TARGET_DIR/.claude/agents/" 2>/dev/null || true
  echo -e "${GREEN}  Implementation agents copied from preset${NC}"
fi

# Agents (reviewer, discovery-explorer, domain-implementer) now read variables at
# runtime from framework.json — no template processing needed. They are copied
# as-is from core/.claude/agents/ in Step 5 above.
echo -e "${GREEN}  Core agents copied (read framework.json at dispatch time)${NC}"

# Remove agents README from target (it's documentation for the starter, not the project)
rm -f "$TARGET_DIR/.claude/agents/README.md"
# Remove legacy .template files if they exist from older setups
rm -f "$TARGET_DIR/.claude/agents/"*.md.template

# ─── Step 5.6: Set up plans directory ────────────────────────────────

echo -e "${YELLOW}Setting up plans...${NC}"

mkdir -p "$TARGET_DIR/.claude/plans"

# Process backlog template
BACKLOG_TEMPLATE="$TARGET_DIR/.claude/plans/backlog.md.template"
if [ -f "$BACKLOG_TEMPLATE" ]; then
  BACKLOG_OUT="$TARGET_DIR/.claude/plans/backlog.md"
  cp "$BACKLOG_TEMPLATE" "$BACKLOG_OUT"
  sed -i.bak "s|{{PROJECT_NAME}}|$PROJECT_NAME|g" "$BACKLOG_OUT"
  rm -f "$BACKLOG_OUT.bak"
  rm -f "$BACKLOG_TEMPLATE"
  echo -e "${GREEN}  Backlog template created${NC}"
fi

# Remove plans README from target
rm -f "$TARGET_DIR/.claude/plans/README.md"

# Process progress template
PROGRESS_TEMPLATE="$TARGET_DIR/.claude/progress.md.template"
if [ -f "$PROGRESS_TEMPLATE" ]; then
  PROGRESS_OUT="$TARGET_DIR/.claude/progress.md"
  cp "$PROGRESS_TEMPLATE" "$PROGRESS_OUT"
  sed -i.bak "s|{{PROJECT_NAME}}|$PROJECT_NAME|g" "$PROGRESS_OUT"
  rm -f "$PROGRESS_OUT.bak"
  rm -f "$PROGRESS_TEMPLATE"
  echo -e "${GREEN}  progress.md created${NC}"
fi

# ─── Step 6: Replace placeholders in skills ──────────────────────────

echo -e "${YELLOW}Configuring skills...${NC}"

# Read preset overrides for feature skill
FEATURE_SKILL="$TARGET_DIR/.claude/skills/feature/SKILL.md"

# Extract sections from feature-overrides.md using python (cross-platform)
WORKSPACE_TABLE=""
TEST_PATTERNS=""
TEST_COMMANDS=""
AGENT_DISPATCH=""
VALIDATION_COMMANDS=""

# Helper: extract text between two ### headers (excluding both header lines)
extract_section() {
  local file="$1" start="$2" end="$3"
  python3 -c "
import re
content = open('$file').read()
pattern = r'### ${start}.*?\n(.*?)(?=### ${end}|$)'
m = re.search(pattern, content, re.DOTALL)
print(m.group(1).rstrip() if m else '')
" 2>/dev/null
}

SECURITY_GATE_PATTERNS=""

if [ -f "$PRESET_DIR/feature-overrides.md" ]; then
  WORKSPACE_TABLE=$(extract_section "$PRESET_DIR/feature-overrides.md" "Workspace Detection" "Test Patterns")
  TEST_PATTERNS=$(extract_section "$PRESET_DIR/feature-overrides.md" "Test Patterns" "Test Commands")
  TEST_COMMANDS=$(extract_section "$PRESET_DIR/feature-overrides.md" "Test Commands" "Test Runner Reference")
  AGENT_DISPATCH=$(extract_section "$PRESET_DIR/feature-overrides.md" "Agent Dispatch" "Security Gate Patterns")
  VALIDATION_COMMANDS=$(extract_section "$PRESET_DIR/feature-overrides.md" "Validation Commands" "Agent Dispatch")
  SECURITY_GATE_PATTERNS=$(extract_section "$PRESET_DIR/feature-overrides.md" "Security Gate Patterns" "Platform Security")
  PROJECT_LAYOUT=$(extract_section "$PRESET_DIR/feature-overrides.md" "Project Layout" "Project Conventions")
  PROJECT_CONVENTIONS=$(extract_section "$PRESET_DIR/feature-overrides.md" "Project Conventions" "Test File Location Table")
  TEST_FILE_LOCATION_TABLE=$(extract_section "$PRESET_DIR/feature-overrides.md" "Test File Location Table" "Test Watch Warning")
  TEST_WATCH_WARNING=$(extract_section "$PRESET_DIR/feature-overrides.md" "Test Watch Warning" "Project Technical Rules")
  PROJECT_TECHNICAL_RULES=$(extract_section "$PRESET_DIR/feature-overrides.md" "Project Technical Rules" "~SENTINEL~")
fi

# Use python for reliable multi-line placeholder replacement
python3 -c "
import sys

with open('$FEATURE_SKILL', 'r') as f:
    content = f.read()

workspace = '''$WORKSPACE_TABLE'''
patterns = '''$TEST_PATTERNS'''
commands = '''$TEST_COMMANDS'''
dispatch = '''$AGENT_DISPATCH'''
validation = '''$VALIDATION_COMMANDS'''
security_gate = '''$SECURITY_GATE_PATTERNS'''

content = content.replace('{{WORKSPACE_TABLE}}', workspace)
content = content.replace('{{TEST_PATTERNS}}', patterns)
content = content.replace('{{TEST_COMMANDS}}', commands)
content = content.replace('{{AGENT_DISPATCH}}', dispatch)
content = content.replace('{{VALIDATION_COMMANDS}}', validation.replace('### Validation Commands (PHASE 5)', '').strip() if validation else '$TYPECHECK_CMD\n$TEST_CI_CMD')
content = content.replace('{{SECURITY_GATE_PATTERNS}}', security_gate.strip() if security_gate else 'No security gate patterns configured for this preset.')
content = content.replace('{{TYPECHECK_CMD}}', '$TYPECHECK_CMD')
content = content.replace('{{TEST_CI_CMD}}', '$TEST_CI_CMD')

starter_path = '$STARTER_REPO_PATH'
if starter_path:
    content = content.replace('{{STARTER_REPO_PATH}}', starter_path)
else:
    import re
    content = re.sub(r'\n### Step 7\.5:.*?(?=\n### Step [89]|\Z)', '', content, flags=re.DOTALL)

with open('$FEATURE_SKILL', 'w') as f:
    f.write(content)
" 2>/dev/null || {
  # Fallback: simple sed replacements for single-line placeholders
  sed -i.bak "s|{{TYPECHECK_CMD}}|$TYPECHECK_CMD|g" "$FEATURE_SKILL"
  sed -i.bak "s|{{TEST_CI_CMD}}|$TEST_CI_CMD|g" "$FEATURE_SKILL"
  sed -i.bak "s|{{WORKSPACE_TABLE}}||g" "$FEATURE_SKILL"
  sed -i.bak "s|{{TEST_PATTERNS}}||g" "$FEATURE_SKILL"
  sed -i.bak "s|{{TEST_COMMANDS}}||g" "$FEATURE_SKILL"
  sed -i.bak "s|{{AGENT_DISPATCH}}||g" "$FEATURE_SKILL"
  sed -i.bak "s|{{VALIDATION_COMMANDS}}|$TYPECHECK_CMD\n$TEST_CI_CMD|g" "$FEATURE_SKILL"
  sed -i.bak "s|{{SECURITY_GATE_PATTERNS}}|No security gate patterns configured for this preset.|g" "$FEATURE_SKILL"
  rm -f "$FEATURE_SKILL.bak"
}

# security/fix/feature-parallel skills now read commands from framework.json at runtime.
# Only the feature SKILL.md still needs structural placeholder substitution above.

# Hooks now read variables at runtime from framework.json — no sed replacement needed.

# Fix pre-push hook
PRE_PUSH="$TARGET_DIR/.husky/pre-push"
sed -i.bak "s|{{TYPECHECK_CMD}}|$TYPECHECK_CMD|g" "$PRE_PUSH"
sed -i.bak "s|{{TEST_CI_CMD}}|$TEST_CI_CMD|g" "$PRE_PUSH"
rm -f "$PRE_PUSH.bak"

echo -e "${GREEN}  Skills configured${NC}"

# ─── Step 7: Generate CLAUDE.md ──────────────────────────────────────

echo -e "${YELLOW}Generating CLAUDE.md...${NC}"

# Read test runner table from preset
TEST_RUNNER_TABLE=$(extract_section "$PRESET_DIR/feature-overrides.md" "Test Runner Reference" "(Validation|Platform Security)" 2>/dev/null || echo "")

# Build agent roster (if agents are configured)
AGENT_ROSTER=""
if [ "$HAS_AGENTS" = "true" ] && [ -f "$PRESET_DIR/CLAUDE.md.partial" ]; then
  AGENT_ROSTER=$(python3 -c "
import re
content = open('$PRESET_DIR/CLAUDE.md.partial').read()
m = re.search(r'(## Agent Roster.*?)(?=## Additional|$)', content, re.DOTALL)
print(m.group(1).rstrip() if m else '')
" 2>/dev/null || echo "")
fi

CLAUDE_MD="$TARGET_DIR/CLAUDE.md"

if [ -f "$CLAUDE_MD" ]; then
  echo -e "  ${YELLOW}CLAUDE.md already exists — appending TDD sections${NC}"

  # Only append TDD sections if not already present
  if ! grep -q "TDD Workflow Rules" "$CLAUDE_MD"; then
    cat >> "$CLAUDE_MD" << TDDEOF

## TDD Workflow Rules

- NEVER write implementation and tests in the same step.
- RED: tests only. GREEN: implementation only. REFACTOR: improve only.
- If a test fails during REFACTOR, revert immediately, then try differently.
- After GREEN, always refactor before shipping. Never ship first-pass code.
- Never modify files in \`*/generated/*\` or \`*/__generated__/*\`
- Testing Trophy priority: integration tests > unit tests > E2E tests
- Coverage target: ${COVERAGE_THRESHOLD}%+ on business logic

### Test Runner Reference

$TEST_RUNNER_TABLE

**CRITICAL:** Never run vitest without the \`run\` flag — it starts watch mode and hangs.

### Gherkin Specs

- Feature specs live in \`specs/*.feature\`
- Written BEFORE tests as human-readable acceptance criteria
- Not executable — documentation that maps to test \`describe\`/\`it\` blocks
- One \`.feature\` file per feature/PR

$AGENT_ROSTER

## Session Reporting

When executing a plan or multi-step task:

- Before each file edit: print a one-line summary of what you're about to change and why
- After each bash command: print whether it succeeded or failed and a one-line result
- After completing a logical group of changes: print a short progress summary
- If a typecheck or test fails: print the error immediately, don't silently continue
- When starting a major phase (RED, GREEN, REFACTOR, SHIP): announce it

## Available Skills

- \`/feature [--careful] <description>\` — Orchestrated TDD cycle: Gherkin spec → tests → implement → refactor → ship.
  Default: FAST_MODE — combined RED+GREEN, auto-approve Gherkin, parallel validation.
  \`--careful\`: forces PAUSE for Gherkin approval and separate RED/GREEN steps.

- \`/security [files or git ref]\` — Deep security review with threat modeling.
  OWASP Top 10 + platform-specific checks. Use before PRs.
TDDEOF
    echo -e "${GREEN}  TDD sections appended to CLAUDE.md${NC}"
  else
    echo -e "  ${YELLOW}TDD sections already present — skipping${NC}"
  fi
else
  # Create from template
  cp "$CORE_DIR/CLAUDE.md.template" "$CLAUDE_MD"
  sed -i.bak "s|{{PROJECT_NAME}}|$PROJECT_NAME|g" "$CLAUDE_MD"
  sed -i.bak "s|{{COVERAGE_THRESHOLD}}|$COVERAGE_THRESHOLD|g" "$CLAUDE_MD"
  sed -i.bak "s|{{SCOPES}}|$SCOPES|g" "$CLAUDE_MD"

  # Inject preset-specific sections
  if [ -f "$PRESET_DIR/CLAUDE.md.partial" ]; then
    TECH_STACK=$(python3 -c "
import re
c = open('$PRESET_DIR/CLAUDE.md.partial').read()
m = re.search(r'(## Tech Stack.*?)(?=## Architecture|$)', c, re.DOTALL)
print(m.group(1).rstrip() if m else 'See preset documentation')
" 2>/dev/null || echo "See preset documentation")
    ARCH=$(python3 -c "
import re
c = open('$PRESET_DIR/CLAUDE.md.partial').read()
m = re.search(r'(## Architecture.*?)(?=## Agent Roster|## Additional|$)', c, re.DOTALL)
print(m.group(1).rstrip() if m else 'See preset documentation')
" 2>/dev/null || echo "See preset documentation")
    ADDITIONAL=$(python3 -c "
import re
c = open('$PRESET_DIR/CLAUDE.md.partial').read()
m = re.search(r'(## Additional Conventions.*)', c, re.DOTALL)
print(m.group(1).rstrip() if m else '')
" 2>/dev/null || echo "")
  fi

  python3 -c "
content = open('$CLAUDE_MD').read()
content = content.replace('{{TECH_STACK}}', '''${TECH_STACK:-See preset documentation}''')
content = content.replace('{{QUICK_START}}', '''${PACKAGE_MANAGER} install''')
content = content.replace('{{COMMANDS}}', 'See package.json scripts')
content = content.replace('{{ARCHITECTURE}}', '''${ARCH:-See preset documentation}''')
content = content.replace('{{ADDITIONAL_CONVENTIONS}}', '''${ADDITIONAL:-}''')
content = content.replace('{{TEST_RUNNER_TABLE}}', '''$TEST_RUNNER_TABLE''')
content = content.replace('{{TEST_UTILITIES}}', 'See test setup files')
content = content.replace('{{AGENT_ROSTER}}', '''$AGENT_ROSTER''')
content = content.replace('{{REFERENCES}}', '')
open('$CLAUDE_MD', 'w').write(content)
" 2>/dev/null || {
    # Fallback
    sed -i.bak "s|{{TECH_STACK}}|See preset documentation|g" "$CLAUDE_MD"
    sed -i.bak "s|{{QUICK_START}}|$PACKAGE_MANAGER install|g" "$CLAUDE_MD"
    sed -i.bak "s|{{COMMANDS}}|See package.json scripts|g" "$CLAUDE_MD"
    sed -i.bak "s|{{ARCHITECTURE}}|See preset documentation|g" "$CLAUDE_MD"
    sed -i.bak "s|{{ADDITIONAL_CONVENTIONS}}||g" "$CLAUDE_MD"
    sed -i.bak "s|{{TEST_RUNNER_TABLE}}|$TEST_RUNNER_TABLE|g" "$CLAUDE_MD" 2>/dev/null || true
    sed -i.bak "s|{{TEST_UTILITIES}}|See test setup files|g" "$CLAUDE_MD"
    sed -i.bak "s|{{AGENT_ROSTER}}||g" "$CLAUDE_MD"
    sed -i.bak "s|{{REFERENCES}}||g" "$CLAUDE_MD"
  }
  rm -f "$CLAUDE_MD.bak"
  echo -e "${GREEN}  CLAUDE.md created from template${NC}"
fi

# ─── Step 8: Add package.json scripts ────────────────────────────────

echo -e "${YELLOW}Updating package.json...${NC}"

PKG="$TARGET_DIR/package.json"
if [ -f "$PKG" ]; then
  # Add lint-staged config
  LINT_STAGED=$(jq -c '.variables.LINT_STAGED' "$PRESET_DIR/preset.json")
  jq --argjson ls "$LINT_STAGED" '."lint-staged" = $ls' "$PKG" > "$PKG.tmp" && mv "$PKG.tmp" "$PKG"

  # Add scripts
  SCRIPTS=$(jq -c '.variables.PACKAGE_SCRIPTS' "$PRESET_DIR/preset.json")
  jq --argjson s "$SCRIPTS" '.scripts += $s' "$PKG" > "$PKG.tmp" && mv "$PKG.tmp" "$PKG"

  echo -e "${GREEN}  package.json updated${NC}"
else
  echo -e "  ${YELLOW}No package.json found — skipping script injection${NC}"
fi

# ─── Step 9: Install dependencies ────────────────────────────────────

echo -e "${YELLOW}Installing dev dependencies...${NC}"

cd "$TARGET_DIR"

# Detect package manager
if [ -f "bun.lockb" ] || [ "$PACKAGE_MANAGER" = "bun" ]; then
  PM="bun"
elif [ -f "pnpm-lock.yaml" ]; then
  PM="pnpm"
elif [ -f "yarn.lock" ]; then
  PM="yarn"
else
  PM="npm"
fi

if [ "$PM" = "bun" ]; then
  bun add -d husky lint-staged @commitlint/cli @commitlint/config-conventional 2>/dev/null || {
    echo -e "  ${YELLOW}Dependency installation failed — install manually:${NC}"
    echo "  bun add -d husky lint-staged @commitlint/cli @commitlint/config-conventional"
  }
else
  $PM install -D husky lint-staged @commitlint/cli @commitlint/config-conventional 2>/dev/null || {
    echo -e "  ${YELLOW}Dependency installation failed — install manually:${NC}"
    echo "  $PM install -D husky lint-staged @commitlint/cli @commitlint/config-conventional"
  }
fi

# ─── Step 10: Initialize Husky ───────────────────────────────────────

echo -e "${YELLOW}Initializing Husky...${NC}"

if [ -d ".git" ]; then
  if [ "$PM" = "bun" ]; then
    bunx husky init 2>/dev/null || true
  else
    npx husky init 2>/dev/null || true
  fi
  # Restore our hook files (husky init overwrites pre-commit)
  cp "$CORE_DIR/.husky/pre-commit" "$TARGET_DIR/.husky/pre-commit"
  cp "$CORE_DIR/.husky/commit-msg" "$TARGET_DIR/.husky/commit-msg"
  # pre-push was already configured with correct commands
  echo -e "${GREEN}  Husky initialized${NC}"
else
  echo -e "  ${YELLOW}Not a git repo — run 'git init' first, then '${PM}x husky init'${NC}"
fi

# ─── Step 11: Make hooks executable ──────────────────────────────────

chmod +x "$TARGET_DIR/.claude/hooks/"*.sh 2>/dev/null
echo -e "${GREEN}  Hook scripts made executable${NC}"

# ─── Done ────────────────────────────────────────────────────────────

echo ""
echo -e "${GREEN}╔══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   Setup complete!                    ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════╝${NC}"
echo ""
echo "What was set up:"
echo "  - .claude/skills/feature/         — /feature TDD skill (Gherkin + FAST_MODE)"
echo "  - .claude/skills/feature-parallel/ — /feature-parallel parallel TDD skill"
echo "  - .claude/skills/fix/             — /fix debugging skill"
echo "  - .claude/skills/security/        — /security review skill"
echo "  - .claude/skills/caveman/         — /caveman print-debugging skill"
echo "  - .claude/hooks/                  — 14 hooks: format, typecheck, block-dangerous, notify, session, token-logger, and more"
echo "  - .claude/settings.json           — hook config + permissions"
if [ "$HAS_AGENTS" = "true" ]; then
  echo "  - .claude/agents/                 — specialist agents + reviewer + discovery-explorer + domain-implementer"
fi
echo "  - .claude/plans/                  — backlog + plans directory"
echo "  - .claude/progress.md             — session progress tracker"
echo "  - specs/                          — Gherkin spec output directory"
echo "  - .husky/                         — pre-commit, commit-msg, pre-push"
echo "  - commitlint.config.js            — conventional commit enforcement"
echo "  - CLAUDE.md                       — TDD rules, Gherkin docs, skill docs"
echo ""
echo "Workflow:"
echo "  1. Plan:     Use plan mode to design features"
echo "  2. Specify:  /feature writes Gherkin specs automatically"
echo "  3. Build:    /feature [--careful] <description>"
echo "  4. Review:   /security (before PRs)"
echo "  5. Ship:     Commit + push (hooks validate automatically)"
echo ""
