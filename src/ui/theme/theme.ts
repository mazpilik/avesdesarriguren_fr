import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  admin: {
    AddBtnColor: {
      default: '#BEE1E6',
      hover: '#BEE1E6',
      disabled: '#BEE1E6',
    },
    bodyBackground: '#F0EFEB',
    DeleteBtnColor: {
      default: '#FDE2E4',
      hover: '#FDE2E4',
      disabled: '#BEE1E6',
    },
    EditBtnColor: {
      default: '#CDDAFD',
      hover: '#CDDAFD',
      disabled: '#BEE1E6',
    },
    CancelBtnColor: {
      default: '#ebebeb',
      hover: '#ebebeb',
      disabled: '#BEE1E6',
    },
    ElementsBorder: '#ccc',
    ElementsBackground: '#FFFFFF',
    mainMenuBack: '#14213D',
    mainMenuText: '#FFFFFF',
    textColor: '#666666',
    titleColor: '#000000',
    userCardBackground: '#ebebeb',
  },
  public: {
    pageBackground: '#E5E5E5',
    sectionsBackground: '#FBF6F6',
    title1: '#659E38',
    outlinedBtnColor: '#659E38',
    textSecondary: '#666666',
    greenCards: 'rgba(101, 158, 56, 0.1)',
  },
};
export const darkTheme: DefaultTheme = {};
