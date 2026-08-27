#!/usr/bin/env bash
# Consumers resolve lib/ from their own node_modules, so every specifier in it must be portable.
set -uo pipefail

if [ ! -d lib ]; then
  echo "error: lib/ does not exist, run 'yarn prepare' first"
  exit 1
fi

status=0

if grep -rq '@/' lib/; then
  echo "error: the '@/' alias reached lib/, consumers cannot resolve it"
  grep -rn '@/' lib/
  status=1
fi

# An absolute specifier means module-resolver baked in a path from the build machine.
if grep -rqE "from [\"']/|require\([\"']/" lib/; then
  echo "error: lib/ imports from an absolute path"
  grep -rnE "from [\"']/|require\([\"']/" lib/
  status=1
fi

if [ "$status" -eq 0 ]; then
  echo "lib/ is portable"
fi

exit "$status"
