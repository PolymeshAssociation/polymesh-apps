// Copyright 2017-2024 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { useApi } from '@polkadot/react-hooks';
import { isFunction } from '@polkadot/util';

import MarkWarning from './MarkWarning.js';
import { useTranslation } from './translate.js';

function BatchWarning (): React.ReactElement | null {
  const { t } = useTranslation();
  const { api } = useApi();

  if (isFunction(api.tx.utility.batchAll)) {
    return null;
  }

  return (
    <MarkWarning content={t<string>('This chain does not yet support atomic batch operations. This means that if the transaction gets executed and one of the operations do fail (due to invalid data or lack of available funds) some of the changes made may not be applied.')} />
  );
}

export default React.memo(BatchWarning);
