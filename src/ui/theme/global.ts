import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  .p-float-label{
    .p-dropdown.p-component {
      min-width: 250px;
    }
    .p-inputtext.p-component {
      min-width: 250px;
    }
  }
  .sh-field-wrapper{
    margin-bottom: 1.5rem;
  }
`;
