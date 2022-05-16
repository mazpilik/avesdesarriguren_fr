import React from 'react';

import { PublicLayoutWrapper, SectionWrapper } from './PublicLayout.styles';

import { Header } from './_components/Header/Header';

export const PublicLayout: React.FC = ({ children }) => (
  <PublicLayoutWrapper>
    <SectionWrapper>
      <Header />
      {children}
    </SectionWrapper>
  </PublicLayoutWrapper>
);
