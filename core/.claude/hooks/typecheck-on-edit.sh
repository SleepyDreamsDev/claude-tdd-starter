#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Only trigger on TypeScript files
case "$FILE_PATH" in
  *.ts|*.tsx)
    # Run type check — command is configurable via setup.sh
    # Default: npx tsc --noEmit --pretty
    {{TYPECHECK_CMD}} 2>&1
    # Don't block on type errors — let Claude see them and fix
    exit 0
    ;;
esac

exit 0
