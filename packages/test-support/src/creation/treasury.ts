// Copyright 2017-2024 @polkadot/test-support authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { SubmittableExtrinsic } from '@polkadot/api/types';
import type { DeriveCollectiveProposal } from '@polkadot/api-derive/types';

import { ApiPromise } from '@polkadot/api';
import { BN_ONE, BN_ZERO } from '@polkadot/util';

import { alice, bob } from '../keyring/addresses.js';
import { balanceOf } from './balance.js';
import { aHash } from './hashes.js';

export interface ProposalFactory {
  aProposal: (extrinsic: SubmittableExtrinsic<'promise'>, ayes?: string[], nays?: string[]) => DeriveCollectiveProposal
}

export function proposalFactory (api: ApiPromise): ProposalFactory {
  const registry = api.registry;

  return {
    aProposal: (extrinsic, ayes = [alice], nays = [bob]) => ({
      hash: aHash(),
      proposal: registry.createType('Proposal', extrinsic),
      votes: registry.createType('Votes', {
        ayes,
        index: 0,
        nays,
        threshold: 4
      })
    })
  };
}

export const defaultTreasury = {
  burn: BN_ONE,
  spendPeriod: BN_ZERO,
  value: balanceOf(1)
};
