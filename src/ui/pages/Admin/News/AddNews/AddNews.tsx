import React, { useEffect, useReducer } from 'react';
import { useRecoilValue } from 'recoil';
import { newsService } from 'src/services/newsService';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';

import { i18nAtom, userAtom } from 'src/ui/_functions/atoms/atoms';
import { useNotificationHook } from 'src/ui/_functions/hooks/useNotificationHook';
import { NewsCreationSteps, SectionCard } from './AddNews.styles';
import { NewsData } from './_components/NewsData';
import { NewsPhotos } from './_components/NewsPhotos';
import { addNewsReducer, AddNewssActions, defaultNewsState } from './_functions/addNewsReducer';
import { parseNewsToSave } from './_functions/parseNewsToSave';

export const AddNews = () => {
  const i18n = useRecoilValue(i18nAtom);
  const user = useRecoilValue(userAtom);

  const notifications = useNotificationHook();

  const stepsModel = [
    { label: i18n.newsDataStep, icon: 'pi pi-fw pi-plus' },
    { label: i18n.newsPhotosStep, icon: 'pi pi-fw pi-image' },
  ];

  const [newsState, setNewsState] = useReducer(addNewsReducer, defaultNewsState);

  const onSaveData = async () => {
    const response = await newsService.create(parseNewsToSave(newsState));
    if (response) {
      setNewsState({
        type: AddNewssActions.setId,
        payload: response,
      });
      notifications.addSuccessNotification(i18n.newsCreated);
    } else {
      notifications.addErrorNotification(i18n.errorCreateNews);
    }
  };

  useEffect(() => {
    if (user) {
      setNewsState({
        type: AddNewssActions.setUserId,
        payload: user.id,
      });
    }
  }, []);

  useEffect(() => {
    if (newsState.newsId) {
      setNewsState({
        type: AddNewssActions.setNextStep,
        payload: null,
      });
    }
  }, [newsState.newsId]);

  return (
    <AdminLayout sectionTitle={i18n.addNewsTitle}>
      <SectionCard>
        <NewsCreationSteps activeIndex={newsState.step} model={stepsModel} />
        {newsState.step === 0
          && (
            <NewsData
              newsData={newsState.newsData}
              onSetData={setNewsState}
              onSaveData={onSaveData}
            />
          )}
        {
          newsState.step === 1
          && (
            <NewsPhotos
              newsId={newsState.newsId}
              onSetData={setNewsState}
            />
          )
        }
      </SectionCard>
    </AdminLayout>
  );
};
