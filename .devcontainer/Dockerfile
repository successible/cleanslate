FROM mcr.microsoft.com/devcontainers/typescript-node:24-trixie

ARG USERNAME=node

USER root

# System dependencies
RUN apt-get update && apt-get install -y \
    jq \
    curl \
    unzip \
    ca-certificates \
    gnupg2 \
    && rm -rf /var/lib/apt/lists/*

# Add Docker repository then install cli and compose
RUN install -m 0755 -d /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/debian/gpg \
      | gpg --dearmor -o /etc/apt/keyrings/docker.gpg \
    && chmod a+r /etc/apt/keyrings/docker.gpg \
    && echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
      https://download.docker.com/linux/debian \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
      > /etc/apt/sources.list.d/docker.list \
    && apt-get update \
    && apt-get install -y docker-ce-cli docker-compose-plugin \
    && rm -rf /var/lib/apt/lists/*

# Install Caddy
RUN curl -fsSL https://dl.cloudsmith.io/public/caddy/stable/gpg.key \
    | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg \
    && curl -fsSL https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt \
    | tee /etc/apt/sources.list.d/caddy-stable.list \
    && apt-get update \
    && apt-get install -y caddy \
    && rm -rf /var/lib/apt/lists/*

# Let caddy run as the node user
RUN mkdir -p /home/node/.config/caddy \
    /home/node/.local/share/caddy \
    && chown -R node:node /home/node/.config /home/node/.local

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install Hasura CLI
RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

USER ${USERNAME}

WORKDIR /workspaces/cleanslate

# Keep pnpm store outside repo
ENV PNPM_HOME=/home/node/.local/share/pnpm
ENV PATH=${PNPM_HOME}:${PATH}

RUN mkdir -p ${PNPM_HOME}
