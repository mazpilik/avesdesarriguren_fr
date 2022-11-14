import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { newsService } from 'src/services/newsService';
import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

export const HomeNews = () => {
  const i18n = useRecoilValue(i18nAtom);
  const [homeNews, setHomeNews] = useState([]);
  const getNews = async () => {
    const news = await newsService.getNewsBy({
      limit: 3,
      page: 1,
      sortBy: 'date',
      sortDirection: 'desc',
      where: '',
    }, 'es');
    setHomeNews(news);
  };
  useEffect(() => {
    getNews();
  }, []);
  return (
    <div>
      <h3>{i18n.homeNewsTitle}</h3>
      <div>
        {homeNews.map((news: any) => (
          <div key={news.newsId}>
            <h4>{news.title}</h4>
            <p>{news.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
