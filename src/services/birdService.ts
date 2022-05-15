import { BirdForSave, BirdForUpdate } from 'src/domain/Bird';
import { ListSorted } from 'src/domain/ListingTypes';
import { parseBirdToEditSTate } from './parseBirdToEditState';

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
  getBirdsBy: async (opts: ListSorted, lang:string) => {
    const {
      page, limit, sortBy, sortDirection, where,
    } = opts;
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/birds/sorted/${lang}/${page}/${limit}/${sortBy}/${sortDirection}${where !== '' ? `/${where}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.status === 200) {
      const birds = await response.json();
      return birds;
    }
    return [];
  },
  deleteBird: async (birdId: number) => {
    const user = sessionStorage.getItem('user');
    let token = null;
    if (user) {
      token = JSON.parse(user).token;
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/birds/${birdId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const deletedBird = await response.json();
      return deletedBird;
    }
    return {};
  },
  getBirdById: async (birdId: number) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/birds/${birdId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const bird = await response.json();
      return parseBirdToEditSTate(bird);
    }
    return {};
  },
  updateBird: async (bird: BirdForUpdate) => {
    const user = sessionStorage.getItem('user');
    let token = null;
    if (user) {
      token = JSON.parse(user).token;
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/birds/${bird.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bird),
    });
    if (response.status === 200) {
      const updatedBird = await response.json();
      return updatedBird;
    }
    return {};
  },
  findAllBirds: async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/birds/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const birds = await response.json();
      return birds;
    }
    return [];
  },
};
