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
echo -e "${CYAN}║   Claude TDD Starter — Setup         ║${NC}"
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

# ─── Step 4: Load preset variables ──────────────────────────────────

echo ""
echo -e "${YELLOW}Loading preset variables...${NC}"

TYPECHECK_CMD=$(jq -r '.variables.TYPECHECK_CMD' "$PRESET_DIR/preset.json")
TEST_CI_CMD=$(jq -r '.variables.TEST_CI_CMD' "$PRESET_DIR/preset.json")
TEST_CMD_PRIMARY=$(jq -r '.variables.TEST_CMD_PRIMARY' "$PRESET_DIR/preset.json")
TEST_CMD_SECONDARY=$(jq -r '.variables.TEST_CMD_SECONDARY' "$PRESET_DIR/preset.json")
COVERAGE_THRESHOLD=$(jq -r '.variables.COVERAGE_THRESHOLD' "$PRESET_DIR/preset.json")
SCOPES=$(jq -r '.variables.SCOPES' "$PRESET_DIR/preset.json")

# ─── Step 5: Copy core files ────────────────────────────────────────

echo -e "${YELLOW}Copying core files...${NC}"

# Copy .claude directory
cp -r "$CORE_DIR/.claude" "$TARGET_DIR/"

# Copy .husky directory
cp -r "$CORE_DIR/.husky" "$TARGET_DIR/"

# Copy commitlint config
cp "$CORE_DIR/commitlint.config.js" "$TARGET_DIR/"

# Copy docs (if not exists)
mkdir -p "$TARGET_DIR/docs"
cp -n "$CORE_DIR/docs/"*.md "$TARGET_DIR/docs/" 2>/dev/null || true

echo -e "${GREEN}  Core files copied${NC}"

# ─── Step 6: Replace placeholders in skills ──────────────────────────

echo -e "${YELLOW}Configuring skills...${NC}"

# Read preset overrides
WORKSPACE_TABLE=$(sed -n '/### Workspace Detection/,/### Test Patterns/p' "$PRESET_DIR/feature-overrides.md" | head -n -1)
TEST_PATTERNS=$(sed -n '/### Test Patterns/,/### Test Commands/p' "$PRESET_DIR/feature-overrides.md" | head -n -1)
TEST_COMMANDS=$(sed -n '/### Test Commands/,/### Test Runner Reference/p' "$PRESET_DIR/feature-overrides.md" | head -n -1)
PLATFORM_SECURITY=$(sed -n '/### Platform Security Checks/,$ p' "$PRESET_DIR/feature-overrides.md")

# Inject into feature skill
FEATURE_SKILL="$TARGET_DIR/.claude/skills/feature/SKILL.md"

# Replace workspace table
python3 -c "
import re
with open('$FEATURE_SKILL', 'r') as f:
    content = f.read()
content = content.replace('{{WORKSPACE_TABLE}}', open('$PRESET_DIR/feature-overrides.md').read().split('### Test Patterns')[0].split('### Workspace Detection')[1] if '### Workspace Detection' in open('$PRESET_DIR/feature-overrides.md').read() else '')
content = content.replace('{{TEST_PATTERNS}}', '')
content = content.replace('{{TEST_COMMANDS}}', '')
content = content.replace('{{TYPECHECK_CMD}}', '$TYPECHECK_CMD')
content = content.replace('{{TEST_CI_CMD}}', '$TEST_CI_CMD')
with open('$FEATURE_SKILL', 'w') as f:
    f.write(content)
" 2>/dev/null || {
  # Fallback: simple sed replacements
  sed -i.bak "s|{{TYPECHECK_CMD}}|$TYPECHECK_CMD|g" "$FEATURE_SKILL"
  sed -i.bak "s|{{TEST_CI_CMD}}|$TEST_CI_CMD|g" "$FEATURE_SKILL"
  sed -i.bak "s|{{WORKSPACE_TABLE}}||g" "$FEATURE_SKILL"
  sed -i.bak "s|{{TEST_PATTERNS}}||g" "$FEATURE_SKILL"
  sed -i.bak "s|{{TEST_COMMANDS}}||g" "$FEATURE_SKILL"
  rm -f "$FEATURE_SKILL.bak"
}

# Inject into security skill
SECURITY_SKILL="$TARGET_DIR/.claude/skills/security/SKILL.md"
sed -i.bak "s|{{TYPECHECK_CMD}}|$TYPECHECK_CMD|g" "$SECURITY_SKILL"
sed -i.bak "s|{{PLATFORM_SECURITY_CHECKS}}|$PLATFORM_SECURITY|g" "$SECURITY_SKILL" 2>/dev/null || true
rm -f "$SECURITY_SKILL.bak"

# Fix typecheck hook
TYPECHECK_HOOK="$TARGET_DIR/.claude/hooks/typecheck-on-edit.sh"
sed -i.bak "s|{{TYPECHECK_CMD}}|$TYPECHECK_CMD|g" "$TYPECHECK_HOOK"
rm -f "$TYPECHECK_HOOK.bak"

# Fix pre-push hook
PRE_PUSH="$TARGET_DIR/.husky/pre-push"
sed -i.bak "s|{{TYPECHECK_CMD}}|$TYPECHECK_CMD|g" "$PRE_PUSH"
sed -i.bak "s|{{TEST_CI_CMD}}|$TEST_CI_CMD|g" "$PRE_PUSH"
rm -f "$PRE_PUSH.bak"

echo -e "${GREEN}  Skills configured${NC}"

# ─── Step 7: Generate CLAUDE.md ──────────────────────────────────────

echo -e "${YELLOW}Generating CLAUDE.md...${NC}"

# Read test runner table from preset
TEST_RUNNER_TABLE=$(sed -n '/### Test Runner Reference/,/### Platform Security/p' "$PRESET_DIR/feature-overrides.md" | grep -v "### " | head -n -1)

# Build CLAUDE.md from template + partial
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

**CRITICAL:** Never run \`npx vitest\` without the \`run\` flag — it starts watch mode and hangs.

## Available Skills

- \`/feature <description>\` — Full TDD cycle: tests -> implement -> refactor -> ship.
  Includes quick security check before commit (Phase 5, Step 1.5).

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
    # Replace placeholder sections with preset content
    TECH_STACK=$(sed -n '/## Tech Stack/,/## Architecture/p' "$PRESET_DIR/CLAUDE.md.partial" | head -n -1)
    ARCH=$(sed -n '/## Architecture/,/## Additional/p' "$PRESET_DIR/CLAUDE.md.partial" | head -n -1)
    ADDITIONAL=$(sed -n '/## Additional Conventions/,$ p' "$PRESET_DIR/CLAUDE.md.partial")
  fi

  sed -i.bak "s|{{TECH_STACK}}|See preset documentation|g" "$CLAUDE_MD"
  sed -i.bak "s|{{QUICK_START}}|npm install|g" "$CLAUDE_MD"
  sed -i.bak "s|{{COMMANDS}}|See package.json scripts|g" "$CLAUDE_MD"
  sed -i.bak "s|{{ARCHITECTURE}}|See preset documentation|g" "$CLAUDE_MD"
  sed -i.bak "s|{{ADDITIONAL_CONVENTIONS}}||g" "$CLAUDE_MD"
  sed -i.bak "s|{{TEST_RUNNER_TABLE}}|$TEST_RUNNER_TABLE|g" "$CLAUDE_MD" 2>/dev/null || true
  sed -i.bak "s|{{TEST_UTILITIES}}|See test setup files|g" "$CLAUDE_MD"
  sed -i.bak "s|{{REFERENCES}}||g" "$CLAUDE_MD"
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
if [ -f "pnpm-lock.yaml" ]; then
  PM="pnpm"
elif [ -f "yarn.lock" ]; then
  PM="yarn"
else
  PM="npm"
fi

$PM install -D husky lint-staged @commitlint/cli @commitlint/config-conventional 2>/dev/null || {
  echo -e "  ${YELLOW}Dependency installation failed — install manually:${NC}"
  echo "  $PM install -D husky lint-staged @commitlint/cli @commitlint/config-conventional"
}

# ─── Step 10: Initialize Husky ───────────────────────────────────────

echo -e "${YELLOW}Initializing Husky...${NC}"

if [ -d ".git" ]; then
  npx husky init 2>/dev/null || true
  # Restore our hook files (husky init overwrites pre-commit)
  cp "$CORE_DIR/.husky/pre-commit" "$TARGET_DIR/.husky/pre-commit"
  cp "$CORE_DIR/.husky/commit-msg" "$TARGET_DIR/.husky/commit-msg"
  # pre-push was already configured with correct commands
  echo -e "${GREEN}  Husky initialized${NC}"
else
  echo -e "  ${YELLOW}Not a git repo — run 'git init' first, then 'npx husky init'${NC}"
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
echo "  - .claude/skills/feature/  — /feature TDD skill"
echo "  - .claude/skills/security/ — /security review skill"
echo "  - .claude/hooks/           — format, typecheck, block-dangerous, notify"
echo "  - .claude/settings.json    — hook configuration"
echo "  - .husky/                  — pre-commit, commit-msg, pre-push"
echo "  - commitlint.config.js     — conventional commit enforcement"
echo "  - CLAUDE.md                — TDD rules + skill docs"
echo ""
echo "Workflow:"
echo "  1. Plan:     Use plan mode to design features"
echo "  2. Build:    /feature <description>"
echo "  3. Review:   /security (before PRs)"
echo "  4. Ship:     Commit + push (hooks validate automatically)"
echo ""
