FROM node:lts-slim AS builder

# Update any dependencies bundled with the container

RUN apt-get update -y; apt-get upgrade -y;
RUN npm install -g npm@latest

# Install the dependencies needed to build Clean Slate

COPY package.json .
COPY pnpm-lock.yaml .
RUN ["npm", "install", "pnpm", "-g"]
RUN ["pnpm", "install", "--frozen-lockfile", "--prod"]

# Copy over the folders and files from /src needed to build Clean Slate

COPY src/assets src/assets
COPY src/components src/components
COPY src/constants src/constants
COPY src/graphql src/graphql
COPY src/helpers src/helpers
COPY src/hooks src/hooks
COPY src/models src/models
COPY src/pages src/pages
COPY src/public src/public
COPY src/store src/store

COPY src/basicFoods.json src/basicFoods.json
COPY src/index.d.ts src/index.d.ts
COPY src/next-env.d.ts src/next-env.d.ts
COPY src/next.config.js src/next.config.js
COPY src/storeon.ts src/storeon.ts
COPY src/theme.scss src/theme.scss
COPY src/theme.ts src/theme.ts
COPY src/tsconfig.json src/tsconfig.json
COPY src/create-service-worker.js src/create-service-worker.js

# Build Clean Slate

# Define the ARG and ENV

ARG NEXT_PUBLIC_FIREBASE_CONFIG='{}'
ARG NEXT_PUBLIC_LEGAL_LINK="no"
ARG NEXT_PUBLIC_LOGIN_WITH_APPLE="no"
ARG NEXT_PUBLIC_LOGIN_WITH_FACEBOOK="no"
ARG NEXT_PUBLIC_LOGIN_WITH_GITHUB="no"
ARG NEXT_PUBLIC_LOGIN_WITH_GOOGLE="no"
ARG NEXT_PUBLIC_REACT_SENTRY_DSN="no"
ARG NEXT_PUBLIC_USE_FIREBASE="false"
ARG NEXT_PUBLIC_VERSION

ENV NEXT_PUBLIC_FIREBASE_CONFIG=$NEXT_PUBLIC_FIREBASE_CONFIG
ENV NEXT_PUBLIC_LEGAL_LINK=$NEXT_PUBLIC_LEGAL_LINK
ENV NEXT_PUBLIC_LOGIN_WITH_APPLE=$NEXT_PUBLIC_LOGIN_WITH_APPLE
ENV NEXT_PUBLIC_LOGIN_WITH_FACEBOOK=$NEXT_PUBLIC_LOGIN_WITH_FACEBOOK
ENV NEXT_PUBLIC_LOGIN_WITH_GITHUB=$NEXT_PUBLIC_LOGIN_WITH_GITHUB
ENV NEXT_PUBLIC_LOGIN_WITH_GOOGLE=$NEXT_PUBLIC_LOGIN_WITH_GOOGLE
ENV NEXT_PUBLIC_REACT_SENTRY_DSN=$NEXT_PUBLIC_REACT_SENTRY_DSN
ENV NEXT_PUBLIC_USE_FIREBASE=$NEXT_PUBLIC_USE_FIREBASE
ENV NEXT_PUBLIC_VERSION=$NEXT_PUBLIC_VERSION

# Build the static files of Clean Slate

COPY build.sh .
RUN ["npx", "next", "info"]
RUN ["bash", "-e", "build.sh"]

FROM busybox:latest AS runner

# Copy over the built version of Clean Slate

COPY --from=builder out out

# Serve Clean Slate with busybox

CMD ["busybox", "httpd", "-f", "-v", "-p", "3000", "-h", "out"]