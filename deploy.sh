#!/bin/bash

# Pull down any new updates
git fetch --tags -f
git pull origin main

# Set the environmental variables
export $(xargs < .env)
export NEXT_PUBLIC_VERSION=$(git rev-parse --short HEAD)
if [ "$NEXT_PUBLIC_USE_FIREBASE" != "true" ]; then
    export NEXT_PUBLIC_FIREBASE_CONFIG='{}'
    export NEXT_PUBLIC_LOGIN_WITH_APPLE='no'
    export NEXT_PUBLIC_LOGIN_WITH_FACEBOOK='no'
    export NEXT_PUBLIC_LOGIN_WITH_GITHUB='no'
    export NEXT_PUBLIC_LOGIN_WITH_GOOGLE='no'
    export NEXT_PUBLIC_REACT_SENTRY_DSN=''
    export NEXT_PUBLIC_USE_FIREBASE='false'
    export HASURA_GRAPHQL_JWT_SECRET='{"type": "HS256", "key": "'"$JWT_SIGNING_SECRET"'"}'
fi
if [ "$NEXT_PUBLIC_USE_FIREBASE" == "true" ]; then
    # This value is unused by Firebase, but it silences the Docker Compose warning
    export JWT_SIGNING_SECRET=$(uuidgen)
fi


if [ -n "$COMPOSE_FILE" ]; then
  echo "Deploying with file: $COMPOSE_FILE"
else
  COMPOSE_FILE=docker-compose.yml
  echo "Deploying with file: $COMPOSE_FILE"
fi

docker compose -f $COMPOSE_FILE build
docker compose -f $COMPOSE_FILE down --remove-orphans -t=0
docker compose -f $COMPOSE_FILE up -d

sudo caddy stop
sudo caddy start
