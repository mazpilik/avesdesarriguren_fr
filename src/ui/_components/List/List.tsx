import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import uniqueId from 'lodash/uniqueId';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

import { DeleteBtn, EditBtn } from 'src/ui/_components/Buttons';
import { AdminCard } from '../AdminCard';

import { Actions, ListWrapper } from './List.style';

interface IListProps {
  listItems: any[];
  listType: string;
  isLoading: boolean;
  entity: string;
  // eslint-disable-next-line no-unused-vars
  onDelete: (id: number) => void;
}
export const List: FC<IListProps> = ({
  listItems, listType, isLoading, entity, onDelete,
}) => {
  const i18n = useRecoilValue(i18nAtom);

  const navigate = useNavigate();

  const navigateToEdit = (id: number) => {
    const route = `/shkud/${entity}/edit/${id}`;
    navigate(route);
  };

  return (
    <ListWrapper listType={listType} isLoading={isLoading}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        listItems.map((item: any) => (
          <AdminCard className="listCard" title={item.name} key={uniqueId()}>
            <Actions>
              <EditBtn onClick={() => navigateToEdit(item.id)}>{i18n.edit}</EditBtn>
              <DeleteBtn onClick={() => onDelete(item.id)}>{i18n.delete}</DeleteBtn>
            </Actions>
          </AdminCard>
        )))}
    </ListWrapper>
  );
};
