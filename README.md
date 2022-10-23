# Clean Slate

☀️ Track food without judgment.

Clean Slate is a free calorie tracker and web application. It is designed for people who struggle with:

- Binging
- Self-compassion
- Logging food consistently
- Dieting itself

It can do stuff like:

- Search and log food
- Create custom foods and recipes
- Track exercise
- And so on

It also has a free curriculum, based on science, to help you lose weight.

If you want to learn more about Clean Slate, visit [our website](https://cleanslate.sh) or [watch our demo video](https://youtu.be/DOObodh7V14).

If you want to contribute to Clean Slate, awesome! Read the section `Developing Clean Slate`. Then, submit a pull request! Clean Slate is written in [React](https://reactjs.org) and [TypeScript](https://www.typescriptlang.org), with [Next.js](https://github.com/vercel/next.js) as the framework. It also uses the awesome server [Hasura](https://hasura.io) as the backend, with PostgreSQL as the database.

If you want to host Clean Slate yourself, cool! Read the section `Hosting Clean Slate`. We recommend [Render.com](https://render.com). You will also need to configure Firebase. It is the authentication provider for Clean Slate. It is also free.

> Note: Clean Slate is licensed under the BSL 1.1 license. Under this license, you can do anything except launch a commercial version of Clean Slate. Otherwise, you contribute or use Clean Slate without issue. This license is used by projects such as Sentry.io, MariaDB, CockRoachDB, and so on. You can read more about the license [here](https://open.sentry.io/licensing).

## Configuration

To run Clean Slate locally or in production, you have about five minutes of work.

- Make sure you have [Git](https://git-scm.com/downloads) on your computer.
- Clone down the `git` repository [here](https://github.com/successible/cleanslate).
- Install [Node.js](https://nodejs.org/en/) on your computer.
- Install `pnpm` and the Firebase CLI by running `npm install -g pnpm firebase-tools`.

Next, you need to enable Firebase. That is what provides authentication for Clean Slate:

- Create a new Firebase project.
- Enable Firebase authentication.
- Enable the Google provider in Firebase.
- We provide a Terms of Use and Privacy policy. They are located at `https://XXX/terms` and `https://XXX/privacy`. Replace `XXX` with the domain you host Clean Slate at.
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

- Login with Firebase via `firebase login`.
- Run `firebase deploy` locally to deploy the Firebase functions in `/functions`.

## Developing Clean Slate

> Note: Make sure you have completed the **Configuration** section above.

Run `pnpm run start`. This will spin up these local servers using Docker and various CLIs:

- PostgreSQL: `http://localhost:1276`
- Next.js: `http://localhost:3000`.
- Hasura (Console): `http://localhost:9695`.

## Hosting Clean Slate

> Important: Make sure you have completed the **Configuration** section above.

> Note: If you do not want to use Render.com, that is fine! However, your life will be a bit harder. One, you will need to monitor the `main` branch of the two, relevant repositories for changes. We do not use `git` tags or GitHub releases. Instead, we build everything of the `HEAD` of `main`. Two, you must run the build commands when those changes are detected. The build commands are listed below.

- Deploy a PostgreSQL database on [Render.com](https://render.com)

- Create a `.env` file. Replace `XXX` with your values. Read the comments for guidance.

```bash
# React
CONTACT_EMAIL="XXX"
# Everything with DB_ should come from the Render
DB_HOST="XXX"
DB_NAME="XXX"
DB_PASSWORD="XXX"
DB_PORT="5432"
DB_USER="XXX"
# Exclude https://
ROOT_DOMAIN="mydomain.com"
# Accessed in the Firebase project settings
FIREBASE_CONFIG={"apiKey":"XXX","appId":"XXX","authDomain":"auth.mydomain.com","messagingSenderId":"XXX","projectId":"my-firebase-project","storageBucket":"my-firebase-project.appspot.com"}
# Optional: Not needed if you do not use Honeybadger
HONEYBADGER_API_KEY="XXX"
NODE_ENV="production"
SELF_SIGNED_CERTS_OK="true"

# Hasura
# Can be any long, random string, like `fireboat1234aslas222ZZlsal`
HASURA_GRAPHQL_ADMIN_SECRET="XXX"
HASURA_GRAPHQL_CORS_DOMAIN="https://mydomain.com"
HASURA_GRAPHQL_DATABASE_URL="XXX"
HASURA_GRAPHQL_ENABLE_CONSOLE="true"
# Replace my-firebase-project with your own value
HASURA_GRAPHQL_JWT_SECRET={ "type": "RS256", "audience": "my-firebase-project", "issuer": "https://securetoken.google.com/my-firebase-project", "jwk_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com" }
```

- Deploy Hasura on Render. Use this [public repo](https://github.com/successible/hasura-for-render). Add the Hasura section of your `.env` one by one as environmental variables. Do not add any of them as a file. Make sure Auto-Deploy is enabled.

- Deploy the React static site on Render. Use this [public repo](https://github.com/successible/cleanslate). Use `pnpm run build` as the build command. Add the React section of your `.env` one by one as environmental variables. Also include `HASURA_GRAPHQL_ADMIN_SECRET`. Do not add any of them as a file. Make sure Auto-Deploy is enabled.

Finally, add the following HTTP headers to the React static site. This is required for security. Do not forget to replace `mydomain.com` with your domain!

```
/*, Strict-Transport-Security, max-age=31536000; includeSubDomains; preload
/*, X-Frame-Options, deny
/*, X-XSS-Protection, 1; mode=block
/*, X-Content-Type-Options, nosniff
/*, Referrer-Policy, strict-origin
/*, Content-Security-Policy, default-src 'self' *.mydomain.com blob: data:; script-src 'self' *.mydomain.com https://apis.google.com https://www.google.com https://www.gstatic.com; style-src 'self' *.mydomain.com 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self' *.mydomain.com wss://api.mydomain.com/v1/graphql https://api.honeybadger.io https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://apis.google.com; frame-src 'self' *.mydomain.com https://clean-slate-sila-llc.firebaseapp.com https://www.google.com https://player.vimeo.com; img-src 'self' *.mydomain.com https://www.gstatic.com data:; font-src 'self' *.mydomain.com https://fonts.gstatic.com https://fonts.googleapis.com
```
