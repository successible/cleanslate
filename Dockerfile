FROM hasura/graphql-engine:v2.11.5

ENV NODE_ENV production
ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js

RUN apt-get update -y
RUN apt-get install build-essential curl -y
RUN curl -sL https://deb.nodesource.com/setup_19.x | bash -
RUN apt-get install nodejs -y

WORKDIR /cleanslate

# # Install the JavaScript dependencies

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY .npmrc ./

RUN npm install -g pnpm
RUN pnpm install --production 

# Files needed to migrate and run Hasura

COPY config.yaml ./
COPY entrypoint.sh ./
COPY migrate.js ./
COPY src/basicFoods.csv ./src/basicFoods.csv
COPY metadata metadata
COPY migrations migrations

ENTRYPOINT [ "bash", "entrypoint.sh" ]