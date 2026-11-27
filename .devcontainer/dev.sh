#!/bin/bash
set -euo pipefail

# Permit only one copy of this script. A second copy would stop the first one.
exec 9>/tmp/cleanslate-dev.lock
if ! flock -n 9; then
    echo "dev-container is already running. Press Ctrl+C in its terminal first." >&2
    exit 1
fi

stop_services() {
    # pkill fails if it finds no process, so "|| true" is necessary with set -e
    pkill -x caddy || true
    pkill -f "next/dist/bin/next" || true
    pkill -f "next-server" || true
    pkill -f "next-router-worker" || true
    pkill -f "nodemon/bin/nodemon" || true
    pkill -f "(^|/)node server\.js$" || true
    pkill -f "tsc.*--watch" || true
}

stop_services # Remove processes from an earlier run
trap stop_services EXIT # Clean up when this run stops

set -a # automatically export all variables
source .devcontainer/.env
set +a

export HASURA_ENDPOINT="http://graphql-server:8080"

# Use the same options for each Compose command
compose=(docker compose --env-file .devcontainer/.env
    -f docker-compose-dev.yml
    -f .devcontainer/docker-compose.override.yml)

echo "Stopping previous Clean Slate Dev stack..."
"${compose[@]}" down --remove-orphans || true

echo "Starting Clean Slate services..."
"${compose[@]}" up -d

echo "Waiting for Hasura at ${HASURA_ENDPOINT}..."

for attempt in {1..60}; do
    curl -sf --max-time 2 "${HASURA_ENDPOINT}/v1/version" >/dev/null && break
    if [ "$attempt" -eq 60 ]; then
        echo "Hasura did not answer. Examine: ${compose[*]} logs graphql-server" >&2
        exit 1
    fi
    echo "Waiting for Hasura to be ready..."
    sleep 2
done

echo "=> Run migrations with Hasura..."
node migrate.js

echo "Starting development services..."

# "9>&-" prevents background processes from keeping the lock
(cd src && exec npx tsc --watch --preserveWatchOutput) 9>&- &
(cd src && exec npx tsc -p tsconfig-server.json --watch --preserveWatchOutput) 9>&- &

(cd src && NODE_OPTIONS="--max-old-space-size=2048" exec npx next dev --webpack) 9>&- &
(cd src && exec npx nodemon server.js) 9>&- &
sleep 5

echo "Starting Caddy..."
caddy run -c .devcontainer/Caddyfile.container --adapter caddyfile 9>&- &

# Stop all services when one of the background processes exits
status=0
wait -n || status=$?
echo "A development process stopped (exit code ${status}). Stopping the others." >&2
exit 1
