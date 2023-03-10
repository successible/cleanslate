#!/bin/bash

node migrate.js

graphql-engine serve --server-port $PORT --database-url $HASURA_GRAPHQL_DATABASE_URL