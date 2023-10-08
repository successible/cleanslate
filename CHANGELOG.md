# CHANGELOG

New versions of Clean Slate are deployed off the HEAD of the main branch. Every commit is NOT a breaking change, unless specified here. For every commit that is a breaking change, we will state the commit hash, the date, and the migration steps.

## 2023-10-08 - 7761241

- We have moved from providing the reverse proxy to having the hoster provide the reverse proxy. That way, the hoster can use any reverse proxy they want. For example, Caddy. We have outlined the new deployment instructions in the README.md. 
