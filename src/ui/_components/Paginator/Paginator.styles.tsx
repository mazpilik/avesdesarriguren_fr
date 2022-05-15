import { InputText } from 'primereact/inputtext';
import styled from 'styled-components/macro';

export const TotalPages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding:12px;
  width:3rem;
  height:100%;
  border-radius:5px;
  border:1px solid ${({ theme }) => theme.admin.ElementsBorder};
  background-color: ${({ theme }) => theme.admin.ElementsBackground};

`;
export const PageNumber = styled(InputText)`
  display: flex;;
  width: 40px;
`;
export const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width:100%;
`;
