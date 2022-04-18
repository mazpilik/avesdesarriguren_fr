import styled from 'styled-components/macro';
import { Card } from 'primereact/card';

export const AdminCardWrapper = styled(Card)`
  .p-card-body{
    .p-card-title{
      font-size: 4rem;
      margin:0;
      color: ${({ theme }) => theme.admin.titleColor};
    }
    .p-card-subtitle{
      font-size: 2rem;
      margin:0;
      line-height: 1rem;
      font-weight: bold;
      color: ${({ theme }) => theme.admin.mainTextColor};
    }
    .p-card-content{
      font-size: 1.2rem;
      line-height: 1.5rem;
    }
    .p-card-footer{
      button{
        margin-right: 0.5rem;
        &:last-of-type{
          margin-right: 0;
        }
      }
    }
  }
`;
