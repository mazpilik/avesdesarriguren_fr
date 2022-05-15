import { NewsUpdateState, NewsToUpdate } from 'src/domain/News';

export const parseNewsToUpdate = (news: NewsUpdateState): NewsToUpdate => ({
  userId: news.userId,
  newsData: news.newsData,
  img: news.img.checked ? news.img.img : '',
});
