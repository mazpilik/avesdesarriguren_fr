import React from 'react';
import { useRecoilValue } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';
import lowerCase from 'lodash/lowerCase';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { CancelBtn, SaveBtn } from 'src/ui/_components/Buttons/CustomButtons';

import { useNotificationHook } from 'src/ui/_functions/hooks/useNotificationHook';

import { i18nAtom, userAtom } from 'src/ui/_functions/atoms/atoms';

import { IOrder } from 'src/domain/Order';

import { orderService } from 'src/services/orderService';

import { ActionButtons } from './EditOrder.styles';

export const EditOrder = () => {
  const navigate = useNavigate();
  const notificationUtils = useNotificationHook();
  const { orderId } = useParams();

  const i18n = useRecoilValue(i18nAtom);
  const user = useRecoilValue(userAtom);

  const [orderState, setOrderState] = React.useState({} as IOrder);

  const fetchOrder = async () => {
    if (orderId) {
      const order = await orderService.getOrder(orderId);
      setOrderState(order);
    }
  };

  React.useEffect(() => {
    fetchOrder();
  }, []);

  const onSetOrderName = (e: any) => {
    // to lowercase with lodash
    const rOrderName = lowerCase(e.target.value);
    // remove all whitespaces
    setOrderState({
      ...orderState,
      name: rOrderName.replace(/\s/g, ''),
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await orderService.updateOrder(orderState, user.token);
      if (response.status === 200) {
        const message = await response.json();
        if (message === 'CREATE_SUCCESS') {
          notificationUtils.addNotification({
            severity: 'success',
            summary: i18n.success,
            detail: i18n.createSuccess,
          });
        }
      }
    } catch (error) {
      notificationUtils.addNotification({
        severity: 'error',
        summary: i18n.error,
        detail: i18n.updateError,
      });
    }
  };

  return (
    <AdminLayout sectionTitle={i18n.addOrderTitle}>
      <Card>
        <div className="p-float-label">
          <InputText id="ordername" autoFocus onChange={onSetOrderName} name="ordername" value={orderState.name} />
          <label htmlFor="ordername">{i18n.orderLabel}</label>
        </div>
        <ActionButtons>
          <SaveBtn onClick={handleSubmit}>{i18n.updateBtn}</SaveBtn>
          <CancelBtn onClick={() => navigate(-1)}>{i18n.cancel}</CancelBtn>
        </ActionButtons>
      </Card>
    </AdminLayout>
  );
};
