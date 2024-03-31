FROM node:20.12.0-alpine3.19 AS BUILDER
LABEL maintainer="xuewenG" \
        site="https://github.com/xuewenG/blog-api"

ENV MY_HOME=/root
RUN mkdir -p $MY_HOME
WORKDIR $MY_HOME

COPY package.json $MY_HOME
RUN set -x \
    && npm i -g pnpm \
    && pnpm install

COPY . $MY_HOME
RUN set -x \
    && pnpm run build

FROM node:20.12.0-alpine3.19

ENV MY_HOME=/root
RUN mkdir -p $MY_HOME
WORKDIR $MY_HOME

COPY package.json $MY_HOME
RUN set -x \
    && npm i -g pnpm \
    && pnpm install --prod

COPY --from=BUILDER /root/dist .

ENTRYPOINT ["node", "main.js"]
