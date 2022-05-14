import React, { useEffect, useReducer } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';
import { birdService } from 'src/services/birdService';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';
import { CancelBtn, SaveBtn } from 'src/ui/_components/Buttons/CustomButtons';
import { ActionButtons } from 'src/ui/_components/Form';
import { PageSpinner } from 'src/ui/_components/PageSpinner';
import { BasicInfo } from './_components/BasicInfo';
import { BirdData } from './_components/BirdData';
import { BirdPhotos } from './_components/BirdPhotos';
import { SectionCard } from '../AddBird/AddBird.styles';

import { updateBirdReducer, defaultBirdState, updateBirdsActions } from './_functions/updateBirdReducer';
import { prepareDataForUpdate } from './_functions/prepareDataForUpdate';

export const EditBird = () => {
  const { birdId } = useParams();
  const i18n = useRecoilValue(i18nAtom);
  const navigate = useNavigate();
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
      fetchBird();
    } catch (err) {
      console.log(err);
    }
  };

  const onUploadImage = () => {
    fetchBird();
  };

  useEffect(() => {
    fetchBird();
  }, []);

  if (!birdState.basicInfo.name) {
    return (<PageSpinner />);
  }

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
        />
        <BirdPhotos
          birdId={birdState.birdId}
          photos={birdState.images}
          onSetData={setBirdState}
          onUploadImage={onUploadImage}
        />
        <ActionButtons>
          <CancelBtn onClick={() => onUploadImage()}>{i18n.reloadDataBtn}</CancelBtn>
          <SaveBtn onClick={onSaveData}>{i18n.save}</SaveBtn>
          <CancelBtn onClick={() => navigate(-1)}>{i18n.cancel}</CancelBtn>
        </ActionButtons>
      </SectionCard>
    </AdminLayout>
  );
};
