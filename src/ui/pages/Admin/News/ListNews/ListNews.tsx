import React, { useEffect, useReducer } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';
import { ListToolbar } from 'src/ui/_components/ListToolbar';
import { List } from 'src/ui/_components/List';
import { Paginator } from 'src/ui/_components/Paginator';

import { useNotificationHook } from 'src/ui/_functions/hooks/useNotificationHook';

import { i18nAtom, userAtom } from 'src/ui/_functions/atoms/atoms';
import { newsService } from 'src/services/newsService';

import { ListSorted } from 'src/domain/ListingTypes';
import { newsListReducer, defaultNewsListState, NewsListActionTypes } from './_functions/newsListReducer';

export const ListNews = () => {
  const notifications = useNotificationHook();
  const i18n = useRecoilValue(i18nAtom);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const [newsState, setNewsState] = useReducer(newsListReducer, defaultNewsListState);

  const getNews = async () => {
    setNewsState({ type: NewsListActionTypes.setLoading, payload: true });
    try {
      const opts: ListSorted = {
        page: newsState.page,
        limit: newsState.itemsPerPage,
        sortBy: newsState.sortBy,
        sortDirection: newsState.sortDirection,
        where: newsState.searchTerm,
      };
      let news: any = [];
      news = await newsService.getNewsBy(opts, user.lang);
      setNewsState({ type: NewsListActionTypes.setNews, payload: news });
    } catch (error) {
      notifications.addErrorNotification(i18n.getNewsError);
    } finally {
      setNewsState({ type: NewsListActionTypes.setLoading, payload: false });
    }
  };

  const onGoToAddNews = () => {
    navigate('/shkud/news/add');
  };

  const onDeleteNews = async (id: number) => {
    try {
      const response = await newsService.deleteNews(id);
      if (response) {
        notifications.addSuccessNotification(i18n.deleteNewsSuccess);
      } else {
        notifications.addErrorNotification(i18n.deleteNewsError);
      }
    } catch (error) {
      notifications.addErrorNotification(i18n.getOrdersError);
    } finally {
      getNews();
    }
  };

  interface ISetListState {
    name: string;
    value: any;
  }

  const onSetListState = ({ name, value }: ISetListState) => {
    switch (name) {
      case 'itemsPerpage':
        setNewsState({ type: NewsListActionTypes.setItemsPerPage, payload: value });
        break;
      case 'listType':
        setNewsState({ type: NewsListActionTypes.setListType, payload: value });
        break;
      case 'sortBy':
        setNewsState({ type: NewsListActionTypes.setSortBy, payload: value });
        break;
      case 'sortDirection':
        setNewsState({ type: NewsListActionTypes.setSortDirection, payload: value });
        break;
      case 'page':
        setNewsState({ type: NewsListActionTypes.setPage, payload: value });
        break;
      case 'searchTerm':
        setNewsState({ type: NewsListActionTypes.setSearchTerm, payload: value });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getNews();
  }, [
    newsState.itemsPerPage,
    newsState.sortBy,
    newsState.sortDirection,
    newsState.page,
    newsState.searchTerm,
  ]);

  return (
    <AdminLayout sectionTitle={i18n.listNewsSectionTitle}>
      <ListToolbar
        itemsPerpage={newsState.itemsPerPage}
        listType={newsState.listType}
        onGoToAddItem={onGoToAddNews}
        onSetListState={onSetListState}
        sortBy={newsState.sortBy}
        sortDirection={newsState.sortDirection}
        totalRecords={newsState.totalRecords}
      />
      <List
        listType={newsState.listType}
        isLoading={newsState.loading}
        listItems={newsState.news}
        entity="news"
        onDelete={onDeleteNews}
      />
      <Paginator
        page={newsState.page}
        totalPages={newsState.totalPages}
        onSetListState={onSetListState}
      />
    </AdminLayout>
  );
};
