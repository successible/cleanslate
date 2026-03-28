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

read -p "Enter DOCKER_HOST_IP [127.0.0.1]: " DOCKER_HOST_IP
DOCKER_HOST_IP=${DOCKER_HOST_IP:-127.0.0.1}

# Prompt for the domain without default, required input
read -p "Enter the DOMAIN of your instance. Do not include the https://: " DOMAIN
if [ -z "$DOMAIN" ]; then
  echo "Error: DOMAIN is required."
  exit 1
fi

# OIDC configuration (optional)
read -p "Enable OIDC authentication? [no]: " USE_OIDC
USE_OIDC=${USE_OIDC:-no}

if [ "$USE_OIDC" = "yes" ]; then
  read -p "Enter OIDC_ISSUER_URL: " OIDC_ISSUER_URL
  if [ -z "$OIDC_ISSUER_URL" ]; then
    echo "Error: OIDC_ISSUER_URL is required when OIDC is enabled."
    exit 1
  fi
  read -p "Enter OIDC_CLIENT_ID: " OIDC_CLIENT_ID
  if [ -z "$OIDC_CLIENT_ID" ]; then
    echo "Error: OIDC_CLIENT_ID is required when OIDC is enabled."
    exit 1
  fi
  read -p "Enter OIDC_CLIENT_SECRET: " OIDC_CLIENT_SECRET
  read -p "Enter OIDC_REDIRECT_URI [https://$DOMAIN/auth/oidc/callback]: " OIDC_REDIRECT_URI
  OIDC_REDIRECT_URI=${OIDC_REDIRECT_URI:-https://$DOMAIN/auth/oidc/callback}
  read -p "Enter OIDC_SCOPES [openid profile email]: " OIDC_SCOPES
  OIDC_SCOPES=${OIDC_SCOPES:-openid profile email}
  read -p "Enter OIDC_ID_CLAIM [sub]: " OIDC_ID_CLAIM
  OIDC_ID_CLAIM=${OIDC_ID_CLAIM:-sub}
  read -p "Enter OIDC login button label [Login with SSO]: " OIDC_BUTTON_LABEL
  OIDC_BUTTON_LABEL=${OIDC_BUTTON_LABEL:-Login with SSO}
fi

# Generate UUIDs
JWT_SECRET=$(uuidgen)
HASURA_ADMIN_SECRET=$(uuidgen)
POSTGRES_PASSWORD=$(uuidgen)

# Write to .env file
cat <<EOF > .env
AUTHENTICATION_SERVER_PORT=$AUTH_PORT
CLIENT_PORT=$CLIENT_PORT
DOCKER_HOST_IP=$DOCKER_HOST_IP
DOMAIN=$DOMAIN
HASURA_GRAPHQL_ADMIN_SECRET=$HASURA_ADMIN_SECRET
HASURA_GRAPHQL_JWT_SECRET='{"type":"HS256","key":"$JWT_SECRET"}'
HASURA_PORT=$HASURA_PORT
JWT_SIGNING_SECRET=$JWT_SECRET
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
POSTGRES_PORT=$POSTGRES_PORT
EOF

if [ "$USE_OIDC" = "yes" ]; then
  cat <<EOF >> .env
NEXT_PUBLIC_USE_OIDC=true
NEXT_PUBLIC_OIDC_BUTTON_LABEL=$OIDC_BUTTON_LABEL
OIDC_ISSUER_URL=$OIDC_ISSUER_URL
OIDC_CLIENT_ID=$OIDC_CLIENT_ID
OIDC_CLIENT_SECRET=$OIDC_CLIENT_SECRET
OIDC_REDIRECT_URI=$OIDC_REDIRECT_URI
OIDC_SCOPES=$OIDC_SCOPES
OIDC_ID_CLAIM=$OIDC_ID_CLAIM
EOF
fi

cat <<EOF > Caddyfile
$DOMAIN {
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
		reverse_proxy localhost:$HASURA_PORT {
			header_up -X-Hasura-Role
		}
	}

	route /v2* {
		# API (Hasura)
		reverse_proxy localhost:$HASURA_PORT {
			header_up -X-Hasura-Role
		}
	}

	route /console* {
		# Admin panel (Hasura)
		reverse_proxy localhost:$HASURA_PORT {
			header_up -X-Hasura-Role
		}
	}

	route /healthz {
		# Health check (Hasura)
		reverse_proxy localhost:$HASURA_PORT {
			header_up -X-Hasura-Role
		}
	}

	route /auth* {
		# Authentication server (Express.js)
		reverse_proxy localhost:$AUTH_PORT {
			header_up -X-Hasura-Role
		}
	}

	route /* {
		# Static files (Client)
		reverse_proxy localhost:$CLIENT_PORT {
			header_up -X-Hasura-Role
		}
	}
}
EOF

echo ".env file and Caddyfile generated!"
