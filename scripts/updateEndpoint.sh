#!/bin/bash

###############################################################

set -aeux -o pipefail

###############################################################

export APP_NAME="$APP_NAME"
export RPC_ENDPOINT="$RPC_ENDPOINT"

###############################################################

sed -i "
        s^__RPC_ENDPOINT__^$RPC_ENDPOINT^g
        s^__APP_NAME__^$APP_NAME^g
    " \
    ./packages/apps-config/src/endpoints/chains.ts \
    ./packages/apps/public/locales/en/apps-config.json

###############################################################
