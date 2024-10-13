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
- Track meals.

And it works on any device that has a browser.

To learn more, [visit our website](https://cleanslate.sh) or [watch the demo video](https://youtu.be/wCoqpIImNdg).

## Where can I see the updates to Clean Slate?

On our [GitHub Releases](https://github.com/successible/cleanslate/releases) page!

Here, we list all the changes that Clean Slate has gone through in each version. Each version covers the enhancements and the security and bug fixes. Each version also outlines any breaking changes, and the steps to migrate, if any. All of this information is especially important for people who want to host Clean Slate on their own.

## Do I need to host Clean Slate to use it?

You do not!

We maintain a free instance at [cleanslate.sh](https://cleanslate.sh). It offers free accounts with social login via Firebase. For example, "Login with Google". Currently, we support login with Apple, Facebook, GitHub, and Google.

## How is Clean Slate licensed?

Clean Slate is licensed under Apache 2.0 and is open source!

## How do I host Clean Slate?

Hosting Clean Slate is straightforward. You just need a Linux server with Git, Docker, and Docker Compose installed. Make sure to install Docker from the official website [^1]. That is because the Docker bundled with your distribution is likely out of date.

1.  Run `git clone https://github.com/successible/cleanslate` on your server. `cd` inside the newly created folder called `cleanslate`.

2.  Create a `.env` file in the `cleanslate` folder. Replace `NEXT_PUBLIC_HASURA_DOMAIN` with your own domain. Replace `HASURA_GRAPHQL_JWT_SECRET`, `JWT_SIGNING_SECRET`, `HASURA_GRAPHQL_ADMIN_SECRET`, and `POSTGRES_PASSWORD` with your own values. All four of these values are secret and should be kept safe. `HASURA_GRAPHQL_JWT_SECRET` and `JWT_SIGNING_SECRET` are used to create and verify JWTs. The `second-long-secret-value` must be replaced with the same value. And it should be (at least) thirty characters long. As for `HASURA_GRAPHQL_ADMIN_SECRET` and `POSTGRES_PASSWORD`, they are both passwords. The former is to sign in to the Hasura console. The latter is to sign to PostgreSQL, the database used by Clean Slate. Also, if you are using a port that differs `nginx` or `caddy` (Step #3), you must also change the following items. `HASURA_PORT`, `AUTHENTICATION_SERVER_PORT`, and `CLIENT_PORT`. You must change it from `8080`, `3001`, and `3000` to what you want to use. Otherwise, Clean Slate will not work, and you will get an error when you try to sign in.

```bash
AUTHENTICATION_SERVER_PORT=3001
CLIENT_PORT=3000
HASURA_GRAPHQL_ADMIN_SECRET=first-long-secret-value
HASURA_GRAPHQL_JWT_SECRET='{"type":"HS256","key":"second-long-secret-value"}'
HASURA_PORT=8080
JWT_SIGNING_SECRET=second-long-secret-value
NEXT_PUBLIC_HASURA_DOMAIN=your-server-domain
POSTGRES_PASSWORD=third-long-secret-value
```

3.  Have your reverse proxy point to `http://localhost:3000`, `http://localhost:3001`, and `http://localhost:8080`. For example, you could use `Caddy` and the `Caddyfile` below, replacing `XXX` with your own domain. The same goes from `nginx` and the sample `nginx.conf` below. You could also use `apache` or another tool that can act as a reverse proxy. However, Clean Slate must be served over `https`. Otherwise, it will not work. We just recommend Caddy [^2] because it handles `https` automatically and is easy to use [^3].

Here is an example `Caddyfile`. Replace `<XXX>` with your own domain.

```bash
<XXX> {
    header /* {
        Referrer-Policy "strict-origin"
        Strict-Transport-Security "max-age=31536000; includeSubDomains;"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        X-XSS-Protection "1; mode=block;"
        # You can remove the Google, Firebase, and Sentry policies if you are not using them
        Content-Security-Policy "default-src 'self'; script-src 'self' 'wasm-unsafe-eval' https://apis.google.com https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self' https://*.ingest.sentry.io https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://apis.google.com https://world.openfoodfacts.org; frame-src 'self' https://*.firebaseapp.com https://www.google.com; img-src 'self' https://www.gstatic.com data:; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; worker-src 'self'; object-src 'none';"
        Permissions-Policy "accelerometer=(self), autoplay=(self), camera=(self), cross-origin-isolated=(self), display-capture=(self), encrypted-media=(self), fullscreen=(self), geolocation=(self), gyroscope=(self), keyboard-map=(self), magnetometer=(self), microphone=(self), midi=(self), payment=(self), picture-in-picture=(self), publickey-credentials-get=(self), screen-wake-lock=(self), sync-xhr=(self), usb=(self), xr-spatial-tracking=(self)"
    }
    header /console* {
        -Content-Security-Policy
    }
    route /v1* {
        # API (Hasura)
        reverse_proxy localhost:8080
    }
    route /v2* {
        # API (Hasura)
        reverse_proxy localhost:8080
    }
    route /console* {
        # Admin panel (Hasura)
        reverse_proxy localhost:8080
    }
    route /healthz {
        # Health check (Hasura)
        reverse_proxy localhost:8080
    }
    route /auth* {
        # Authentication server (Express.js)
        reverse_proxy localhost:3001
    }
    route /* {
        # Static files (Clean Slate)
        reverse_proxy localhost:3000
    }
}
```

Here is an example `nginx.conf`. Replace `XXX` with your own content.

> Note: With `nginx`, you will need to get your own SSL certificate.

```bash
error_log /dev/stdout crit;
http {
  server {
      listen 443 http2 ssl;
      listen [::]:443 http2 ssl;
      server_name XXX;

      ssl_certificate XXX
      ssl_certificate_key XXX;

      # HTTP Security Headers
      add_header Referrer-Policy "strict-origin";
      add_header Strict-Transport-Security "max-age=31536000; includeSubDomains;";
      add_header X-Content-Type-Options "nosniff";
      add_header X-Frame-Options "DENY";
      add_header X-XSS-Protection "1; mode=block;";
      # You can remove the Google, Firebase, and Sentry policies if you are not using them
      add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'wasm-unsafe-eval' https://apis.google.com https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self' https://*.ingest.sentry.io https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://apis.google.com https://world.openfoodfacts.org; frame-src 'self' https://*.firebaseapp.com https://www.google.com; img-src 'self' https://www.gstatic.com data:; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; worker-src 'self'; object-src 'none';"
      add_header Permissions-Policy "accelerometer=(self), autoplay=(self), camera=(self), cross-origin-isolated=(self), display-capture=(self), encrypted-media=(self), fullscreen=(self), geolocation=(self), gyroscope=(self), keyboard-map=(self), magnetometer=(self), microphone=(self), midi=(self), payment=(self), picture-in-picture=(self), publickey-credentials-get=(self), screen-wake-lock=(self), sync-xhr=(self), usb=(self), xr-spatial-tracking=(self)"

      location /v1 {
        # API (Hasura)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'Upgrade';
        proxy_set_header Host $host;
        proxy_pass http://localhost:8080;
      }

      location /v2 {
          # API (Hasura)
          proxy_pass http://localhost:8080;
      }

      location /console {
          # Admin panel (Hasura)
          proxy_pass http://localhost:8080;
          add_header Content-Security-Policy "";
      }

      location /auth {
          # Authentication server (Express.js)
          proxy_pass http://localhost:3001;
      }

      location /healthz {
          # Health check (Hasura)
          proxy_pass http://localhost:8080;
      }

      location / {
          # Static files (Clean Slate)
          proxy_pass http://localhost:3000;
      }
  }
}
```

4.  Run `git pull origin main; bash deploy.sh`. This script will pull down from the images and start four servers on `localhost` via Docker Compose. It will also start Caddy. If you do not like any of these behaviors, not a problem! Just modify [deploy.sh](https://github.com/successible/cleanslate/blob/main/deploy.sh) locally. It is less than ten lines of bash. You can also modify the [docker-compose.yml](https://github.com/successible/cleanslate/blob/main/docker-compose.yml) used to deploy Clean Slate.

- The first server is the database, PostgreSQL, [on Docker Hub](https://hub.docker.com/_/postgres). Clean Slate uses the default `postgres` user and `postgres` database. It runs this database, Postgres 15, on port `5432` via Docker Compose.

- The second server is the GraphQL server, Hasura, [on Docker Hub](https://hub.docker.com/r/hasura/graphql-engine).

- The third server is the client (busybox). It is built by us and stored on our [GitHub Packages](https://github.com/successible/cleanslate/pkgs/container/cleanslate%2Fclient).

- The fourth server is the authentication server (Express.js). It is built by us and stored on our [GitHub Packages](https://github.com/successible/cleanslate/pkgs/container/cleanslate%2Fauthentication-server).

5.  Go to the `https://example.com/console`. Make sure to change `example.com` to value of your actual domain. Log in with your `HASURA_GRAPHQL_ADMIN_SECRET` defined in your `.env`. Click `Data`, then `public`, then `profiles`, then `Insert Row`. On this screen, click `Save`. This will create a new Profile. Click to `Browse Rows`. Take note of the `apiToken` of the row you just made. That is your (very long) password to log in. If you want to create another user, follow the same procedure. Do not share this token with anyone else. It will enable them to access you account.

6.  You can now log in to `https://example.com` with that token. Make sure to change `example` to value of your actual domain.

7.  To deploy the newest version of Clean Slate, run `git pull origin main; bash deploy.sh` again. Remember to check [GitHub Releases](https://github.com/successible/cleanslate/releases) before you deploy.

> Note: There is a ten-minute lag between each new release and the images being available. That is for two reasons. One, it takes about that long for the [GitHub Action building the image](https://github.com/successible/cleanslate/actions/workflows/tag.yml) to finish, on average. Two, the trigger for that action is the tag itself.

## How can I make an API request to Clean Slate?

You can review a GraphQL representation of the documentation [here](https://studio.apollographql.com/graph/Clean-Slate/variant/current/home). The documentation is a "live" GraphQL schema in Apollo Studio. You will need to make a free Apollo Studio account to view them.

As you explore the schema, you will see that you can query seven tables using GraphQL.

- `logs`: Contains your logs for food and recipes. See the [queries and mutations the app uses](https://github.com/successible/cleanslate/blob/main/src/graphql/log.ts).

- `quick_logs`: Contains your logs made by "quick adding". See the [queries and mutations the app uses](https://github.com/successible/cleanslate/blob/main/src/graphql/quickLog.ts).

- `exercise_logs`: Contains your logs for exercise. See the [queries and mutations the app uses](https://github.com/successible/cleanslate/blob/main/src/graphql/exerciseLog.ts).

- `foods`: Contains your basic foods and your custom foods. See the [queries and mutations the app uses](https://github.com/successible/cleanslate/blob/main/src/graphql/food.ts).

- `recipes`: Contains your recipes. See the [queries and mutations the app uses](https://github.com/successible/cleanslate/blob/main/src/graphql/recipe.ts).

- `ingredients`: Contains your ingredients for recipes. See the [queries and mutations the app uses](https://github.com/successible/cleanslate/blob/main/src/graphql/ingredient.ts).

Here is an example of the `body` for a `query` that returns the `id` of every log with the unit `COUNT`.

```json
{
  "token": "XXX",
  "query": "query MyQuery($unit: String) { logs(where: {unit: {_eq: $unit}}) { id } }",
  "variables": { "unit": "COUNT" }
}
```

Here is an example of the `body` for a `mutation` that will add a log of a basic food. You can get the `id` of the basic food from the [list here](https://github.com/successible/cleanslate/blob/main/src/basicFoods.json).

```json
{
  "token": "XXX",
  "query": "mutation CREATE_LOG($i: logs_insert_input!) { insert_logs_one(object: $i) { id } }",
  "variables": {
    "i": {
      "alias": null,
      "amount": 1,
      "barcode": null,
      "basicFood": "24bdfa6f-3ab3-46d4-9a57-f78a85128fa3",
      "consumed": true,
      "food": null,
      "meal": "Snack",
      "recipe": null,
      "unit": "GRAM"
    }
  }
}
```

If you want to add a log of a custom food or recipe instead, fine! You will need to set their `id` in the `food` or `recipe` part of the payload. If you want to set a `barcode`, you will need to pass these values from the Open Food Facts API.

```ts
type Barcode = {
  name: string;
  code: string;
  calories_per_gram: number;
  protein_per_gram: number;
  calories_per_serving: number;
  protein_per_serving: number;
  serving_size: number; // "2 Tbsp (30 g)"
  serving_quantity: string; // 30
};
```

## How do I handle authentication in Clean Slate?

### Default: Authentication via apiToken

Clean Slate was built around delegating authentication to Firebase. Firebase is a very secure authentication service maintained by Google. It is our default recommendation for any instance of Clean Slate with more than a few users. Consult the `Using Firebase` section (below) for how to set up Firebase with Clean Slate.

However, Firebase is too complex for the most common hosting scenario. That is a privacy-focused user who wants to host Clean Slate for their personal use. Hence, our default authentication system, `apiToken`, is much simpler. There is no username or password and no need for your server to send email. Instead, we use very long tokens (uuid4) stored as plain text in the `apiToken` column in the database. Because each token is very long and generated randomly, they are very secure. And if you ever need to change the value of the `apiToken`, you can just use the Hasura Console. If you would rather not use the `apiToken` system, you will need to use Firebase instead.

### Optional: Authentication via Firebase

Firebase needs to be configured in three places:

- Your local machine (Local)
- Your production server (Production)
- The Firebase console (Web)

Here is how you do it:

- Web: Create a new Firebase project.
- Web: Enable Firebase authentication.
- Web: Enable the Google provider in Firebase.
- Local: Create the `.firebaserc` in the root with the following content. Example:

```json
{
  "projects": {
    "default": "<your-firebase-project-name>"
  }
}
```

- Local: Create a `firebase-config.json` locally filled with the content of `firebaseConfig`. You can find that on your Project Settings page on Firebase.

```json
{
  "apiKey": "<XXX>",
  "appId": "<XXX>",
  "authDomain": "<XXX>",
  "messagingSenderId": "<XXX>",
  "projectId": "<XXX>",
  "storageBucket": "<XXX>"
}
```

- Local: Login with Firebase via `npx firebase login`.

- Local: Run `npx firebase deploy --only functions`. This will deploy Firebase functions in `/functions`.

- Production: Add these items to your `.env` on your production server. Replace `<XXX>` with your own values. You can find your project config in your Firebase project settings. Do not add these values unless you are doing authentication via Firebase.

```bash
NEXT_PUBLIC_FIREBASE_CONFIG='{"apiKey":"<XXX>","appId":"<XXX>","authDomain":"<XXX>","messagingSenderId":"<XXX>","projectId":"<XXX>","storageBucket":"<XXX>"}'
NEXT_PUBLIC_LOGIN_WITH_APPLE='true'
NEXT_PUBLIC_LOGIN_WITH_FACEBOOK='true'
NEXT_PUBLIC_LOGIN_WITH_GITHUB='true'
NEXT_PUBLIC_LOGIN_WITH_GOOGLE='true'
NEXT_PUBLIC_USE_FIREBASE='true'
HASURA_GRAPHQL_JWT_SECRET='{ "type": "RS256", "audience": "<XXX>", "issuer": "https://securetoken.google.com/<XXX>", "jwk_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com" }'
```

- Production: You need to build the `client` and `authentication-server` images. You cannot use the ones that have already been built. That is because the `client` image has build arguments that are unique to each instance. If you use the `deploy.sh` and `docker-compose.yml` as written, you are set. The images will be built for you automatically. However, if you modify either of those files, you may need to built them yourself.

## How do I contribute to Clean Slate?

Run Clean Slate locally, make changes, and then submit a pull request on GitHub!

> Note: Clean Slate is written in [React](https://reactjs.org) and [TypeScript](https://www.typescriptlang.org), with [Next.js](https://github.com/vercel/next.js) as the framework. It uses [Hasura](https://hasura.io) as the backend and [PostgreSQL](https://www.postgresql.org) as the database.

Here is how to run Clean Slate locally:

- Install the following and make sure Docker Desktop is running:

  - [Git](https://git-scm.com/downloads)
  - [Docker Desktop](https://www.docker.com/products/docker-desktop/)
  - [Caddy](https://caddyserver.com/docs/install).
  - [Hasura CLI](https://hasura.io/docs/latest/hasura-cli/commands/hasura_console/)
  - [Node.js (LTS)](https://nodejs.org/en/)
  - [pnpm](https://pnpm.io/installation)

- Run `pnpm dev` after cloning down the repository. This will spin up these servers:

  - Hasura (API): `http://localhost:8080`.
  - Hasura (Console): `http://localhost:9695`.
  - Next.js: `http://localhost:3000`.
  - PostgreSQL: `http://localhost:1270`

- Navigate to `https://localhost` and login with token `22140ebd-0d06-46cd-8d44-aff5cb7e7101`.

> Note: To run Clean Slate with Firebase, do all the `Local` and `Web` outlined above. Install [jq](https://jqlang.github.io/jq/download/) locally. Finally, tweak the development command. Run `export FIREBASE='true'; pnpm dev` instead.

> Note: To test the deployment process, run `git pull origin main; bash deploy.sh`. Make sure to create the `.env` (below) and `Caddyfile` (above) first.

> Note: To test Clean Slate on a mobile device, install `ngrok`. Run `ngrok http --host-header localhost https://localhost:443` in another terminal.

```bash
# .env for testing the hosting process locally. Do not use in an actual production setting!
HASURA_GRAPHQL_ADMIN_SECRET=XXX
HASURA_GRAPHQL_JWT_SECRET='{"type":"HS256","key":"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}'
JWT_SIGNING_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_HASURA_DOMAIN=localhost
POSTGRES_PASSWORD=XXX
```

[^1]: https://docs.docker.com/engine/install/
[^2]: https://caddyserver.com/docs/getting-started
[^3]: https://letsencrypt.org/
