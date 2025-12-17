// Copyright 2017-2026 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction, TOptions } from '../types.js';
import type { LinkOption } from './types.js';

import { deploymentChain } from './chains.js';
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

// Check if deployment chain has resolved placeholders
const isDeploymentChainResolved = !deploymentChain.text?.includes('__');

// Get the deployment chain URL (normalized without trailing slash) for deduplication
const deploymentChainUrl = isDeploymentChainResolved
  ? Object.values(deploymentChain.providers)[0]?.replace(/\/$/, '')
  : null;

// Filter out polymeshChains that match the deployment chain URL
const filteredPolymeshChains = polymeshChains.filter(({ providers }) =>
  !deploymentChainUrl || !Object.values(providers).some((url) =>
    url.replace(/\/$/, '') === deploymentChainUrl
  )
);

export function createWsEndpoints (t: TFunction = defaultT, firstOnly = false, withSort = true): LinkOption[] {
  // Only show the deployment-specific section if placeholders were replaced
  const deploymentSection = isDeploymentChainResolved
    ? [
      {
        isDisabled: false,
        isHeader: true,
        isSpaced: true,
        text: t('rpc.header.polymesh', '__APP_NAME__', { ns: 'apps-config' }),
        textBy: '',
        ui: {},
        value: ''
      },
      ...expandEndpoints(t, [deploymentChain], firstOnly, withSort)
    ]
    : [];

  return [
    ...deploymentSection,
    {
      isDisabled: false,
      isHeader: true,
      isSpaced: true,
      text: t('rpc.header.live', 'Polymesh Chains', { ns: 'apps-config' }),
      textBy: '',
      ui: {},
      value: ''
    },
    ...expandEndpoints(t, filteredPolymeshChains, firstOnly, withSort),
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
