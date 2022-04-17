import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const Title = styled.h4`
  margin:0;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  font-size: 4rem;
  margin-bottom: 5rem;
`;
export const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  i{
    margin-right: 0.5rem;
  }
  color: ${({ theme }) => theme.admin.mainMenuText};
`;
export const MenuItem = styled.div`
  padding: 1rem;
  font-size: 1.5rem;
`;
export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto 1;
`;
export const MenuEnd = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
`;
interface MenuWrapperProps {
  isOpen: boolean;
}
export const MenuWrapper = styled.div<MenuWrapperProps>`
  display: flex;
  flex-direction: column;
  flex: auto 1;
  width: ${({ isOpen }) => (isOpen ? '288px' : '96px')};
  background-color: ${({ theme }) => theme.admin.mainMenuBack};
  color: ${({ theme }) => theme.admin.mainMenuText};
  ${Menu} {
    align-items: ${({ isOpen }) => (isOpen ? 'flex-start' : 'center')};
  }
  ${MenuEnd} {
    align-items: ${({ isOpen }) => (isOpen ? 'flex-start' : 'center')};
  }
`;
