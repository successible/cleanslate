#!/bin/bash

if [[ $CI != "true" ]]; then

echo "=> Kill the local version of Clean Slate..."
bash kill.sh

export NEXT_PUBLIC_VERSION="XXX"
export NEXT_PUBLIC_HASURA_DOMAIN="localhost"
export NODE_TLS_REJECT_UNAUTHORIZED=0

if [ "$FIREBASE" != "true" ]; then
  export NEXT_PUBLIC_FIREBASE_CONFIG='{}'
  export NEXT_PUBLIC_LOGIN_WITH_APPLE='no'
  export NEXT_PUBLIC_LOGIN_WITH_FACEBOOK='no'
  export NEXT_PUBLIC_LOGIN_WITH_GITHUB='no'
  export NEXT_PUBLIC_LOGIN_WITH_GOOGLE='no'
  export NEXT_PUBLIC_REACT_SENTRY_DSN=''
  export NEXT_PUBLIC_USE_FIREBASE='false'
  export HASURA_GRAPHQL_JWT_SECRET='{ "type": "HS256", "key": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }'
  export JWT_SIGNING_SECRET="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
fi

docker compose -f docker-compose.yml down -t 0 --remove-orphans

fi

echo "=> Configure the local machine"

if [[ $CI != "true" ]]; then

  export DB_HOST="127.0.0.1"
  export DB_NAME="postgres"
  export DB_PASSWORD="password"
  export DB_PORT="1270"
  export DB_USER="postgres"
  export HASURA_CONSOLE_PORT='9695'
  export HASURA_GRAPHQL_ADMIN_SECRET='secret'
  export HASURA_GRAPHQL_DATABASE_URL="postgres://postgres:password@database:5432/postgres"
  export NEXT_PUBLIC_LOGIN_WITH_APPLE="true"
  export NEXT_PUBLIC_LOGIN_WITH_GOOGLE="true"
  export NEXT_PUBLIC_LOGIN_WITH_GITHUB="true"
  export NEXT_PUBLIC_LOGIN_WITH_FACEBOOK="true"
  export NEXT_PUBLIC_LEGAL_LINK="XXX"
  export NODE_ENV="development"
  

  if [[ $FIREBASE == "true" ]]; then

    abspath() {                                               
      cd "$(dirname "$1")"
      printf "%s/%s\n" "$(pwd)" "$(basename "$1")"
      cd "$OLDPWD"
    }

    export NEXT_PUBLIC_USE_FIREBASE="true"
    export FIREBASE_PROJECT_ID=$(jq -r .projectId firebase-config.json)
    export NEXT_PUBLIC_FIREBASE_CONFIG=$(jq . firebase-config.json)
    HASURA_GRAPHQL_JWT_SECRET='{ "type": "RS256", "audience": "%s", "issuer": "%s", "jwk_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com" }'
    export HASURA_GRAPHQL_JWT_SECRET=$(printf "$HASURA_GRAPHQL_JWT_SECRET" $FIREBASE_PROJECT_ID https://securetoken.google.com/$FIREBASE_PROJECT_ID)

  fi

 
  echo "=> Install the dependencies..."
  if type brew >/dev/null 2>&1
  then
    brew bundle
  fi

  echo "=> Spin up PostgreSQL and Hasura..."
  docker compose -f docker-compose-dev.yml down -v --remove-orphans -t 0
  docker compose -f docker-compose-dev.yml pull && docker compose -f docker-compose-dev.yml up -d

  echo "=> Wait for five seconds for Hasura to get ready..."
  sleep 5;

  echo "=> Run migrations with Hasura..."
  node migrate.js

  hasura console --no-browser --admin-secret 'secret' &
  (cd src && ((npx tsc --watch --preserveWatchOutput) & (npx tsc -p tsconfig-server.json --watch --preserveWatchOutput))) &

fi

# Start the server!

(cd src && ((npx next dev --webpack) & (npx nodemon server.js))) & sleep 5 
sudo caddy start -c Caddyfile.dev --adapter caddyfile