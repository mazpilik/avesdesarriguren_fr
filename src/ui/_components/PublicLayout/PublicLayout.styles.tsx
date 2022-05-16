import styled from 'styled-components/macro';

export const SectionWrapper = styled.section`
  width: 100%;
  max-width: 1281px;
  background-color: ${({ theme }) => theme.public.sectionsBackground};
  border-radius: 25px;
  padding: 4rem;
  margin-top: 4rem;
`;
export const PublicLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 auto;
  width: 100%;
  background-color: ${({ theme }) => theme.public.pageBackground};
`;
