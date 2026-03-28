#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=> Stopping auth server..."
if [ -f "$SCRIPT_DIR/.auth-server.pid" ]; then
  kill "$(cat "$SCRIPT_DIR/.auth-server.pid")" 2>/dev/null || true
  rm "$SCRIPT_DIR/.auth-server.pid"
fi
pkill -f "node server.js" 2>/dev/null || true

echo "=> Stopping e2e containers..."
docker compose -f "$SCRIPT_DIR/docker-compose.yml" down -v --remove-orphans -t 0 2>/dev/null || true

echo "=> E2E environment stopped."
