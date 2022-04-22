import styled from 'styled-components/macro';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'primereact/dropdown';

export const SortOrder = styled(Dropdown)``;
export const OrderBy = styled(Dropdown)`
  width: 200px;
`;
export const ItemsPerPage = styled(Dropdown)``;

export const ListType = styled(FontAwesomeIcon)`
  font-size: 2rem;
  cursor: pointer;
`;
export const Sorting = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap:1rem;
  width: 40%;
`;
export const Filters = styled.div``;
export const ToolbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding:1rem;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.admin.ElementsBackground};
  margin-bottom: 2rem;
`;
