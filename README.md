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

> Note: You do not have to host Clean Slate to use it. We maintain an instance at `cleanslate.sh`. It offers free accounts with social login (e.g. Login with Google).

Clean Slate is just a Docker image that needs a PostgreSQL database. Hence, hosting is simple!

Create a `.env` on your server. Replace the values of `XXX` and `mydomain.com` with your own.

1. Install Docker on your server, [like so](https://www.digitalocean.com/community/tutorial_collections/how-to-install-and-use-docker)

2. Install PostgreSQL on your server, [like so](https://www.digitalocean.com/community/tutorial_collections/how-to-install-and-use-postgresql).

3. Create a `.env` file on your server. Replace values of `XXX` and `yourdomain.com` with your own.

```bash
# Your email for the privacy policy for your instance
NEXT_PUBLIC_CONTACT_EMAIL=XXX

# Make this a very long, random string
HASURA_GRAPHQL_ADMIN_SECRET=XXX

# Set CORS. Make sure to include https://
HASURA_GRAPHQL_CORS_DOMAIN=https://localhost

# The credentials to access PostgreSQL
HASURA_GRAPHQL_DATABASE_URL=postgres://postgres:password@host.docker.internal:1276/postgres
```

4. Pull down the version of the Docker image you want to run and start Clean Slate. These commands will take less than 30 seconds to complete. You'll know they have worked if you see `INFO exited: hasura (exit status 0; expected)` in the terminal.

```bash
docker pull successible/cleanslate:latest;
docker stop cleanslate; docker rm cleanslate;
docker run -p 1000:80 --env-file .env --name=cleanslate cleanslate:latest;
```

5. Clean Slate will now be running on port `1000` on your server. Now, you will need to set up a reverse proxy like `nginx` with `ssl` in front of Clean Slate, [like so](https://docs.gitea.com/administration/reverse-proxies). That is because Clean Slate can only be used over `https` over your domain.

6. Once #5 is done, you need to create an account for your instance of Clean Slate. Go to https://<yourdomain.com>/console to access the Hasura Console login page. The console is a convenient admin interface to read and change all data in Clean Slate.

7. Log in with your `HASURA_GRAPHQL_ADMIN_SECRET` defined in `.env`. Click `Data`, then `public`, then `profiles`, then `Insert Row`. On this screen, enter no input. Instead, click `Save`. This will create a new Profile. Click to `Browse Rows`. Take note of the `authId` of the row you just made. That is your (very long) credential to log in.

8. You can now log in at https://<yourdomain.com> with that credential.

> Note: Clean Slate was built around delegating authentication to Firebase. Firebase is a very secure authentication service maintained by Google. It is our default recommendation for any instance of Clean Slate with more than a few users. Consult the appendix for how to set up Firebase with Clean Slate. However, Firebase is too complex for the most common hosting scenario. That scenario is a privacy conscious user who wants to host Clean Slate for individual or family use. We created the default authentication system (`authId`) was created for them. The `authId` system is incredibly simple. There is no username or password. Clean Slate does not even require a server that can send email. Instead, Clean Slate uses very long tokens (uuid4) stored as plain text in the database. Because each token is very long and generated randomly, they are very secure. And if you ever need to change the value of the `authId`, you can just use the Hasura Console. If you would rather not use the `authId` system, you will need to use Firebase instead.

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
