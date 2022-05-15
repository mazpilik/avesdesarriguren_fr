import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import isEmpty from 'lodash/isEmpty';
import { useNotificationHook } from 'src/ui/_functions/hooks/useNotificationHook';
import { monthBirdService } from 'src/services/monthBirdService';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';
import { List } from 'src/ui/_components/List';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

export const ListMonthBird = () => {
  const i18n = useRecoilValue(i18nAtom);
  const notification = useNotificationHook();
  const [items, setItems] = useState<any[]>([]);
  const fetchMonthBirds = async () => {
    try {
      const monthBird = await monthBirdService.getMonthBird();

      if (!isEmpty(monthBird)) {
        const monthBirds: any[] = [];
        monthBirds.push(monthBird);
        setItems(monthBirds);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      const response = await monthBirdService.deleteMonthBird(items[0].id);
      if (response === 'SUCCESS_DELETE_MONTH_BIRD') {
        notification.addSuccessNotification(i18n.monthBirdDeleteSuccess);
      } else {
        notification.addErrorNotification(i18n.monthBirdDeleteError);
      }
    } catch (error) {
      notification.addErrorNotification(i18n.monthBirdDeleteError);
    } finally {
      fetchMonthBirds();
    }
  };

  useEffect(() => {
    fetchMonthBirds();
  }, []);
  return (
    <AdminLayout sectionTitle={i18n.monthBirdListingSectionTitle}>
      <List
        entity="monthBird"
        isLoading={false}
        listType="grid"
        listItems={items}
        onDelete={onDelete}
      />
    </AdminLayout>
  );
};
