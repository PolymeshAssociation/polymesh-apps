// Copyright 2017-2024 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { styled, Tag } from '@polkadot/react-components';
import { useJudgements } from '@polkadot/react-hooks';

import { useTranslation } from '../translate.js';
import JudgementTag from './JudgementTag.js';

interface Props {
  address: string;
  className?: string;
}

function Judgements ({ address, className = '' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const judgements = useJudgements(address);

  if (judgements.length === 0) {
    return (
      <div
        className={`${className} no-judgements`}
        data-testid='judgements'
      >
        <Tag
          color='yellow'
          key='NoJudgements'
          label={t<string>('No judgements')}
          size='tiny'
        />
      </div>
    );
  }

  return (
    <StyledDiv
      className={className}
      data-testid='judgements'
    >
      {judgements.map((judgement) =>
        <JudgementTag
          judgement={judgement}
          key={`${address}${judgement.judgementName}`}
        />
      )}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  margin-top: 0.714rem;

  &:not(.no-judgements) {
    .ui--Tag:hover {
      cursor: pointer;
    }
  }
`;

export default React.memo(Judgements);
