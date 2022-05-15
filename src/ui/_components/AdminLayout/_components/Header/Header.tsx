import React, { FC } from 'react';

import { useRecoilValue } from 'recoil';
import { User } from 'src/domain/User';

import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

import { Avatar } from 'primereact/avatar';

import { userAtom } from 'src/ui/_functions/atoms/atoms';

import { useUserHook } from 'src/ui/_functions/hooks/useUserHook';

import {
  HeaderWrapper,
  TitleWrapper,
  UserWrapper,
  UserCard,
  SectionTitle,
  DateWrapper,
  UserNameWrapper,
  LogoutBtn,
} from './Header.styles';

interface HeaderProps {
  sectionTitle: string;
}

export const Header: FC<HeaderProps> = ({ sectionTitle }) => {
  const user: User = useRecoilValue(userAtom);
  const userUtils = useUserHook();

  return (
    <HeaderWrapper>
      <TitleWrapper>
        <SectionTitle>
          {sectionTitle}
        </SectionTitle>
        <DateWrapper>
          {new Date().toLocaleDateString('es-ES')}
        </DateWrapper>
      </TitleWrapper>
      <UserWrapper>
        <UserCard>
          <Avatar className="mr-2" size="large" shape="circle" image={`${process.env.REACT_APP_PUBLIC_URL}/images/users/${user.name}.jpg`} />
          <UserNameWrapper>
            {user.name}
          </UserNameWrapper>
        </UserCard>
        <LogoutBtn onClick={() => userUtils.logout()} icon={faPowerOff} />
      </UserWrapper>
    </HeaderWrapper>
  );
};
