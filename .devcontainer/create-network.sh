#!/bin/sh
# Make sure that the "cleanslate" network exists.
# The initializeCommand in devcontainer.json runs this script on the host.
set -eu

if command -v docker >/dev/null 2>&1; then
    engine=docker
elif command -v podman >/dev/null 2>&1; then
    engine=podman
else
    echo "Docker or Podman is necessary." >&2
    exit 1
fi

# Create the network only if the engine cannot find it.
"$engine" network inspect cleanslate >/dev/null 2>&1 ||
    "$engine" network create cleanslate
