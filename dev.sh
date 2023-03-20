echo "=> Kill the local version of Clean Slate..."

pkill -9 -f "cypress"
pkill -9 -f "Cypress"
pkill -9 -f "hasura console"
pkill -9 -f "next dev"
pkill -9 -f "npm exec tsc --watch"
pkill -9 -f "tsc --watch"

if [[ $CYPRESS == "true" ]]; then

  echo "=> Configure Cypress and the admin user"

  if [[ $CI != "true" ]]; then
      export NEXT_PUBLIC_FIREBASE_CONFIG=$(jq . firebase-config.json); 
      export CYPRESS_TEST_UID=$(jq -r .CYPRESS_TEST_UID env.json); 
      export SERVICE_ACCOUNT=$(jq -r . service-account.json); 
  fi

  npx ts-node src/helpers/loginAsUser.ts

  # These are the custom auth ENV consumed by the application

  export NEXT_PUBLIC_CUSTOM_TOKEN=$(jq -r .NEXT_PUBLIC_CUSTOM_TOKEN secrets.json)
  export NEXT_PUBLIC_PRODUCTION_API_DOMAIN=$(jq -r .NEXT_PUBLIC_PRODUCTION_API_DOMAIN secrets.json)
  export NEXT_PUBLIC_UID=$(jq -r .NEXT_PUBLIC_UID secrets.json)
  export NEXT_PUBLIC_USER=$(jq -r .NEXT_PUBLIC_USER secrets.json)
fi


echo "=> Configure the local machine"

if [[ $CI != "true" ]]; then

  abspath() {                                               
      cd "$(dirname "$1")"
      printf "%s/%s\n" "$(pwd)" "$(basename "$1")"
      cd "$OLDPWD"
  }

  export DB_HOST="127.0.0.1"
  export DB_NAME="postgres"
  export DB_PASSWORD="password"
  export DB_PORT="1276"
  export DB_USER="postgres"
  export FIREBASE_PROJECT_ID=$(jq -r .projectId firebase-config.json)
  export GOOGLE_APPLICATION_CREDENTIALS=$(abspath "firebase-service-account.json")
  export HASURA_GRAPHQL_ADMIN_SECRET='secret'
  export HASURA_GRAPHQL_DATABASE_URL="postgres://postgres:password@database:5432/postgres"
  export NEXT_PUBLIC_FIREBASE_CONFIG=$(jq . firebase-config.json)
  export NEXT_PUBLIC_LOGIN_WITH_APPLE="true"
  export NEXT_PUBLIC_LOGIN_WITH_GOOGLE="true"
  export NEXT_PUBLIC_VERSION="XXX"
  export NODE_ENV="development"

  HASURA_GRAPHQL_JWT_SECRET='{ "type": "RS256", "audience": "%s", "issuer": "%s", "jwk_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com" }'
  export HASURA_GRAPHQL_JWT_SECRET=$(printf "$HASURA_GRAPHQL_JWT_SECRET" $FIREBASE_PROJECT_ID https://securetoken.google.com/$FIREBASE_PROJECT_ID)

  echo "=> Install the dependencies..."
  pnpm install
  cd functions && npm install && cd ..

  echo "=> Spin up PostgreSQL and Hasura..."
  docker-compose down -v --remove-orphans -t 0
  docker-compose pull && docker-compose up -d

  echo "=> Wait for five seconds for Hasura to get ready..."
  sleep 5;

  echo "=> Run migrations with Hasura..."
  node migrate.js

  echo "=> Sync the .dockerignore with the .gitignore"
  cp .gitignore .dockerignore

  npx hasura console --no-browser --admin-secret 'secret' &
  (cd src && (npx tsc --watch --preserveWatchOutput)) &

fi

# Start the erms server!

(cd src && npx next dev) & 


if [[ $CYPRESS == "true" ]]; then

  if [[ $CI == "true" ]]; then
    cd src && npx cypress run --browser chrome
  else
    cd src && npx cypress open &
  fi

fi
