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
- Scan barcodes using [Open Food Facts](https://world.openfoodfacts.org/).
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

For the vast majority of users, hosting Clean Slate is straightforward. You just need a Linux server with Bash, Git, Docker, and Docker Compose. On it, you will run two bash scripts: `configuration.sh` and `deploy.sh`. The first collects environmental variables and makes a `Caddyfile` and `.env`. The second clones down the repository and does one of two things. Which one exactly depends on the authentication system you choose.

1. Local Authentication (Default & Easy). Pulls the images (and PostgreSQL). Starts Caddy.
2. Firebase Authentication (Complex). Builds the images locally (except PostgreSQL). Starts Caddy.

This method of deployment is laid on in detail in the six steps below. (Using Firebase itself is laid out in a later section). However, if you are an advanced user, and you wish to run the images directly, you can! This is great for people who use Coolify, Kubernetes, and so on. Just refer to the [docker-compose.yml](https://github.com/successible/cleanslate/blob/main/docker-compose.yml) and [configuration.sh](https://github.com/successible/cleanslate/blob/main/configuration.sh). These two files will outline stuff like:

- The environmental variables you need.
- The ports you need to open.
- What your reverse proxy needs to do.
- And so on.

Pair this knowledge with steps #4 to #6 (below), and you will be good to go!

If that all sounds very confusing, this method of deployment is not for you! Stick with a basic Linux server and the six steps below:

1. Run `git clone https://github.com/successible/cleanslate` on your server. `cd` inside the newly created folder called `cleanslate`. Check that Docker and Docker Compose have been installed. Make sure to install both from the official website [^1]. That is because the copies bundled with your distribution is likely out of date.

2. Run `bash configuration.sh` to generate a `.env` file and `Caddyfile` file. You will need the `uuid-runtime` package for this to work. Edit the contents as desired. The `.env` file will have the values unique to your instance. Do not share this file, as some of these values are secret. The `Caddyfile` configures Caddy, which is a reverse proxy. Caddy will serve Clean Slate over `https`. Clean Slate requires `https` to work. For Caddy to work, you need a FQDN and have Port `80` open (temporarily). That way, Caddy will succeed in Let's Encrypt certificate generation. You can close Port `80` with your firewall, such as `ufw`, after that. You can use another reverse proxy, like `nginx` if desired. As for your firewall: Clean Slate only needs Port `443` open to work.

3. Run `git pull origin main; bash deploy.sh`. This script will pull down from the images and start four servers on `localhost` via Docker Compose. It will also start Caddy. If you do not like any of these behaviors, such as running PostgreSQL in a container, not a problem! Just modify [deploy.sh](https://github.com/successible/cleanslate/blob/main/deploy.sh) and [docker-compose.yml](https://github.com/successible/cleanslate/blob/main/docker-compose.yml). These are the files used to deploy Clean Slate.

4. Go to the `https://example.com/console`. Make sure to change `example.com` to value of your actual domain. Log in with your `HASURA_GRAPHQL_ADMIN_SECRET` defined in your `.env`. Click `Data`, then `public`, then `profiles`, then `Insert Row`. On this screen, click `Save`. This will create a new Profile. Click to `Browse Rows`. Take note of the `apiToken` of the row you just made. That is your (very long) password to log in. If you want to create another user, follow the same procedure. Do not share this token with anyone else. It will enable them to access your account.

5. You can now log in to `https://example.com` with that token. Make sure to change `example` to value of your actual domain.

6. To deploy the newest version of Clean Slate, run `git pull origin main; bash deploy.sh` again. Remember to check [GitHub Releases](https://github.com/successible/cleanslate/releases) before you deploy. There is a ten-minute lag between each new release and the images being built and available. If you are using Firebase (rare), the newest version with be the `HEAD` of `main` instead. That is because the image must be built locally on your own server.

## How can I make an API request to Clean Slate?

First, review a GraphQL representation of the documentation [here](https://studio.apollographql.com/public/Clean-Slate/variant/current/home)

As you explore the schema, you will see that you can query seven tables using GraphQL.

- `logs`: Contains your logs for food and recipes. See the [queries and mutations the app uses](https://github.com/successible/cleanslate/blob/main/src/graphql/log.ts).

- `quick_logs`: Contains your logs made by "quick adding". See the [queries and mutations the app uses](https://github.com/successible/cleanslate/blob/main/src/graphql/quickLog.ts).

- `exercise_logs`: Contains your logs for exercise. See the [queries and mutations the app uses](https://github.com/successible/cleanslate/blob/main/src/graphql/exerciseLog.ts).

- `foods`: Contains your basic foods and your custom foods. See the [queries and mutations the app uses](https://github.com/successible/cleanslate/blob/main/src/graphql/food.ts).

- `recipes`: Contains your recipes. See the [queries and mutations the app uses](https://github.com/successible/cleanslate/blob/main/src/graphql/recipe.ts).

- `ingredients`: Contains your ingredients for recipes. See the [queries and mutations the app uses](https://github.com/successible/cleanslate/blob/main/src/graphql/ingredient.ts).

- `profiles`: Contains your profile information. See the [queries and mutations the app uses](https://github.com/successible/cleanslate/blob/main/src/graphql/profile.ts).

Here is an example of the `body` for a `query` that returns the `id` of every log with the unit `COUNT`. Make the request (POST) with this payload to `https://app.cleanslate.sh/auth/graphql`. Make sure to include the header `Content-Type: application/json`. If your instance is self-hosted, replace `app.cleanslate.sh` with your own domain.

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

- Production: You need to build the `client` and `authentication-server` images. You cannot use the ones that have already been built. That is because the `client` image has build arguments that are unique to each instance. If you use the `deploy.sh` and `docker-compose.yml` as written, you are set. The images will be built for you automatically. However, if you modify either of those files, you may need to build them yourself.

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

> Note: To test the deployment process, run `git pull origin main; bash deploy.sh`. Make sure to create the `.env` (below) and `Caddyfile` with `bash configuration.sh`

> Note: To test Clean Slate on a mobile device, install `ngrok`. Run `ngrok http --host-header localhost https://localhost:443` in another terminal.

[^1]: https://docs.docker.com/engine/install/
