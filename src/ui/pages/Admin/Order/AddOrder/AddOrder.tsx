import React from 'react';
import { useRecoilValue } from 'recoil';
import lowerCase from 'lodash/lowerCase';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { SaveBtn } from 'src/ui/_components/Buttons/CustomButtons';

import { useNotificationHook } from 'src/ui/_functions/hooks/useNotificationHook';

import { i18nAtom, userAtom } from 'src/ui/_functions/atoms/atoms';

import { IOrder } from 'src/domain/Order';

import { orderService } from 'src/services/orderService';

import { ActionButtons } from './AddOrder.styles';

export const AddOrder = () => {
  const notificationUtils = useNotificationHook();

  const i18n = useRecoilValue(i18nAtom);
  const user = useRecoilValue(userAtom);

  const [orderName, setOrderName] = React.useState('');

  const onSetOrderName = (e: any) => {
    // to lowercase with lodash
    const rOrderName = lowerCase(e.target.value);
    // remove all whitespaces
    setOrderName(rOrderName.replace(/\s/g, ''));
  };

  const handleSubmit = async () => {
    try {
      const nOrder: IOrder = {
        name: orderName,
      };
      const response = await orderService.createOrder(nOrder, user.token);
      if (response.status === 200) {
        const message = await response.json();
        if (message === 'CREATE_SUCCESS') {
          notificationUtils.addSuccessNotification(i18n.createSuccess);
        }

        if (message === 'CREATE_ERROR_DUPLICATED') {
          notificationUtils.addErrorNotification(i18n.createDuplicatedError);
        }
      }
    } catch (error) {
      notificationUtils.addErrorNotification(i18n.createError);
    }
  };

  return (
    <AdminLayout sectionTitle={i18n.addOrderTitle}>
      <Card>
        <div className="p-float-label">
          <InputText id="ordername" autoFocus onChange={onSetOrderName} name="ordername" value={orderName} />
          <label htmlFor="ordername">{i18n.orderLabel}</label>
        </div>
        <ActionButtons>
          <SaveBtn onClick={handleSubmit}>{i18n.saveBtn}</SaveBtn>
        </ActionButtons>
      </Card>
    </AdminLayout>
  );
};
