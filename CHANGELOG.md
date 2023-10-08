# CHANGELOG

New versions of Clean Slate are deployed off the HEAD of the `main` branch. Unless specified here, every commit on main is not breaking for a self-hoster. For every commit on `main` that is a breaking change, we will state the following:

- The date of commit and the hash
- Steps to migrate

## 2023-10-01 - b1d904c

- Bumped PostgreSQL major versions from 15 to 16 in `docker-compose.yml`. Upgrade your PostgreSQL database or volume accordingly.

## 2023-10-08 - 7761241

- Moved to the self-hoster providing the reverse proxy themselves. That way, they can use any reverse proxy they want. For example, Caddy. We have outlined the new deployment instructions in the README.md.
