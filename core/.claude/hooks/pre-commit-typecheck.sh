#!/usr/bin/env bash
# Block git commit if TypeScript has errors. Applies to ALL commits
# (humans + agents). Exits non-zero to abort the Bash tool call.
#
# Self-filters: only runs when the Bash command contains "git commit".
# Claude Code passes the tool input as JSON to stdin.
#
# Customize: replace {{TYPECHECK_CMD}} with your project's typecheck command.
# Examples: "pnpm type-check", "pnpm tsc --noEmit", "npx tsc --noEmit"
set -e

INPUT=$(cat /dev/stdin 2>/dev/null || true)
echo "$INPUT" | grep -q '"git commit' || exit 0

cd "$(git rev-parse --show-toplevel)"
{{TYPECHECK_CMD}}
