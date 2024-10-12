#!/bin/bash

# Pull down any new updates
git pull origin main

# Set the environmental variables
export $(xargs < .env)
export NEXT_PUBLIC_VERSION=$(git rev-parse --short HEAD)
if [ "$NEXT_PUBLIC_USE_FIREBASE" == "true" ]; then
    export PULL_POLICY="build"
fi

# Build the containers and run them with Docker Compose
COMPOSE_FILE=docker-compose.yml
docker compose -f $COMPOSE_FILE build
docker compose -f $COMPOSE_FILE down --remove-orphans -t=0
docker compose -f $COMPOSE_FILE up -d

# Start the reverse proxy, assuming the proxy is caddy
sudo caddy stop
sudo caddy start
