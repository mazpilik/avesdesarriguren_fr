import { Card } from 'primereact/card';
import styled from 'styled-components/macro';

export const HomeCards = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 50%;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.public.greenCards};
  h3{
    font-size: 2rem;
    color: ${({ theme }) => theme.public.title1};
  }
  .p-card-content{
    display: flex;
    flex-direction: column;
    img{
      width:50%;
      align-self: center;
      margin: 2rem 0;
    }
    button{
      align-self: center;
    }
  }
`;
export const CardWrapper = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: row;
  gap: 4rem;
  align-items: space-between;
`;
