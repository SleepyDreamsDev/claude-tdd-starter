#!/bin/bash
# Stop hook: displays a checklist when Claude Code completes a session.
# Runs alongside notify.sh in the Stop lifecycle event.

cat << 'EOF'

── STOP CHECKLIST ───────────────────────────────
  [ ] backlog.md updated? (.claude/plans/backlog.md)
  [ ] architecture-decisions.md updated?
        (if an approach was rejected or a decision made)
  [ ] Memory files updated?
        (if non-obvious project context was learned)
  [ ] All tests passing?  →  check CLAUDE.md for test command
  [ ] Types clean?        →  check CLAUDE.md for typecheck command
  [ ] Framework improvements to sync to claude-tdd-starter?
        (hooks, skills, agents, rules — see /feature Step 7.5)
─────────────────────────────────────────────────

EOF
