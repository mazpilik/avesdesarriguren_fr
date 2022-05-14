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
      if (response.status === 200) {
        const message = await response.json();
        return message;
      }
      const message = await response.json();
      return message;
    } catch (error) {
      // throw error;
      return error;
    }
  },
};
