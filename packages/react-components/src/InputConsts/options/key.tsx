// Copyright 2017-2024 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ConstantCodec } from '@polkadot/types/metadata/decorate/types';
import type { DropdownOption, DropdownOptions } from '../../util/types.js';

import React from 'react';

import { ApiPromise } from '@polkadot/api';
import { getSiName } from '@polkadot/types/metadata/util';

export default function createOptions (api: ApiPromise, sectionName: string): DropdownOptions {
  const section = api.consts[sectionName];

  if (!section || Object.keys(section).length === 0) {
    return [];
  }

  return Object
    .keys(section)
    .filter((s) => !s.startsWith('$'))
    .sort()
    .map((value): DropdownOption => {
      const method = (section[value] as ConstantCodec);

      return {
        className: 'ui--DropdownLinked-Item',
        key: `${sectionName}_${value}`,
        text: [
          <div
            className='ui--DropdownLinked-Item-call'
            key={`${sectionName}_${value}:call`}
          >
            {value}: {getSiName(api.registry.lookup, method.meta.type)}
          </div>,
          <div
            className='ui--DropdownLinked-Item-text'
            key={`${sectionName}_${value}:text`}
          >
            {(method.meta.docs[0] || method.meta.name).toString()}
          </div>
        ],
        value
      };
    });
}
