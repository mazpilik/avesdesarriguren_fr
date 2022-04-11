import styled from 'styled-components/macro';

export const Title = styled.h3`
  margin:0;
`;
export const SectionTitle = styled.h3`
  margin:0;
`;
export const TitleWrapper = styled.div`
  display: flex;
  width: 50%;
`;
export const UserName = styled.h3`
  margin:0;
`;
export const UserWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  ${UserName} {
    margin-right: 1rem;
  }
`;
export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1rem;
  width: 100%;
  height: 10%;
  border-bottom: 1px solid #ccc;
`;
