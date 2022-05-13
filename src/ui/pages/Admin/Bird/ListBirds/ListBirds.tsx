import React, { useEffect, useReducer } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';
import { ListToolbar } from 'src/ui/_components/ListToolbar';
import { List } from 'src/ui/_components/List';
import { Paginator } from 'src/ui/_components/Paginator';

import { useNotificationHook } from 'src/ui/_functions/hooks/useNotificationHook';

import { i18nAtom, userAtom } from 'src/ui/_functions/atoms/atoms';
import { birdService } from 'src/services/birdService';

import { ListSorted } from 'src/domain/ListingTypes';
import { listReducer, defaultListState, listActions } from './_functions/listReducer';

export const ListBirds = () => {
  const notifications = useNotificationHook();
  const i18n = useRecoilValue(i18nAtom);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const [listState, setListState] = useReducer(listReducer, defaultListState);

  const getBirds = async () => {
    setListState({ type: listActions.setLoading, payload: true });
    try {
      const opts: ListSorted = {
        page: listState.page,
        limit: listState.itemsPerpage,
        sortBy: listState.sortBy,
        sortDirection: listState.sortDirection,
        where: listState.searchTerm,
      };
      let birds: any = [];

      birds = await birdService.getBirdsBy(opts, user.lang);

      setListState({ type: listActions.setBirds, payload: birds });
    } catch (error) {
      notifications.addErrorNotification(i18n.getBirdsError);
    } finally {
      setListState({ type: listActions.setLoading, payload: false });
    }
  };

  const onGoToAddBird = () => {
    navigate('/shkud/birds/add');
  };

  const onDeleteBird = async (id: number) => {
    try {
      const response = await birdService.deleteBird(id);
      if (response.status === 200) {
        notifications.addSuccessNotification(i18n.deleteBirdSuccess);
        getBirds();
      } else {
        notifications.addErrorNotification(i18n.deleteBirdError);
      }
    } catch (error) {
      notifications.addErrorNotification(i18n.getOrdersError);
    }
  };

  interface ISetListState {
    name: string;
    value: any;
  }
  const onSetListState = ({ name, value }: ISetListState) => {
    switch (name) {
      case 'itemsPerpage':
        setListState({ type: listActions.setItemsPerPage, payload: value });
        break;
      case 'listType':
        setListState({ type: listActions.setListType, payload: value });
        break;
      case 'sortBy':
        setListState({ type: listActions.setSortBy, payload: value });
        break;
      case 'sortDirection':
        setListState({ type: listActions.setSortDirection, payload: value });
        break;
      case 'page':
        setListState({ type: listActions.setPage, payload: value });
        break;
      case 'searchTerm':
        setListState({ type: listActions.setSearchTerm, payload: value });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getBirds();
  }, [
    listState.itemsPerpage,
    listState.sortBy,
    listState.sortDirection,
    listState.page,
    listState.searchTerm,
  ]);

  return (
    <AdminLayout sectionTitle={i18n.birdsListingTitle}>
      <ListToolbar
        itemsPerpage={listState.itemsPerpage}
        listType={listState.listType}
        onGoToAddItem={onGoToAddBird}
        onSetListState={onSetListState}
        sortBy={listState.sortBy}
        sortDirection={listState.sortDirection}
        totalRecords={listState.totalRecords}
      />
      <List
        listType={listState.listType}
        isLoading={listState.loading}
        listItems={listState.birds}
        entity="bird"
        onDelete={onDeleteBird}
      />
      <Paginator
        page={listState.page}
        totalPages={listState.totalPages}
        onSetListState={onSetListState}
      />
    </AdminLayout>
  );
};
