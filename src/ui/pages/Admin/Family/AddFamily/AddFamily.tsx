import React, { useReducer } from 'react';
import { useRecoilValue } from 'recoil';
import lowerCase from 'lodash/lowerCase';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { SaveBtn } from 'src/ui/_components/Buttons/CustomButtons';

import { useNotificationHook } from 'src/ui/_functions/hooks/useNotificationHook';

import { i18nAtom, userAtom } from 'src/ui/_functions/atoms/atoms';

import { IFamily } from 'src/domain/Family';

import { familyService } from 'src/services/familyService';

import { useOrdersHook } from './_functions/useOrdersHook';

import { ActionButtons, FieldWrapper, SectionCard } from './AddFamily.styles';

import { addFamilyReducer, familyActions } from './_functions/addFamilyReducer';

export const AddFamily = () => {
  const notificationUtils = useNotificationHook();
  const ordersOptions: any = useOrdersHook();
  const [familyState, setFamilyState] = useReducer(addFamilyReducer, { order: 0, family: '' });

  const i18n = useRecoilValue(i18nAtom);
  const user = useRecoilValue(userAtom);

  const handleSubmit = async () => {
    try {
      const nFamily: IFamily = {
        orderId: familyState.order,
        name: familyState.family,
      };
      const response = await familyService.createFamily(nFamily, user.token);
      const message = await response.json();
      console.log('response', response);

      if (response.status === 200) {
        notificationUtils.addSuccessNotification(i18n[message]);
      } else {
        notificationUtils.addErrorNotification(i18n[message]);
      }
    } catch (error) {
      notificationUtils.addErrorNotification(i18n.createError);
    }
  };

  return (
    <AdminLayout sectionTitle={i18n.addOrderTitle}>
      <SectionCard>
        <FieldWrapper className="sh-field-wrapper p-float-label">
          <Dropdown
            id="ordername"
            options={ordersOptions}
            autoFocus
            onChange={(e) => setFamilyState({
              type: familyActions.setOrder,
              payload: e.target.value,
            })}
            name="ordername"
            value={familyState.order}
          />
          <label htmlFor="ordername">{i18n.orderLabel}</label>
        </FieldWrapper>
        <FieldWrapper className="sh-field-wrapper p-float-label">
          <InputText
            id="familyName"
            autoFocus
            onChange={(e) => setFamilyState({
              type: familyActions.setFamily,
              payload: lowerCase(e.target.value),
            })}
            name="familyName"
            value={familyState.family}
          />
          <label htmlFor="familyName">{i18n.familyLabel}</label>
        </FieldWrapper>
        <ActionButtons>
          <SaveBtn onClick={handleSubmit}>{i18n.saveBtn}</SaveBtn>
        </ActionButtons>
      </SectionCard>
    </AdminLayout>
  );
};
