import React from 'react';
import { useRecoilValue } from 'recoil';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';
import { PublicMenu } from '../PublicMenu';
import { HeaderWrapper, PageTitle } from './Header.styles';

export const Header = () => {
  const i18n = useRecoilValue(i18nAtom);
  return (
    <HeaderWrapper>
      <PageTitle>{i18n.publicSiteTitle}</PageTitle>
      <PublicMenu />
    </HeaderWrapper>
  );
};
