#!/bin/sh
set -e

if command -v docker >/dev/null 2>&1; then
    docker network create cleanslate 2>/dev/null || true
elif command -v podman >/dev/null 2>&1; then
    podman network create cleanslate 2>/dev/null || true
fi
