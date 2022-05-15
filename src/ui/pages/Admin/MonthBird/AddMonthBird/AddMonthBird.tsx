import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';
import { Card } from 'primereact/card';
import { ActionButtons, FieldWrapper } from 'src/ui/_components/Form';
import { Dropdown } from 'primereact/dropdown';
import { birdService } from 'src/services/birdService';
import { SaveBtn, CancelBtn } from 'src/ui/_components/Buttons/CustomButtons';
import { monthBirdService } from 'src/services/monthBirdService';
import { useNotificationHook } from 'src/ui/_functions/hooks/useNotificationHook';
import { InputTextarea } from 'primereact/inputtextarea';
import { parseBirdsToModel } from '../_functions/parseBirdsToModel';

export const AddMonthBird = () => {
  const i18n = useRecoilValue(i18nAtom);
  const notifications = useNotificationHook();
  const navigate = useNavigate();

  const [month, setMonth] = useState();
  const [bird, setBird] = useState();
  const [contentEs, setContentEs] = useState('');
  const [contentEus, setContentEus] = useState('');
  const [birdsModel, setBirdsModel] = useState([]);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const monthsModel = [
    { label: i18n.january, value: '1' },
    { label: i18n.february, value: '2' },
    { label: i18n.march, value: '3' },
    { label: i18n.april, value: '4' },
    { label: i18n.may, value: '5' },
    { label: i18n.june, value: '6' },
    { label: i18n.july, value: '7' },
    { label: i18n.august, value: '8' },
    { label: i18n.september, value: '9' },
    { label: i18n.october, value: '10' },
    { label: i18n.november, value: '11' },
    { label: i18n.december, value: '12' },
  ];

  const getBirdsFromApi = async () => {
    const response = await birdService.findAllBirds();
    setBirdsModel(parseBirdsToModel(response));
  };

  const onSaveData = async () => {
    try {
      if (month && bird) {
        const birdId = bird;
        const saved = await monthBirdService.AddMonthBird({
          month, birdId, contentEs, contentEus,
        });
        if (saved) {
          notifications.addSuccessNotification(i18n.monthBirdSaved);
        } else {
          notifications.addErrorNotification(i18n.monthBirdSavedError);
        }
      }
    } catch (error) {
      notifications.addErrorNotification(i18n.monthBirdSavedError);
    }
  };

  useEffect(() => {
    if (month && bird && contentEs && contentEus) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [month, bird, contentEs, contentEus]);

  useLayoutEffect(() => {
    getBirdsFromApi();
  }, []);
  return (
    <AdminLayout sectionTitle={i18n.addMonthBirdSectionTitle}>
      <Card>
        <FieldWrapper className="sh-field-wrapper p-float-label">
          <Dropdown
            filter
            options={monthsModel}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <label>{i18n.monthLabel}</label>
        </FieldWrapper>
        <FieldWrapper className="sh-field-wrapper p-float-label">
          <Dropdown
            filter
            options={birdsModel}
            value={bird}
            onChange={(e) => setBird(e.target.value)}
          />
          <label>{i18n.birdLabel}</label>
        </FieldWrapper>
        <FieldWrapper className="sh-field-wrapper p-float-label">
          <InputTextarea value={contentEs} onChange={(e) => setContentEs(e.target.value)} />
          <label>{i18n.contentLabelEs}</label>
        </FieldWrapper>
        <FieldWrapper className="sh-field-wrapper p-float-label">
          <InputTextarea value={contentEus} onChange={(e) => { setContentEus(e.target.value); }} />
          <label>{i18n.contentLabelEus}</label>
        </FieldWrapper>
        <ActionButtons>
          <SaveBtn disabled={isSaveDisabled} onClick={onSaveData}>{i18n.save}</SaveBtn>
          <CancelBtn onClick={() => navigate(-1)}>{i18n.cancel}</CancelBtn>
        </ActionButtons>
      </Card>
    </AdminLayout>
  );
};
