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
- Scan barcodes
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

If you want to see what Clean Slate looks on a mobile device or share it with a friend, do this:

- Install `nginx`, `ngrok`, and `mkcert`. The first is to provide HTTPS for Next.js and Hasura. The second is to provide the actual proxy. The third is to create self-signed cert that is recognized by the browser. If you're running Linux or Mac, you can install all three via [Homebrew](https://brew.sh/). Just install `homebrew` first, and then run `brew install nginx ngrok mckert`.

- Open one terminal and run `ngrok http 443`. It will output a subdomain like this. `40e7-73-75-45-179.ngrok.io`.

- Navigate to the Authentication settings in your Firebase project. Add that subdomain as an authorized domain. Remove this domain when you are done with the proxy for the day.

- Finally, open a second terminal and run `pnpm run proxy`. You will be prompted for the subdomain. Provide it. Once the command has finished, you should be able to access Clean Slate on all your devices on the subdomain.

## Hosting Clean Slate

> Important: Make sure you have completed the **Configuration** section above.

> Note: If you do not want to use Render.com, that is fine! However, your life will be a bit harder. One, you will need to monitor the `main` branch of the two, relevant repositories for changes. We do not use `git` tags or GitHub releases. Instead, we build everything of the `HEAD` of `main`. Two, you must run the build commands when those changes are detected. The build command for React is `pnpm run build`. This build command for Hasura is building the image from the `Dockerfile` and starting it.

- Deploy a PostgreSQL database on [Render.com](https://render.com)

- Create a `.env` file. Replace `XXX` with your values. Read the comments for guidance.

```bash
# React #
#########

# If the values are prefixed with NEXT_PUBLIC, they exposed to the client

NEXT_PUBLIC_CONTACT_EMAIL="XXX"
NEXT_PUBLIC_ROOT_DOMAIN="mydomain.com" # Exclude https://
NEXT_PUBLIC_HONEYBADGER_API_KEY="XXX" # Optional: Only need if you use Honeybadger

# By default Login with Google should be enabled and Login with Apple should be disabled
# That is because Apple requires an Apple Developer Account, which costs $99 per year
# By contrast, Google is free and easy to setup automatically with Firebase

NEXT_PUBLIC_LOGIN_WITH_GOOGLE="true"
NEXT_PUBLIC_LOGIN_WITH_APPLE="false"

# Accessed in the Firebase project settings
# Be sure to replace these placeholder values with your own values

NEXT_PUBLIC_FIREBASE_CONFIG={"apiKey":"XXX","appId":"XXX","authDomain":"auth.mydomain.com","messagingSenderId":"XXX","projectId":"XXX","storageBucket":"XXX.appspot.com"}

# These values are NOT exposed to the client
# They are only used during the build process on pnpm build to apply database migrations

DB_HOST="XXX"
DB_NAME="XXX"
DB_PASSWORD="XXX"
DB_PORT="5432"
DB_USER="XXX"
SELF_SIGNED_CERTS_OK="true"


# Hasura #
##########

# Can be any long, random string, like `fireboat1234aslas222ZZlsal`
HASURA_GRAPHQL_ADMIN_SECRET="XXX"
HASURA_GRAPHQL_CORS_DOMAIN="https://mydomain.com"
HASURA_GRAPHQL_DATABASE_URL="XXX"
HASURA_GRAPHQL_ENABLE_CONSOLE="true"
# Replace my-firebase-project with your own value
HASURA_GRAPHQL_JWT_SECRET={ "type": "RS256", "audience": "my-firebase-project", "issuer": "https://securetoken.google.com/my-firebase-project", "jwk_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com" }
```

- Deploy Hasura on Render. Use this [public repo](https://github.com/successible/hasura-for-render). Add the Hasura section of your `.env` one by one as environmental variables. Do not add any of them as a file. Make sure Auto-Deploy is enabled. Make sure it is hosted on the subdomain `api` of your domain. For example, `api.tracker.com`

- Deploy the React static site on Render. Use this [public repo](https://github.com/successible/cleanslate). Use `pnpm run build` as the build command. Add the React section of your `.env` one by one as environmental variables. Also include `HASURA_GRAPHQL_ADMIN_SECRET`. Do not add any of them as a file. Make sure Auto-Deploy is enabled. Make sure it is hosted on the root of your domain. For example, `tracker.com`.

Finally, add the following HTTP headers to the React static site. This is required for security. Do not forget to replace `mydomain.com` with your domain!

```
/*, Strict-Transport-Security, max-age=31536000; includeSubDomains; preload
/*, X-Frame-Options, deny
/*, X-XSS-Protection, 1; mode=block
/*, X-Content-Type-Options, nosniff
/*, Referrer-Policy, strict-origin
/*, Content-Security-Policy, default-src 'self' *.mydomain.com blob: data:; script-src 'self' 'wasm-unsafe-eval' https://apis.google.com; base-uri 'self'; style-src 'self' *.mydomain.com 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self' *.mydomain.com wss://api.mydomain.com/v1/graphql https://api.honeybadger.io https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://apis.google.com https://world.openfoodfacts.org; frame-src 'self' *.mydomain.com https://clean-slate-sila-llc.firebaseapp.com https://www.google.com https://player.vimeo.com; img-src 'self' *.mydomain.com https://www.gstatic.com data:; font-src 'self' *.mydomain.com https://fonts.gstatic.com https://fonts.googleapis.com; object-src 'none';
```
