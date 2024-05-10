// Copyright 2017-2024 @polkadot/app-runtime authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ParamDef, RawParam } from '@polkadot/react-params/types';
import type { DefinitionCallNamed } from '@polkadot/types/types';

import React, { useCallback, useMemo, useState } from 'react';

import { Button, Input, InputCalls } from '@polkadot/react-components';
import Params from '@polkadot/react-params';
import { getTypeDef } from '@polkadot/types/create';

import { useTranslation } from '../translate.js';

interface Props {
  onSubmit: (hash: string, call: DefinitionCallNamed, values: RawParam[]) => void;
}

interface State {
  hash: string;
  isValid: boolean;
  method: DefinitionCallNamed | null;
  values: RawParam[];
}

function Selection ({ onSubmit }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [{ hash, isValid, method, values }, setState] = useState<State>({
    hash: '',
    isValid: false,
    method: null,
    values: []
  });

  const params = useMemo(
    () => method
      ? method.params.map(({ name, type }): ParamDef => ({
        name,
        type: getTypeDef(type)
      }))
      : [],
    [method]
  );

  const _nextState = useCallback(
    (newState: Partial<State>) => setState((prevState: State): State => {
      const { hash = prevState.hash, method = prevState.method, values = prevState.values } = newState;
      const isValid = values.reduce((isValid, value) => isValid && value.isValid === true, !!method && method.params.length <= values.length);

      return {
        hash,
        isValid,
        method,
        values
      };
    }),
    []
  );

  const _onChangeBlockHash = useCallback(
    (hash: string) => _nextState({ hash }),
    [_nextState]
  );

  const _onChangeMethod = useCallback(
    (method: DefinitionCallNamed) => _nextState({ method, values: [] }),
    [_nextState]
  );

  const _onChangeValues = useCallback(
    (values: RawParam[]) => _nextState({ values }),
    [_nextState]
  );

  const _onSubmit = useCallback(
    (): void => {
      method && onSubmit(hash, method, values);
    },
    [onSubmit, hash, method, values]
  );

  return (
    <section className='runtime--Selection'>
      <InputCalls
        label={t<string>('call the selected endpoint')}
        onChange={_onChangeMethod}
      />
      {method && (
        <Params
          key={`${method.section}.${method.method}:params` /* force re-render on change */}
          onChange={_onChangeValues}
          params={params}
        />
      )}
      <Input
        label={t<string>('at block')}
        onChange={_onChangeBlockHash}
        placeholder={t<string>('0x...')}
      />
      <Button.Group>
        <Button
          icon='sign-in-alt'
          isDisabled={!isValid || !method}
          label={t<string>('Submit Runtime call')}
          onClick={_onSubmit}
        />
      </Button.Group>
    </section>
  );
}

export default React.memo(Selection);
