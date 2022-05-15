import React, { useEffect, useReducer } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';
import { newsService } from 'src/services/newsService';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';
import { CancelBtn, SaveBtn } from 'src/ui/_components/Buttons/CustomButtons';
import { ActionButtons } from 'src/ui/_components/Form';
import { PageSpinner } from 'src/ui/_components/PageSpinner';
import { NewsData } from './_components/NewsData';
import { NewsPhotos } from './_components/NewsPhotos';
import { SectionCard } from '../AddNews/AddNews.styles';

import { updateNewsReducer, defaultNewsState, UpdateNewsActions } from './_functions/updateNewsReducer';
import { parseNewsToUpdate } from './_functions/parseNewsToUpdate';
import { parseNewsToNewsState } from './_functions/parseNewsToNewsState';

export const EditNews = () => {
  const { newsId } = useParams();
  const i18n = useRecoilValue(i18nAtom);
  const navigate = useNavigate();
  const [newsState, setNewsState] = useReducer(updateNewsReducer, defaultNewsState);

  const fetchNews = async () => {
    if (newsId) {
      const id = parseInt(newsId, 10);
      try {
        const news = await newsService.getNewsById(id);
        setNewsState({
          type: UpdateNewsActions.setAllState,
          payload: parseNewsToNewsState(news),
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  const onSaveData = async () => {
    try {
      await newsService.updateNews(parseNewsToUpdate(newsState), newsState.newsId);
      fetchNews();
    } catch (err) {
      console.log(err);
    }
  };

  const onUploadImage = () => {
    fetchNews();
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (!newsState.newsData) {
    return (<PageSpinner />);
  }

  return (
    <AdminLayout sectionTitle={i18n.newsEditSectionTitle}>
      <SectionCard>
        <NewsData
          newsData={newsState.newsData}
          onSetData={setNewsState}
        />
        <NewsPhotos
          newsId={newsState.newsId}
          photo={newsState.img}
          onSetData={setNewsState}
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
