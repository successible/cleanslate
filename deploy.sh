#!/bin/bash

# Pull down any new updates
git pull origin main

# Set the environmental variables
# Read this file for an explanation of the value of HASURA_GRAPHQL_JWT_SECRET
# https://github.com/successible/cleanslate/blob/main/src/helpers/getJWT.ts
export HASURA_GRAPHQL_JWT_SECRET='{ "type": "HS256", "key": "d374e7c8-912c-4871-bac2-7dde6afc2b55" }'
export NEXT_PUBLIC_FIREBASE_CONFIG='{}'
export NEXT_PUBLIC_LOGIN_WITH_APPLE='no'
export NEXT_PUBLIC_LOGIN_WITH_FACEBOOK='no'
export NEXT_PUBLIC_LOGIN_WITH_GITHUB='no'
export NEXT_PUBLIC_LOGIN_WITH_GOOGLE='no'
export NEXT_PUBLIC_REACT_SENTRY_DSN=''
export NEXT_PUBLIC_USE_FIREBASE='no'
export $(xargs < .env)
export NEXT_PUBLIC_VERSION=$(git rev-parse --short HEAD)

if [ -n "$COMPOSE_FILE" ]; then
  echo "Deploying with file: $COMPOSE_FILE"
else
  COMPOSE_FILE=docker-compose.yml
  echo "Deploying with file: $COMPOSE_FILE"
fi

docker compose -f $COMPOSE_FILE build
docker compose -f $COMPOSE_FILE down --remove-orphans -t=0
docker compose -f $COMPOSE_FILE up -d

if type caddy >/dev/null 2>&1
then
    caddy stop
    caddy start
fi