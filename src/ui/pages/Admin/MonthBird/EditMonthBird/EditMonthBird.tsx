import React, { useEffect, useReducer, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { monthBirdService } from 'src/services/monthBirdService';
import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';
import { CancelBtn, SaveBtn } from 'src/ui/_components/Buttons/CustomButtons';
import { ActionButtons, FieldWrapper } from 'src/ui/_components/Form';
import { InputText } from 'primereact/inputtext';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';
import { birdService } from 'src/services/birdService';
import { useNotificationHook } from 'src/ui/_functions/hooks/useNotificationHook';
import { monthBirdUpdateReducer, mbDefaultState, MonthBirdActionType } from './_functions/monthBirdUpdateReducer';
import { parseBirdsToModel } from '../_functions/parseBirdsToModel';

export const EditMonthBird = () => {
  const i18n = useRecoilValue(i18nAtom);
  const navigate = useNavigate();
  const notifications = useNotificationHook();
  const [mbState, setMbState] = useReducer(monthBirdUpdateReducer, mbDefaultState);
  const [birdsModel, setBirdsModel] = useState([]);

  const monthsModel = [
    { label: i18n.january, value: 1 },
    { label: i18n.february, value: 2 },
    { label: i18n.march, value: 3 },
    { label: i18n.april, value: 4 },
    { label: i18n.may, value: 5 },
    { label: i18n.june, value: 6 },
    { label: i18n.july, value: 7 },
    { label: i18n.august, value: 8 },
    { label: i18n.september, value: 9 },
    { label: i18n.october, value: 10 },
    { label: i18n.november, value: 11 },
    { label: i18n.december, value: 12 },
  ];

  const fetchMonthBirds = async () => {
    try {
      const monthBird = await monthBirdService.getMonthBird();
      if (monthBird) {
        setMbState({
          type: MonthBirdActionType.setState,
          payload: {
            id: monthBird.id,
            birdId: monthBird.birdId,
            month: monthBird.month,
            name: monthBird.name,
            titleEs: monthBird.title_es,
            titleEus: monthBird.title_eus,
            contentEs: monthBird.content_es,
            contentEus: monthBird.content_eus,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBirdsFromApi = async () => {
    const response = await birdService.findAllBirds();
    setBirdsModel(parseBirdsToModel(response));
  };

  const onSaveData = async () => {
    try {
      await monthBirdService.EditMonthBird(mbState);
      notifications.addSuccessNotification(i18n.monthBirdUpdated);
    } catch (error) {
      notifications.addErrorNotification(i18n.errorUpdatingMonthBird);
    }
  };

  useEffect(() => {
    fetchMonthBirds();
    getBirdsFromApi();
  }, []);

  return (
    <AdminLayout sectionTitle={i18n.monthBirdEditSectionTitle}>
      <Card>
        <FieldWrapper className="sh-field-wrapper p-float-label">
          <Dropdown
            filter
            options={monthsModel}
            value={mbState.month}
            onChange={(e) => setMbState({
              type: MonthBirdActionType.monthBirdUpdate,
              payload: {
                key: 'month',
                value: e.target.value,
              },
            })}
          />
          <label>{i18n.monthLabel}</label>
        </FieldWrapper>
        <FieldWrapper className="sh-field-wrapper p-float-label">
          <Dropdown
            filter
            options={birdsModel}
            value={mbState.birdId}
            onChange={(e) => setMbState({
              type: MonthBirdActionType.monthBirdUpdate,
              payload: {
                key: 'birdId',
                value: e.target.value,
              },
            })}
          />
          <label>{i18n.birdLabel}</label>
        </FieldWrapper>
        <FieldWrapper className="sh-field-wrapper p-float-label">
          <InputText
            value={mbState.titleEs}
            onChange={(e) => setMbState({
              type: MonthBirdActionType.monthBirdUpdate,
              payload: {
                key: 'titleEs',
                value: e.target.value,
              },
            })}
          />
          <label>{i18n.titleEsLabel}</label>
        </FieldWrapper>
        <FieldWrapper className="sh-field-wrapper p-float-label">
          <InputText
            value={mbState.titleEus}
            onChange={(e) => setMbState({
              type: MonthBirdActionType.monthBirdUpdate,
              payload: {
                key: 'titleEus',
                value: e.target.value,
              },
            })}
          />
          <label>{i18n.titleEusLabel}</label>
        </FieldWrapper>
        <FieldWrapper className="sh-field-wrapper p-float-label">
          <InputTextarea
            value={mbState.contentEs}
            onChange={(e) => setMbState({
              type: MonthBirdActionType.monthBirdUpdate,
              payload: {
                key: 'contentEs',
                value: e.target.value,
              },
            })}
          />
          <label>{i18n.contentLabelEs}</label>
        </FieldWrapper>
        <FieldWrapper className="sh-field-wrapper p-float-label">
          <InputTextarea
            value={mbState.contentEus}
            onChange={(e) => {
              setMbState({
                type: MonthBirdActionType.monthBirdUpdate,
                payload: {
                  key: 'contentEus',
                  value: e.target.value,
                },
              });
            }}
          />
          <label>{i18n.contentLabelEus}</label>
        </FieldWrapper>
        <ActionButtons>
          <SaveBtn onClick={onSaveData}>{i18n.save}</SaveBtn>
          <CancelBtn onClick={() => navigate(-1)}>{i18n.cancel}</CancelBtn>
        </ActionButtons>
      </Card>
    </AdminLayout>
  );
};
