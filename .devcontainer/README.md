# Dev Container

## Setup

### Podman

If you're using podman, make sure you have configured [docker compatibility](https://podman-desktop.io/docs/migrating-from-docker/managing-docker-compatibility).

Additionally, make sure that your podman machine has at least 8 Gb of memory

### IDE

When opening your IDE, it should auto detect that you can open it in a dev container, in which point it will start creation of the container.

The initialization process will create the `cleanslate` network for the containers.

## Use

When in the container, use the specific devcontainer script `start-dev.sh`.

```shell
./.devcontainer/start-dev.sh`
```

This is a dev container specific implementation of `dev.sh`.

After successful execution of `start-dev.sh`, you can access at the client at [https://localhost:8443].
