#!/bin/bash
set -euo pipefail

# If no process is found, the script would die without || true
# This is due to set -e being the way that it is
pkill -9 -f "next/dist/bin/next" || true
pkill -9 -f "next-server" || true
pkill -9 -f "next-router-worker" || true
pkill -9 -f "nodemon/bin/nodemon" || true
pkill -9 -f "server.js" || true
pkill -9 -f "typescript/bin/tsc" || true

set -a # automatically export all variables
source .devcontainer/.env
set +a

export HASURA_ENDPOINT="http://graphql-engine:8080"

echo "Stopping previous Clean Slate stack..."
docker compose -f docker-compose-dev.yml \
    -f .devcontainer/docker-compose.override.yml \
    down --remove-orphans || true
docker rm -f cleanslate-graphql-engine-1 2>/dev/null || true

echo "Waiting for ports to release..."
sleep 2

echo "Starting Clean Slate services..."

docker compose --env-file .devcontainer/.env \
    -f docker-compose-dev.yml \
    -f .devcontainer/docker-compose.override.yml \
    up -d

echo "Waiting for Hasura at ${HASURA_ENDPOINT}..."

until curl -sf "${HASURA_ENDPOINT}/v1/version" >/dev/null; do
    echo "Waiting for Hasura to be ready..."
    sleep 2
done

echo "=> Run migrations with Hasura..."
node migrate.js

echo "Starting development services..."

export NODE_OPTIONS="--max-old-space-size=4096"

(cd src && ((npx tsc --watch --preserveWatchOutput) & (npx tsc -p tsconfig-server.json --watch --preserveWatchOutput))) &

(cd src && ((npx next dev --webpack) & (npx nodemon server.js))) & sleep 5


echo "Waiting for Next..."

until curl -sf http://127.0.0.1:3000 >/dev/null; do
    sleep 1
done

echo "Starting Caddy..."

echo "=> Starting Caddy..."

# using run instead of start lets us kill caddy when we kill start-dev.sh
caddy run -c .devcontainer/Caddyfile.container --adapter caddyfile
