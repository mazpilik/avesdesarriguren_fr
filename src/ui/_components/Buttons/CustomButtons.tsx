import styled from 'styled-components/macro';

export const AdminBtn = styled.button`
  border:none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  font-weight: bold; ;
  color: ${({ theme }) => theme.admin.textColor};
  cursor: pointer;
`;
export const AddBtn = styled(AdminBtn)`
  
    background-color: ${({ theme }) => theme.admin.AddBtnColor.default};
    &:hover{
      background-color: ${({ theme }) => theme.admin.AddBtnColor.default};
    }
    &:disabled{
      background-color: ${({ theme }) => theme.admin.AddBtnColor.disabled};
    }
  
`;
export const SaveBtn = styled(AdminBtn)`
  
    background-color: ${({ theme }) => theme.admin.AddBtnColor.default};
    &:hover{
      background-color: ${({ theme }) => theme.admin.AddBtnColor.default};
    }
    &:disabled{
      background-color: ${({ theme }) => theme.admin.AddBtnColor.disabled};
      opacity: 0.5;
    }
  
`;
export const EditBtn = styled(AdminBtn)`
   background-color: ${({ theme }) => theme.admin.EditBtnColor.default};
    &:hover{
      background-color: ${({ theme }) => theme.admin.EditBtnColor.default};
    }
    &:disabled{
      background-color: ${({ theme }) => theme.admin.EditBtnColor.disabled};
      opacity: 0.5;
    }
`;
export const DeleteBtn = styled(AdminBtn)`
   background-color: ${({ theme }) => theme.admin.DeleteBtnColor.default};
    &:hover{
      background-color: ${({ theme }) => theme.admin.DeleteBtnColor.default};
    }
    &:disabled{
      background-color: ${({ theme }) => theme.admin.DeleteBtnColor.disabled};
      opacity: 0.5;
    }
`;
export const CancelBtn = styled(AdminBtn)`
   background-color: ${({ theme }) => theme.admin.CancelBtnColor.default};
    &:hover{
      background-color: ${({ theme }) => theme.admin.CancelBtnColor.default};
    }
    &:disabled{
      background-color: ${({ theme }) => theme.admin.CancelBtnColor.disabled};
      opacity: 0.5;
    }
`;
