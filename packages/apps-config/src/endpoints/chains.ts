// Copyright 2017-2025 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { EndpointOption } from './types.js';

import { nodesPolymeshSVG } from '../ui/logos/nodes/index.js';

// The available endpoints that will show in the dropdown. For the most part (with the exception of
// Polkadot) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../ui/logos/index.ts in namedLogos (this also needs to align with @polkadot/networks)
//   text: The text to display on the dropdown
//   providers: The actual hosted secure websocket endpoint
//
// IMPORTANT: This is the deployment-specific endpoint configured via environment variables
export const deploymentChain: EndpointOption = {
  info: 'polymesh',
  providers: {
    Polymesh: 'wss://__RPC_HOSTNAME__/'
  },
  text: '__APP_NAME__',
  ui: {
    color: '__UI_COLOR__',
    logo: nodesPolymeshSVG
  }
};
