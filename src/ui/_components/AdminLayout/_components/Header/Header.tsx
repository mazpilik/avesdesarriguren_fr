import React, { FC } from 'react';

import {
  HeaderWrapper,
  Title,
  SectionTitle,
} from './Header.styles';

interface HeaderProps {
  sectionTitle: string;
}

export const Header: FC<HeaderProps> = ({ sectionTitle }) => (
  <HeaderWrapper>
    <Title>Aves de Sarriguren Admin</Title>
    <SectionTitle>{sectionTitle}</SectionTitle>
  </HeaderWrapper>
);
