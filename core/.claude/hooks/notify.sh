#!/bin/bash
INPUT=$(cat)
MESSAGE=$(echo "$INPUT" | jq -r '.message // "Claude needs your attention"')

# macOS
if command -v osascript &>/dev/null; then
  osascript -e "display notification \"$MESSAGE\" with title \"Claude Code\""
# Linux
elif command -v notify-send &>/dev/null; then
  notify-send "Claude Code" "$MESSAGE"
fi

exit 0
