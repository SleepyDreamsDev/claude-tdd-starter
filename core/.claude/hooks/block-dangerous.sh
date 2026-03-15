#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Block rm -rf on important paths
if echo "$COMMAND" | grep -qE 'rm\s+-rf\s+(/|~|\$HOME|\.\.)'; then
  echo "BLOCKED: Destructive rm -rf command detected" >&2
  exit 2
fi

# Block force push to main/master
if echo "$COMMAND" | grep -qE 'git\s+push.*--force.*\b(main|master)\b'; then
  echo "BLOCKED: Force push to main/master. Use a feature branch." >&2
  exit 2
fi

# Block dropping databases
if echo "$COMMAND" | grep -qiE 'drop\s+(database|table)'; then
  echo "BLOCKED: DROP command detected. Do this manually." >&2
  exit 2
fi

# Block prisma migrate reset
if echo "$COMMAND" | grep -qE 'prisma\s+migrate\s+reset'; then
  echo "BLOCKED: prisma migrate reset is destructive. Run manually with explicit confirmation." >&2
  exit 2
fi

# Block docker compose down with volumes flag
if echo "$COMMAND" | grep -qE 'docker(-| )compose\s+down.*-v'; then
  echo "BLOCKED: docker compose down -v destroys volumes. Run manually." >&2
  exit 2
fi

exit 0
