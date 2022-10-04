################################################################

FROM node:16.17.1-bullseye-slim as builder

################################################################

RUN npm update -g npm && \
    npm update -g yarn

################################################################

RUN apt-get update && \
    apt-get install -y jq

################################################################

RUN mkdir -p /apps/.yarn/cache/ && \
    mkdir -p /apps/node_modules/ && \
    chown -R node:node /apps

################################################################

USER root
RUN chown -R node:node /apps

################################################################

USER node
WORKDIR /apps

################################################################

#COPY --chown=node:node package.json ./
#COPY --chown=node:node yarn.lock ./
#RUN yarn install
#COPY --chown=node:node . .

################################################################

COPY --chown=node:node . .
RUN yarn install

################################################################

#USER root
#RUN chown -R node:node /apps
#USER node

################################################################

ARG APP_NAME="Polymesh Staging"
ARG RPC_ENDPOINT="wss://staging-rpc.polymesh.live"
ARG NODE_ENV="production"

ENV APP_NAME="$APP_NAME"
ENV RPC_ENDPOINT="$RPC_ENDPOINT"
ENV NODE_ENV="$NODE_ENV"

RUN bash scripts/updateEndpoint.sh

################################################################

#USER node
RUN yarn
RUN yarn build:www

################################################################

FROM nginx:stable as final

WORKDIR /usr/share/nginx/html

COPY --chown=root:root --from=builder /apps/packages/apps/build /usr/share/nginx/html

EXPOSE 80

CMD nginx -g "daemon off;"

################################################################
