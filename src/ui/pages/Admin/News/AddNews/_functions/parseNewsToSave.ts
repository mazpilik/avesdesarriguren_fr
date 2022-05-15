import { NewsState, NewsToSave } from 'src/domain/News';

export const parseNewsToSave = (news: NewsState): NewsToSave => ({
  userId: news.userId,
  newsData: news.newsData,
});
