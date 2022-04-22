import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import uniqueId from 'lodash/uniqueId';

import { DeleteBtn, EditBtn } from 'src/ui/_components/Buttons';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

import { AdminCard } from '../AdminCard';

import { Actions, ListWrapper } from './List.style';

interface Props {
  listItems: any[];
  listType: string;
  isLoading: boolean;
}
export const List: FC<Props> = ({ listItems, listType, isLoading }) => {
  const i18n = useRecoilValue(i18nAtom);
  return (
    <ListWrapper listType={listType} isLoading={isLoading}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        listItems.map((item: any) => (
          <AdminCard className="listCard" title={item.name} key={uniqueId()}>
            <Actions>
              <EditBtn>{i18n.edit}</EditBtn>
              <DeleteBtn>{i18n.delete}</DeleteBtn>
            </Actions>
          </AdminCard>
        )))}
    </ListWrapper>
  );
};
