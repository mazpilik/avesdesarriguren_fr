import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const Title = styled.h4`
  margin:0;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
`;
export const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  i{
    margin-right: 0.5rem;
  }
  color: #666;
`;
export const MenuItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #ccc;
`;
export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto 1;
  background-color: #f8f9fa;
`;
export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto 1;
  width: 200px;
  border-right: 1px solid #ccc;
  .megaMenu{
    flex: auto 1;
    ul{
      li{
        display: inline-block;
      }
    }
  }
`;
