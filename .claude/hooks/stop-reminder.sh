#!/bin/bash
# Stop hook: displays a checklist when Claude Code completes a session.
# Runs alongside notify.sh in the Stop lifecycle event.

cat << 'EOF'

── STOP CHECKLIST ───────────────────────────────
  [ ] progress.md updated?  (.claude/progress.md)
        → Last updated date, branch, last commit
        → Build table: mark ✅ steps done, add commit hashes
        → Next up: update to actual next step
        → Unpushed items: list any unmerged commits/PRs
  [ ] backlog.md updated? (.claude/plans/backlog.md)
  [ ] architecture-decisions.md updated?
        (if an approach was rejected or a decision made)
  [ ] Memory files updated?
        (if non-obvious project context was learned)
  [ ] All tests passing?  →  pnpm vitest run
  [ ] Types clean?        →  pnpm type-check
  [ ] Framework improvements to sync to claude-tdd-starter?
        (hooks, skills, agents, rules — see /feature Step 7.5)
─────────────────────────────────────────────────

EOF
