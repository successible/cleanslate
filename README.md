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

## Do I need to host Clean Slate to use it?

Nope! We maintain a free instance at [cleanslate.sh](https://cleanslate.sh). It offers free accounts with social login (e.g. Login with Google).

## How is Clean Slate licensed?

Clean Slate is licensed under the BSL 1.1 license. The license is quite permissive. You can view the code, contribute to Clean Slate, or host it yourself. You just cannot launch a commercial version of Clean Slate (i.e. one that makes money). This license is used by projects such as `Sentry.io` and `MariaDB`. You can read more about the license [here](https://open.sentry.io/licensing).

## How do I host Clean Slate?

Hosting Clean Slate is easy. You just need a Linux server with Git, Docker, and Docker Compose installed.

1.  Run `git clone https://github.com/successible/cleanslate` on your server. `cd` inside the newly created folder called `cleanslate`.

2.  Create a `.env` file in the `cleanslate` folder with these variables. Replace `<>` with your values.

```bash
# Required
POSTGRES_PASSWORD=<your-desired-password>
NEXT_PUBLIC_HASURA_DOMAIN=<your-server-domain>
HASURA_GRAPHQL_ADMIN_SECRET=<long-secret-value>
HASURA_GRAPHQL_CORS_DOMAIN=https://<your-server-domain>
```

3.  Run `bash deploy.sh`. This script will build and start the database, client, and server via Docker Compose. The client is what the user will interact with. It runs on `http://localhost:1000`. The server (Hasura) runs on port `8080`. The database (PostgreSQL) runs on ``

4.  On your domain, point a reverse proxy, like Caddy or Nginx, to `http://localhost:1000`. Clean Slate must be served over `https` to function. We recommend Caddy [^1] as the reverse proxy, and have tested Clean Slate with it. Caddy is great because it handles `https` automatically and for free via Let's Encrypt [^2].

5.  Go to the `https://<your-domain>/console`. Log in with your `HASURA_GRAPHQL_ADMIN_SECRET` defined in `.env`. Click `Data`, then `public`, then `profiles`, then `Insert Row`. On this screen, enter no input. Instead, click `Save`. This will create a new Profile. Click to `Browse Rows`. Take note of the `authId` of the row you just made. That is your (very long) credential to log in.

6.  You can now log in to `https://<your-domain>` with that credential!

7.  To deploy the newest version of Clean Slate, run `bash deploy.sh` again. Read `CHANGELOG.md` every time before you deploy to read about any breaking changes.

This section covers the "essentials" on deploying Clean Slate. However, you should also read the appendix for more details.

## How to contribute to Clean Slate

Run Clean Slate locally, make changes, and then submit a pull request on GitHub.

> Note: Clean Slate is written in [React](https://reactjs.org) and [TypeScript](https://www.typescriptlang.org), with [Next.js](https://github.com/vercel/next.js) as the framework. It uses [Hasura](https://hasura.io) as the backend and [PostgreSQL](https://www.postgresql.org) as the database.

Here's how to run Clean Slate locally:

- Install [Git](https://git-scm.com/downloads), [Docker Desktop](https://www.docker.com/products/docker-desktop/), [Hasura CLI](https://hasura.io/docs/latest/hasura-cli/commands/hasura_console/), and [Node.js (LTS)](https://nodejs.org/en/). Make sure Docker Desktop is running.

- Run `npm run dev` after cloning down the repository. This will spin up these servers:

  - PostgreSQL: `http://localhost:1276`
  - Next.js: `http://localhost:3000`.
  - Hasura (Console): `http://localhost:9695`.

- Navigate to `http://localhost:3000` and login with token `22140ebd-0d06-46cd-8d44-aff5cb7e7101`.

> Note: To test the hosting process locally, install `caddy`. Then, run `bash deploy.sh` after creating the `.env` below in your `cleanslate` folder. Then, run `caddy start`. `caddy` will pick up the `Caddyfile` and serve Clean Slate on `https://localhost`.

```bash
# .env for testing the hosting process locally. Do not use in an actual production setting!
POSTGRES_PASSWORD=XXX
NEXT_PUBLIC_HASURA_DOMAIN=localhost
HASURA_GRAPHQL_ADMIN_SECRET=XXX
```

## Appendix

## Handling the database

By default, Clean Slate uses the `postgres` user and `postgres` database in a container. It will also use the most recent, major version of PostgreSQL. Usually within a couple of months of release. The major version used is outlined in the `docker-compose.yml` file used by `deploy.sh`. Hence, when you run `deploy.sh` with an older version of PostgreSQL managed by Docker Compose, you will get an error. Specifically, that your `database files are incompatible with server`. Hence, to get Clean Slate to work, you will be forced to upgrade your database using `pg_upgrade` once a year.

If you do not like either of these behaviors, your best option is to use a custom `docker-compose.yml`. For example, let's say you want to connect to a database not managed by our Docker Compose. Great! Make a copy of our `docker-compose.yml` [^3] and call it `custom.yml`. Remove `database` from the list of services and the `cleanslate` volume. Update `HASURA_GRAPHQL_DATABASE_URL` to point to your database. Finally, run `export COMPOSE_FILE=custom.yml; bash deploy.sh`. All done!

### Handling authentication

Clean Slate was built around delegating authentication to Firebase. Firebase is a very secure authentication service maintained by Google. It is our default recommendation for any instance of Clean Slate with more than a few users. Consult the `Using Firebase` section of the appendix for how to set up Firebase with Clean Slate.

However, Firebase is too complex for the most common hosting scenario. That scenario is a privacy conscious user who wants to host Clean Slate for individual or family use. Hence, our default authentication system, `authId`, works differently.

The `authId` system is incredibly simple. There is no username or password. Clean Slate does not even require a server that can send email. Instead, Clean Slate uses very long tokens (uuid4) stored as plain text in the database. Because each token is very long and generated randomly, they are very secure. And if you ever need to change the value of the `authId`, you can just use the Hasura Console. If you would rather not use the `authId` system, you will need to use Firebase instead.

### Using Firebase

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

Locally (Linux or Mac):

- Install [jq](https://stedolan.github.io/jq/download/)
- Mac only: Install and use GNU [sed](https://formulae.brew.sh/formula/gnu-sed)
- Run `export FIREBASE='true'; npm run dev`

Production (Linux):

- Add the environment values to the correct location.

These environment values are added to the static website (Step #2). Replace `XXX` with your own.

```bash
# This forces Clean Slate to use Firebase over the authId system
NEXT_PUBLIC_USE_FIREBASE="true"

# You can find your project config in your Firebase project settings
NEXT_PUBLIC_FIREBASE_CONFIG={"apiKey":"XXX","appId":"XXX","authDomain":"XXX","messagingSenderId":"XXX","projectId":"XXX","storageBucket":"XXX"}

# Just setting a value as true does not turn on the provider
# See the Firebase documentation for how to configure each provider.
# Google should start as true but that is one click to configure in Firebase
# And you always need one provider enabled. Otherwise, no one can log in.

NEXT_PUBLIC_LOGIN_WITH_GOOGLE="true"
NEXT_PUBLIC_LOGIN_WITH_APPLE="false"
NEXT_PUBLIC_LOGIN_WITH_GITHUB="false"
NEXT_PUBLIC_LOGIN_WITH_FACEBOOK="false"
```

These environment values are added to the web service (Step #3). Replace `XXX` with your Firebase Project ID.

```bash
HASURA_GRAPHQL_JWT_SECRET={ "type": "RS256", "audience": "XXX", "issuer": "https://securetoken.google.com/XXX", "jwk_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com" }
```

[^1]: https://caddyserver.com/docs/getting-started
[^2]: https://letsencrypt.org/
[^3]: https://github.com/successible/cleanslate/blob/main/docker-compose.yml
