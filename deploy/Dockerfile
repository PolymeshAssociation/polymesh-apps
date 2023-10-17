################################################################

ARG NODE_VERSION=hydrogen
ARG NODE_CONTAINER_TAG=${NODE_VERSION}-bullseye-slim

################################################################

FROM node:${NODE_CONTAINER_TAG} as builder

################################################################

USER root
RUN npm i -g npm

################################################################

# Install any needed packages
RUN apt-get update && \
    apt-get install --no-install-recommends -y curl git gnupg ca-certificates python3 pkg-config make cmake g++ libudev-dev libusb-1.0-0-dev

################################################################

WORKDIR /apps

COPY --chown=node:node . .

RUN chown -R node: /apps

RUN sed -n 's/^\(.*\)=.*$/\1=__\1__/p' .env-example > .env.production.local && \
    cat .env.production.local | \
        xargs -I{} bash -c "echo '{}' | sed 's/^\\(.*\\)=.*$/\\1/' >> /srv/env.var.list"

USER node

RUN yarn && NODE_ENV=production yarn build:www

################################################################

FROM nginx:stable-alpine

# The following is mainly for doc purpose to show which ENV is supported
ENV WS_URL=

WORKDIR /usr/share/nginx/html

COPY env.sh .

RUN apk add --no-cache bash; chmod +x env.sh

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /apps/packages/apps/build /usr/share/nginx/html
COPY --from=builder /srv/env.var.list /srv/env.var.list
COPY --chown=root:root deploy/replace-env-var-placeholders.sh /usr/local/bin/replace-env-var-placeholders.sh

ENV APP_NAME=APP_NAME_NOT_SET
ENV RPC_HOSTNAME=RPC_HOSTNAME_NOT_SET
ENV WS_URL=WS_URL_NOT_SET
ENV POLKADOT_UI_SAMPLE=POLKADOT_UI_SAMPLE_NOT_SET
ENV UI_COLOR=UI_COLOR_NOT_SET

EXPOSE 80

CMD replace-env-var-placeholders.sh && \
    /usr/share/nginx/html/env.sh && \
    nginx -g 'daemon off;'

################################################################
