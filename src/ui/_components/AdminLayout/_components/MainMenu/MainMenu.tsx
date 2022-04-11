import React from 'react';

import {
  Title, MenuWrapper, Menu, MenuItem, MenuLink,
} from './MainMenu.styles';

export const MainMenu = () => (
  <MenuWrapper>
    <Title>shkud</Title>
    <Menu>
      <MenuItem>
        <MenuLink to="/shkud">
          <i className="pi pi-home" />
          Dashboard
        </MenuLink>
      </MenuItem>
      <MenuItem>
        <MenuLink to="/shkud">Aves</MenuLink>
      </MenuItem>
      <MenuItem><MenuLink to="/shkud">Noticias</MenuLink></MenuItem>
      <MenuItem><MenuLink to="/shkud">Users</MenuLink></MenuItem>
    </Menu>
  </MenuWrapper>
);
