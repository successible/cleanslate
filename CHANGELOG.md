# CHANGELOG

New versions of Clean Slate are deployed off the HEAD of the main branch. Unless specified here, every commit on main is NOT a breaking change for self-hosters. For every commit on main that is a breaking change, we will state the commit hash, the date, and the migration steps.

## 2023-10-01 - b1d904c

- Moved from PostgreSQL 15 to 16 in docker-compose.yml. Upgrade your PostgreSQL database or volume accordingly.

## 2023-10-08 - 7761241

- Moved to the self-hoster providing the reverse proxy. That way, the self-hoster can use any reverse proxy they want. For example, Caddy. We have outlined the new deployment instructions in the README.md.
