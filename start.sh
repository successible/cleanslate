echo "=> Set environmental variables..."

export NODE_ENV="development"
export NEXT_PUBLIC_VERSION="XXX"
export NEXT_PUBLIC_LOGIN_WITH_GOOGLE="true"
export NEXT_PUBLIC_LOGIN_WITH_APPLE="true"
export DB_HOST="127.0.0.1"
export DB_NAME="postgres"
export DB_PASSWORD="password"
export DB_PORT="1276"
export DB_USER="postgres"
export FIREBASE_PROJECT_ID=$(jq -r .projectId firebase-config.json)
export HASURA_GRAPHQL_ADMIN_SECRET='secret'
HASURA_GRAPHQL_JWT_SECRET='{ "type": "RS256", "audience": "%s", "issuer": "%s", "jwk_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com" }'
export HASURA_GRAPHQL_JWT_SECRET=$(printf "$HASURA_GRAPHQL_JWT_SECRET" $FIREBASE_PROJECT_ID https://securetoken.google.com/$FIREBASE_PROJECT_ID)
export HASURA_GRAPHQL_DATABASE_URL="postgres://postgres:password@database:5432/postgres"

abspath() {                                               
    cd "$(dirname "$1")"
    printf "%s/%s\n" "$(pwd)" "$(basename "$1")"
    cd "$OLDPWD"
}
export GOOGLE_APPLICATION_CREDENTIALS=$(abspath "firebase-service-account.json")

echo "=> Install the dependencies..."
pnpm install
cd functions && npm install && cd ..

echo "=> Kill any running local version of Clean Slate..."
pkill -9 -f "hasura console"
pkill -9 -f "next dev"
npx kill-port 3000

echo "=> Spin up PostgreSQL and Hasura..."
docker-compose down -v --remove-orphans -t 0
docker-compose pull && docker-compose up -d

echo "=> Wait for five seconds for Hasura to get ready..."
sleep 5;

echo "=> Run migrations with Hasura..."
node migrate.js

echo "=> Sync the .dockerignore with the .gitignore"
cp .gitignore .dockerignore

echo "=> Start the Hasura and Next.js server..."
npx hasura console --no-browser --admin-secret 'secret' & 
(cd src && (npx next dev & npx tsc --watch --preserveWatchOutput)) &
