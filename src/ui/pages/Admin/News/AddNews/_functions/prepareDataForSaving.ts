import { NewsState } from './addNewsReducer';

export const prepareDataForSaving = (data: NewsState) => {
  const parsedData = {
    userId: data.userId,
    newsData: data.newsData,
  };
  return parsedData;
};
