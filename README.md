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

> Note: You do not have to host Clean Slate to use it. We maintain an instance at [cleanslate.sh](https://cleanslate.sh). It offers free accounts with social login (e.g. Login with Google).

1. Create a PostgreSQL database. We recommend [Render.com](https://render.com/) because it fairly priced and very convenient. However, another host, such as Digital Ocean or Heroku, will do.

2. Create a static website that builds from `main` of the public [Clean Slate repo](https://github.com/successible/cleanslate). We recommend [CloudFlare Pages](https://pages.cloudflare.com/) because it is free, fast, and easy to link. However, Netlify, Render, and Vercel will also do. Make sure to add the following environmental variables.

```bash
# The domain you are hosting the web service (Hasura) at. Example: api.mydomain.com
NEXT_PUBLIC_HASURA_DOMAIN=XXX

# Your email for the privacy policy for your instance. Example: contact@example.com
NEXT_PUBLIC_CONTACT_EMAIL=XXX
```

1. Create a web service that builds from `main` of the public [Clean Slate repo](https://github.com/successible/cleanslate). Configure it for Docker and to deploy the `./Dockerfile`. We recommend Render.com because it fairly priced and automates this process. Make sure to add the following environmental variables.

```bash
# The domain you are hosting the web service (Hasura) at. Example: api.mydomain.com
HASURA_DOMAIN=XXX

# Make this a very long, random string
HASURA_GRAPHQL_ADMIN_SECRET=XXX

# Set CORS. Make sure to include https://
HASURA_GRAPHQL_CORS_DOMAIN=https://localhost

# The credentials to access PostgreSQL. Replace the contents of <> with your own values
HASURA_GRAPHQL_DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
```

4. Go to the domain of your newly deployed web service (Step #3). Log in with your `HASURA_GRAPHQL_ADMIN_SECRET` defined in `.env`. Click `Data`, then `public`, then `profiles`, then `Insert Row`. On this screen, enter no input. Instead, click `Save`. This will create a new Profile. Click to `Browse Rows`. Take note of the `authId` of the row you just made. That is your (very long) credential to log in.

5. You can now log in at your static website (Step #2) with that credential.

> Note: Clean Slate was built around delegating authentication to Firebase. Firebase is a very secure authentication service maintained by Google. It is our default recommendation for any instance of Clean Slate with more than a few users. Consult the appendix for how to set up Firebase with Clean Slate. However, Firebase is too complex for the most common hosting scenario. That scenario is a privacy conscious user who wants to host Clean Slate for individual or family use. We created the default authentication system (`authId`) was created for them. The `authId` system is incredibly simple. There is no username or password. Clean Slate does not even require a server that can send email. Instead, Clean Slate uses very long tokens (uuid4) stored as plain text in the database. Because each token is very long and generated randomly, they are very secure. And if you ever need to change the value of the `authId`, you can just use the Hasura Console. If you would rather not use the `authId` system, you will need to use Firebase instead.

## How to contribute to Clean Slate

Run Clean Slate locally, make changes, and then submit a pull request on GitHub.

> Note: Clean Slate is written in [React](https://reactjs.org) and [TypeScript](https://www.typescriptlang.org), with [Next.js](https://github.com/vercel/next.js) as the framework. It uses [Hasura](https://hasura.io) as the backend and [PostgreSQL](https://www.postgresql.org) as the database.

Here's how to run Clean Slate locally:

- Install [Git](https://git-scm.com/downloads), [Docker Desktop](https://www.docker.com/products/docker-desktop/), [Hasura CLI](https://hasura.io/docs/latest/hasura-cli/commands/hasura_console/), and [Node.js (LTS)](https://nodejs.org/en/). Make sure Docker Desktop is running.

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

These environment values are added to the web service (Step #3). Make sure to replace `my-firebase-project` with the name of your own project.

```bash
HASURA_GRAPHQL_JWT_SECRET={ "type": "RS256", "audience": "my-firebase-project", "issuer": "https://securetoken.google.com/my-firebase-project", "jwk_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com" }
```
