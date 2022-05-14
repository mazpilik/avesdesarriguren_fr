import React, { useReducer } from 'react';
import { useRecoilValue } from 'recoil';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';
import { NewsCreationSteps, SectionCard } from './AddNews.styles';
import { NewsData } from './_components/NewsData';
import { addNewsReducer, defaultNewsState } from './_functions/addNewsReducer';

export const AddNews = () => {
  const i18n = useRecoilValue(i18nAtom);
  const [newsState, setNewsState] = useReducer(addNewsReducer, defaultNewsState);
  const stepsModel = [
    { label: i18n.newsDataStep, icon: 'pi pi-fw pi-plus' },
    { label: i18n.newsPhotosStep, icon: 'pi pi-fw pi-image' },
  ];
  return (
    <AdminLayout sectionTitle={i18n.addNewsTitle}>
      <SectionCard>
        <NewsCreationSteps activeIndex={newsState.step} model={stepsModel} />
        {newsState.step === 0
          && (
            <NewsData
              newsData={newsState.newsData}
              onSetData={setNewsState}
              onSaveData={() => { }}
            />
          )}
      </SectionCard>
    </AdminLayout>
  );
};
