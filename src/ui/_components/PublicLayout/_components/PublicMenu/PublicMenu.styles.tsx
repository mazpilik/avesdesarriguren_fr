import styled from 'styled-components/macro';

export const MenuItem = styled.a`
  text-decoration: none;
  color: #000000;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: #666;
  }
`;
export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 1rem;
`;
