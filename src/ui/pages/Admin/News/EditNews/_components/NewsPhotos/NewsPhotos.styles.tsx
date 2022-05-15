import styled, { css } from 'styled-components/macro';

export const ImagesWrapper = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  `;
interface Iimages {
  checked: boolean;
}
export const BirdImageElement = styled.img<Iimages>`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 1rem;
  ${({ checked }) => !checked && css`
    filter: saturate(0%);
  `}  
`;
