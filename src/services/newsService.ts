import { ListSorted } from 'src/domain/ListingTypes';
import { NewsToSave } from 'src/domain/News';

export const newsService = {
  create: async (news: NewsToSave) => {
    const user = sessionStorage.getItem('user') || '';
    const { token } = JSON.parse(user);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/news`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(news),
      });
      if (response.status === 201) {
        const newsId = await response.json();
        return newsId;
      }
      return 0;
    } catch (error) {
      // throw error;
      return 0;
    }
  },
  getNewsBy: async (opts: ListSorted, lang:string) => {
    const {
      page, limit, sortBy, sortDirection, where,
    } = opts;
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/news/sorted/${lang}/${page}/${limit}/${sortBy}/${sortDirection}${where !== '' ? `/${where}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.status === 200) {
      const news = await response.json();
      return news;
    }
    return [];
  },
  deleteNews: async (newsId: number) => {
    const user = sessionStorage.getItem('user') || '';
    const { token } = JSON.parse(user);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/news/${newsId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      // throw error;
      return false;
    }
  },
  updateNews: async (news: NewsToSave, newsId: number) => {
    const user = sessionStorage.getItem('user') || '';
    const { token } = JSON.parse(user);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/news/${newsId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(news),
      });
      if (response.status === 200) {
        const updatedNews = await response.json();
        return updatedNews;
      }
      return 0;
    } catch (error) {
      // throw error;
      return 0;
    }
  },
  getNewsById: async (newsId: number) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/news/${newsId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const news = await response.json();
      return news;
    }
    return [];
  },
};
