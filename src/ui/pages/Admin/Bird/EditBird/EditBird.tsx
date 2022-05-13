import React, { useEffect, useReducer } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';
import { birdService } from 'src/services/birdService';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';
import { BasicInfo } from './_components/BasicInfo';
import { BirdData } from './_components/BirdData';
import { SectionCard } from '../AddBird/AddBird.styles';

import { updateBirdReducer, defaultBirdState, updateBirdsActions } from './_functions/updateBirdReducer';
import { prepareDataForUpdate } from './_functions/prepareDataForUpdate';

export const EditBird = () => {
  const { birdId } = useParams();
  const i18n = useRecoilValue(i18nAtom);
  const [birdState, setBirdState] = useReducer(updateBirdReducer, defaultBirdState);

  const fetchBird = async () => {
    if (birdId) {
      const id = parseInt(birdId, 10);
      try {
        const bird = await birdService.getBirdById(id);
        setBirdState({
          type: updateBirdsActions.setAllState,
          payload: bird,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onSaveData = async () => {
    try {
      await birdService.updateBird(prepareDataForUpdate(birdState));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBird();
  }, []);

  useEffect(() => {
    console.log(birdState);
  }, [birdState]);

  return (
    <AdminLayout sectionTitle={i18n.editBirdSectionTitle}>
      <SectionCard>
        <BasicInfo
          basicData={birdState.basicInfo}
          frecuency={birdState.frecuency}
          months={birdState.months}
          onSetData={setBirdState}
        />
        <BirdData
          onSetData={setBirdState}
          aditionalInfos={birdState.aditionalInfos}
          onSaveData={onSaveData}
        />
      </SectionCard>
    </AdminLayout>
  );
};
