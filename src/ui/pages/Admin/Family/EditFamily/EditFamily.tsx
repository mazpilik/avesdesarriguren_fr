import React, { useEffect, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import lowerCase from 'lodash/lowerCase';
import isEmpty from 'lodash/isEmpty';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { CancelBtn, SaveBtn } from 'src/ui/_components/Buttons/CustomButtons';

import { useNotificationHook } from 'src/ui/_functions/hooks/useNotificationHook';

import { i18nAtom, userAtom } from 'src/ui/_functions/atoms/atoms';

import { IFamily } from 'src/domain/Family';

import { familyService } from 'src/services/familyService';

import { useOrdersHook } from './_functions/useOrdersHook';

import { ActionButtons, FieldWrapper, SectionCard } from './EditFamily.styles';

import { addFamilyReducer, familyActions } from './_functions/addFamilyReducer';

export const EditFamily = () => {
  const navigate = useNavigate();
  const { familyId } = useParams();

  const notificationUtils = useNotificationHook();
  const ordersOptions: any = useOrdersHook();
  const [familyState, setFamilyState] = useReducer(addFamilyReducer, { id: 0, order: 0, family: '' });

  const i18n = useRecoilValue(i18nAtom);
  const user = useRecoilValue(userAtom);

  const handleSubmit = async () => {
    try {
      const nFamily: IFamily = {
        id: familyState.id,
        orderId: familyState.order,
        name: familyState.family,
      };
      const message = await familyService.updateFamily(nFamily, user.token);

      if (message === 'UPDATE_SUCCESS') {
        notificationUtils.addSuccessNotification(i18n[message]);
      } else {
        notificationUtils.addErrorNotification(i18n[message]);
      }
    } catch (error) {
      notificationUtils.addErrorNotification(i18n.createError);
    }
  };

  const fetchFamily = async () => {
    try {
      if (familyId) {
        const family = await familyService.getFamily(familyId);
        if (!isEmpty(family)) {
          setFamilyState({
            type: familyActions.setFamilyAndOrder,
            payload: { id: family.id, order: family.orderId, family: family.name },
          });
        }
      }
    } catch (error) {
      notificationUtils.addErrorNotification(i18n.updateError);
    }
  };

  useEffect(() => {
    fetchFamily();
  }, []);

  return (
    <AdminLayout sectionTitle={i18n.updateFamilyTitle}>
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
          <CancelBtn onClick={() => navigate(-1)}>{i18n.cancel}</CancelBtn>
        </ActionButtons>
      </SectionCard>
    </AdminLayout>
  );
};
