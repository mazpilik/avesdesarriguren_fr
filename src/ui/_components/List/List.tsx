import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import uniqueId from 'lodash/uniqueId';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

import { DeleteBtn, EditBtn } from 'src/ui/_components/Buttons';
import { AdminCard } from '../AdminCard';

import { Actions, ListWrapper, ListItemImage } from './List.style';

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

  const getTitle = (item: any) => {
    switch (entity) {
      case 'news':
        return item.title;
      default:
        return item.name;
    }
  };

  const getSubtitle = (item: any) => {
    switch (entity) {
      case 'family':
        return item.orderName;
      case 'bird':
        return `${item.orderName} / ${item.familyName}`;
      case 'news':
        return item.subtitle;
      default:
        return '';
    }
  };

  const getImage = (item: any) => {
    switch (entity) {
      case 'bird':
        return (<ListItemImage src={`${process.env.REACT_APP_API_URL}/images/birds/${item.images[0].img}`} alt="bird" />);
      case 'news':
        return item.img ? (<ListItemImage src={`${process.env.REACT_APP_API_URL}/images/news/${item.img}`} alt="news" />) : null;
      default:
        return '';
    }
  };

  if (listItems.length === 0 && !isLoading) {
    return (
      <ListWrapper listType={listType} isLoading={isLoading}>
        <p>{i18n.noListItems}</p>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper listType={listType} isLoading={isLoading}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        listItems.map((item: any) => (
          <AdminCard className="listCard" title={getTitle(item)} subTitle={getSubtitle(item)} key={uniqueId()}>
            {getImage(item)}
            <Actions>
              <EditBtn onClick={() => navigateToEdit(item.id)}>{i18n.edit}</EditBtn>
              <DeleteBtn onClick={() => onDelete(item.id)}>{i18n.delete}</DeleteBtn>
            </Actions>
          </AdminCard>
        )))}
    </ListWrapper>
  );
};
