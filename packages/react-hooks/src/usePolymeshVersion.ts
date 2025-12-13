// Copyright 2017-2026 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';

import { useApi } from './useApi.js';

interface PolymeshVersion {
  isPolymesh: boolean;
  isV8Plus: boolean;
  specVersion: number;
}

export function usePolymeshVersion (): PolymeshVersion {
  const { api } = useApi();

  return useMemo((): PolymeshVersion => {
    const specVersion = api.runtimeVersion.specVersion.toNumber();
    const specName = api.runtimeVersion.specName.toString().toLowerCase();
    const isPolymesh = specName.includes('polymesh');
    const isV8Plus = isPolymesh && specVersion >= 8000000;

    return { isPolymesh, isV8Plus, specVersion };
  }, [api]);
}
