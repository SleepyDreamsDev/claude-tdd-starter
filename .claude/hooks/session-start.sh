#!/bin/bash
# SessionStart hook: injects current project progress into Claude's context.
# Fires on session startup, resume, and after /clear.
# Update .claude/progress.md at the end of each session to keep this fresh.

PROGRESS="$CLAUDE_PROJECT_DIR/.claude/progress.md"

if [ -f "$PROGRESS" ]; then
  echo ""
  echo "╔══════════════════════════════════════════════════════╗"
  echo "║  SESSION CONTEXT — forever-clean                     ║"
  echo "╚══════════════════════════════════════════════════════╝"
  cat "$PROGRESS"
  echo "══════════════════════════════════════════════════════════"
  echo ""
fi
