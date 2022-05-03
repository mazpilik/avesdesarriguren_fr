import React, {
  FC, useEffect, useReducer,
} from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';
import { ListToolbar } from 'src/ui/_components/ListToolbar';
import { List } from 'src/ui/_components/List';
import { Paginator } from 'src/ui/_components/Paginator';

import { useNotificationHook } from 'src/ui/_functions/hooks/useNotificationHook';

import { i18nAtom, userAtom } from 'src/ui/_functions/atoms/atoms';

import { IGetFamilyById, familyService } from 'src/services/familyService';
import { familiesReducer, familiesActions } from './_functions/familiesReducer';

export const ListFamilies: FC = () => {
  const notifications = useNotificationHook();
  const i18n = useRecoilValue(i18nAtom);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const [familiesState, setFamiliesState] = useReducer(familiesReducer, {
    error: null,
    itemsPerpage: 10,
    listType: 'grid',
    loading: true,
    families: [],
    page: 1,
    sortBy: 'date',
    sortDirection: 'desc',
    totalPages: 1,
    totalRecords: 0,
    searchTerm: '',
  });

  const getFamilies = async () => {
    setFamiliesState({ type: familiesActions.setLogin, payload: true });
    try {
      const opts: IGetFamilyById = {
        page: familiesState.page,
        limit: familiesState.itemsPerpage,
        sortBy: familiesState.sortBy,
        sortDirection: familiesState.sortDirection,
        where: familiesState.searchTerm,
      };
      let families: any = [];

      families = await familyService.getFamilysBy(opts);

      setFamiliesState({ type: familiesActions.setFamilies, payload: families });
    } catch (error) {
      notifications.addErrorNotification(i18n.getFamiliesError);
    } finally {
      setFamiliesState({ type: familiesActions.setLogin, payload: false });
    }
  };

  const getPaginationValues = async () => {
    try {
      const totalRecords = await familyService.getTotalRecords(familiesState.searchTerm);
      const totalPages = Math.ceil(totalRecords / familiesState.itemsPerpage);
      setFamiliesState({
        type: familiesActions.setPaginationValues,
        payload: { totalRecords, totalPages },
      });
    } catch (error) {
      notifications.addErrorNotification(i18n.getTotalRecordsError);
    }
  };

  interface ISetListState {
    name: string;
    value: any;
  }
  const onSetListState = ({ name, value }: ISetListState) => {
    switch (name) {
      case 'itemsPerpage':
        setFamiliesState({ type: familiesActions.setItemsPerPage, payload: value });
        break;
      case 'listType':
        setFamiliesState({ type: familiesActions.setListType, payload: value });
        break;
      case 'sortBy':
        setFamiliesState({ type: familiesActions.setSortBy, payload: value });
        break;
      case 'sortDirection':
        setFamiliesState({ type: familiesActions.setSortDirection, payload: value });
        break;
      case 'page':
        setFamiliesState({ type: familiesActions.setPage, payload: value });
        break;
      case 'searchTerm':
        setFamiliesState({ type: familiesActions.setSearchTerm, payload: value });
        break;
      default:
        break;
    }
  };

  const deleteOrder = async (id: number) => {
    try {
      const response = await familyService.deleteRecord(id, user.token);

      if (response === 'DELETE_SUCCESS') {
        notifications.addSuccessNotification(i18n.deleteSuccess);
        getFamilies();
      } else {
        notifications.addErrorNotification(i18n.deleteError);
      }
    } catch (error) {
      notifications.addErrorNotification(i18n.deleteError);
    }
  };

  const onDelete = (id: number) => {
    deleteOrder(id);
  };

  const onGoToAddItem = () => {
    navigate('/shkud/family/add');
  };

  useEffect(() => {
    console.info('ListFamilies');
    getFamilies();
  }, [
    familiesState.page,
    familiesState.sortBy,
    familiesState.sortDirection,
    familiesState.itemsPerpage,
    familiesState.searchTerm,
  ]);

  useEffect(() => {
    getPaginationValues();
  }, [familiesState.families]);

  return (
    <AdminLayout sectionTitle={i18n.listFamiliesTitle}>
      <ListToolbar
        itemsPerpage={familiesState.itemsPerpage}
        listType={familiesState.listType}
        onGoToAddItem={onGoToAddItem}
        onSetListState={onSetListState}
        sortBy={familiesState.sortBy}
        sortDirection={familiesState.sortDirection}
        totalRecords={familiesState.totalPages}
      />
      <List
        isLoading={familiesState.loading}
        listItems={familiesState.families}
        listType={familiesState.listType}
        entity="family"
        onDelete={onDelete}
      />
      {familiesState.totalPages > 1 && (
        <Paginator
          page={familiesState.page}
          totalPages={familiesState.totalPages}
          onSetListState={onSetListState}
        />
      )}
    </AdminLayout>
  );
};
