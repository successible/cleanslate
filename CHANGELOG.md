# CHANGELOG

New versions of Clean Slate are deployed off the HEAD of the `main` branch. Unless specified here, every commit on main is not breaking for a self-hoster. For every commit on `main` that is a breaking change, we will state the following:

- The date and the hash
- Steps to migrate

## 2023-10-03

- Removed `nginx` from the `Docker.client` in favor of `busybox`. `busybox` does not handle reverse proxying. Hence, that now the domain of your reverse proxy, such as Caddy or Nginx.

## 2023-10-08

- Moved to the self-hoster providing the reverse proxy themselves. That way, they can use any reverse proxy they want. For example, Caddy. We have outlined the new deployment instructions in the README.md.
