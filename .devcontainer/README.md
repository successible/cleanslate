# Dev Container

## Setup

Note: if you're using podman, you need to expose the docker socket. This can be done using podman desktop or manually with 

```shell
systemctl --user enable --now podman.socket
# Create compatibility link
sudo ln -sf \
  "$XDG_RUNTIME_DIR/podman/podman.sock" \
  /var/run/docker.sock
```
