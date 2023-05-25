# Clean Slate

☀️ Track food without judgment.

## What is Clean Slate?

Clean Slate is a free calorie tracker. It is designed for people who struggle with:

- Binging
- Self-compassion
- Logging food consistently
- Dieting itself

It can do stuff like:

- Search and log food
- Quick add calories and protein
- Create custom foods and recipes
- Scan barcodes
- Track exercise

To learn more, visit [our website](https://cleanslate.sh) or [watch our demo video](https://youtu.be/wCoqpIImNdg).

## How to host Clean Slate

**Work in progress**

Create a `.env` on your server. Replace the values of `XXX` and `mydomain.com` with your own.

```
# Credentials for Next.js

NEXT_PUBLIC_CONTACT_EMAIL="XXX" # Email for the privacy policy for your instance
NEXT_PUBLIC_ROOT_DOMAIN="mydomain.com" # Exclude https://
NEXT_PUBLIC_REACT_SENTRY_DSN="XXX" # Optional: Only need if you want to use Sentry to capture errors

# Credentials for PostgreSQL. Used for migrations.

DOMAIN="XXX"
DB_HOST="XXX"
DB_NAME="XXX"
DB_PASSWORD="XXX"
DB_PORT="5432"
DB_USER="XXX"
SELF_SIGNED_CERTS_OK="true"

# Credentials for Hasura

HASURA_GRAPHQL_ADMIN_SECRET="XXX" # Can be any long, random string
HASURA_GRAPHQL_CORS_DOMAIN="https://mydomain.com, http://localhost:3000"
HASURA_GRAPHQL_DATABASE_URL="XXX"
HASURA_GRAPHQL_ENABLE_CONSOLE="true"
```

## How to contribute to Clean Slate

Run Clean Slate locally, make changes, and then submit a pull request on GitHub.

> Note: Clean Slate is written in [React](https://reactjs.org) and [TypeScript](https://www.typescriptlang.org), with [Next.js](https://github.com/vercel/next.js) as the framework. It uses [Hasura](https://hasura.io) as the backend and [PostgreSQL](https://www.postgresql.org) as the database.

Here's how to run Clean Slate locally:

- Install [Git](https://git-scm.com/downloads), [Docker Desktop](https://www.docker.com/products/docker-desktop/), and [Node.js (LTS)](https://nodejs.org/en/). Make sure Docker Desktop is running.

- Run `npm run dev` after cloning down the repository. Doing so will spin up servers on localhost:

  - PostgreSQL: `http://localhost:1276`
  - Next.js: `http://localhost:3000`.
  - Hasura (Console): `http://localhost:9695`.

- Navigate to `http://localhost:3000` and login with token `cef434cf-17a1-4c99-9974-4f64a3c03f48`.

> Note: Clean Slate is licensed under the BSL 1.1 license. The license is quite permissive. You can view the code, contribute to Clean Slate, or even host it yourself. You just cannot launch a commercial version of Clean Slate. This license is used by projects such as `Sentry.io` and `MariaDB`. You can read more about the license [here](https://open.sentry.io/licensing).

## Appendix

### Using Firebase

Clean Slate can use Firebase as the other authentication provider. Here's how you to configure it:

- Create a new Firebase project.
- Enable Firebase authentication.
- Enable the Google provider in Firebase.
- Create your `.firebaserc` locally in the root with the following content. Example:

```json
{
  "projects": {
    "default": "your-firebase-project-name"
  }
}
```

- Create a `firebase-config.json` locally filled with the content of `firebaseConfig`. You can find that on your Project Settings page on Firebase.

```json
{
  "apiKey": "XXX",
  "appId": "XXX",
  "authDomain": "XXX",
  "messagingSenderId": "XXX",
  "projectId": "XXX",
  "storageBucket": "XXX"
}
```

- Login with Firebase locally via `npx firebase login`.
- Run `npx firebase deploy` to deploy the Firebase functions in `/functions`.

You can now run Firebase locally or in production with these last steps.

Locally:

- Install [jq](https://stedolan.github.io/jq/download/).
- Run `export FIREBASE='true'; npm run dev`

Production:

- Add these values to your `.env` file for your production to Docker.

```
# By default Login with Google should be enabled and Login with Apple should be disabled
# That is because Apple requires an Apple Developer Account, which costs $99 per year
# By contrast, Google is free and easy to setup automatically with Firebase
# GitHub and Facebook are off by default to avoid overwhelming users

NEXT_PUBLIC_USE_FIREBASE="true"
NEXT_PUBLIC_LOGIN_WITH_GOOGLE="true"
NEXT_PUBLIC_LOGIN_WITH_APPLE="false"
NEXT_PUBLIC_LOGIN_WITH_GITHUB="false"
NEXT_PUBLIC_LOGIN_WITH_FACEBOOK="false"

# Accessed in the Firebase project settings
# Be sure to replace these placeholder values with your own values

NEXT_PUBLIC_FIREBASE_CONFIG={"apiKey":"XXX","appId":"XXX","authDomain":"auth.mydomain.com","messagingSenderId":"XXX","projectId":"XXX","storageBucket":"XXX.appspot.com"}

# Replace my-firebase-project with your own value

HASURA_GRAPHQL_JWT_SECRET={ "type": "RS256", "audience": "my-firebase-project", "issuer": "https://securetoken.google.com/my-firebase-project", "jwk_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com" }
```
