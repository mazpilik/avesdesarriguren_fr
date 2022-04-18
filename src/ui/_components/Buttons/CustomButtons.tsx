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
  
`;
export const EditBtn = styled(AdminBtn)`
   background-color: ${({ theme }) => theme.admin.EditBtnColor.default};
    &:hover{
      background-color: ${({ theme }) => theme.admin.EditBtnColor.default};
    }
`;
export const DeleteBtn = styled(AdminBtn)`
   background-color: ${({ theme }) => theme.admin.DeleteBtnColor.default};
    &:hover{
      background-color: ${({ theme }) => theme.admin.DeleteBtnColor.default};
    }
`;
