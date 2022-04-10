import styled from 'styled-components';

export const FieldWrapper = styled.div``;
export const ActionButtonsWrapper = styled.div``;
export const LoginWrapper = styled.div``;
export const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #efefef;
  ${LoginWrapper} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 2rem;
    border-radius: 5px;
    ${FieldWrapper} {
      &:first-of-type{
        margin-bottom: 1.5rem;
      }
    }
    ${ActionButtonsWrapper} {
      display: flex;
      flex-direction: row;
      margin-top: 2rem;
      width: 100%;
     .p-button{
       width: 100%;
     }
    };
  }  
`;
