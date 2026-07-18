#!/bin/bash
set -euo pipefail

set -a # automatically export all variables
source .devcontainer/.env
set +a

export HASURA_ENDPOINT="http://host.docker.internal:${HASURA_PORT}"

echo "Stopping previous Clean Slate stack..."
docker compose -f docker-compose-dev.yml down --remove-orphans || true
docker rm -f cleanslate-graphql-engine-1 2>/dev/null || true

echo "Waiting for ports to release..."
sleep 2

echo "Starting Clean Slate services..."

docker compose --env-file .devcontainer/.env -f docker-compose-dev.yml up -d

echo "Waiting for Hasura at ${HASURA_ENDPOINT}..."

until curl -sf "${HASURA_ENDPOINT}/v1/version" >/dev/null; do
    echo "Waiting for Hasura to be ready..."
    sleep 2
done

echo "Applying Hasura migrations..."
hasura migrate apply \
  --endpoint "${HASURA_ENDPOINT}" \
  --admin-secret "${HASURA_GRAPHQL_ADMIN_SECRET}"

echo "Applying Hasura metadata..."
hasura metadata apply \
  --endpoint "${HASURA_ENDPOINT}" \
  --admin-secret "${HASURA_GRAPHQL_ADMIN_SECRET}"

pnpm install

echo "Starting Next.js..."
(cd src && ((npx next dev --webpack) & (npx nodemon server.js))) & sleep 5
sudo caddy start -c Caddyfile.dev --adapter caddyfile
