#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "=> Stopping any existing e2e services..."
bash "$SCRIPT_DIR/teardown.sh" 2>/dev/null || true

# Ensure auth.localhost resolves
if ! getent hosts auth.localhost > /dev/null 2>&1; then
  echo "=> Adding auth.localhost to /etc/hosts..."
  echo "127.0.0.1 auth.localhost" | sudo tee -a /etc/hosts
fi

# Clean Authelia state from prior runs
sudo chown -R "$(whoami)" "$SCRIPT_DIR/authelia/" 2>/dev/null || true
rm -f "$SCRIPT_DIR/authelia/db.sqlite3" "$SCRIPT_DIR/authelia/notification.txt"

echo "=> Starting e2e containers (Postgres, Hasura, Authelia)..."
docker compose -f "$SCRIPT_DIR/docker-compose.yml" up -d

echo "=> Waiting for Hasura to be ready..."
for i in $(seq 1 30); do
  if curl -s http://localhost:8080/healthz > /dev/null 2>&1; then
    echo "   Hasura is ready."
    break
  fi
  [ "$i" -eq 30 ] && echo "   ERROR: Hasura timeout." && exit 1
  sleep 1
done

echo "=> Waiting for Authelia to be ready..."
for i in $(seq 1 30); do
  if curl -sk https://auth.localhost:9091/.well-known/openid-configuration > /dev/null 2>&1; then
    echo "   Authelia is ready."
    break
  fi
  [ "$i" -eq 30 ] && echo "   ERROR: Authelia timeout." && exit 1
  sleep 1
done

echo "=> Applying Hasura migrations and metadata..."
cd "$PROJECT_DIR"
HASURA_AUTH="--endpoint http://localhost:8080 --admin-secret e2e-secret"
hasura metadata apply $HASURA_AUTH
hasura migrate apply --all-databases $HASURA_AUTH
hasura metadata reload $HASURA_AUTH
hasura seed apply --file user.sql $HASURA_AUTH --database-name default

echo "=> Compiling and starting auth server..."
cd "$PROJECT_DIR/src"
npx tsc -p tsconfig-server.json

export HASURA_GRAPHQL_ADMIN_SECRET="e2e-secret"
export JWT_SIGNING_SECRET="e2e-jwt-signing-secret-that-is-long-enough"
export DOMAIN="localhost"
export NODE_ENV="development"
export NODE_TLS_REJECT_UNAUTHORIZED=0
export NEXT_PUBLIC_USE_FIREBASE="false"
export OIDC_ISSUER_URL="https://auth.localhost:9091"
export OIDC_CLIENT_ID="cleanslate"
export OIDC_CLIENT_SECRET="cleanslate-test-secret"
export OIDC_REDIRECT_URI="http://localhost:3001/auth/oidc/callback"
export OIDC_SCOPES="openid profile email"
export OIDC_ID_CLAIM="sub"

nohup node server.js > /tmp/auth-server.log 2>&1 &
echo $! > "$SCRIPT_DIR/.auth-server.pid"

for i in $(seq 1 15); do
  if curl -s http://localhost:3001/auth > /dev/null 2>&1; then
    echo "   Auth server is ready (PID: $(cat "$SCRIPT_DIR/.auth-server.pid"))."
    break
  fi
  [ "$i" -eq 15 ] && echo "   ERROR: Auth server timeout." && exit 1
  sleep 1
done

echo ""
echo "=> E2E environment is ready!"
echo "   Authelia:     https://auth.localhost:9091"
echo "   Auth Server:  http://localhost:3001"
echo "   Hasura:       http://localhost:8080"
echo ""
echo "   Run tests: npx playwright test"
echo "   Teardown:  bash e2e/teardown.sh"
