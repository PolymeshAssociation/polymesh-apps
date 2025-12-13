// Copyright 2017-2025 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { EndpointOption } from './types.js';

import { nodesPolymeshSVG } from '../ui/logos/nodes/index.js';

export const polymeshChains: EndpointOption[] = [
  {
    info: 'polymesh',
    providers: {
      Polymesh: 'wss://mainnet-rpc.polymesh.network'
    },
    text: 'Polymesh Mainnet',
    ui: {
      color: 'linear-gradient(197deg, #FF2E72, #4A125E)',
      logo: nodesPolymeshSVG
    }
  },
  {
    info: 'polymesh',
    providers: {
      Polymesh: 'wss://testnet-rpc.polymesh.live'
    },
    text: 'Polymesh Testnet',
    ui: {
      color: '#43195B',
      logo: nodesPolymeshSVG
    }
  },
  {
    info: 'polymesh',
    providers: {
      Polymesh: 'wss://staging-rpc.polymesh.dev/'
    },
    text: 'Polymesh Staging',
    ui: {
      logo: nodesPolymeshSVG
    }
  },
  {
    info: 'polymesh',
    providers: {
      Polymesh: 'wss://devnet-rpc.polymesh.dev/'
    },
    text: 'Polymesh Devnet',
    ui: {
      color: '#c1b8b6',
      logo: nodesPolymeshSVG
    }
  }
];
