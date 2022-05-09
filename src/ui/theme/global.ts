import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  .p-float-label{
    .p-dropdown.p-component {
      min-width: 500px;
    }
    .p-inputtext.p-component {
      min-width: 500px;
    }
    .p-inputtextarea.p-component {
      min-width: 500px;
      min-height: 250px;
    }
    .p-multiselect.p-component {
      min-width: 500px;
    }
  }
  .sh-field-wrapper{
    margin-bottom: 3rem;
  }
`;
