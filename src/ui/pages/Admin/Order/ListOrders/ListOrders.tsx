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

import { IGetOrderById, orderService } from 'src/services/orderService';
import { ordersReducer, ordersActions } from './_functions/OrdersReducer';

export const ListOrders: FC = () => {
  const notifications = useNotificationHook();
  const i18n = useRecoilValue(i18nAtom);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const [ordersState, setOrdersState] = useReducer(ordersReducer, {
    error: null,
    itemsPerpage: 10,
    listType: 'grid',
    loading: true,
    orders: [],
    page: 1,
    sortBy: 'date',
    sortDirection: 'desc',
    totalPages: 1,
    totalRecords: 0,
    searchTerm: '',
  });

  const getOrders = async () => {
    setOrdersState({ type: ordersActions.setLogin, payload: true });
    try {
      const opts: IGetOrderById = {
        page: ordersState.page,
        limit: ordersState.itemsPerpage,
        sortBy: ordersState.sortBy,
        sortDirection: ordersState.sortDirection,
        where: ordersState.searchTerm,
      };
      let orders: any = [];

      orders = await orderService.getOrdersBy(opts);

      setOrdersState({ type: ordersActions.setOrders, payload: orders });
    } catch (error) {
      notifications.addErrorNotification(i18n.getOrdersError);
    } finally {
      setOrdersState({ type: ordersActions.setLogin, payload: false });
    }
  };

  const getPaginationValues = async () => {
    try {
      const totalRecords = await orderService.getTotalRecords(ordersState.searchTerm);
      const totalPages = Math.ceil(totalRecords / ordersState.itemsPerpage);
      setOrdersState({
        type: ordersActions.setPaginationValues,
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
        setOrdersState({ type: ordersActions.setItemsPerPage, payload: value });
        break;
      case 'listType':
        setOrdersState({ type: ordersActions.setListType, payload: value });
        break;
      case 'sortBy':
        setOrdersState({ type: ordersActions.setSortBy, payload: value });
        break;
      case 'sortDirection':
        setOrdersState({ type: ordersActions.setSortDirection, payload: value });
        break;
      case 'page':
        setOrdersState({ type: ordersActions.setPage, payload: value });
        break;
      case 'searchTerm':
        setOrdersState({ type: ordersActions.setSearchTerm, payload: value });
        break;
      default:
        break;
    }
  };

  const deleteOrder = async (id: number) => {
    try {
      const response = await orderService.deleteRecord(id, user.token);

      if (response === 'DELETE_SUCCESS') {
        notifications.addSuccessNotification(i18n.deleteSuccess);
        getOrders();
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
    navigate('/shkud/order/add');
  };

  useEffect(() => {
    getOrders();
  }, [
    ordersState.page,
    ordersState.sortBy,
    ordersState.sortDirection,
    ordersState.itemsPerpage,
    ordersState.searchTerm,
  ]);

  useEffect(() => {
    getPaginationValues();
  }, [ordersState.orders]);

  return (
    <AdminLayout sectionTitle={i18n.listOrdersTitle}>
      <ListToolbar
        itemsPerpage={ordersState.itemsPerpage}
        listType={ordersState.listType}
        onGoToAddItem={onGoToAddItem}
        onSetListState={onSetListState}
        sortBy={ordersState.sortBy}
        sortDirection={ordersState.sortDirection}
        totalRecords={ordersState.totalPages}
      />
      <List
        isLoading={ordersState.loading}
        listItems={ordersState.orders}
        listType={ordersState.listType}
        entity="order"
        onDelete={onDelete}
      />
      {ordersState.totalPages > 1 && (
        <Paginator
          page={ordersState.page}
          totalPages={ordersState.totalPages}
          onSetListState={onSetListState}
        />
      )}
    </AdminLayout>
  );
};
