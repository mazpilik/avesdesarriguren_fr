import { Bird } from 'src/domain/Bird';

export const birdService = {
  createBird: async (bird: Bird) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/bird`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify(bird),
    });
    if (response.status === 200) {
      const createdBird = await response.json();
      return createdBird;
    }
    return {};
  },
};
