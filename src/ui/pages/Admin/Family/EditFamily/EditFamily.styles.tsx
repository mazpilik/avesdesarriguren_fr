import styled from 'styled-components/macro';
import { Card } from 'primereact/card';

export const ActionButtons = styled.div`
  margin-top: 2.5rem;
  button{
    &:first-of-type{
      margin-right: 1rem;
    }
  }
`;
export const FieldWrapper = styled.div`
  margin-bottom: 1rem;
`;
export const SectionCard = styled(Card)``;
