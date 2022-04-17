import styled from 'styled-components/macro';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Title = styled.h3`
  margin:0;
`;
export const SectionTitle = styled.h3`
  margin:0;
  font-size: 2rem;
`;
export const DateWrapper = styled.div`
  font-weight: bold;
`;
export const TitleWrapper = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: flex-start;
  width: 50%;
  height: 100%;
`;
export const LogoutBtn = styled(FontAwesomeIcon)`
  cursor: pointer;
  `;
export const UserNameWrapper = styled.div`
  width: 60%;
  font-weight: bold;
`;
export const UserCard = styled.div`
  width:171px;
  height:70px;
  border-radius:16px;
  margin-right:1rem;
  background-color: ${({ theme }) => theme.admin.userCardBackground};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`;
export const UserWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
`;
export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1rem;
  width: 100%;
  height: 106px;
`;
