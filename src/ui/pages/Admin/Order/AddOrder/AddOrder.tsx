import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';
import { SaveBtn } from 'src/ui/_components/Buttons/CustomButtons';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

import { ActionButtons } from './AddOrder.styles';

export const AddOrder = () => {
  const i18n = useRecoilValue(i18nAtom);
  const [orderName, setOrderName] = React.useState('');

  const handleSubmit = () => {
    console.log('orderName', orderName);
  };

  return (
    <AdminLayout sectionTitle={i18n.addOrderTitle}>
      <Card>
        <div className="p-float-label">
          <InputText id="ordername" autoFocus onChange={(e) => setOrderName(e.target.value)} name="ordername" value={orderName} />
          <label htmlFor="ordername">{i18n.orderLabel}</label>
        </div>
        <ActionButtons>
          <SaveBtn onClick={handleSubmit}>{i18n.saveBtn}</SaveBtn>
        </ActionButtons>
      </Card>
    </AdminLayout>
  );
};
