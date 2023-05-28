FROM hasura/graphql-engine:v2.25.1.cli-migrations-v3

# Files needed to migrate and run Hasura
COPY metadata hasura-metadata
COPY migrations hasura-migrations

# Set the environmental variables before starting the container
ENV HASURA_GRAPHQL_ENABLE_CONSOLE=true