import styled from 'styled-components/macro';

export const BodyWrapper = styled.div`
  padding: 4rem;
`;
interface IContentWrapper {
  isOpen: boolean;
}
export const ContentWrapper = styled.div<IContentWrapper>`
 margin-left: ${({ isOpen }) => (isOpen ? '288px' : '96px')};
 `;
export const AdminLayoutWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  ${ContentWrapper} {
    display: flex;
    flex-direction: column;
    width: 100%;
    ${BodyWrapper} {
      flex: auto 1;
      background-color: ${({ theme }) => theme.admin.bodyBackground};
    }
  }
`;
