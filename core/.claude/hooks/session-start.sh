#!/bin/bash
# SessionStart hook: injects current project progress into Claude's context.
# Fires on session startup, resume, and after /clear.
# Update .claude/progress.md at the end of each session to keep this fresh.
#
# Customize: change the banner label to match your project name.

PROGRESS="$CLAUDE_PROJECT_DIR/.claude/progress.md"

if [ -f "$PROGRESS" ]; then
  echo ""
  echo "╔══════════════════════════════════════════════════════╗"
  echo "║  SESSION CONTEXT — $(basename "$CLAUDE_PROJECT_DIR")$(printf '%*s' $((38 - ${#CLAUDE_PROJECT_DIR} + ${#CLAUDE_PROJECT_DIR%/*} + 1)) '')║"
  echo "╚══════════════════════════════════════════════════════╝"
  cat "$PROGRESS"
  echo "══════════════════════════════════════════════════════════"
  echo ""
fi
