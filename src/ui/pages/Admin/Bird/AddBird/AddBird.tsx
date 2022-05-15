import React, { useReducer, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

import { BirdForSave } from 'src/domain/Bird';
import { birdService } from 'src/services/birdService';

import { useNotificationHook } from 'src/ui/_functions/hooks/useNotificationHook';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';
import { BasicInfo } from './_components/BasicInfo';
import { BirdCreationSteps, SectionCard } from './AddBird.styles';
import { BirdPhotos } from './_components/BirdPhotos';
import BirdData from './_components/BirdData';

import { addBirdReducer, addBirdsActions, defaultBirdState } from './_functions/addBirdReducer';
import { prepareDataForSaving } from './_functions/prepareDataForSaving';

export const AddBird = () => {
  const i18n = useRecoilValue(i18nAtom);
  const notifications = useNotificationHook();
  const [birdState, setBirdState] = useReducer(addBirdReducer, defaultBirdState);

  const stepsModel = [
    { label: i18n.basicInfo, icon: 'pi pi-fw pi-user' },
    { label: i18n.birdData, icon: 'pi pi-fw pi-plus' },
    { label: i18n.birdPhotos, icon: 'pi pi-fw pi-image' },
  ];

  const onSaveData = async () => {
    try {
      const data: BirdForSave = prepareDataForSaving(birdState);
      const response = await birdService.createBird(data);

      setBirdState({
        type: addBirdsActions.setId,
        payload: response,
      });
      notifications.addSuccessNotification(i18n.successBirdCreated);
    } catch (error) {
      notifications.addErrorNotification(i18n.errorSavingData);
    }
  };
  useEffect(() => {
    if (birdState.birdId) {
      setBirdState({
        type: addBirdsActions.setNextStep,
        payload: null,
      });
    }
  }, [birdState.birdId]);
  return (
    <AdminLayout sectionTitle={i18n.addBirdTitle}>
      <SectionCard>
        <BirdCreationSteps activeIndex={birdState.step} model={stepsModel} />
        {birdState.step === 0
          && (
            <BasicInfo
              basicData={birdState.basicInfo}
              frecuency={birdState.frecuency}
              months={birdState.months}
              onSetData={setBirdState}
            />
          )}
        {birdState.step === 1
          && (
            <BirdData
              aditionalInfos={birdState.aditionalInfos}
              onSaveData={onSaveData}
              onSetData={setBirdState}
            />
          )}
        {birdState.step === 2 && <BirdPhotos birdId={birdState.birdId} onSetData={setBirdState} />}
      </SectionCard>
    </AdminLayout>
  );
};
