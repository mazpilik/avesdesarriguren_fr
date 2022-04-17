import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';

import { lightTheme, darkTheme } from './theme';

export const ThemeProviderWrapper: FC = ({ children }) => (
  <ThemeProvider theme={true ? lightTheme : darkTheme}>
    {children}
  </ThemeProvider>
);
