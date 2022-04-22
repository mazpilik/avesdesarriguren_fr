import React, { FC, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';
import { ListToolbar } from 'src/ui/_components/ListToolbar';

import { IGetOrderById, orderService } from 'src/services/orderService';

import { i18nAtom, toastAtom } from 'src/ui/_functions/atoms/atoms';

import { List } from 'src/ui/_components/List/List';
import { Paginator } from 'src/ui/_components/Paginator';

export const ListOrders: FC = () => {
  const i18n = useRecoilValue(i18nAtom);
  const setToast = useSetRecoilState(toastAtom);

  const [isInit, setIsInit] = useState(false);
  const [ordersState, setOrdersState] = useState({
    error: null,
    itemsPerpage: 10,
    listType: 'grid',
    loading: true,
    orders: [],
    page: 1,
    sortBy: 'date',
    sortDirection: 'asc',
    totalPages: 1,
    totalRecords: 0,
  });

  const getOrders = async () => {
    setOrdersState({ ...ordersState, loading: true });
    try {
      const opts: IGetOrderById = {
        page: ordersState.page,
        limit: ordersState.itemsPerpage,
        sortBy: ordersState.sortBy,
        sortDirection: ordersState.sortDirection,
      };

      const data = await orderService.getOrdersBy(opts);
      return data;
    } catch (error) {
      setToast({
        severity: 'error',
        summary: i18n.error,
        detail: i18n.getOrdersError,
      });
      return [];
    }
  };

  const initOrders = async () => {
    // get total pages
    const totalRecords = await orderService.getTotalRecords();
    // set state
    setOrdersState({
      ...ordersState,
      totalRecords,
    });
    setIsInit(true);
  };

  useEffect(() => {
    const totalPages = Math.ceil(ordersState.totalRecords / ordersState.itemsPerpage);
    setOrdersState({ ...ordersState, totalPages });
  }, [ordersState.totalRecords]);

  useEffect(() => {
    initOrders();
  }, []);

  useEffect(() => {
    (async () => {
      const orders = await getOrders();
      setOrdersState({
        ...ordersState,
        orders,
        loading: false,
      });
    })();
  }, [
    ordersState.page,
    ordersState.sortBy,
    ordersState.sortDirection,
    ordersState.itemsPerpage,
    isInit,
  ]);

  useEffect(() => {
    if (isInit) {
      const totalPages = Math.ceil(ordersState.totalRecords / ordersState.itemsPerpage);
      setOrdersState({
        ...ordersState,
        totalPages,
      });
    }
  }, [ordersState.orders]);

  useEffect(() => {
  }, [ordersState]);

  interface ISetListState {
    name: string;
    value: any;
  }
  const onSetListState = ({ name, value }: ISetListState) => {
    setOrdersState({ ...ordersState, [name]: value });
  };

  return (
    <AdminLayout sectionTitle={i18n.listOrdersTitle}>
      <ListToolbar listState={ordersState} onSetListState={onSetListState} />
      <List
        isLoading={ordersState.loading}
        listItems={ordersState.orders}
        listType={ordersState.listType}
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
