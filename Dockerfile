FROM node:16-alpine
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat git
WORKDIR /app
COPY package.json yarn.lock ./
# Explicitly set production=false to install dev dependencies.
RUN yarn install --ignore-scripts --prefer-offline --production=false

COPY . .

# Add new ENV VARS here
ARG NODE_ENV
ARG ADMIN_PRIVATE_KEY
ARG LEADER_BOARD_PLAYERS
ARG REDIS_PASSWORD
ENV GIT_COMMIT_SHA=${GIT_COMMIT_SHA}

RUN yarn build

EXPOSE 3000

# Disable telemetry. https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

CMD yarn start