#!/bin/bash
# framework-sync.sh — Bidirectional sync of framework files between a deployed
# project and claude-tdd-starter/core/.claude/.
#
# Usage:
#   ./framework-sync.sh push <project-dir>   # project → starter (backport improvements)
#   ./framework-sync.sh pull <project-dir>   # starter → project (receive updates)
#   ./framework-sync.sh diff <project-dir>   # show drift, no changes
#
# The sync is driven by .claude/framework-manifest.json in the project.
# Only files listed under "framework" are synced. Project-owned files are skipped.
# framework.json itself is always skipped (project-specific variable bindings).

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CORE_DIR="$SCRIPT_DIR/core"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# ─── Arg parsing ─────────────────────────────────────────────────────

CMD="$1"
PROJECT_DIR="$2"

if [ -z "$CMD" ] || [ -z "$PROJECT_DIR" ]; then
  echo "Usage: $0 <push|pull|diff> <project-dir>"
  echo ""
  echo "  push  Copy framework files from project → starter core"
  echo "  pull  Copy framework files from starter core → project"
  echo "  diff  Show drift between project and starter (no changes)"
  exit 1
fi

if [ ! -d "$PROJECT_DIR" ]; then
  echo "Error: project directory '$PROJECT_DIR' not found"
  exit 1
fi

MANIFEST="$PROJECT_DIR/.claude/framework-manifest.json"
if [ ! -f "$MANIFEST" ]; then
  echo "Error: $MANIFEST not found. Is this project set up with claude-tdd-starter?"
  exit 1
fi

# ─── Load manifest ───────────────────────────────────────────────────

FRAMEWORK_FILES=$(jq -r '.framework[]' "$MANIFEST" 2>/dev/null)
if [ -z "$FRAMEWORK_FILES" ]; then
  echo "Error: framework-manifest.json has no 'framework' array or it is empty"
  exit 1
fi

# ─── Sync functions ──────────────────────────────────────────────────

do_push() {
  echo ""
  echo -e "${CYAN}Pushing framework files: project → starter${NC}"
  echo ""
  local changed=0
  while IFS= read -r rel_path; do
    src="$PROJECT_DIR/.claude/$rel_path"
    dst="$CORE_DIR/.claude/$rel_path"
    if [ ! -f "$src" ]; then
      echo -e "  ${YELLOW}SKIP${NC}  $rel_path (not found in project)"
      continue
    fi
    mkdir -p "$(dirname "$dst")"
    if [ -f "$dst" ] && diff -q "$src" "$dst" > /dev/null 2>&1; then
      echo -e "  ${GREEN}OK${NC}    $rel_path"
    else
      cp "$src" "$dst"
      echo -e "  ${CYAN}COPY${NC}  $rel_path"
      changed=$((changed + 1))
    fi
  done <<< "$FRAMEWORK_FILES"
  echo ""
  echo -e "${GREEN}Push complete. $changed file(s) updated.${NC}"
}

do_pull() {
  echo ""
  echo -e "${CYAN}Pulling framework files: starter → project${NC}"
  echo ""
  local changed=0
  while IFS= read -r rel_path; do
    src="$CORE_DIR/.claude/$rel_path"
    dst="$PROJECT_DIR/.claude/$rel_path"
    if [ ! -f "$src" ]; then
      echo -e "  ${YELLOW}SKIP${NC}  $rel_path (not found in starter)"
      continue
    fi
    mkdir -p "$(dirname "$dst")"
    if [ -f "$dst" ] && diff -q "$src" "$dst" > /dev/null 2>&1; then
      echo -e "  ${GREEN}OK${NC}    $rel_path"
    else
      cp "$src" "$dst"
      echo -e "  ${CYAN}COPY${NC}  $rel_path"
      changed=$((changed + 1))
    fi
  done <<< "$FRAMEWORK_FILES"
  echo ""
  echo -e "${GREEN}Pull complete. $changed file(s) updated.${NC}"
}

do_diff() {
  echo ""
  echo -e "${CYAN}Framework drift report: project vs starter${NC}"
  echo ""
  local drifted=0
  local missing_project=0
  local missing_starter=0
  while IFS= read -r rel_path; do
    src="$PROJECT_DIR/.claude/$rel_path"
    dst="$CORE_DIR/.claude/$rel_path"
    if [ ! -f "$src" ] && [ ! -f "$dst" ]; then
      echo -e "  ${RED}MISSING${NC}  $rel_path (absent in both)"
    elif [ ! -f "$src" ]; then
      echo -e "  ${RED}MISSING${NC}  $rel_path (not in project)"
      missing_project=$((missing_project + 1))
    elif [ ! -f "$dst" ]; then
      echo -e "  ${YELLOW}NEW${NC}      $rel_path (not yet in starter)"
      missing_starter=$((missing_starter + 1))
    elif diff -q "$src" "$dst" > /dev/null 2>&1; then
      echo -e "  ${GREEN}CLEAN${NC}    $rel_path"
    else
      echo -e "  ${RED}DRIFT${NC}    $rel_path"
      drifted=$((drifted + 1))
    fi
  done <<< "$FRAMEWORK_FILES"
  echo ""
  if [ "$drifted" -eq 0 ] && [ "$missing_project" -eq 0 ] && [ "$missing_starter" -eq 0 ]; then
    echo -e "${GREEN}No drift detected. Framework files are in sync.${NC}"
  else
    echo -e "${RED}Drift detected: $drifted modified, $missing_starter new (run 'push' to backport), $missing_project missing from project.${NC}"
    echo ""
    echo "  To backport project improvements to starter:  $0 push $PROJECT_DIR"
    echo "  To pull starter updates into project:         $0 pull $PROJECT_DIR"
  fi
}

# ─── Dispatch ────────────────────────────────────────────────────────

case "$CMD" in
  push) do_push ;;
  pull) do_pull ;;
  diff) do_diff ;;
  *)
    echo "Error: unknown command '$CMD'. Use push, pull, or diff."
    exit 1
    ;;
esac
