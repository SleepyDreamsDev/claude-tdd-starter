#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Skip auto-generated directories
case "$FILE_PATH" in
  */api/generated/*|*/generated/*|*/__generated__/*|**/build/**)
    exit 0
    ;;
esac

# Only format files that the formatter can handle
# Default: Prettier for web/TS projects. Overridden by setup.sh for other stacks.
case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.md|*.html|*.yaml|*.yml)
    pnpm prettier --write "$FILE_PATH" 2>/dev/null
    ;;
esac

exit 0
