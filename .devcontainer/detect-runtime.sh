#!/usr/bin/env bash

if [ -S /var/run/docker.sock ]; then
    export CONTAINER_SOCKET=/var/run/docker.sock
    echo "Docker socket detected"
    exit 0
fi

if [ -n "${XDG_RUNTIME_DIR:-}" ] &&
   [ -S "${XDG_RUNTIME_DIR}/podman/podman.sock" ]; then
    export CONTAINER_SOCKET="${XDG_RUNTIME_DIR}/podman/podman.sock"
    echo "Podman socket detected"
    exit 0
fi

echo "No Docker or Podman socket found"
echo "Please configure a container runtime"
exit 1
