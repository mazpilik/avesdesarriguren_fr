import React, { FC, Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilValue } from 'recoil';

import {
  faHome, faUsers, faFeather, faNewspaper, faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

import {
  Title, MenuWrapper, Menu, MenuItem, MenuLink, MenuEnd,
} from './MainMenu.styles';

interface Props {
  isOpen: boolean;
  onSetIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const MainMenu: FC<Props> = ({ isOpen, onSetIsOpen }) => {
  const i18n = useRecoilValue(i18nAtom);
  return (
    <MenuWrapper isOpen={isOpen}>
      <Title>sh</Title>
      <Menu>
        <MenuItem>
          <MenuLink to="/shkud">
            <FontAwesomeIcon icon={faHome} />
            {isOpen ? i18n.dashboard : ''}
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/shkud">
            <FontAwesomeIcon icon={faFeather} />
            {isOpen ? i18n.birds : ''}
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/shkud">
            <FontAwesomeIcon icon={faNewspaper} />
            {isOpen ? i18n.news : ''}
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/shkud">
            <FontAwesomeIcon icon={faUsers} />
            {isOpen ? i18n.users : ''}
          </MenuLink>
        </MenuItem>
      </Menu>
      <MenuEnd>
        <MenuItem onClick={() => onSetIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faCirclePlus} />
        </MenuItem>
      </MenuEnd>
    </MenuWrapper>
  );
};
