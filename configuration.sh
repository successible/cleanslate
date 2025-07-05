#!/bin/bash

# Prompt for ports with defaults
read -p "Enter AUTHENTICATION_SERVER_PORT [3001]: " AUTH_PORT
AUTH_PORT=${AUTH_PORT:-3001}

read -p "Enter CLIENT_PORT [3000]: " CLIENT_PORT
CLIENT_PORT=${CLIENT_PORT:-3000}

read -p "Enter HASURA_PORT [8080]: " HASURA_PORT
HASURA_PORT=${HASURA_PORT:-8080}

read -p "Enter POSTGRES_PORT [5432]: " POSTGRES_PORT
POSTGRES_PORT=${POSTGRES_PORT:-5432}

# Prompt for HASURA domain without default, required input
read -p "Enter NEXT_PUBLIC_HASURA_DOMAIN. Do not include the https://: " HASURA_DOMAIN
if [ -z "$HASURA_DOMAIN" ]; then
  echo "Error: NEXT_PUBLIC_HASURA_DOMAIN is required."
  exit 1
fi

# Generate UUIDs
JWT_SECRET=$(uuidgen)
HASURA_ADMIN_SECRET=$(uuidgen)
POSTGRES_PASSWORD=$(uuidgen)

# Write to .env file
cat <<EOF > .env
AUTHENTICATION_SERVER_PORT=$AUTH_PORT
CLIENT_PORT=$CLIENT_PORT
HASURA_PORT=$HASURA_PORT
POSTGRES_PORT=$POSTGRES_PORT
NEXT_PUBLIC_HASURA_DOMAIN=$HASURA_DOMAIN
HASURA_GRAPHQL_ADMIN_SECRET=$HASURA_ADMIN_SECRET
HASURA_GRAPHQL_JWT_SECRET='{"type":"HS256","key":"$JWT_SECRET"}'
JWT_SIGNING_SECRET=$JWT_SECRET
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
EOF

cat <<EOF > Caddyfile
$HASURA_DOMAIN {
	header /* {
		Referrer-Policy "strict-origin"
		Strict-Transport-Security "max-age=31536000; includeSubDomains;"
		X-Content-Type-Options "nosniff"
		X-Frame-Options "DENY"
		X-XSS-Protection "0"
		Content-Security-Policy "default-src 'self'; script-src 'self' 'wasm-unsafe-eval' https://apis.google.com https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self' *.ingest.sentry.io https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://apis.google.com https://world.openfoodfacts.org; frame-src 'self' *.firebaseapp.com https://www.google.com; img-src 'self' https://www.gstatic.com data:; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; worker-src 'self'; object-src 'none';"
		Permissions-Policy "accelerometer=(self), autoplay=(self), camera=(self), cross-origin-isolated=(self), display-capture=(self), encrypted-media=(self), fullscreen=(self), geolocation=(self), gyroscope=(self), keyboard-map=(self), magnetometer=(self), microphone=(self), midi=(self), payment=(self), picture-in-picture=(self), publickey-credentials-get=(self), screen-wake-lock=(self), sync-xhr=(self), usb=(self), xr-spatial-tracking=(self)"
	}

	header /console* {
		-Content-Security-Policy
	}

	route /v1* {
		# API (Hasura)
		reverse_proxy localhost:8080 {
			header_up -X-Hasura-Role
		}
	}

	route /v2* {
		# API (Hasura)
		reverse_proxy localhost:8080 {
			header_up -X-Hasura-Role
		}
	}

	route /console* {
		# Admin panel (Hasura)
		reverse_proxy localhost:8080 {
			header_up -X-Hasura-Role
		}
	}

	route /healthz {
		# Health check (Hasura)
		reverse_proxy localhost:8080 {
			header_up -X-Hasura-Role
		}
	}

	route /auth* {
		# Authentication server (Express.js)
		reverse_proxy localhost:3001 {
			header_up -X-Hasura-Role
		}
	}

	route /* {
		# Static files (Client)
		reverse_proxy localhost:3000 {
			header_up -X-Hasura-Role
		}
	}
}
EOF

echo ".env file and Caddyfile generated!"