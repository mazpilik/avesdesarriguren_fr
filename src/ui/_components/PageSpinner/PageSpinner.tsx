import React from 'react';

import { ProgressSpinner } from 'primereact/progressspinner';

import { PageSpinnerWrapper } from './PageSpinner.styles';

export const PageSpinner = () => (
  <PageSpinnerWrapper>
    <ProgressSpinner style={{ width: '32px', height: '32px' }} />
  </PageSpinnerWrapper>
);
