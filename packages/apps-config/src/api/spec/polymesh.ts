// Copyright 2017-2023 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { OverrideBundleDefinition } from '@polkadot/types/types';

import schema from './polymesh_schema.json';

const definitions: OverrideBundleDefinition = {
  rpc: schema.rpc,
  types: [
    {
      // on all versions
      minmax: [0, undefined],
      types: schema.types
    }
  ]
};

export default definitions;
