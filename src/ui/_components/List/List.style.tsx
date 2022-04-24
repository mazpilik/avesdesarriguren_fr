import styled, { css } from 'styled-components/macro';
import { EditBtn } from 'src/ui/_components/Buttons';

interface WrapperProps {
  listType: string;
  isLoading: boolean;
}
export const Actions = styled.div``;
export const ListWrapper = styled.div<WrapperProps>`
  display: flex;
  margin-bottom: 2rem;
  ${({ listType, isLoading }) => {
    if (isLoading) {
      return css`
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      `;
    }
    switch (listType) {
      case 'grid':
        return css`
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 1.6rem;
          .listCard{
            flex:1 auto;
            width: 32%;
            min-width: 300px;
            max-width: 400px;
          }
        `;
      default:
        return css`
          flex-direction: column;
          .listCard{
            width: 100%;
            margin-bottom: 1rem;
            ${Actions} {
              display: flex;
              justify-content: flex-end;
            }
          }
        `;
    }
  }}
  .listCard{
    .p-card-body{
      .p-card-title{
        font-size:2rem;
      }
    }
    ${Actions} {
      ${EditBtn}{
        margin-right: 1rem;
      }
    }
  }
`;