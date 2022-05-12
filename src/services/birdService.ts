import { BirdForSave } from 'src/domain/Bird';

export const birdService = {
  createBird: async (bird: BirdForSave) => {
    const user = sessionStorage.getItem('user');
    let token = null;
    if (user) {
      token = JSON.parse(user).token;
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/birds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
