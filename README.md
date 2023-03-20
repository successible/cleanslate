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
- And so on

To learn more, visit [our website](https://cleanslate.sh) or [watch our demo video](https://youtu.be/Ws9ACZewl0E).

## How can I get involved?

If you want to contribute to Clean Slate, awesome! Read the section `Developing Clean Slate`. Then, submit a pull request.

> Note: Clean Slate is written in [React](https://reactjs.org) and [TypeScript](https://www.typescriptlang.org), with [Next.js](https://github.com/vercel/next.js) as the framework. It uses [Hasura](https://hasura.io) as the backend and [PostgreSQL](https://www.postgresql.org) as the database.

If you want to host Clean Slate yourself, read the section `Hosting Clean Slate`. We recommend [Render.com](https://render.com), but any hosting provider will do. You will also need to configure [Firebase](https://firebase.google.com). It is the (free) authentication provider for Clean Slate.

> Note: Clean Slate is licensed under the BSL 1.1 license. The license is quite permissive. You can view the code, contribute to Clean Slate, or even host it yourself. You just cannot launch a commercial version of Clean Slate. This license is used by projects such as Sentry.io and MariaDB. You can read more about the license [here](https://open.sentry.io/licensing).

## Configuration

To run Clean Slate locally or in production, you have about five minutes of setup to do.

- Make sure you have [Git](https://git-scm.com/downloads) on your computer.
- Fork and clone down the `git` repository [here](https://github.com/successible/cleanslate).
- Install [Node.js (LTS)](https://nodejs.org/en/).
- Install [jq](https://stedolan.github.io/jq/download/).
- Install the `Firebase CLI` by running `npm install firebase-tools`.

Next, you need to enable Firebase. This is the authentication provider for Clean Slate:

- Create a new Firebase project.
- Enable Firebase authentication.
- Enable the Google provider in Firebase.
- Create your `.firebaserc` in the root with the following content. Example:

```json
{
  "projects": {
    "default": "your-firebase-project-name"
  }
}
```

- Create a `firebase-config.json` filled with the content of `firebaseConfig`. You can find that on your project settings page on Firebase.

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

- Create a `env.json` filled with the following content.

```json
{
  // CYPRESS_TEST_UID is the UID of the Firebase user you want to test with
  // https://www.npmjs.com/package/cypress-firebase
  "CYPRESS_TEST_UID": "XXX"
}
```

- Login with Firebase via `firebase login`.
- Run `firebase deploy` locally to deploy the Firebase functions in `/functions`.

## Developing it locally

> Note: Make sure you have completed the **Configuration** section above.

Run `npm run dev`. This will spin up these local servers using Docker and various CLIs:

- PostgreSQL: `http://localhost:1276`
- Next.js: `http://localhost:3000`.
- Hasura (Console): `http://localhost:9695`.

## Previewing it locally

If you want to see what Clean Slate looks like on a mobile device (very optional), do this:

- Install `nginx`, `ngrok`, and `mkcert`.

> Note: The first is to provide HTTPS for Next.js and Hasura. The second is to provide the actual proxy. The third is to create self-signed cert that is recognized by the browser. If you are running Linux or Mac, you can install all three via [Homebrew](https://brew.sh/). Just install `homebrew` first, and then run `brew install nginx ngrok mckert`.

- Open one terminal and run `ngrok http 443`. It will output a subdomain like this. `40e7-73-75-45-179.ngrok.io`.

- Navigate to the Authentication settings in your Firebase project. Add that subdomain as an authorized domain. Remove this domain when you are done with the proxy for the day.

- Finally, open a second terminal and run `npm run proxy`. You will be prompted for the subdomain. Provide it. Once the command has finished, you should be able to access Clean Slate on all your devices on the subdomain.

## Testing it via GitHub Actions

- Add the following as repository secrets to your GitHub repository:

  - `CYPRESS_TEST_UID`. The `uid` of the Firebase user you want to test with.
  - `HASURA_GRAPHQL_JWT_SECRET`. Described below.
  - `NEXT_PUBLIC_FIREBASE_CONFIG`: The contents of `firebase-config.json`.
  - `SERVICE_ACCOUNT`. The contents of `service-account.json`.

## Hosting it yourself

Hosting Clean Slate yourself is easy! It is just four components:

- Static client, powered by React
- GraphQL server, powered by Hasura
- Database, powered by PostgreSQL
- Authentication, powered by Firebase

The first three components can be deployed anywhere. The instructions below are written using Render.com, but you can use any host. It will just be a bit more work, as explained by the note below.

> Note: If you do not want to use Render.com, your life will be a bit harder. One, you will need to monitor the `main` branch of the two, relevant repositories for changes. We do not use `git` tags or GitHub releases. Instead, we build everything off the `HEAD` of `main`. Two, you must run the build commands when those changes are detected. The build command for React is `npm run build`. This build command for Hasura is building the image from the `Dockerfile` and starting it.

Here are the instructions for deploying on Render.com:

1. Make sure you have completed the **Configuration** section above. This will configure your Firebase project and the relevant Firebase function.

> Note: When configuring a social login, you will need to provide a Terms of Use and Privacy Policy. We provide these at `https://XXX/terms` and `https://XXX/privacy`. `XXX` is the domain you will host Clean Slate at.

1. Deploy a PostgreSQL database on [Render.com](https://render.com). It can be the smallest, paid size. We recommend the newest version.

2. Create two text files, `react.txt` and `hasura.txt` on your computer. Replace `XXX` with your values. Read the comments for guidance.

```bash
# react.txt #

# These are to configure the React client
# If the values are prefixed with NEXT_PUBLIC, they are exposed to the client

NEXT_PUBLIC_CONTACT_EMAIL="XXX"
NEXT_PUBLIC_ROOT_DOMAIN="mydomain.com" # Exclude https://
NEXT_PUBLIC_REACT_SENTRY_DSN="XXX" # Optional: Only need if you want to use Sentry to capture errors

# By default Login with Google should be enabled and Login with Apple should be disabled
# That is because Apple requires an Apple Developer Account, which costs $99 per year
# By contrast, Google is free and easy to setup automatically with Firebase

NEXT_PUBLIC_LOGIN_WITH_GOOGLE="true"
NEXT_PUBLIC_LOGIN_WITH_APPLE="false"

# Accessed in the Firebase project settings
# Be sure to replace these placeholder values with your own values

NEXT_PUBLIC_FIREBASE_CONFIG={"apiKey":"XXX","appId":"XXX","authDomain":"auth.mydomain.com","messagingSenderId":"XXX","projectId":"XXX","storageBucket":"XXX.appspot.com"}
```

```bash
# hasura.txt #

# These are for the migrations

DOMAIN="XXX"
DB_HOST="XXX"
DB_NAME="XXX"
DB_PASSWORD="XXX"
DB_PORT="5432"
DB_USER="XXX"
SELF_SIGNED_CERTS_OK="true"

# These are to configure Hasura

# Can be any long, random string, like `fireboat1234aslas222ZZlsal`
HASURA_GRAPHQL_ADMIN_SECRET="XXX"
HASURA_GRAPHQL_CORS_DOMAIN="https://mydomain.com, http://localhost:3000"
HASURA_GRAPHQL_DATABASE_URL="XXX"
HASURA_GRAPHQL_ENABLE_CONSOLE="true"
# Replace my-firebase-project with your own value
HASURA_GRAPHQL_JWT_SECRET={ "type": "RS256", "audience": "my-firebase-project", "issuer": "https://securetoken.google.com/my-firebase-project", "jwk_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com" }
```

Now it is time to deploy your client and server!

4. Deploy Hasura on Render. Use this [public repo](https://github.com/successible/hasura-for-render). Add the values of `hasura.txt` as environmental variables. Make sure Auto-Deploy is enabled. Make sure it is hosted on the subdomain `api` of your domain. For example, `api.mydomain.com`.

5. Deploy the React static site on Render. Use this [public repo](https://github.com/successible/cleanslate). Use `npm run build` as the build command. Add the values of `react.txt` as environmental variables. Make sure Auto-Deploy is enabled. Make sure the static site is hosted on the root of your domain. For example, `mydomain.com`.

6. Finally, add the following HTTP headers to the React static site. This is required for security. Do not forget to replace `mydomain.com` and `https://myfirebase.com` with your own values!

```
/*, Strict-Transport-Security, max-age=31536000; includeSubDomains; preload
/*, X-Frame-Options, deny
/*, X-XSS-Protection, 1; mode=block
/*, X-Content-Type-Options, nosniff
/*, Referrer-Policy, strict-origin
/*, Content-Security-Policy, default-src 'self' *.mydomain.com blob: data:; script-src 'self' 'wasm-unsafe-eval' https://apis.google.com; base-uri 'self'; worker-src 'self' blob: data:; style-src 'self' *.mydomain.com 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self' *.mydomain.com wss://api.mydomain.com/v1/graphql *.ingest.sentry.io https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://apis.google.com https://world.openfoodfacts.org; frame-src 'self' *.mydomain.com https://myfirebase.com https://www.google.com https://player.vimeo.com; img-src 'self' *.mydomain.com https://www.gstatic.com data:; font-src 'self' *.mydomain.com https://fonts.gstatic.com https://fonts.googleapis.com; object-src 'none';
```
