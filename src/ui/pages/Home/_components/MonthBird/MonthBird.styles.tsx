import styled from 'styled-components/macro';

export const MonthBirdWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  article{
    h2{
      font-size: 3rem;
      color: ${({ theme }) => theme.public.title1};
    }
  }
  img{
    width: 578px;
    height: 399px;
    object-fit: cover;
  }
`;
