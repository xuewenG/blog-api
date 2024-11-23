FROM node:20.18.1-alpine3.19 AS builder
LABEL maintainer="xuewenG" \
        site="https://github.com/xuewenG/blog-api"

ENV APP_HOME=/app
WORKDIR $APP_HOME

COPY package.json $APP_HOME
RUN set -x \
    && npm i -g pnpm \
    && pnpm install

COPY . $APP_HOME
RUN set -x \
    && pnpm run build

FROM node:20.18.1-alpine3.19

ENV APP_HOME=/app
WORKDIR $APP_HOME

COPY package.json $APP_HOME
RUN set -x \
    && npm i -g pnpm \
    && pnpm install --prod \
    && npm cache clean --force \
    && pnpm store prune --force

COPY --from=builder $APP_HOME/dist .

ENTRYPOINT ["node", "main.js"]
