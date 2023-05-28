FROM hasura/graphql-engine:v2.25.1.cli-migrations-v3

# Files needed to apply the Hasura migrations
COPY metadata hasura-metadata
COPY migrations hasura-migrations

# Set default environmental variables before starting the container
ENV HASURA_GRAPHQL_ENABLE_CONSOLE=true