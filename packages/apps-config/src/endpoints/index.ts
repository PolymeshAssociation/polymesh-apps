// Copyright 2017-2025 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction, TOptions } from '../types.js';
import type { LinkOption } from './types.js';

import { chains } from './chains.js';
import { createDev, createOwn } from './development.js';
import { polymeshChains } from './polymesh.js';
import { expandEndpoints } from './util.js';

export { CUSTOM_ENDPOINT_KEY } from './development.js';
export * from './production.js';
export * from './testing.js';

function defaultT (keyOrText: string, text?: string | TOptions, options?: TOptions): string {
  return (
    (options?.replace?.host as string) ||
    text?.toString() ||
    keyOrText
  );
}

export function createWsEndpoints (t: TFunction = defaultT, firstOnly = false, withSort = true): LinkOption[] {
  return [
    {
      isDisabled: false,
      isHeader: true,
      isSpaced: true,
      text: t('rpc.header.polymesh', 'Polymesh', { ns: 'apps-config' }),
      textBy: '',
      ui: {},
      value: ''
    },
    ...expandEndpoints(t, chains, firstOnly, withSort),
    {
      isDisabled: false,
      isHeader: true,
      isSpaced: true,
      text: t('rpc.header.live', 'Live networks', { ns: 'apps-config' }),
      textBy: '',
      ui: {},
      value: ''
    },
    ...expandEndpoints(t, polymeshChains, firstOnly, withSort),
    {
      isDevelopment: true,
      isDisabled: false,
      isHeader: true,
      isSpaced: true,
      text: t('rpc.header.dev', 'Development', { ns: 'apps-config' }),
      textBy: '',
      ui: {},
      value: ''
    },
    ...createDev(t),
    ...createOwn(t)
  ].filter(({ isDisabled }) => !isDisabled);
}
