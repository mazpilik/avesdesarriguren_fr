import { NewsUpdateState } from 'src/domain/News';

export const parseNewsToNewsState = (news: any): NewsUpdateState => ({
  newsId: news.id,
  userId: news.userId,
  newsData: news.newsData,
  img: {
    img: news.img,
    checked: true,
  },
});
