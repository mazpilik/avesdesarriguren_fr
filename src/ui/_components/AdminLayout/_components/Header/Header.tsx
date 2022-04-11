import React, { FC } from 'react';

import { Button } from 'primereact/button';
import { BreadCrumb } from 'primereact/breadcrumb';

import { useRecoilValue } from 'recoil';
import { User } from 'src/domain/User';

import { userAtom } from 'src/ui/_functions/atoms/atoms';

import {
  HeaderWrapper,
  TitleWrapper,
  UserWrapper,
  UserName,
} from './Header.styles';

interface HeaderProps {
  sectionTitle: string;
}

export const Header: FC<HeaderProps> = () => {
  const user: User = useRecoilValue(userAtom);
  return (
    <HeaderWrapper>
      <TitleWrapper>
        <BreadCrumb model={[{ label: 'Dashboard', url: '/shkud' }]} />
      </TitleWrapper>
      <UserWrapper>
        <UserName>{`Welcome ${user.name}`}</UserName>
        <Button>Logout</Button>
      </UserWrapper>
    </HeaderWrapper>
  );
};
