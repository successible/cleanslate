FROM hasura/graphql-engine:v2.25.1.cli-migrations-v3

# Files needed to apply the Hasura migrations
COPY metadata hasura-metadata
COPY migrations hasura-migrations

# Set default environmental variables before starting the container
ENV HASURA_GRAPHQL_ENABLE_CONSOLE=true
ENV PORT 8080
ENV HASURA_GRAPHQL_JWT_SECRET='{ "type": "HS256", "key": "d374e7c8-912c-4871-bac2-7dde6afc2b55" }'
