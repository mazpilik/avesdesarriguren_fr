import { MonthBirdUpdateStateT } from 'src/domain/MonthBird';

type MonthBirdData = {
  month: number;
  birdId: number;
  titleEs: string;
  titleEus: string;
  contentEs: string;
  contentEus: string;
}
export const monthBirdService = {
  getMonthBird: async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/monthBird`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const monthBird = response.json();
        return monthBird;
      }
      return {};
    } catch (error) {
      return {};
    }
  },
  getMonthBirdForHome: async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/monthBird/withImage`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const monthBird = response.json();
        return monthBird;
      }
      return {};
    } catch (error) {
      return {};
    }
  },
  AddMonthBird: async ({
    month, birdId, titleEs, titleEus, contentEs, contentEus,
  }:MonthBirdData) => {
    try {
      const user = sessionStorage.getItem('user');
      let token = null;
      if (user) {
        token = JSON.parse(user).token;
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}/monthBird`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          month, birdId, titleEs, titleEus, contentEs, contentEus,
        }),
      });
      if (response.status === 200) {
        return 'SUCCESS_CREATE_MONTH_BIRD';
      }
      return 'ERROR_CREATE_MONTH_BIRD';
    } catch (error) {
      return 'ERROR_CREATE_MONTH_BIRD';
    }
  },
  EditMonthBird: async (mbUpdateState: MonthBirdUpdateStateT) => {
    const user = sessionStorage.getItem('user');
    let token = null;
    if (user) {
      token = JSON.parse(user).token;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/monthBird/${mbUpdateState.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          month: mbUpdateState.month,
          birdId: mbUpdateState.birdId,
          titleEs: mbUpdateState.titleEs,
          titleEus: mbUpdateState.titleEus,
          contentEs: mbUpdateState.contentEs,
          contentEus: mbUpdateState.contentEus,
        }),
      });
      if (response.status === 200) {
        return 'SUCCESS_EDIT_MONTH_BIRD';
      }
      return 'ERROR_EDIT_MONTH_BIRD';
    } catch (error) {
      return 'ERROR_EDIT_MONTH_BIRD';
    }
  },
  deleteMonthBird: async (id:number) => {
    const user = sessionStorage.getItem('user');
    let token = null;
    if (user) {
      token = JSON.parse(user).token;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/monthBird/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        return 'SUCCESS_DELETE_MONTH_BIRD';
      }
      return 'ERROR_DELETE_MONTH_BIRD';
    } catch (error) {
      return 'ERROR_DELETE_MONTH_BIRD';
    }
  },
};
