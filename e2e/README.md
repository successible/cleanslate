# E2E Tests — OIDC Authentication

End-to-end tests for the OIDC login flow using [Playwright](https://playwright.dev/) and [Authelia](https://www.authelia.com/) as the identity provider.

## Prerequisites

- Node.js (LTS) and pnpm
- Docker and Docker Compose
- [Hasura CLI](https://hasura.io/docs/latest/hasura-cli/install-hasura-cli/)
- Playwright browsers: `npx playwright install chromium --with-deps`

## Quick start

```bash
bash e2e/setup.sh
npx playwright test
bash e2e/teardown.sh
```

## Manual setup

If you prefer to run the steps individually:

### 1. Add `auth.localhost` to `/etc/hosts`

Authelia requires a domain with a period for session cookies. Add this once:

```bash
echo "127.0.0.1 auth.localhost" | sudo tee -a /etc/hosts
```

### 2. Start the containers

```bash
docker compose -f e2e/docker-compose.yml up -d
```

This starts:
- **PostgreSQL** on port 5433
- **Hasura** on port 8080
- **Authelia** on port 9091 (HTTPS, self-signed cert)

### 3. Apply database migrations and seed data

```bash
hasura metadata apply --endpoint http://localhost:8080 --admin-secret e2e-secret
hasura migrate apply --all-databases --endpoint http://localhost:8080 --admin-secret e2e-secret
hasura metadata reload --endpoint http://localhost:8080 --admin-secret e2e-secret
hasura seed apply --file user.sql --endpoint http://localhost:8080 --admin-secret e2e-secret --database-name default
```

### 4. Compile and start the auth server

```bash
cd src && npx tsc -p tsconfig-server.json && cd ..

HASURA_GRAPHQL_ADMIN_SECRET="e2e-secret" \
JWT_SIGNING_SECRET="e2e-jwt-signing-secret-that-is-long-enough" \
DOMAIN="localhost" \
NODE_ENV="development" \
NODE_TLS_REJECT_UNAUTHORIZED=0 \
NEXT_PUBLIC_USE_FIREBASE="false" \
OIDC_ISSUER_URL="https://auth.localhost:9091" \
OIDC_CLIENT_ID="cleanslate" \
OIDC_CLIENT_SECRET="cleanslate-test-secret" \
OIDC_REDIRECT_URI="http://localhost:3001/auth/oidc/callback" \
OIDC_SCOPES="openid profile email" \
OIDC_ID_CLAIM="sub" \
node src/server.js &
```

### 5. Run the tests

```bash
npx playwright test
```

### 6. Teardown

```bash
bash e2e/teardown.sh
```

## What the tests cover

| Test | What it verifies |
|---|---|
| Health check — auth server | Auth server is running and responds |
| Health check — Authelia OIDC discovery | Authelia exposes `.well-known/openid-configuration` |
| Login redirects to Authelia | `GET /auth/oidc/login` redirects to Authelia's authorization endpoint |
| Full OIDC login flow | Login at Authelia, consent, callback, code exchange, JWT has valid Hasura claims |
| Authorization code is single-use | Replaying a code returns 403 |
| JWT accepted by Hasura | The issued JWT works for GraphQL queries and the auto-created profile exists |

## Test user credentials

Defined in `authelia/users_database.yml`:

- **Username:** `testuser`
- **Password:** `testpassword`

## Configuration files

| File | Purpose |
|---|---|
| `authelia/configuration.yml` | Authelia server config with OIDC client for Clean Slate |
| `authelia/users_database.yml` | Test user credentials (Argon2 hashed) |
| `authelia/server.crt` / `server.key` | Self-signed TLS cert for `auth.localhost` |
| `docker-compose.yml` | PostgreSQL, Hasura, and Authelia containers |
| `setup.sh` / `teardown.sh` | Lifecycle scripts |
| `tests/oidc-login.spec.ts` | Playwright test specs |

All secrets in these files are for testing only and are not used in production.
