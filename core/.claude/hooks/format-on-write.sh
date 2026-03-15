#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Skip auto-generated directories
case "$FILE_PATH" in
  */api/generated/*|*/generated/*|*/__generated__/*)
    exit 0
    ;;
esac

# Only format files that Prettier can handle
case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.md|*.html|*.yaml|*.yml)
    npx prettier --write "$FILE_PATH" 2>/dev/null
    ;;
esac

exit 0
