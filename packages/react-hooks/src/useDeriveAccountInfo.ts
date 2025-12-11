// Copyright 2017-2026 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveAccountInfo } from '@polkadot/api-derive/types';
import type { AccountId, AccountIndex, Address } from '@polkadot/types/interfaces';

import { createNamedHook } from './createNamedHook.js';
import { useApi } from './useApi.js';
import { useCall } from './useCall.js';
import { usePolymeshVersion } from './usePolymeshVersion.js';

function useDeriveAccountInfoImpl (value?: AccountId | AccountIndex | Address | Uint8Array | string | null): DeriveAccountInfo | undefined {
  const { apiIdentity } = useApi();
  const { isPolymesh } = usePolymeshVersion();

  // Polymesh doesn't have the standard identity pallet with subsOf, which causes errors in the derive
  // Skip the derive call for Polymesh chains
  return useCall<DeriveAccountInfo>(!isPolymesh && apiIdentity?.derive.accounts.info, [value]);
}

export const useDeriveAccountInfo = createNamedHook('useDeriveAccountInfo', useDeriveAccountInfoImpl);
